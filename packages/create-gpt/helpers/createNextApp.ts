import retry from 'async-retry'
import { downloadExample } from './example'

export const createNextApp = async (rootPath: string) => {
    await retry(() => downloadExample(rootPath, "examples/next-typescript"), {
        retries: 3,
    })
}