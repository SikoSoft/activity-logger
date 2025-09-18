var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { theme } from '../../../styles/theme';
import { TagListProp, tagListProps } from './tag-list.models';
import { TagDeletedEvent } from './tag-list.events';
let TagList = class TagList extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = tagListProps[TagListProp.TAGS].default;
    }
    static { _a = TagListProp.TAGS; }
    static { this.styles = [
        theme,
        css `
      .tag-list {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        display: flex;
        flex-wrap: wrap;
      }

      .tag-list li {
        display: inline-block;
        padding: 0.25rem;
        border-radius: 0.125rem;
        border: 1px #ccc solid;
        background-color: #efefef;
        position: relative;
      }

      .tag-list li .delete {
        display: inline-block;
        background-color: var(--negative-color);
        border-radius: 0.25rem;
        border: 1px rgba(255, 255, 255, 0.5) outset;
        padding: 0.25rem;
        color: #fff;
        font-size: 1.5rem;
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        cursor: pointer;
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
    }
    deleteTag(tag) {
        this.dispatchEvent(new TagDeletedEvent({ tag }));
    }
    render() {
        return html `
      <ul class="tag-list" part="list">
        ${repeat(this.tags, tag => tag, tag => html `
            <li part="item">
              ${tag}
              <span
                part="delete"
                class="delete"
                @click=${() => {
            this.deleteTag(tag);
        }}
                >&#215;</span
              >
            </li>
          `)}
      </ul>
    `;
    }
};
__decorate([
    property({ type: Array })
], TagList.prototype, _a, void 0);
TagList = __decorate([
    customElement('tag-list')
], TagList);
export { TagList };
//# sourceMappingURL=tag-list.js.map