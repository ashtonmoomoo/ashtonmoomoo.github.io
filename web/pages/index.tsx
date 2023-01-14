import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useTitle } from "../utils/use-title";
import { Posts } from "../components/posts";

function Title({ title }: { title: string }) {
  return (
    <h1 className={`boxed-text ${styles.shadow} ${styles.title}`}>{title}</h1>
  );
}

function BoxedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={styles.link} target={"_blank"}>
      <span className={`boxed-text ${styles["shadow-animation"]}`}>
        {label}
      </span>
    </Link>
  );
}

function Description() {
  return (
    <p className={`boxed-text ${styles.description}`}>Software Engineer</p>
  );
}

export default function Home() {
  useTitle("Ashton Moore");

  return (
    <div className="container">
      <div className="wrapper">
        <Title title="Ashton Moore" />
        <Description />
        <div className={styles.links}>
          <BoxedLink
            href="https://ashtonmooredevartefacts.s3.ap-southeast-2.amazonaws.com/ashton_moore_cv.pdf"
            label="CV"
          />
          <BoxedLink
            href="https://www.linkedin.com/in/ashtoncmoore/"
            label="LinkedIn"
          />
          <BoxedLink href="https://github.com/ashtonmoomoo" label="GitHub" />
        </div>
      </div>
      <Posts />
    </div>
  );
}
