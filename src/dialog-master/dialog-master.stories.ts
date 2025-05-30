import { html } from "lit";
import { type Meta, type StoryObj } from "@storybook/web-components";
import DialogMaster from "./dialog-master.ts";
import type { Component } from "../types/storybook.ts";
import "./dialog-master.stories.css";

const StoryContainer = (story: Component) => {
  return html`
    <div class="dialog-master-story-container">
      ${story()}
    </div>
  `;
};

const meta: Meta = {
  title: "Components/DialogMaster",
  component: "dialog-master",
  render: (args) =>
    html`
      <dialog-master>
        ${args.content}
      </dialog-master>
    `,
  argTypes: {
    content: {
      control: "text",
      description: "Content inside the dialog",
    },
  },
  decorators: [StoryContainer],
};

export default meta;
type Story = StoryObj;

export const Mini: Story = {
  args: {},
  render: () => {
    const show = (e: Event) => {
      const button = e.target as HTMLButtonElement;
      const dialog = button.parentElement?.querySelector(
        "dialog-master",
      ) as unknown as DialogMaster;
      dialog.show();
    };

    const hide = () => {
      const dialog = document.querySelector("dialog-master") as unknown as DialogMaster;
      if (dialog) {
        dialog.hide();
      }
    };

    const remove = () => {
      const dialog = document.querySelector("dialog-master") as unknown as DialogMaster;
      if (dialog) {
        dialog.remove();
      }
    };

    const handleOpening = (event: Event) => {
      console.log("Dialog opening", event);
    };

    const handleOpened = (event: Event) => {
      console.log("Dialog opened", event);
    };

    const handleClosing = (event: Event) => {
      console.log("Dialog closing", event);
    };

    const handleClosed = (event: Event) => {
      console.log("Dialog closed", event);
    };

    const handleRemoved = (event: Event) => {
      console.log("Dialog removed", event);
      const removeButton = document.querySelector('.remove-btn');
      if (!removeButton) return;
      removeButton.remove();
      const openButton = document.querySelector('.open-btn');
      if (!openButton) return;
      openButton.remove();
    };

    return html`
      <div>
        <button class="open-btn" @click="${show}">Open Dialog</button>
        <button class="remove-btn" @click="${remove}">Remove Dialog</button>

        <dialog-master
          @opening="${handleOpening}"
          @opened="${handleOpened}"
          @closing="${handleClosing}"
          @closed="${handleClosed}"
          @removed="${handleRemoved}"
        >
          <form method="dialog">
            <article>
              <section class="warning-message">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                  <title>A warning icon</title>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z">
                  </path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <p>Are you sure you want to remove this user?</p>
              </section>
            </article>
            <footer>
              <menu>
                <button
                  autofocus
                  type="button"
                  @click="${hide}"
                >
                  Cancel
                </button>
                <button type="submit" value="confirm">Confirm</button>
              </menu>
            </footer>
          </form>
        </dialog-master>
      </div>
    `;
  },
};
export const Mega: Story = {
  args: {},
  render: () => {
    const show = (e: Event) => {
      const button = e.target as HTMLButtonElement;
      const dialog = button.parentElement?.querySelector(
        "dialog-master",
      ) as unknown as DialogMaster;
      if (dialog) {
        dialog.show();
      }
    };

    const hide = () => {
      const dialog = document.querySelector("dialog-master") as unknown as DialogMaster;
      if (dialog) {
        dialog.hide();
      }
    };

    return html`
      <div>
        <button @click="${show}">Open Dialog</button>

        <dialog-master id="MegaDialog" inert loading modal-mode="mega">
          <form method="dialog">
            <header>
              <section class="icon-headline">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                <h3>New User</h3>
              </section>
              <button
                @click="${hide}"
                type="button"
                title="Close dialog"
              >
                <title>Close dialog icon</title>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <article>
              <section class="labelled-input" />
                <label for="userimage">Upload an image</label>
                <input id="userimage" name="userimage" type="file" />
              </section>
              <small><b>*</b> Maximum upload 1mb</small>
            </article>
            <footer>
              <menu>
                <button type="reset" value="clear">Clear</button>
              </menu>
              <menu>
                <button
                  autofocus
                  type="button"
                  @click="${hide}"
                >
                  Cancel
                </button>
                <button type="submit" value="confirm">Confirm</button>
              </menu>
            </footer>
          </form>
        </dialog-master>
      </div>
    `;
  },
};
