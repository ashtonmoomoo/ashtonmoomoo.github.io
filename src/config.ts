import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.ashtonmoore.dev/",
  author: "Ashton Moore",
  desc: "My personal blog of misguided technical rambling",
  title: "Ashton Moore",
  ogImage: "",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"];

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 100,
  height: 100,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/ashtonmoomoo",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ashtoncmoore/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:ashton.chris.moore@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
