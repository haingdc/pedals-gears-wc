import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
  ],
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  framework: {
    name: "@storybook/web-components-vite",
    options: {
      // ...
    },
  },
  staticDirs: [
    // "../public",
    // { from: '../public', to: '/assets' }
  ],
};
export default config;
