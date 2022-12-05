export interface PostMeta {
  id: string;
  title: string;
  summary: string;
  posted: string;
  url: string;
}

// Need to sort out a better way to do this
const BRANCH = "main";
const BASE_URL = `https://raw.githubusercontent.com/ashtonmoomoo/ashtonmoomoo.github.io/${BRANCH}/_posts/`;
export const AVAILABLE_POSTS: PostMeta[] = [
  {
    id: "dangers-of-eta-conversion",
    title: "The Dangers of Eta Conversion in JS & TS",
    summary: "Was that a faithful refactor you just did?",
    posted: "2022-12-03",
    url: `${BASE_URL}dangers-of-eta-conversion.md`,
  },
];
