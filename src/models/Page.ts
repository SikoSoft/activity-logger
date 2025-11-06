export enum PageView {
  INPUT = 'input',
  LIST = 'list',
  MOCK = 'mock',
  ADMIN = 'admin',
  ENTITY_CONFIG_LIST = 'entityConfigList',
}

export const defaultPageView: PageView = PageView.INPUT;

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
export const defaultTheme: Theme = Theme.LIGHT;
