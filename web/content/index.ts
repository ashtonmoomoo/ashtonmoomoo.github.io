import { etaConversion } from "./posts/etaConversion";
import type { Post } from "./types";

const content: Post[] = [etaConversion].sort(
  (a, b) => Number(b.posted) - Number(a.posted)
);

export { Post };
export default content;
