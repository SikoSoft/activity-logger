import { LitElement } from 'lit';
import { SSLoaderProp, SSLoaderProps } from './ss-loader.models';
export declare class SSLoader extends LitElement {
    static styles: import("lit").CSSResult;
    [SSLoaderProp.PADDED]: SSLoaderProps[SSLoaderProp.PADDED];
    get classes(): {
        container: boolean;
        padded: boolean;
    };
    render(): import("lit-html").TemplateResult<1>;
}
