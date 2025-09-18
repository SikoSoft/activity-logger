import { LitElement } from 'lit';
import { TagListProp, TagListProps } from './tag-list.models';
export declare class TagList extends LitElement {
    static styles: import("lit").CSSResult[];
    [TagListProp.TAGS]: TagListProps[TagListProp.TAGS];
    connectedCallback(): void;
    private deleteTag;
    render(): import("lit-html").TemplateResult<1>;
}
