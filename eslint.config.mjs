import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    rules: {
    "no-console": "warn",
    "eqeqeq": ["error", "always"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    }, 
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);