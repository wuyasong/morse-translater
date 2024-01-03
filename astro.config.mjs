import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: [
      "en", // 英语
      "fr", // 法语
      "pt", // 葡萄牙语
      "es", // 西班牙语
      "de", // 德语
      "it", // 意大利语
      "pl", // 波兰语
    ],
    routing: {
      prefixDefaultLocale: false
    },
  },
  integrations: [tailwind()]
});