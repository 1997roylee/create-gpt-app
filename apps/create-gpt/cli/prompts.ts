import inquirer from "inquirer";

interface Answers {
    stackName: string;
    prompt: string;
    useNextJS: boolean;
    nextJSDir: string;
    generateDeploymentScript: boolean;
    deploymentScriptName: string;
}

export const createPrompts = async (): Promise<Answers> => {
    return await inquirer.prompt<Answers>([
        {
            type: "input",
            name: "stackName",
            message: "Enter a name for your GPT stack:",
            validate: (value: string) => value.trim().length > 0,
        },
        {
            name: "language",
            type: "list",
            message: "Will you be using TypeScript or JavaScript?",
            choices: [
                { name: "TypeScript", value: "typescript", short: "TypeScript" },
                { name: "JavaScript", value: "javascript", short: "JavaScript" },
            ],
            default: "typescript",
        },
        // {
        //     type: "input",
        //     name: "prompt",
        //     message: "Enter an input prompt for your GPT stack:",
        //     validate: (value: string) => value.trim().length > 0,
        // },
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
        // {
        //     type: "confirm",
        //     name: "generateDeploymentScript",
        //     message: "Would you like to generate a serverless deployment script?",
        //     default: true,
        // },
        // {
        //     type: "input",
        //     name: "deploymentScriptName",
        //     message: "Enter a name for your deployment script:",
        //     default: "deploy",
        //     when: ({ generateDeploymentScript }) => generateDeploymentScript,
        // },
    ]);
}