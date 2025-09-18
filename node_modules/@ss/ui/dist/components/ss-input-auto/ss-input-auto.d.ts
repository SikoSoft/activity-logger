import { LitElement } from 'lit';
import { SSInputAutoProp, SSInputAutoProps } from './ss-input-auto.models';
export declare class SSInputAuto extends LitElement {
    static styles: import("lit").CSSResult[];
    [SSInputAutoProp.INPUT]: SSInputAutoProps[SSInputAutoProp.INPUT];
    [SSInputAutoProp.MIN_INPUT]: SSInputAutoProps[SSInputAutoProp.MIN_INPUT];
    [SSInputAutoProp.MAX_MATCHES]: SSInputAutoProps[SSInputAutoProp.MAX_MATCHES];
    [SSInputAutoProp.SUGGESTIONS]: SSInputAutoProps[SSInputAutoProp.SUGGESTIONS];
    selectedIndex: number;
    get show(): boolean;
    get maxSelectedIndex(): number;
    connectedCallback(): void;
    private adjustSelectedIndex;
    private sendSelectedEvent;
    private sendSubmitEvent;
    render(): import("lit-html").TemplateResult<1>;
}
