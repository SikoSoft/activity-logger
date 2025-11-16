import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { storage } from '@/lib/Storage';

@customElement('logged-out')
export class LoggedOut extends LitElement {
  private _stamped = false;
  private _authListener = () => {
    if (this.isLoggedOut()) {
      this._ensureStamped();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();

    // If already logged in, stamp immediately.
    if (this.isLoggedOut()) {
      this._ensureStamped();
      return;
    }

    // Otherwise wait for an explicit auth change signal.
    // The app should dispatch window.dispatchEvent(new CustomEvent('auth-changed'))
    // after login (or we can wire this to your appState/MobX reaction instead).
    window.addEventListener('auth-changed', this._authListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('auth-changed', this._authListener);
  }

  private _ensureStamped(): void {
    if (this._stamped) return;

    const tpl = this.querySelector('template');
    if (!tpl) {
      this._stamped = true;
      return;
    }

    const fragment = tpl.content.cloneNode(true) as DocumentFragment;

    // Insert the stamped content where this element lives, then remove this host.
    const parent = this.parentNode;
    if (parent) {
      parent.insertBefore(fragment, this);
      // remove the host so the stamped children occupy the same place in DOM
      this.remove();
    } else {
      // fallback to appending into this element if no parent found
      this.appendChild(fragment);
    }

    this._stamped = true;
    window.removeEventListener('auth-changed', this._authListener);
  }

  isLoggedOut(): boolean {
    return storage.getAuthToken() === '';
  }

  render(): TemplateResult | typeof nothing {
    // We don't render a slot, because slot children would be parsed/upgraded immediately.
    // Users must wrap guarded content in <template> inside <logged-in>.
    return nothing;
  }
}
