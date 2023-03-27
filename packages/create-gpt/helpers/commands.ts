import path from "path";


export const getProjectPath = (projectPath: string) => {
    return path.resolve(process.cwd(), projectPath);
}