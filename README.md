# `www.ashtonmoore.dev`

## Adding a post
Add a file good ol' markdown file in the `_posts` directory.
Once you have a post in the `_posts` directory, you can register it in `index.html`, where you can give it an ID (should be the same as the filename, without the extension), title, summary, date posted, and a URL.
The URL should point to an endpoint where the post is available via a `GET` request and can be parsed as text.

Currently, the easiest way to test how a post looks on the site is to publish a branch to GitHub with the new post, register the post on the index page, and then change the `BASE_URL` variable on the posts page.
Not ideal, I know! 
One day I'll make it better. 😅
