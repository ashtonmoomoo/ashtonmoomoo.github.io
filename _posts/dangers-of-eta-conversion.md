# The Dangers of Eta Conversion in JS & TS

[Eta conversion](https://wiki.haskell.org/Eta_conversion) (also known as eta reduction) is something you've probably used before and is easiest to demonstrate with an example:

```js
// Before eta conversion
someArray.forEach(e => someCallback(e));

// After eta conversion
someArray.forEach(someCallback);
```

Seems reasonable, but it can be dangerous to perform this kind of simplification, if you're not careful with exactly what's going on.
The canonical example of this danger is when eta converting a callback passed to  the map array method. What is the output of the following?

```js
['1', '2', '3', '0'].map(parseInt);
```

It's `[1, NaN, NaN, 0]`.
I'm not sure about you, but when I saw this for the first time, I was pretty confused.
This bug unexpected behaviour  comes from the fact that the map method [supplies three values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#syntax) that can be used in the callback passed to it: `map((element, index, array) => { /* ... */ })`.
When you pass in a callback function handle without wrapping it in a `function` or `() => {}`, JavaScript will automatically pass all of the parameters to the callback.
So in the example above, intuition says `parseInt` will just act on each element of the array, but what is really happening is `parseInt` is being called with three parameters: `parseInt('1', 0, ['1', '2', '3', '0'])`.

As far as JavaScript is concerned, this is completely fine, even though the signature of `parseInt` says it accepts a minimum of one, but maximum of two arguments.
This means that the values returned by applying `map(parseInt)` to the array are `parseInt('1', 0)`, `parseInt('2', 1)`, `parseInt('3', 2)`, and `parseInt('0', 4)`.
The second arg in `parseInt` is the radix or base of the resulting parsed number - passing `0` (or `undefined`) will let `parseInt` attempt to guess the base from the input, otherwise it'll use the base provided - which in our middle two cases are nonsense, hence the `NaN`s.

The upshot here is that unless you are 100% sure about what arguments, how many of them, and in which order are being passed to your callback function - you probably shouldn't do an eta conversion. 

### How can I avoid this in my JavaScript code?
If you're sure you want to do an eta conversion, you should create a function specifically designed to be used as a callback.
To extend the `parseInt` example from above, you might do something like this:

```js
const parseIntCallback = toParse => {
  return parseInt(toParse);
};

someArray.map(parseIntCallback);
```

This will prevent parseInt from being called with unexpected arguments (provided that the first argument is correct!)

Maybe clearer than appealing to eta conversions is do the above but pass the callback function anonymously: `someArray.map(e => parseInt(e));`, since this way your code remains explicit about which arguments are expected by the callback function.

### That won't happen to me, I use _TypeScript_
Yes, I thought the same thing. But nay, not even TypeScript will save you here `['1', '2', '3', '0'].map(parseInt);` will not show any errors or warnings. The code will have the same output as it did in JavaScript.
This was an intentional decision by TypeScript to keep the behaviour consistent with JavaScript.
