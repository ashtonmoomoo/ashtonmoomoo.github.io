import Link from "next/link";
import styles from "../../styles/Posts.module.css";
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
    <div className={styles.post}>
      <Link href={`/post?id=${id}`} className={styles.link}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <p className={styles.summary}>{summary}</p>
      {dateString && <p>{dateString}</p>}
    </div>
  );
}

export function Posts() {
  if (!AVAILABLE_POSTS.length) {
    return null;
  }

  return (
    <div className={`${styles.container} boxed-text`}>
      <h2 className={styles.header}>Posts</h2>
      {AVAILABLE_POSTS.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
