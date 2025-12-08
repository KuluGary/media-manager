import antfu from "@antfu/eslint-config";

export default antfu(
    {
        type: "app",
        typescript: true,
        formatters: true,
        stylistic: {
            semi: true,
            quotes: "double",
            allowIndentationTabs: true,
        },
        ignores: ["**/migrations/*"],
    },
    {
        rules: {
            "no-console": ["warn"],
            "antfu/no-top-level-await": ["off"],
            "node/prefer-global/process": ["off"],
            "node/no-process-env": ["error"],
            "no-tabs": 0,
            "perfectionist/sort-imports": [
                "error",
                {
                    tsconfigRootDir: ".",
                },
            ],
            "unicorn/filename-case": [
                "error",
                {
                    case: "kebabCase",
                    ignore: ["README.md"],
                },
            ],
        },
    },
);
