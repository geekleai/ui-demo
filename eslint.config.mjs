import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import html from "eslint-plugin-html";
import htmlEslint from "@html-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "no-unexpected-multiline": "error",
      "no-multiple-empty-lines": ["error", {
        max: 1,
        maxEOF: 1
      }],
      "@typescript-eslint/naming-convention": ["error", {
        selector: ["property", "parameterProperty", "parameter"],
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "require"
      }, {
        selector: "typeParameter",
        format: ["PascalCase"],
        prefix: ["T"]
      }],
      quotes: ["error", "double", {
        allowTemplateLiterals: true
      }],
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "ComponentType"
      }],
      "@typescript-eslint/explicit-function-return-type": "error",
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [
            ["^@angular", "^@nestjs", "^@"],
            ["^[a-z]"],
            ["^~"],
            ["^\\."]
          ]
        }
      ]
    }
  },
  {
    files: ["**/*.html"],
    plugins: {
      html,
      "@html-eslint": htmlEslint,
    },
    rules: {
    },
  }
];
