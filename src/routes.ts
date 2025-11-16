import { Route } from './models/Router';

export const routes: Route[] = [
  {
    path: '/',
    redirect: undefined,
    component: 'action-list',
    action: async () => await import('@/components/action-list/action-list'),
  },
  {
    path: '/entities',
    component: 'entity-list',
    action: async () => await import('@/components/entity-list/entity-list'),
  },
  {
    path: '/entity/:id',
    component: 'entity-form',
    action: async () => await import('@/components/entity-form/entity-form'),
  },
  {
    path: '/login',
    component: 'login-form',
    action: async () => await import('@/components/login-form/login-form'),
  },
  {
    path: '/account',
    component: 'account-form',
    action: async () => await import('@/components/account-form/account-form'),
  },
];
