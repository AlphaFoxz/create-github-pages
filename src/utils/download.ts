import path from 'node:path'
import fs from 'node:fs'
import { simpleGit, GitError } from 'simple-git'
import type { TemplateType, RepoType, BranchType } from '../define'
import { onError, strTemplate } from './common'

const git = simpleGit()

export async function download(template: TemplateType, localPath: string, branchName: BranchType = 'base') {
  await tryClone(template, localPath, branchName, [
    'https://gitee.com/AlphaFoxz/create-github-pages-template-{{template}}',
    'https://github.com/AlphaFoxz/create-github-pages-template-{{template}}',
  ])
  fs.rmSync(path.join(localPath, '.vscode'), { recursive: true, force: true })
  fs.rmSync(path.join(localPath, '.git'), { recursive: true, force: true })
}

async function tryClone(template: string, localPath: string, branchName: string, tryList: string[]) {
  if (tryList.length === 0) {
    onError(t('error.downloadTemplate'))
  }
  const repoUrl = strTemplate(tryList.pop()).set('template', template).toString()
  try {
    await git.clone(repoUrl, localPath, ['-b', branchName])
  } catch (e) {
    console.error(e)
    console.warn(t('warn.retryDownloadTemplate'))
    await tryClone(template, localPath, branchName, tryList)
  }
}
