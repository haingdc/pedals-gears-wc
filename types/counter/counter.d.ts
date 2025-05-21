import { LitElement } from "lit";
declare class Counter extends LitElement {
    count: number;
    funcInReactComponent: () => void;
    static properties: {
        funcInReactComponent: {
            type: FunctionConstructor;
            attribute: boolean;
        };
    };
    connectedCallback(): void;
    handleClick(): void;
    createRenderRoot(): this;
    render(): import("lit").TemplateResult<1>;
}
export default Counter;
