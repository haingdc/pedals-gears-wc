import { LitElement } from "lit";
export declare class LitButton extends LitElement {
    variant: string;
    size: string;
    disabled: boolean;
    type: "button" | "submit" | "reset" | "menu";
    icon: string;
    constructor();
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    renderIcon(): "" | import("lit").TemplateResult<1>;
}
