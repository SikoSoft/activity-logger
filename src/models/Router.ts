export type Route = {
  path: string;
  component?: string;
  action?: () => Promise<any>;
  redirect?: string;
};

export type Router = {
  navigate: (to: string) => void;
  renderPath: (path: string) => Promise<void>;
  destroy: () => void;
};
