import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./lit-button.ts";

interface LitButtonProps {
  variant?: "default" | "custom";
  size?: "normal" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: string;
  slot?: string;
}

type Story = StoryObj<LitButtonProps>;

const meta: Meta<LitButtonProps> = {
  title: "Components/LitButton",
  component: "lit-button",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "custom"],
      description: "Button style variant",
    },
    size: {
      control: { type: "select" },
      options: ["normal", "large"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Button type attribute",
    },
    icon: {
      control: "text",
      description: "Icon to display (if any)",
    },
    slot: {
      control: "text",
      description: "Button label content",
    },
  },
  args: {
    variant: "default",
    size: "normal",
    disabled: false,
    type: "button",
    icon: "",
    slot: "Button",
  },
  render: (args) =>
    html`
      <lit-button
        variant="${ifDefined(args.variant)}"
        size="${ifDefined(args.size)}"
        ?disabled="${args.disabled}"
        type="${ifDefined(args.type)}"
        icon="${ifDefined(args.icon)}"
      >
        ${args.slot}
      </lit-button>
    `,
};

export default meta;

export const Default: Story = {
  args: {
    slot: "Default Button",
  },
};

export const Custom: Story = {
  args: {
    slot: "Custom Button",
    variant: "custom",
  },
};

export const Large: Story = {
  args: {
    slot: "Large Button",
    size: "large",
  },
};

export const WithIcon: Story = {
  args: {
    slot: "Cloud Button",
    icon: "cloud",
  },
};

export const Disabled: Story = {
  args: {
    slot: "Disabled Button",
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    slot: "Submit",
    type: "submit",
  },
};
