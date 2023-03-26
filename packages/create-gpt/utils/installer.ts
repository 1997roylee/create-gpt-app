import { addDependencies, Dependencies } from './addPackageDependency';

interface InstallerConfig {
    projectName: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
    script?: string;
}

export class Installer {
    public projectName: string;
    public dependencies?: Dependencies;
    public devDependencies?: Dependencies;
    public script?: string;

    constructor(projectName: string, dependencies: Dependencies | undefined, devDependencies: Dependencies | undefined, script: string | undefined) {
        this.projectName = projectName;
        this.dependencies = dependencies;
        this.devDependencies = devDependencies;
        this.script = script;
        // this.install = this.install.bind(this);
    }

    public install(projectPath?: string) {
        console.log(this.dependencies, this.devDependencies)
        if (this.dependencies)
            addDependencies(projectPath, this.dependencies, false);
        if (this.devDependencies)
            addDependencies(projectPath, this.devDependencies, true);
    }

    static createInstaller({
        projectName,
        dependencies,
        devDependencies,
        script
    }: InstallerConfig) {
        return new Installer(projectName, dependencies, devDependencies, script);
    }
}