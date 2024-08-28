import fs from 'node:fs'
import { getCustomAnswers } from './utils/questions'
import { download } from './utils/download'
import { optionProject } from './utils/option'
import lang from './lang'
import { onCancel } from './utils/common'

const t = lang.action.t

init().catch((e: Error) => {
  console.error(e.message)
  console.error(t('console.error.exit'))
})

process.on('SIGINT', onCancel)

async function init(): Promise<boolean> {
  console.log(t('console.info.scriptStart'))

  const { folderName, prefix, branchName } = await getCustomAnswers()
  if (fs.existsSync(folderName)) {
    console.error(t('console.error.duplicateFolder', { name: folderName }))
    return false
  }
  let downloaded = await download(`./${folderName}`, 'git')
  if (!downloaded) {
    console.warn(t('console.error.retryDownloadTemplate'))
    downloaded = await download(`./${folderName}`, 'gitee')
  }
  if (!downloaded) {
    console.error(t('console.error.downloadTemplate'))
    return false
  }
  optionProject(folderName, prefix, branchName)
  console.info(t('console.success.complete'))
  return true
}
