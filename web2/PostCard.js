const template = document.createElement("template");
template.innerHTML = `
<div data-postcard>
  <slot name="link-text"></slot>
  <slot name="summary"></slot>
  <slot name="posted"></slot>
</div>
`;

class PostCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.component = shadow.querySelector("[data-postcard]");
  }
}

customElements.define("post-card", PostCard);
