export interface PostMeta {
  id: string;
  title: string;
  summary: string;
  posted: string;
  url: string;
}

const BRANCH =
  process.env.NODE_ENV === "production" || !process.env["DEVELOPMENT_BRANCH"]
    ? "main"
    : process.env["DEVELOPMENT_BRANCH"];

const BASE_URL = `https://raw.githubusercontent.com/ashtonmoomoo/ashtonmoomoo.github.io/${BRANCH}/_posts/`;

export const AVAILABLE_POSTS: PostMeta[] = [
  {
    id: "use-ref-reducer",
    title: "Fun With React Hooks",
    summary: "Creating a custom React hook that wraps useRef",
    posted: "2023-01-14",
    url: `${BASE_URL}use-ref-reducer.md`,
  },
  {
    id: "dangers-of-eta-conversion",
    title: "The Dangers of Eta Conversion in JS & TS",
    summary: "Was that a faithful refactor you just did?",
    posted: "2022-12-03",
    url: `${BASE_URL}dangers-of-eta-conversion.md`,
  },
];
