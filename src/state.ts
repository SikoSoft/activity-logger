import { action, makeObservable, observable } from 'mobx';

export class AppState {
  @observable
  public suggestions: string[] = [];

  @action
  public setAutoSuggestions(suggestions: string[]) {
    this.suggestions = suggestions;
  }

  constructor() {
    makeObservable(this);
  }
}

export const appState = new AppState();
