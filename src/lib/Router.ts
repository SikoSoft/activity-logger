export type RouteDef = {
  path: string; // e.g. '/entity/:id' or '/login' or '(.*)'
  component?: string; // tag name, e.g. 'entity-form' (optional for redirect-only routes)
  action?: () => Promise<any>; // dynamic import or async setup; returns any
  redirect?: string; // optional redirect target
};

function pathToRegex(path: string) {
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

// exported navigate proxy; bound to the active router instance by setupRouter()
// before setupRouter runs this will warn if used.
let _navigate: (to: string) => void = (to: string) => {
  console.warn('[router] navigate() called before router initialized:', to);
};

/**
 * Call this from other modules to navigate the app.
 * After setupRouter runs this will be bound to the instance implementation.
 */
export function navigate(to: string): void {
  _navigate(to);
}

export function setupRouter(
  outlet: Element,
  routes: RouteDef[],
  base = import.meta.env.BASE_URL || '/',
) {
  const normalize = (p: string) => {
    try {
      const url = new URL(p, location.origin);
      let path = url.pathname;
      if (base !== '/' && path.startsWith(base)) path = path.slice(base.length);
      return path || '/';
    } catch {
      return p.replace(base, '') || '/';
    }
  };

  let mounted = true;

  async function renderPath(p: string) {
    if (!mounted) return;
    const path = normalize(p);

    // check for explicit redirect routes first
    for (const r of routes) {
      if (r.redirect && (r.path === path || (r.path === '/' && path === '/'))) {
        // push the redirect target and render it
        history.replaceState({}, '', r.redirect);
        return renderPath(r.redirect!);
      }
    }

    // normal route matching
    for (const r of routes) {
      if (r.path === '(.*)') continue; // wildcard -> handled later
      const { regex, keys } = pathToRegex(r.path);
      const m = path.match(regex);
      if (m) {
        if (r.action) await r.action();
        if (!r.component) return;
        outlet.innerHTML = '';
        const el = document.createElement(r.component);
        keys.forEach((k, i) => {
          const val = decodeURIComponent(m[i + 1] || '');
          el.setAttribute(k, val);
          try {
            (el as any)[k] = val;
          } catch {
            console.log(
              `Could not set property ${k} on component ${r.component}`,
            );
          }
        });
        outlet.appendChild(el);
        return;
      }
    }

    // fallback to wildcard
    const fallback = routes.find(rr => rr.path === '(.*)');
    if (fallback) {
      if (fallback.action) await fallback.action();
      if (!fallback.component) return;
      outlet.innerHTML = '';
      const el = document.createElement(fallback.component);
      outlet.appendChild(el);
    }
  }

  function navigateImpl(to: string) {
    const href = to.startsWith('/') ? to : '/' + to;
    history.pushState(
      {},
      '',
      (base === '/' ? '' : base.replace(/\/$/, '')) + href,
    );
    // fire-and-forget; renderPath is async
    void renderPath(location.pathname);
  }

  // bind exported proxy to the instance implementation
  _navigate = navigateImpl;

  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest(
      'a[href]',
    ) as HTMLAnchorElement | null;
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin === location.origin) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigateImpl(url.pathname + url.search + url.hash);
    }
  };

  const onPop = () => renderPath(location.pathname);

  window.addEventListener('popstate', onPop);
  document.addEventListener('click', onClick);

  // initial render
  void renderPath(location.pathname);

  return {
    navigate: navigateImpl,
    renderPath,
    destroy() {
      mounted = false;
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
      // restore proxy to noop to catch accidental post-destroy calls
      _navigate = (t: string) =>
        console.warn('[router] navigate() called after destroy:', t);
    },
  };
}
