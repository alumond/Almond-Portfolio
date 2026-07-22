import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("out", "dist", { recursive: true });
await cp("out/_next/static/chunks/app/work/[slug]", "dist/_next/static/chunks/app/work/%5Bslug%5D", { recursive: true });
await writeFile(
  "dist/manifest.json",
  JSON.stringify({ framework: "nextjs-static", entry: "index.html" }, null, 2),
);
