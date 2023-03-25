#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";

const commander = new Command();

const GIT_REPO = "https://github.com/1997roylee/create-t3-turbo.git";

interface Answers {
  stackName: string;
  prompt: string;
  useNextJS: boolean;
  nextJSDir: string;
  generateDeploymentScript: boolean;
  deploymentScriptName: string;
}

async function cloneGitRepo(repoUrl: string, cloneDir: string): Promise<void> {
  const args = ["clone", repoUrl, cloneDir];
  await execa("git", args);
}

async function createGPTStackApp(): Promise<void> {
  // Set up the command line interface
  commander
    .name("create-gpt")
    .version("0.1.0")
    .description(
      "Create a GPT stack app with Next.js and a serverless deployment script"
    )
    .parse(process.argv);

  // Prompt the user for input
  const answers = await inquirer.prompt<Answers>([
    {
      type: "input",
      name: "stackName",
      message: "Enter a name for your GPT stack:",
      validate: (value: string) => value.trim().length > 0,
    },
    {
      type: "input",
      name: "prompt",
      message: "Enter an input prompt for your GPT stack:",
      validate: (value: string) => value.trim().length > 0,
    },
    {
      type: "confirm",
      name: "useNextJS",
      message: "Would you like to use Next.js for your app?",
      default: true,
    },
    {
      type: "input",
      name: "nextJSDir",
      message: "Enter a directory for your Next.js app:",
      default: "app",
      when: ({ useNextJS }) => useNextJS,
    },
    {
      type: "confirm",
      name: "generateDeploymentScript",
      message: "Would you like to generate a serverless deployment script?",
      default: true,
    },
    {
      type: "input",
      name: "deploymentScriptName",
      message: "Enter a name for your deployment script:",
      default: "deploy",
      when: ({ generateDeploymentScript }) => generateDeploymentScript,
    },
  ]);

  // // Create a new directory for the app
  console.log(chalk`{green Creating directory '${answers.stackName}'...}`);
  const appDir = answers.stackName;
  // await execa('mkdir', ['-p', appDir]);

  // // Create a package.json file
  // console.log(chalk`{green Creating package.json file...}`);
  // const packageJson = {
  //     name: answers.stackName,
  //     private: true,
  //     dependencies: {
  //         'openai': '^0.7.1',
  //         'react': '^17.0.2',
  //         'react-dom': '^17.0.2',
  //     },
  // };
  // await execa('npm', ['init', '-y'], { cwd: appDir });
  // await execa('npm', ['install', '-S', ...Object.keys(packageJson.dependencies)], { cwd: appDir });

  console.log(
    chalk`{green Creating Next.js app in directory '${answers.nextJSDir}'...}`
  );
  const spinner = ora({
    text: "Creating Next.js app...",
    color: "green",
  }).start();
  await cloneGitRepo(GIT_REPO, appDir);
  await execa(`npx rimraf .git`);
  await execa(`npx rimraf ./bin`);
  spinner.succeed("Next.js app created!");

  // If using Next.js, create a new app with create-next-app
  // if (answers.useNextJS) {
  //     console.log(chalk`{green Creating Next.js app in directory '${answers.nextJSDir}'...}`);
  //     const spinner = ora({ text: 'Creating Next.js app...', color: 'green' }).start();
  //     await execa('npx', ['create-next-app', answers.nextJSDir], { cwd: appDir });
  //     spinner.succeed('Next.js app created!');
  // }
}

createGPTStackApp();
