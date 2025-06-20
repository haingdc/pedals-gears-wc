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

export const Multiple: Story = {
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <h3>Synchronized Timer Sessions</h3>
        <p>All timers below should show the same time and update synchronously:</p>
        <timer-session id="timer-session-1"></timer-session>
        <timer-session id="timer-session-2"></timer-session>
        <timer-session id="timer-session-3"></timer-session>
        <timer-session id="timer-session-4"></timer-session>
        <timer-session id="timer-session-5"></timer-session>
      </div>
    `;
  },
};
