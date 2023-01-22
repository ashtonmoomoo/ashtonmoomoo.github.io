const template = document.createElement("template");
template.innerHTML = `
<div data-postcard class="post">
  <h3>
    <slot name="link-text"></slot>
  </h3>
  <p>
    <slot name="posted"></slot>
  </p>
  <p>
    <slot name="summary"></slot>
  </p>
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
