# Fun With React Hooks

Warning: Your definition of fun may differ to mine.

## The problem
I wanted to write a custom logger where it enables you to accumulate data throughout the application/component lifecycles, but have it be tucked away so that you weren’t constantly having to rebuild the data you already have (and is still valid). Maybe something like…

```js
const logger = new Logger({});
logger.add({ some_data: 'hello' });
logger.add({ something_else: 42 });
logger.send();
```

in the OOP world. You could probably make this work in a React app, but then you’re in the global variable/singletons realm and tbh I didn’t want to go there. [Edit: I'm basically describing a React Context here!]

‘Ah!’ you say, ‘you should create a logger context and wrap your application with the associated providers!’

Yes, I should. So I did. But there still isn’t yet a way to add/remove/invalidate/send data within that context.

## Custom context backed by `useState`
Usually with a custom context and provider component, a developer will provide a custom hook that, provides the data, and gives the consumer a way to modify the data. I’ve seen this done with good ol' `useState` (docs), which might look something like this (ignoring the gritty details…)

```js
const CustomContext = createContext([{}, _ => {}]);

function CustomProvider({ children }) {
  const stateAndSetter = useState({});
  
  return (
    <CustomContext.Provider value={stateAndSetter}>
      {children}
    </CustomContext.Provider>
  );
}

function useCustom() {
  const context = useContext(CustomContext);
  if (!context) {
    // Throw toys
  }

  return context;
}

// Then, in one of the children components you have access to stateAndSetter
function SomeChildComponent() {
  const [custom, setCustom] = useCustom();
  // ...
}
```

But this pattern isn’t suitable for my custom logger. It could be made to work, but will needlessly impact the performance of your application. A usage of this solution might look like this:

```js
function SomeComponent() {
  const [logs, setLogs] = useState({});
  
  function someCallback() {
    setLogs(logs => { ...logs, some_data: 'hello' });
    // ...
  }
  
  // ...
}
```

When the setter is called, React will re-render `SomeComponent` - but the component doesn’t depend on the logs (I hope!), so we shouldn’t have to re-render to add data to the logs. What I’m really saying (and what React is trying to tell you) is that your logs aren’t a part of your application state. This is one of the things React talks about in [thinking in React](https://beta.reactjs.org/learn/thinking-in-react).

## Custom context backed by `useRef`
`useRef` (docs) is a React hook which is fairly similar to `useState` in that you can use it to (kind of) keep track of state in your component/application. The thing which sets it apart from `useState`, and the thing that made it the hook I reached for, is that when you update your ref, it doesn’t trigger a re-render. Wonderful! This feels like the right choice for my logger. I can accumulate data in a ref throughout my component’s lifecycle, without it impacting its rendering. For completeness, a usage might look like (this is very similar to the initial `useState` attempt...)

```js
const CustomContext = createContext([{}, _ => {}]);

function CustomProvider({ children }) {
  const customRef = useRef({ hello: 'world!' });
  
  return (
    <CustomContext.Provider value={customRef}>
      {children}
    </CustomContext.Provider>
  );
}

function useCustom() {
  // Consider that mebbe the hook was invoked incorrectly, yadda yadda
  return useContext(CustomContext);
}

function SomeChildComponent() {
  const custom = useCustom();
  
  function someCallback() {
    custom.current = { ...custom.current, some_data: 'hello' };
  }

  // ...
}
```

Hmmm… another difference between `useState` and `useRef` is the API you use to update the values. As you can see in `someCallback`, `ref`s don’t really have a nice API for updating their contents. Which brings us to…

## Custom context backed by `useReducer` (but not really)
I’m a big fan of `useReducer` (docs). It’s isomorphic to the `useState` hook, in the sense that it’s always possible to rewrite usages of `useState` with `useReducer`, and vice versa. I like `useReducer` because instead of explicitly passing your new desired state to some function (like you would with `setState(...)`), you describe how you want your state to update. A cheap (and suitably contrived) example:

```js
function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return state.count + action.amount;
    }
    case "SUBTRACT": {
      return state.count - action.amount;  
    }
    // ...
  }
}

function SomeComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  // update state to 1
  dispatch({ type: "ADD", amount: 1 });
  
  // update state to -9
  dispatch({ type: "SUBTRACT", amount: 10 });
}
```

You get the idea. The use case for `useReducer` is generally when your component state is starting to get tangled and complicated.

I wanted to use `useReducer` for my logger so that I can do stuff like

```js
loggerDispatch({ type: "ADD_DATA", data: { some_data: 'hello' }});
loggerDispatch({ type: "REMOVE_DATA", fields: ['some_data'] });
```

Or even

```js
loggerDispatch({ type: "SEND_DATA", dataMask: "current_page" });
```

Or possibly even

```js
loggerDispatch({ type: "ADD_DATA", data: { some_data: 'hello' }, send: true });
```

Except `useReducer` maintains the state in `useState`-like fashion, where if I dispatch an action, it will re-render the component. Boo!

## Custom context backed by `useRefReducer`
Surprisingly, according to my 15 second Google search^, a `useReducer` hook that uses refs in place of state doesn’t exist. I suspect this is because of some fatal reason I absolutely shouldn’t have done this. But who cares! So I wrote my own custom, totally generic and reusable React hook. Here it is, in its fully typed glory:

```ts
import { useRef } from 'react';

export type RefReducerDispatch<A> = (action: A) => void;

export const useRefReducer = <S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S
): [S, RefReducerDispatch<A>] => {
  const ref = useRef(initialState);

  const update: RefReducerDispatch<A> = action => {
    ref.current = reducer(ref.current, action);
  };

  return [ref.current, update];
};
```

And a (partial) implementation:

```ts
const LoggerContext = createContext<
  [NonNestedJson, RefReducerDispatch<Action>]
>([{}, _ => {}]);

export const LoggerProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [state, dispatch] = useRefReducer(reducer, {});

  return (
    <LoggerContext.Provider value={[state, dispatch]}>
      {children}
    </LoggerContext.Provider>
  );
};
```

And utilisation:

```js
export const SomePage = () => {
  const [, loggerDispatch] = useLogger();

  useEffect(() => {
    loggerDispatch({
      type: 'ADD_DATA',
      data: { sales_channel: 'RETAIL' },
      mask: 'SOME_PAGE',
      send: true,
    });
  }, [loggerDispatch]);
}
```

## Conclusion
This code will never go to production - but that’s okay because I had (a lot) of fun on this journey to creating a generic custom hook of my very own. I learned more about state, refs, contexts, reducers, hooks, React, … which I know will help me when I’m working on React apps.

^ _You know, the kind of Google search you do where you don’t care if it's a solved problem and you just want to solve it for yourself anyway?_
