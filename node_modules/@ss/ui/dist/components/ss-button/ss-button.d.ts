import { LitElement } from 'lit';
import '../ss-loader/ss-loader';
import { SSButtonProp, SSButtonProps } from './ss-button.models';
export declare class SSButton extends LitElement {
    static styles: import("lit").CSSResult[];
    [SSButtonProp.TEXT]: SSButtonProps[SSButtonProp.TEXT];
    [SSButtonProp.DISABLED]: SSButtonProps[SSButtonProp.DISABLED];
    [SSButtonProp.LOADING]: SSButtonProps[SSButtonProp.LOADING];
    [SSButtonProp.POSITIVE]: SSButtonProps[SSButtonProp.POSITIVE];
    [SSButtonProp.NEGATIVE]: SSButtonProps[SSButtonProp.NEGATIVE];
    [SSButtonProp.CLASS]: SSButtonProps[SSButtonProp.CLASS];
    get classes(): Record<string, boolean>;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
