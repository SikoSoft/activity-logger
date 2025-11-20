import { Route, Router, RouterState } from '@/models/Router';
import { observable, action } from 'mobx';

export const routerState: RouterState = observable({ currentPath: '/' });
const setCurrentPath = action((path: string) => {
  routerState.currentPath = path;
});

function pathToRegex(path: string): { regex: RegExp; keys: string[] } {
  const keys: string[] = [];
  const pattern = path
    .replace(/\/+$/g, '') // strip trailing slash
    .replace(/:[^/]+/g, m => {
      keys.push(m.slice(1));
      return '([^/]+)';
    })
    .replace(/\//g, '\\/');
  return { regex: new RegExp('^' + (pattern || '/') + '/?$'), keys };
}

let _navigate: (to: string) => void = (to: string) => {
  console.warn('[router] navigate() called before router initialized:', to);
};

export function navigate(to: string): void {
  _navigate(to);
}

export function setupRouter(
  outlet: Element,
  routes: Route[],
  base = import.meta.env.BASE_URL || '/',
): Router {
  const normalize = (p: string): string => {
    const baseNormalized = (base || '/').replace(/\/$/, '') || '/';
    try {
      const url = new URL(p, location.origin);
      let path = url.pathname || '/';

      if (baseNormalized !== '/' && path.startsWith(baseNormalized)) {
        path = path.slice(baseNormalized.length) || '/';
      }

      if (!path.startsWith('/')) {
        path = '/' + path;
      }

      return path || '/';
    } catch {
      const escapedBase =
        baseNormalized === '/'
          ? '/'
          : baseNormalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const stripped = p.replace(new RegExp('^' + escapedBase), '') || '/';
      return stripped.startsWith('/') ? stripped : '/' + stripped;
    }
  };

  let mounted = true;

  async function renderPath(p: string): Promise<void> {
    if (!mounted) {
      return;
    }

    const path = normalize(p);

    setCurrentPath(path);

    // check for explicit redirect routes first
    for (const r of routes) {
      if (r.redirect && (r.path === path || (r.path === '/' && path === '/'))) {
        // push the redirect target and render it
        history.replaceState({}, '', r.redirect);
        return renderPath(r.redirect!);
      }
    }

    // normal route matching
    for (const route of routes) {
      if (route.path === '(.*)') {
        continue; // wildcard -> handled later
      }
      const { regex, keys } = pathToRegex(route.path);
      const routeMatch = path.match(regex);

      if (routeMatch) {
        if (route.action) {
          await route.action();
        }

        if (!route.component) {
          return;
        }

        outlet.innerHTML = '';
        const el = document.createElement(route.component);

        keys.forEach((k, i) => {
          const val = decodeURIComponent(routeMatch[i + 1] || '');
          el.setAttribute(k, val);
          try {
            (el as any)[k] = val;
          } catch {
            console.log(
              `Could not set property ${k} on component ${route.component}`,
            );
          }
        });
        outlet.appendChild(el);
        return;
      }
    }

    // fallback to wildcard
    const fallback = routes.find(route => route.path === '(.*)');
    if (fallback) {
      if (fallback.action) {
        await fallback.action();
      }

      if (!fallback.component) {
        return;
      }

      outlet.innerHTML = '';
      const el = document.createElement(fallback.component);
      outlet.appendChild(el);
    }
  }

  function navigateImpl(to: string): void {
    const href = to.startsWith('/') ? to : '/' + to;
    history.pushState(
      {},
      '',
      (base === '/' ? '' : base.replace(/\/$/, '')) + href,
    );
    // fire-and-forget; renderPath is async
    void renderPath(location.pathname);
  }

  _navigate = navigateImpl;

  const onClick = (e: MouseEvent): void => {
    const a = (e.target as HTMLElement).closest(
      'a[href]',
    ) as HTMLAnchorElement | null;
    if (!a) {
      return;
    }
    const url = new URL(a.href, location.href);
    if (url.origin === location.origin) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      e.preventDefault();
      navigateImpl(url.pathname + url.search + url.hash);
    }
  };

  const onPop = (): void => {
    console.log('[router] popstate:', location.pathname);
    void renderPath(location.pathname);
  };

  window.addEventListener('popstate', onPop);
  document.addEventListener('click', onClick);

  // initial render
  void renderPath(location.pathname);

  return {
    navigate: navigateImpl,
    renderPath,
    destroy(): void {
      mounted = false;
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
      // restore proxy to noop to catch accidental post-destroy calls
      _navigate = (t: string) =>
        console.warn('[router] navigate() called after destroy:', t);
    },
  };
}
