import { v4 as uuidv4 } from 'uuid';
import { action, makeObservable, observable } from 'mobx';
import { Toast } from './models/Toast';

export class AppState {
  @observable
  public suggestions: string[] = [];
  @observable
  public toasts: Toast[] = [];

  @action
  public setAutoSuggestions(suggestions: string[]) {
    this.suggestions = suggestions;
  }

  @action
  public addToast(message: string) {
    const id = uuidv4();
    const startTime = new Date();
    this.toasts.push({
      id,
      message,
      startTime,
    });
    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  }

  @action removeToast(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  constructor() {
    makeObservable(this);
  }
}

export const appState = new AppState();
