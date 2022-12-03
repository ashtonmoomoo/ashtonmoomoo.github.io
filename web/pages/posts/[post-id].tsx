import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

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
        <div className="boxed-text">
          <ReactMarkdown>{post.mdContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
