import { useTitle } from "../utils/use-title";
import { Posts } from "../components/posts";
import { Layout } from "../components/layout";
import { Title, Description, Links } from "../components/home";

export default function Home() {
  useTitle("Ashton Moore");

  return (
    <Layout>
      <div className="wrapper">
        <Title title="Ashton Moore" />
        <Description />
        <Links />
      </div>
      <Posts />
    </Layout>
  );
}
