import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// A dedicated vitest config so the full TanStack Start plugin (SSR, prerender)
// from vite.config.ts doesn't load during tests. jsdom + the React plugin let
// you render components with @testing-library/react.
export default defineConfig({
	plugins: [tsconfigPaths({ projects: ["./tsconfig.json"] }), react()],
	test: {
		environment: "jsdom",
		globals: true,
		include: ["src/**/*.test.{ts,tsx}"],
	},
});
