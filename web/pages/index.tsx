import Head from "next/head";

function Title({ title }: { title: string }) {
  return <h1 className="boxed-text">{title}</h1>;
}

function Link({ href, label }: { href: string; label: string }) {
  return (
    <div className="link boxed-text">
      <a href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Ashton Moore</title>
      </Head>
      <Title title="Ashton Moore" />
      <Link
        href="https://ashtonmooredevartefacts.s3.ap-southeast-2.amazonaws.com/ashton_moore_cv.pdf"
        label="CV"
      />
      <Link href="https://www.linkedin.com/in/ashtoncmoore/" label="LinkedIn" />
      <Link href="https://github.com/ashtonmoomoo" label="Github" />
    </>
  );
}
