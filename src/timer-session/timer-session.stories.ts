import { html } from "lit";
import { type Meta, type StoryObj } from "@storybook/web-components-vite";
import "./timer-session.ts";
import type { Component } from "../types/storybook.ts";

const StoryContainer = (story: Component) => {
  return html`
    <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
      ${story()}
    </div>
  `;
};

const meta: Meta = {
  title: "Components/TimerSession",
  component: "timer-session",
  render: () =>
    html`
      <timer-session></timer-session>
    `,
  decorators: [StoryContainer],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`
      <timer-session></timer-session>
    `,
};
