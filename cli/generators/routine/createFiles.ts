import fs from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const RoutinesPath = "routine";

const indexFile = path.join(RoutinesPath, "index.tsx");

async function addModalFileToIndex(name: string) {
  const content = fs.readFileSync(indexFile, "utf-8");

  const fullImportPath = `./${name}`;

  const importStatement = `import { ${name}Routine } from '${fullImportPath}';`;

  const jsxStatement = `<${name}Routine />`;

  const lastImportLine = content.match(/import.*;/g)?.pop();

  let newContent;
  if (!lastImportLine) {
    // If no import statement is found, add after the first line
    const firstLineEnd = content.indexOf("\n") + 1;
    newContent =
      content.slice(0, firstLineEnd) +
      importStatement +
      "\n" +
      content.slice(firstLineEnd);
  } else {
    newContent = content.replace(
      lastImportLine,
      `${lastImportLine}\n${importStatement}`
    );
  }

  const jsxClosingTag = "</>";

  const closingTagIndex = newContent.lastIndexOf(jsxClosingTag);

  if (closingTagIndex === -1) return;

  const newJsxContent =
    newContent.slice(0, closingTagIndex) +
    jsxStatement +
    newContent.slice(closingTagIndex);

  const formatedFile = await prettier.format(newJsxContent, {
    parser: "typescript",
    singleQuote: true,
  });

  fs.writeFileSync(indexFile, formatedFile);
}

export function createRoutineFiles(name: string) {
  const templatesDir = path.resolve(__dirname, "templates");

  const newFolderName = `${name}`;

  const fullPath = RoutinesPath;

  const outputDir = path.join(fullPath, newFolderName);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const templates = ["index.tsx.txt"];

  templates.forEach((template) => {
    const templatePath = path.join(templatesDir, template);
    const outputPath = path.join(outputDir, template.replace(".txt", ""));

    let content = fs.readFileSync(templatePath, "utf-8");
    content = content.replace(/{{NAME}}/g, name);

    fs.writeFileSync(outputPath, content);
  });

  addModalFileToIndex(name);
}
