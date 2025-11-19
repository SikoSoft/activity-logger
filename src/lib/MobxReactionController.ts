import { ReactiveController, ReactiveControllerHost } from 'lit';
import { reaction, IReactionDisposer } from 'mobx';

type ReactionSpec<T = any> = {
  expr: () => T;
  effect: (value: T, oldValue: T | undefined) => void;
  opts?: { fireImmediately?: boolean };
};

type PendingSpec = ReactionSpec & { cancelled?: boolean };

export class MobxReactionsController implements ReactiveController {
  private disposers: IReactionDisposer[] = [];
  private pending: PendingSpec[] = [];
  private connected = false;

  constructor(private host: ReactiveControllerHost) {
    host.addController(this);
  }

  add<T>(spec: ReactionSpec<T>): IReactionDisposer {
    if (!this.connected) {
      const p: PendingSpec = { ...spec, cancelled: false };
      this.pending.push(p);

      // Return a cancellable noop disposer for the pending spec.
      // Cast to IReactionDisposer to satisfy MobX typing (symbol property).
      const disposer: IReactionDisposer = (() => {
        p.cancelled = true;
      }) as unknown as IReactionDisposer;

      return disposer;
    }

    const d = reaction(spec.expr, spec.effect, spec.opts);
    this.disposers.push(d);
    return d;
  }

  hostConnected(): void {
    this.connected = true;
    for (const s of this.pending) {
      if (s.cancelled) continue;
      const d = reaction(s.expr, s.effect, s.opts);
      this.disposers.push(d);
    }
    this.pending = [];
  }

  hostDisconnected(): void {
    while (this.disposers.length) {
      const d = this.disposers.pop()!;
      try {
        d();
      } catch {
        console.warn('[MobxReactionsController] disposer threw an error');
      }
    }
    this.connected = false;
  }
}
