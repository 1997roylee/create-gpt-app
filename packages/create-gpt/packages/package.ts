import { addDependencies, Dependencies } from './addPackageDependency';

interface PackageConfig {
    projectName: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
    script?: string;
}

export class Package {
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
        if (this.dependencies)
            addDependencies(projectPath, this.dependencies, false);
        if (this.devDependencies)
            addDependencies(projectPath, this.devDependencies, true);
    }

    static create({
        projectName,
        dependencies,
        devDependencies,
        script
    }: PackageConfig) {
        return new Package(projectName, dependencies, devDependencies, script);
    }
}