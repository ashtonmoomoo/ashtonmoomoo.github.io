import Link from "next/link";
import { useState, useEffect } from "react";
import { PostMeta, AVAILABLE_POSTS } from "../../meta/AVAILABLE_POSTS";

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

export function Posts() {
  if (!AVAILABLE_POSTS.length) {
    return null;
  }

  return (
    <div className="posts boxed-text">
      <h2 className="posts-header">Posts</h2>
      {AVAILABLE_POSTS.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
