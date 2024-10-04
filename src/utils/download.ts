import path from 'node:path'
import fs from 'node:fs'
import { simpleGit, GitError } from 'simple-git'

import type { TemplateType, RepoType, BranchType } from '../define'

const gitUrlPrefix = `https://github.com/AlphaFoxz/create-github-pages-template`
const giteeUrlPrefix = `https://gitee.com/AlphaFoxz/create-github-pages-template`

export async function download(
  template: TemplateType,
  localPath: string,
  repoType: RepoType = 'git',
  branchName: BranchType = 'base'
): Promise<boolean> {
  const repoUrl = repoType === 'git' ? `${gitUrlPrefix}-${template}` : `${giteeUrlPrefix}-${template}`
  const git = simpleGit()
  let successed = true
  await git
    .clone(repoUrl, localPath, ['-b', branchName])
    .then(() => {
      fs.rmSync(path.join(localPath, '.vscode'), { recursive: true })
      fs.rmSync(path.join(localPath, '.git'), { recursive: true })
    })
    .catch((e: GitError) => {
      console.error(e)
      successed = false
    })
  return successed
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
