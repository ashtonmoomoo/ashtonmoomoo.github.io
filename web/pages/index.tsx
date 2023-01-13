import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AVAILABLE_POSTS, PostMeta } from "../meta/AVAILABLE_POSTS";
import { useTitle } from "../utils/use-title";

function Title({ title }: { title: string }) {
  return <h1 className="boxed-text shadow title">{title}</h1>;
}

function BoxedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="link" target={"_blank"}>
      <span className="boxed-text shadow-animation">{label}</span>
    </Link>
  );
}

function Description() {
  return <p className="boxed-text description">Software Engineer</p>;
}

function PostCard({ post }: { post: PostMeta }) {
  const { id, posted, summary, title } = post;
  const [dateString, setDateString] = useState<string>();

  // Avoid hydration errors
  useEffect(() => {
    setDateString(new Date(posted).toLocaleDateString());
  }, [posted]);

  return (
    <div className="post">
      <Link href={`/post?id=${id}`} className="post-link">
        <h3 className="post-title">{title}</h3>
      </Link>
      <p className="post-summary">{summary}</p>
      {dateString && <p>{dateString}</p>}
    </div>
  );
}

function Posts() {
  return (
    <div className="posts boxed-text">
      <h2 className="posts-header">Posts</h2>
      {AVAILABLE_POSTS.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}

export default function Home() {
  useTitle("Ashton Moore");

  return (
    <div className="container">
      <div className="wrapper">
        <Title title="Ashton Moore" />
        <Description />
        <div className="links">
          <BoxedLink
            href="https://ashtonmooredevartefacts.s3.ap-southeast-2.amazonaws.com/ashton_moore_cv.pdf"
            label="CV"
          />
          <BoxedLink
            href="https://www.linkedin.com/in/ashtoncmoore/"
            label="LinkedIn"
          />
          <BoxedLink href="https://github.com/ashtonmoomoo" label="Github" />
        </div>
      </div>
      {AVAILABLE_POSTS.length > 0 && <Posts />}
    </div>
  );
}
