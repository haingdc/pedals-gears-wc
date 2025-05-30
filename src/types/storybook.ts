import { type WebComponentsRenderer } from "@storybook/web-components";
import type { PartialStoryFn } from "@storybook/types";

export type Component = PartialStoryFn<WebComponentsRenderer, {
  // deno-lint-ignore no-explicit-any
  [x: string]: any;
}>;
