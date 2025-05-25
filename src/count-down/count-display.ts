

import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('count-display')
export class CountDisplay extends LitElement {
  static override properties = {
    count: { type: Number },
  };
  declare count: number;
  constructor() {
    super();
  }

  override render() {
    return html`<p>Count: ${this.count}</p>`;
  }
}
