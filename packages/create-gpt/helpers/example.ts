import { join } from 'path'
import { Stream } from 'stream'
import got from 'got'
import tar from 'tar'
import { tmpdir } from 'os'
import { promisify } from 'util'
import { createWriteStream, promises as fs } from 'fs'

const pipeline = promisify(Stream.pipeline)

const OWNER = '1997roylee';
const REPO = 'create-gpt-app';
const BRANCH = 'main';

export const downloadTar = async (url: string) => {
    const tempFile = join(tmpdir(), `create-gpt-app-example.temp-${Date.now()}`)
    await pipeline(got.stream(url), createWriteStream(tempFile))
    return tempFile
}

export async function downloadExample(rootPath: string, filePath: string) {
    const tempFile = await downloadTar(
        `https://codeload.github.com/${OWNER}/${REPO}/tar.gz/${BRANCH}`
    )

    console.log('tempFile', tempFile, filePath)
    await tar.x({
        file: tempFile,
        cwd: rootPath,
        strip: filePath ? filePath.split('/').length + 1 : 1,
        filter: (p) =>
            p.startsWith(
                `${REPO}-${BRANCH.replace(/\//g, '-')}${filePath ? `/${filePath}/` : '/'
                }`
            ),
    })

    await fs.unlink(tempFile)
}