import { v4 as uuidv4 } from 'uuid';
import { action, makeObservable, observable } from 'mobx';
import { Toast } from './models/Toast';

export class AppState {
  @observable
  public suggestions: string[] = [];

  @observable
  public toasts: Toast[] = [];

  @observable
  public loading: boolean = false;

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

  @action
  removeToast(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  @action
  setLoading(state: boolean) {
    this.loading = state;
  }

  constructor() {
    makeObservable(this);
  }
}

export const appState = new AppState();
