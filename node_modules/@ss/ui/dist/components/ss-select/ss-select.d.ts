import { LitElement } from 'lit';
import { SSSelectProp, SSSelectProps } from './ss-select.models';
export declare class SSSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    [SSSelectProp.OPTIONS]: SSSelectProps[SSSelectProp.OPTIONS];
    [SSSelectProp.SELECTED]: SSSelectProps[SSSelectProp.SELECTED];
    selectNode: HTMLSelectElement;
    get value(): string;
    private handleSelectChanged;
    render(): import("lit-html").TemplateResult<1>;
}
