import path from 'node:path'
import fs from 'node:fs'
import { simpleGit, GitError } from 'simple-git'

export type RepoType = 'git' | 'gitee'
export type BranchType = 'base'

const gitUrl = `https://github.com/AlphaFoxz/nuxt-content-git-pages-template.git`
const giteeUrl = `https://gitee.com/AlphaFoxz/nuxt-content-git-pages-template.git`

export async function download(localPath: string, repoType: RepoType = 'git', branchName: BranchType = 'base') {
  const repoUrl = repoType === 'git' ? gitUrl : giteeUrl
  const git = simpleGit()
  let successed = true
  await git.clone(repoUrl, localPath, [`-b ${branchName}`]).catch((e: GitError) => {
    console.error(e)
    successed = false
  })
  if (successed) {
    await delay(1000)
    fs.rmSync(path.join(localPath, '.git'), { recursive: true })
  }
  return successed
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
