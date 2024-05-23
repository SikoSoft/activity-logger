import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import rollupAlias from '@rollup/plugin-alias';
import 'dotenv/config';
const replace = fromRollup(rollupReplace);
const json = fromRollup(rollupJson);
const alias = fromRollup(rollupAlias);
import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

process.env.NODE_ENV = 'development';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

const safeEnv = {};
[...Object.keys(process.env), 'NODE_ENV'].forEach(key => {
  safeEnv[`process.env.${key}`] = `"${process.env[key]}"`;
});

console.log('safeEnv', safeEnv);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/',
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  appIndex: './index.html',

  plugins: [
    replace({ ...safeEnv }),
    alias({
      entries: [
        {
          find: /^@\//,
          replacement: './',
        },
      ],
    }),
    json(),

    //replace({ include: ['src/**/*.js'], __environment__: '"development"' }),
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    hmr &&
      hmrPlugin({
        exclude: ['**/*/node_modules/**/*'],
        presets: [presets.litElement],
      }),
  ],

  // See documentation for all available options
});
