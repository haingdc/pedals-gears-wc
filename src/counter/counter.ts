import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-counter")
class Counter extends LitElement {

    @property({ type: Number }) count = 0;

    @property({ attribute: false }) funcInReactComponent = () => {};
  static override properties = {
    funcInReactComponent: {
      type: Function,
      attribute: false,
    },
  };


  override connectedCallback() {
    super.connectedCallback();
  }

  handleClick() {
    // this.count++;
    this.funcInReactComponent();
  }

  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <h2 class="web-component-header">Web Component</h2>
      <button @click="${this.handleClick}">Web Component Button</button>
      <output>
        Count tracked in Web Component:
        <span>${this.count}</span>
      </output>
    `;
  }
}

export default Counter;
