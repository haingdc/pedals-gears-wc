import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./counter.ts";

interface CounterProps {
  funcInReactComponent?: () => void;
  count?: number;
}

type Story = StoryObj<CounterProps>;

const meta: Meta<CounterProps> = {
  title: "Components/Counter",
  component: "lit-counter",
};

export default meta;

export const Default: Story = {
  args: {
    count: 101,
  },
  render: (args) => {
    const myButton = document.createElement("lit-counter");
    myButton.count = args.count;
    myButton.funcInReactComponent = () => {
      myButton.count += 1;
    };
    return myButton;
  },
};
