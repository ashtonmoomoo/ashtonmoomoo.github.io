import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";

import content from "../../content";

function PostPage() {
  const router = useRouter();
  const { "post-id": id } = router.query;

  const post = content.find((p) => p.id === id);

  if (!post) {
    return null;
  }

  return (
    <div className="post-container">
      <div className="post-page">
        <ReactMarkdown
          className="boxed-text"
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
          {post.mdContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default PostPage;
