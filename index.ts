import fs from 'node:fs'
import { getCustomAnswers } from './utils/questions'
import { download } from './utils/download'
import { optionProject } from './utils/option'

init().catch((e: Error) => {
  console.error('exit with error: ' + e.message)
})

async function init(): Promise<boolean> {
  console.log('init...')

  const { projectName, prefix } = await getCustomAnswers()
  if (fs.existsSync(projectName)) {
    console.error(`folder or file already exists: ${projectName}`)
    return false
  }
  let downloaded = await download(`./${projectName}`, 'git')
  if (!downloaded) {
    console.warn(`download from git failed, try to download from gitee...`)
    downloaded = await download(`./${projectName}`, 'gitee')
  }
  if (!downloaded) {
    console.error('download template fail!')
    return false
  }
  optionProject(projectName, prefix)
  console.info('project create successed!')
  return true
}
