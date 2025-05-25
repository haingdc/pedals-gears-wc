import { LitElement } from 'lit';
export declare class CountDisplay extends LitElement {
    static properties: {
        count: {
            type: NumberConstructor;
        };
    };
    count: number;
    constructor();
    render(): import("lit").TemplateResult<1>;
}
