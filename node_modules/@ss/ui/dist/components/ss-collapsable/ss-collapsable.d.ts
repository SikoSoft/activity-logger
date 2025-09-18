import { LitElement, PropertyValues } from 'lit';
import { SSCollapsableProp, SSCollapsableProps } from './ss-collapsable.models';
export declare class SSCollapsable extends LitElement {
    static styles: import("lit").CSSResult[];
    [SSCollapsableProp.TITLE]: SSCollapsableProps[SSCollapsableProp.TITLE];
    [SSCollapsableProp.OPEN]: SSCollapsableProps[SSCollapsableProp.OPEN];
    [SSCollapsableProp.PANEL_ID]: SSCollapsableProps[SSCollapsableProp.PANEL_ID];
    protected firstUpdated(changedProperties: PropertyValues): void;
    get classes(): {
        box: boolean;
        collapsable: boolean;
        open: boolean;
    };
    private handleIconClick;
    private toggle;
    render(): import("lit-html").TemplateResult<1>;
}
