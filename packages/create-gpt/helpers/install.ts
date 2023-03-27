import { execa } from "execa";
import { packageMap } from "../packages";
import { getProjectPath } from "./commands";
import { getPackageManager } from "./getPackageManager"


export const install = async (rootPath: string) => {
    const packageManager = getPackageManager();
    const projectPath = getProjectPath(rootPath)

    // const args = []
    Object.values(packageMap).forEach(async (installer) => {
        await installer.install(projectPath);
    });

    await execa(packageManager, ['install'], {
        cwd: projectPath,
    });
}