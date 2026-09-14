import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";
const html = await readFile("dist/index.html", "utf8");
await writeFile("dist/index.html", html.replace("<!--app-html-->", render()));
console.log(
  "Landing prerenderizada: contenido disponible antes de cargar JavaScript.",
);
