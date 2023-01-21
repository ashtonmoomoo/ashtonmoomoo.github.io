# `ashtonmoore.dev`

## Development
The Next.js app lives in `web`. 
From `web`:
- Install dependencies: `yarn`
- Run a local development server: `yarn dev`

## Adding a post
Add a file good ol' markdown file in the `_posts` directory.
Keep in mind that not all markdown features will be supported by `ReactMarkdown` (e.g. footnotes).
Once you have a post in the `_posts` directory, you can register it in `web/meta/AVAILABLE_POSTS.ts`, where you can give it an ID (should be the same as the filename, without the extension), title, summary, date posted, and a URL.
The URL should point to an endpoint where the post is available via a `GET` request and can be parsed as text.

Currently, the easiest way to test how a post looks on the site is to publish a branch to GitHub with the new post, and restart your dev server with the `DEVELOPMENT_BRANCH` environment variable set to the appropriate branch name.
Not ideal, I know! 
One day I'll make it better. 😅
