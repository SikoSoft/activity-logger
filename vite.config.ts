import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: 'APP_',
  plugins: [tsconfigPaths()],
});
