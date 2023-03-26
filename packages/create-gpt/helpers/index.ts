import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import path from "path";
import { installerMap } from "../installers";
import { createPrompts } from "./prompts";

const commander = new Command();

const setupCommander = (): Command => {
  return commander
    .name("create-gpt")
    .version("0.1.0")
    .description(
      "Create a GPT stack app with Next.js and a serverless deployment script"
    )
    .parse(process.argv);
}

export async function runCli(): Promise<void> {
  const command = setupCommander();
  const answers = await createPrompts();
  console.log(chalk`{green Creating directory '${answers.stackName}'...}`);
  const appDir = answers.stackName;
  console.log(
    chalk`{green Creating Next.js app in directory '${answers.nextJSDir}'...}`
  );
  const spinner = ora({
    text: "Creating Next.js app...",
    color: "green",
  }).start();

  await execa('npx', ['create-next-app', appDir, '--ts']);
  const projectDir = path.resolve(process.cwd(), appDir);
  // await execa(`mkdir`, [appDir]);
  // await execa('npm', ['init', '-y'], {
  //   cwd: `./${appDir}`,
  // });

  Object.values(installerMap).forEach(async (installer) => {
    await installer.install(projectDir);
  });
  // await cloneGitRepo(GIT_REPO, appDir);
  // await execa(`npx rimraf ./bin`);
  spinner.succeed("Next.js app created!");

  // If using Next.js, create a new app with create-next-app
  // if (answers.useNextJS) {
  //     console.log(chalk`{green Creating Next.js app in directory '${answers.nextJSDir}'...}`);
  //     const spinner = ora({ text: 'Creating Next.js app...', color: 'green' }).start();
  //     await execa('npx', ['create-next-app', answers.nextJSDir], { cwd: appDir });
  //     spinner.succeed('Next.js app created!');
  // }
}
