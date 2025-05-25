import { LitElement } from "lit";
import "./count-display.ts";
declare class CountDown extends LitElement {
    static styles: import("lit").CSSResult;
    static properties: {
        name: {
            type: StringConstructor;
        };
        count: {
            type: NumberConstructor;
        };
    };
    name: string;
    count: number;
    constructor();
    private handleClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "count-down": CountDown;
    }
    namespace JSX {
        interface IntrinsicElements {
            "count-down": React.DetailedHTMLProps<React.HTMLAttributes<CountDown>, CountDown> | Partial<CountDown>;
        }
    }
}
export default CountDown;
