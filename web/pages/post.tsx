import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Post.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { AVAILABLE_POSTS } from "../meta/AVAILABLE_POSTS";
import { useTitle } from "../utils/use-title";
import { Layout } from "../components/layout";

interface PostPageState {
  markdown?: string;
}

function NotFound() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className="boxed-text">404! Post not found :(</div>
      </div>
    </Layout>
  );
}

function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState<PostPageState>();

  const meta = AVAILABLE_POSTS.find((p) => p.id === id);

  useTitle(meta?.title || "404 :(");

  useEffect(() => {
    const fetchPost = async (url: string) => {
      const response = await fetch(url);
      const markdown = await response.text();
      setState({ markdown });
    };

    if (meta?.url) {
      fetchPost(meta.url);
    }
  }, [meta?.url]);

  if (!meta && !state?.markdown) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className={styles.page}>
        <ReactMarkdown
          className="boxed-text"
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            a({ children, ...props }) {
              return (
                <a className={styles.link} {...props}>
                  {children}
                </a>
              );
            },
            code({ inline, className, children, style, ...props }) {
              const [, language] = /language-(\w+)/.exec(className || "") || [];

              if (inline) {
                return (
                  <span className={styles["inline-code"]}>
                    <code>{children}</code>
                  </span>
                );
              }

              return (
                <SyntaxHighlighter
                  style={cb}
                  wrapLines
                  wrapLongLines
                  language={language || "language-js"}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          {state?.markdown || "Loading..."}
        </ReactMarkdown>
      </div>
    </Layout>
  );
}

export default PostPage;
