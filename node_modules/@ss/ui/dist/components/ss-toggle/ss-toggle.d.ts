import { LitElement } from 'lit';
import { SSToggleProp, SSToggleProps } from './ss-toggle.models';
export declare class SSToggle extends LitElement {
    static styles: import("lit").CSSResult;
    [SSToggleProp.ON]: SSToggleProps[SSToggleProp.ON];
    [SSToggleProp.HIGHLIGHT_TIME]: SSToggleProps[SSToggleProp.HIGHLIGHT_TIME];
    highlight: boolean;
    get classes(): {
        toggle: boolean;
        on: boolean;
        highlight: boolean;
    };
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
