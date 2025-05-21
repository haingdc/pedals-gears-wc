import { LitElement } from "lit";
declare class Counter extends LitElement {
    count: number;
    funcInReactComponent: () => void;
    connectedCallback(): void;
    handleClick(): void;
    createRenderRoot(): this;
    render(): import("lit").TemplateResult<1>;
}
export default Counter;
