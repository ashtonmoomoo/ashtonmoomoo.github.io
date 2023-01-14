import Link from "next/link";
import styles from "../../styles/Home.module.css";

export function Title({ title }: { title: string }) {
  return (
    <h1 className={`boxed-text ${styles.shadow} ${styles.title}`}>{title}</h1>
  );
}

export function Description() {
  return (
    <p className={`boxed-text ${styles.description}`}>Software Engineer</p>
  );
}

export function BoxedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={styles.link} target={"_blank"}>
      <span className={`boxed-text ${styles["shadow-animation"]}`}>
        {label}
      </span>
    </Link>
  );
}

export function Links() {
  return (
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
  );
}
