import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        statistics: resolve(__dirname, "src/statistics.html"),
        faq: resolve(__dirname, "src/faq.html"),
        
      },
    },
  },
});
