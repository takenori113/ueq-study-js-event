import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "__tests__",
    environment: "happy-dom",
    setupFiles: "./testSetup.ts",
  },
});
