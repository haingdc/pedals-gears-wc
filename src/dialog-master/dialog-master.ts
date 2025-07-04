import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

const dialogClosingEvent = new Event("closing");
const dialogClosedEvent = new Event("closed");
const dialogOpeningEvent = new Event("opening");
const dialogOpenedEvent = new Event("opened");
const dialogRemovedEvent = new Event("removed");

@customElement("dialog-master")
class DialogMaster extends LitElement {
  @query("dialog")
  private dialogElement!: HTMLDialogElement;
  private observer: MutationObserver | null = null;

  override connectedCallback() {
    super.connectedCallback();
  }

  protected override firstUpdated(): void {
    this.dialogElement.addEventListener("click", this.lightDismiss);
    this.dialogElement.addEventListener("close", this.dialogClose);

    // Set up attribute observer
    this.observer = new MutationObserver(this.handleMutations);
    this.observer.observe(this.dialogElement, {
      attributes: true,
      attributeFilter: ["open"],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.dialogElement.removeEventListener("click", this.lightDismiss);
    this.dialogElement.removeEventListener("close", this.dialogClose);
    this.dispatchEvent(dialogRemovedEvent);

    // Disconnect the observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private lightDismiss = (event: Event) => {
    const dialog = event.target as HTMLDialogElement;
    if (dialog.nodeName === "DIALOG") {
      dialog.close("dismiss");
    }
  };

  private dialogClose = async (event: Event) => {
    const dialog = event.target as HTMLDialogElement;
    dialog.setAttribute("inert", "");
    this.dispatchEvent(dialogClosingEvent);

    await this.animationsComplete();

    this.dispatchEvent(dialogClosedEvent);
  };

  private handleMutations = async (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "open") {
        const isOpen = this.dialogElement.hasAttribute("open");
        const isMegaMode = this.getAttribute("modal-mode") === "mega";

        if (isOpen && isMegaMode) {
          // Add overflow hidden to html when mega modal opens
          document.documentElement.style.overflow = "hidden";
        } else if (!isOpen && isMegaMode) {
          // Remove overflow hidden when mega modal closes
          document.documentElement.style.overflow = "";
        }

        if (!isOpen) return;
        this.dialogElement.removeAttribute("inert");
        //set focus
        const focusTarget = this.querySelector("[autofocus]") as HTMLElement | null;
        focusTarget ? focusTarget.focus() : this.dialogElement.querySelector("button")?.focus();

        this.dispatchEvent(dialogOpeningEvent);
        await this.animationsComplete();
        this.dispatchEvent(dialogOpenedEvent);
      }
    }
  };

  // wait for all dialog animations to complete their promises

  private animationsComplete = () => {
    return Promise.allSettled(
      this.dialogElement.getAnimations().map((animation) => animation.finished),
    );
  };

  public show() {
    this.dialogElement.showModal();
  }

  public hide() {
    this.dialogElement.close();
  }

  static override styles = css`
    dialog {
      --ease-3: cubic-bezier(0.25, 0, 0.3, 1);
      --animation-slide-in-up: slide-in-up 0.5s var(--ease-3);
      --animation-scale-down: scale-down 0.5s var(--ease-3);
      --animation-slide-out-down: slide-out-down 0.5s cubic-bezier(0.25, 0, 0.3, 1);

      display: grid;
      align-content: start;
      background: var(--surface-2);
      color: var(--text-1);
      max-inline-size: min(90vw, var(--size-content-3));
      margin: auto;
      padding: 0;
      position: fixed;
      inset: 0;
      border-radius: var(--radius-3);
      box-shadow: var(--shadow-6);
      z-index: var(--layer-important);
      overflow: hidden;
      transition: opacity 0.5s var(--ease-3);

      @media (prefers-reduced-motion: no-preference) {
        animation: scale-down 0.5s cubic-bezier(0.25, 0, 0.3, 1) forwards;
        animation-timing-function: var(--ease-squish-3);
      }

      @media (prefers-color-scheme: dark) {
        border: 0;
        border-block-start: var(--border-size-1) solid var(--surface-3);
      }

      @media (max-width: 767.98px) {
        :host([modal-mode="mega"]) & {
          margin-block-end: 0;
          border-end-end-radius: 0;
          border-end-start-radius: 0;

          @media (prefers-reduced-motion: no-preference) {
            animation: slide-out-down 0.5s cubic-bezier(0.25, 0, 0.3, 1) forwards;
            animation-timing-function: var(--ease-squish-2);
          }
        }

        :host([modal-mode="mega"]) &[open] {
          @media (prefers-reduced-motion: no-preference) {
            animation: var(--animation-slide-in-up) forwards;
          }
        }
      }

      &:not([open]) {
        pointer-events: none;
        opacity: 0;
      }

      :host([modal-mode="mega"]) &::backdrop {
        backdrop-filter: blur(25px);
      }

      :host([modal-mode="mini"]) &::backdrop {
        backdrop-filter: none;
      }

      &::backdrop {
        transition: backdrop-filter 0.5s ease;
      }

      &[loading] {
        visibility: hidden;
      }

      &[open] {
        @media (prefers-reduced-motion: no-preference) {
          animation: var(--animation-slide-in-up) forwards;
        }
      }
    }

    @keyframes slide-in-up {
      from {
        transform: translateY(100%);
      }
    }
    @keyframes scale-down {
      to {
        transform: scale(0.75);
      }
    }
    @keyframes slide-out-down {
      to {
        transform: translateY(100%);
      }
    }
  `;

  override render() {
    return html`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-master": DialogMaster;
  }

  namespace JSX {
    interface IntrinsicElements {
      "dialog-master":
        | React.DetailedHTMLProps<
          React.HTMLAttributes<DialogMaster>,
          DialogMaster
        >
        | Partial<DialogMaster>;
    }
  }
}

export default DialogMaster;
