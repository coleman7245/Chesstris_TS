import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{
		files: ["**/*.{js,ts}"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);