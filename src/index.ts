import fs from 'node:fs'
import { getCustomAnswers } from './utils/questions'
import { download } from './utils/download'
import { optionProject } from './utils/option'
import lang from './lang'
import { onCancel } from './utils/common'

const t = lang.action.t

init().catch((e: Error) => {
  console.error(e.message)
  console.error(t('signal.exitWithError'))
})

process.on('SIGINT', onCancel)

async function init(): Promise<boolean> {
  console.log(t('signal.scriptStarted'))

  const { template, folderName, prefix, branchName } = await getCustomAnswers()
  if (fs.existsSync(folderName)) {
    console.error(t('message.error.duplicateFolder', { name: folderName }))
    return false
  }
  let downloaded = await download(template, `./${folderName}`, 'git')
  if (!downloaded) {
    console.warn(t('message.error.retryDownloadTemplate'))
    downloaded = await download(template, `./${folderName}`, 'gitee')
  }
  if (!downloaded) {
    console.error(t('message.error.downloadTemplate'))
    return false
  }
  optionProject(folderName, prefix, branchName)
  console.info(t('signal.exitWithSuccess'))
  return true
}
