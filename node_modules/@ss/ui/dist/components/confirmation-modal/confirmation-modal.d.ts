import { LitElement } from 'lit';
import { ConfirmationModalProp, ConfirmationModalProps } from './confirmation-modal.models';
import '../pop-up/pop-up';
import '../ss-button/ss-button';
export declare class ConfirmationModal extends LitElement {
    static styles: import("lit").CSSResult[];
    [ConfirmationModalProp.OPEN]: ConfirmationModalProps[ConfirmationModalProp.OPEN];
    [ConfirmationModalProp.MESSAGE]: ConfirmationModalProps[ConfirmationModalProp.MESSAGE];
    [ConfirmationModalProp.ACCEPT_TEXT]: ConfirmationModalProps[ConfirmationModalProp.ACCEPT_TEXT];
    [ConfirmationModalProp.DECLINE_TEXT]: ConfirmationModalProps[ConfirmationModalProp.DECLINE_TEXT];
    newlyOpened: boolean;
    get classes(): {
        'confirmation-modal': boolean;
        open: boolean;
    };
    accept(): void;
    decline(): void;
    close(): void;
    render(): import("lit-html").TemplateResult<1>;
}
