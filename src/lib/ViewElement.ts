import { ViewReadyEvent } from '@/components/app-container/app-container.events';
import { MobxLitElement } from '@adobe/lit-mobx';

export class ViewElement extends MobxLitElement {
  private _ready = false;

  set ready(value: boolean) {
    if (this._ready !== value) {
      this.dispatchEvent(new ViewReadyEvent({}));
      this._ready = value;
    }
  }

  get ready(): boolean {
    return this._ready;
  }

  sync(_reset = false): void {}
}
