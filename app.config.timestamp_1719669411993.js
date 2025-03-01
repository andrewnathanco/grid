// app.config.ts
import { defineConfig } from "@solidjs/start/config";
var app_config_default = defineConfig({
  server: {
    baseURL: process.env.BASE_PATH || "/"
  },
  ssr: false
});
export {
  app_config_default as default
};
