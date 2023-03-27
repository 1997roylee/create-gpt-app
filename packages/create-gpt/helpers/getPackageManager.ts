export type PackageManager = 'npm' | 'yarn' | 'pnpm'

export function getPackageManager(): PackageManager {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const userAgent = process.env.npm_config_user_agent

    if (!userAgent) return 'npm'

    if (userAgent.startsWith('yarn'))
        return 'yarn'
    else if (userAgent.startsWith('pnpm'))
        return 'pnpm'
    else
        return 'npm'
}