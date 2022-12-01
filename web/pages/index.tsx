import Head from "next/head";

function Title({ title }: { title: string }) {
  return <h1 className="boxed-text shadow title">{title}</h1>;
}

function Link({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="link">
      <span className=" boxed-text shadow-animation">{label}</span>
    </a>
  );
}

function Description() {
  return (
    <div>
      <p className="boxed-text description">Software Engineer</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Ashton Moore</title>
      </Head>
      <div className="container">
        <div className="wrapper">
          <Title title="Ashton Moore" />
          <Description />
          <div className="links">
            <Link
              href="https://ashtonmooredevartefacts.s3.ap-southeast-2.amazonaws.com/ashton_moore_cv.pdf"
              label="CV"
            />
            <Link
              href="https://www.linkedin.com/in/ashtoncmoore/"
              label="LinkedIn"
            />
            <Link href="https://github.com/ashtonmoomoo" label="Github" />
          </div>
        </div>
      </div>
    </>
  );
}
