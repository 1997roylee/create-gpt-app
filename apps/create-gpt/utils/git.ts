import { execa } from "execa";

export async function cloneGitRepo(repoUrl: string, cloneDir: string): Promise<void> {
    const args = ["clone", repoUrl, cloneDir];
    await execa("git", args);
}
