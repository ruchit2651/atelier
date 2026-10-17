import { copyFileSync } from "node:fs";

// GitHub Pages serves this file for unknown paths. Reusing the Vite-built
// entry point lets React Router resolve direct visits such as /atelier/admin.
copyFileSync("dist/index.html", "dist/404.html");
