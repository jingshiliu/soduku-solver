// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    tailwindConfig: "./tailwind.config.js",
    plugins: ["prettier-plugin-tailwindcss"],
};
