import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

// Import CSS as strings
const buttonsCss = `
:where(
  button,
  input[type="button"],
  input[type="submit"],
  input[type="reset"],
  input[type="file"]
),
:where(input[type="file"])::file-selector-button {
  --_accent-light: hsl(210 100% 40%);
  --_accent-dark: hsl(210 50% 70%);
  --_accent: var(--_accent-light);

  --_text-light: hsl(210 10% 30%);
  --_text-dark: hsl(210 5% 95%);
  --_text: var(--_text-light);
  
  --_bg-light: hsl(0 0% 100%);
  --_bg-dark: hsl(210 9% 31%);
  --_bg: var(--_bg-light);

  --_input-well-light: hsl(210 16% 87%);
  --_input-well-dark: hsl(204 10% 10%);
  --_input-well: var(--_input-well-light);

  --_padding-inline: 1.75ch;
  --_padding-block: .75ch;
  
  --_border-radius: .5ch;
  --_border-light: hsl(210 14% 89%);
  --_border-dark: var(--_bg-dark);
  --_border: var(--_border-light);
  
  --_highlight-size: 0;
  --_highlight-light: hsl(210 10% 71% / 25%);
  --_highlight-dark: hsl(210 10% 5% / 25%);
  --_highlight: var(--_highlight-light);
  
  --_ink-shadow-light: 0 1px 0 var(--_border-light);
  --_ink-shadow-dark: 0 1px 0 hsl(210 11% 15%);
  --_ink-shadow: var(--_ink-shadow-light);
  
  --_icon-size: 2ch;
  --_icon-color: var(--_accent);

  --_shadow-color-light: 220 3% 15%;
  --_shadow-color-dark: 220 40% 2%;
  --_shadow-color: var(--_shadow-color-light);
  --_shadow-strength-light: 1%;
  --_shadow-strength-dark: 25%;
  --_shadow-strength: var(--_shadow-strength-light);
  --_shadow-1: 0 1px 2px -1px hsl(var(--_shadow-color)/calc(var(--_shadow-strength) + 9%));
  --_shadow-2: 0 3px 5px -2px hsl(var(--_shadow-color)/calc(var(--_shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--_shadow-color)/calc(var(--_shadow-strength) + 5%));
  
  --_shadow-depth-light: 0 1px var(--_border-light);
  --_shadow-depth-dark: 0 1px var(--_bg-dark);
  --_shadow-depth: var(--_shadow-depth-light);

  --_transition-motion-reduce: ;
  --_transition-motion-ok:
    box-shadow 145ms ease,
    outline-offset 145ms ease
  ;
  --_transition: var(--_transition-motion-reduce);

  font: inherit;
  letter-spacing: inherit;
  line-height: 1.5;
  border-radius: var(--_border-radius);
}
`;

const buttonsCustomCss = `
.btn-custom {
  --_bg: linear-gradient(hsl(228 94% 67%), hsl(228 81% 59%));
  --_border: hsl(228 89% 63%);
  --_text: hsl(228 89% 100%);
  --_ink-shadow: 0 1px 0 hsl(228 57% 50%);
  --_highlight: hsl(228 94% 67% / 20%);
}

.btn-large {
  --_size: 1.5rem;
}

[data-icon="cloud"] {
  --icon-cloud: url("https://api.iconify.design/mdi:apple-icloud.svg") center / contain no-repeat;
  mask: var(--icon-cloud);
  background: linear-gradient(to bottom, var(--_accent-dark), var(--_accent-light));
}
`;

@customElement("lit-button")
export class LitButton extends LitElement {
  @property({ type: String })
  variant = "default";
  @property({ type: String })
  size = "normal";
  @property({ type: Boolean })
  disabled = false;
  @property({ type: String })
  type: "button" | "submit" | "reset" | "menu" = "button";
  @property({ type: String })
  icon = "";

  constructor() {
    super();
  }

  static override styles = css`
    ${unsafeCSS(buttonsCss)} ${unsafeCSS(buttonsCustomCss)} :host {
      display: inline-block;
    }

    button {
      cursor: pointer;
      touch-action: manipulation;
      font-size: var(--_size, 1rem);
      background: var(--_bg);
      color: var(--_text);
      border: 2px solid var(--_border);
      box-shadow:
        var(--_shadow-2),
        var(--_shadow-depth),
        0 0 0 var(--_highlight-size) var(--_highlight);
      text-shadow: var(--_ink-shadow);
      transition: var(--_transition);

      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 1ch;

      font-weight: 700;
      padding-block: var(--_padding-block);
      padding-inline: var(--_padding-inline);

      user-select: none;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
    }

    button:hover:not(:disabled) {
      --_highlight-size: 0.5rem;
    }

    button:focus-visible:not(:active) {
      outline-offset: 5px;
    }

    button:disabled {
      --_bg: none;
      --_text-light: hsl(210 7% 40%);
      --_text-dark: hsl(210 11% 71%);
      cursor: not-allowed;
    }

    .icon {
      block-size: var(--_icon-size);
      inline-size: var(--_icon-size);
      stroke: var(--_icon-color);
      filter: drop-shadow(var(--_ink-shadow));
      flex-shrink: 0;
    }

    @media (prefers-color-scheme: dark) {
      button {
        --_bg: var(--_bg-dark);
        --_text: var(--_text-dark);
        --_border: var(--_border-dark);
        --_accent: var(--_accent-dark);
        --_highlight: var(--_highlight-dark);
        --_ink-shadow: var(--_ink-shadow-dark);
        --_shadow-depth: var(--_shadow-depth-dark);
        --_shadow-color: var(--_shadow-color-dark);
        --_shadow-strength: var(--_shadow-strength-dark);
      }

      button[type="submit"],
      button[type="reset"],
      button[disabled] {
        --_bg: var(--_input-well);
      }
    }
  `;

  override render() {
    const variantClass = this.variant === "custom" ? "btn-custom" : "";
    const sizeClass = this.size === "large" ? "btn-large" : "";

    return html`
      <button
        class="${variantClass} ${sizeClass}"
        type="${this.type}"
        ?disabled="${this.disabled}"
      >
        ${this.renderIcon()}
        <slot></slot>
      </button>
    `;
  }

  renderIcon() {
    if (!this.icon) return "";
    return html`
      <span class="icon" data-icon="${this.icon}"></span>
    `;
  }
}
