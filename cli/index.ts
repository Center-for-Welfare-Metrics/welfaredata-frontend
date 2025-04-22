import { Command } from "commander";
import { createModalFiles } from "./generators/modals/createFiles";
import { CreateModalOptions } from "./generators/modals/options";
import { createRoutineFiles } from "./generators/routine/createFiles";

const program = new Command();

program
  .name("Welfare CLI")
  .description("CLI for generating React components and other resources")
  .version("0.0.1");

program
  .command("createModal <name>")
  .option("-f, --foldersNest <foldersNest...>", "Folders nest")
  .description("Create a new modal")
  .action((name, options: CreateModalOptions) => {
    createModalFiles(name, options);
  });

program
  .command("createRoutine <name>")
  .description("Create a new routine")
  .action((name) => {
    createRoutineFiles(name);
  });

program.parse().exitOverride(() => {
  process.exit(0);
});
