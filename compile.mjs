// Compile Typescript

import * as child_process from "child_process";
import * as fs from "fs";

child_process.execSync("npx tsc");

// Insert the excalidraw-utils.min.js definition into the file.
let mainJs = fs.readFileSync("dist/main.js", { encoding: "utf-8" });

const excalidrawUtils = fs.readFileSync("node_modules/@excalidraw/utils/dist/excalidraw-utils.min.js", { encoding: "utf-8" });
const cascadia = fs.readFileSync("src/Cascadia.woff2", { encoding: "base64" });
const virgil = fs.readFileSync("src/Virgil.woff2", { encoding: "base64" });

// Note we have to use a function as the second argument because when the JS
// people managed to finally add `.replaceAll()` they fucked it right up.
mainJs = mainJs.replace(/EXCALIDRAW_UTILS_SOURCE = ""/g, () => `EXCALIDRAW_UTILS_SOURCE = ${JSON.stringify(excalidrawUtils)}`);
mainJs = mainJs.replace(/CASCADIA_BASE64 = ""/g, () => `CASCADIA_BASE64 = ${JSON.stringify(cascadia)}`);
mainJs = mainJs.replace(/VIRGIL_BASE64 = ""/g, () => `VIRGIL_BASE64 = ${JSON.stringify(virgil)}`);

fs.writeFileSync("dist/main.js", mainJs, { encoding: "utf-8" });
