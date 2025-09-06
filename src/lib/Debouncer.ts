export class Debouncer {
  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(private wait: number = 300) {}

  debounce<T extends (...args: any[]) => any>(
    func: T,
    ...args: Parameters<T>
  ): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.timerId = setTimeout(() => {
      func(...args);
      this.timerId = null;
    }, this.wait);
  }

  cancel(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
