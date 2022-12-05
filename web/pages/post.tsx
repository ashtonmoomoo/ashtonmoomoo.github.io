import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { AVAILABLE_POSTS } from "./AVAILABLE_POSTS";

function ContentWrapper({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <div className="post-container">
      <div className="post-page">{children}</div>
    </div>
  );
}

interface PostPageState {
  markdown?: string;
  loading?: boolean;
}

function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState<PostPageState>({ loading: true });

  const meta = AVAILABLE_POSTS.find((p) => p.id === id);

  useEffect(() => {
    const fetchPost = async (url: string) => {
      const response = await fetch(url);
      const markdown = await response.text();
      setState({ markdown, loading: false });
    };

    if (meta?.url) {
      fetchPost(meta.url);
    }
  }, [meta?.url]);

  if (!meta) {
    return (
      <ContentWrapper>
        <p className="boxed-text">Post not found :{"("}</p>
      </ContentWrapper>
    );
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <ContentWrapper>
        <ReactMarkdown
          className="boxed-text"
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, style, ...props }) {
              const [, language] = /language-(\w+)/.exec(className || "") || [];

              if (inline) {
                return (
                  <span className="inline-code">
                    <code>{children}</code>
                  </span>
                );
              }

              return (
                <SyntaxHighlighter
                  style={cb}
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
          {state?.markdown || "### Something went wrong :("}
        </ReactMarkdown>
      </ContentWrapper>
    </>
  );
}

export default PostPage;