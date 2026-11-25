import process from "node:process";

import { coralFmt } from "@get-coral/oxfmt-config";
import { coralReactLint } from "@get-coral/oxlint-config";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

// Tests render components with React alone, without the TanStack Start plugin
// (SSR, prerender) and the devtools.
const isTest = process.env.VITEST === "true";

export default defineConfig({
	plugins: lazyPlugins(() =>
		isTest ? [viteReact()] : [devtools(), tailwindcss(), tanstackStart(), viteReact()],
	),
	test: {
		environment: "jsdom",
		globals: true,
		include: ["src/**/*.test.{ts,tsx}"],
	},
	lint: {
		extends: [coralReactLint],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		overrides: [{ files: ["server.mjs"], rules: { "no-console": "off" } }],
		options: { typeAware: true, typeCheck: true },
	},
	fmt: {
		...coralFmt,
		ignorePatterns: [
			"src/routeTree.gen.ts",
			"src/styles.css",
			"CHANGELOG.md",
			".release-please-manifest.json",
			"release-please-config.json",
		],
	},
});
