import Head from "next/head";

import posts, { Post } from "../content";

function Title({ title }: { title: string }) {
  return <h1 className="boxed-text shadow title">{title}</h1>;
}

function Link({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="link">
      <span className=" boxed-text shadow-animation">{label}</span>
    </a>
  );
}

function Description() {
  return <p className="boxed-text description">Software Engineer</p>;
}

function PostCard({ post }: { post: Post }) {
  const { id, posted, summary, title } = post;

  return (
    <div className="post">
      <a href={`/posts/${id}`} className="post-link">
        <h3 className="post-title">{title}</h3>
      </a>
      <p className="post-summary">{summary}</p>
      <p>{posted.toLocaleDateString()}</p>
    </div>
  );
}

function Posts() {
  return (
    <div className="posts boxed-text">
      <h2 className="posts-header">Posts</h2>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Ashton Moore</title>
        <link rel="icon" href="static/favicon.ico" />
      </Head>
      <div className="container">
        <div className="wrapper">
          <Title title="Ashton Moore" />
          <Description />
          <div className="links">
            <Link
              href="https://ashtonmooredevartefacts.s3.ap-southeast-2.amazonaws.com/ashton_moore_cv.pdf"
              label="CV"
            />
            <Link
              href="https://www.linkedin.com/in/ashtoncmoore/"
              label="LinkedIn"
            />
            <Link href="https://github.com/ashtonmoomoo" label="Github" />
          </div>
        </div>
        {posts.length > 0 && <Posts />}
      </div>
    </>
  );
}
