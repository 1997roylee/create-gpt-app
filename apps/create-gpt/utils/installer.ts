import { addDependencies, Dependencies } from './addPackageDependency';


interface InstallerConfig {
    projectName: string;
    projectPath: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
    script?: string;
}

export class Installer {
    public projectName: string;
    public projectPath: string;
    public dependencies?: Dependencies;
    public devDependencies?: Dependencies;
    public script?: string;

    constructor(projectName: string, projectPath: string, dependencies: Dependencies | undefined, devDependencies: Dependencies | undefined, script: string | undefined) {
        this.projectName = projectName;
        this.projectPath = projectPath;
        this.dependencies = dependencies;
        this.devDependencies = devDependencies;
        this.script = script;
    }

    public install() {
        if (this.dependencies)
            addDependencies(this.projectPath, this.dependencies, false);
        if (this.devDependencies)
            addDependencies(this.projectPath, this.devDependencies, true);
    }

    static createInstaller({
        projectName,
        projectPath,
        dependencies,
        devDependencies,
        script
    }: InstallerConfig) {
        return new Installer(projectName, projectPath, dependencies, devDependencies, script);
    }
}