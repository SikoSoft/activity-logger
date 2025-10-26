import { translate } from '@/lib/Localization';
import { appState } from '@/state';
import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-select';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import { addToast } from '@/lib/Util';
import { storage } from '@/lib/Storage';

@customElement('tactical-nuke')
export class TacticalNuke extends MobxLitElement {
  private state = appState;

  static styles = css`
    .export-tool {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .include-type-header,
    .include-type {
      display: flex;
      align-items: left;
      gap: 0.5rem;
    }

    .include-type {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  @state()
  nukeInProgress: boolean = false;

  get isPermitted(): boolean {
    return true;
  }

  async nukeIt(): Promise<void> {
    if (this.nukeInProgress) {
      return;
    }

    this.nukeInProgress = true;

    try {
      await storage.clearAllData();
      addToast(translate('nukeSuccess'), NotificationType.SUCCESS);
    } catch (error) {
      console.error('Error during tactical nuke:', error);
      addToast(translate('nukeFailure'), NotificationType.ERROR);
    } finally {
      this.nukeInProgress = false;
    }
  }

  render(): TemplateResult {
    return html`
      <div class="tactical-nuke">
        <ss-button
          ?disabled=${!this.isPermitted || this.nukeInProgress}
          @click=${this.nukeIt}
          >${translate('nukeIt')}</ss-button
        >
      </div>
    `;
  }
}
