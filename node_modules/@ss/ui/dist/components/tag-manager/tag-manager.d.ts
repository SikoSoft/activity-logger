import { LitElement, PropertyValues } from 'lit';
import './tag-input/tag-input';
import './tag-list/tag-list';
import { TagManagerProp, TagManagerProps } from './tag-manager.models';
export declare class TagManager extends LitElement {
    static styles: import("lit").CSSResult[];
    [TagManagerProp.VALUE]: TagManagerProps[TagManagerProp.VALUE];
    [TagManagerProp.ENABLE_SUGGESTIONS]: TagManagerProps[TagManagerProp.ENABLE_SUGGESTIONS];
    tags: string[];
    suggestions: string[];
    connectedCallback(): void;
    private setupTagsMutationObserver;
    private setupSuggestionsMutationObserver;
    firstUpdated(_changedProperties: PropertyValues): Promise<void>;
    private syncSlotTags;
    private syncSlotSuggestions;
    private handleTagAdded;
    private handleDeleted;
    private handleInputUpdated;
    private handleSuggestionsUpdated;
    private sendUpdatedEvent;
    render(): import("lit-html").TemplateResult<1>;
}
