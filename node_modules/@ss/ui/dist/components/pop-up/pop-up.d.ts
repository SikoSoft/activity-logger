import { LitElement, PropertyValues } from 'lit';
import { PopUpProp, PopUpProps } from './pop-up.models';
export declare class PopUp extends LitElement {
    static styles: import("lit").CSSResult[];
    [PopUpProp.OPEN]: PopUpProps[PopUpProp.OPEN];
    [PopUpProp.CLOSE_BUTTON]: PopUpProps[PopUpProp.CLOSE_BUTTON];
    [PopUpProp.CLOSE_ON_OUTSIDE_CLICK]: PopUpProps[PopUpProp.CLOSE_ON_OUTSIDE_CLICK];
    [PopUpProp.CLOSE_ON_ESC]: PopUpProps[PopUpProp.CLOSE_ON_ESC];
    newlyOpened: boolean;
    private container;
    get classes(): {
        'pop-up': boolean;
        open: boolean;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(_changedProperties: PropertyValues): void;
    private handleClickOutside;
    private handleKeyDown;
    render(): import("lit-html").TemplateResult<1>;
}
