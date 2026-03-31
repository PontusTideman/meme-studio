import {
  importsConfig,
  nextConfig,
  prettierConfig,
  typescriptConfig,
} from "@viclafouch/eslint-config-viclafouch";

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/styled-system/**",
      "eslint.config.mjs",
    ],
  },
  ...typescriptConfig,
  ...nextConfig,
  ...importsConfig,
  ...prettierConfig,
  {
    rules: {
      "unicorn/filename-case": "off",
      "react-hooks/exhaustive-deps": [
        "error",
        {
          additionalHooks: "useIsomorphicLayoutEffect",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message: "Please use i18n Link from @i18n/navigation",
            },
            {
              name: "next/navigation",
              importNames: ["redirect"],
              message: "Please use redirect function from @i18n/navigation",
            },
          ],
        },
      ],
    },
  },
];
