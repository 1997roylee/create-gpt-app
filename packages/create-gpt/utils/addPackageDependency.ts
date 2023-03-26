import fs from 'fs';
import path from 'path';

export interface Dependencies {
    [key: string]: string;
}

const SPACE = 4;

export function addDependencies(projectPath: string = "", dependencies: Dependencies, isDev: boolean = false) {
    const packageJsonPath = path.resolve(projectPath, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    if (isDev) {
        packageJson.devDependencies = {
            ...packageJson.devDependencies,
            ...dependencies,
        };
    } else
        packageJson.dependencies = {
            ...packageJson.dependencies,
            ...dependencies,
        };

    console.log(packageJson)

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, SPACE));
}
