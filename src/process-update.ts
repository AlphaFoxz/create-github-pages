import fs from 'node:fs'
import path from 'node:path'
import { useArgs } from './stores/args'
import { isNever, version } from './utils/common'
import { parseLocalTemplateInfo, parseRemoteTemplateInfo } from './utils/template'
import { download } from './utils/download'
import { optionProject } from './utils/option'

const argsStore = useArgs()

export default async function (): Promise<boolean> {
  await argsStore.action.init()
  const { folderName, template, prefix, branchName } = argsStore.state.updateArgs.value
  const wikiRootPath = path.join('.', folderName)
  const localTemplateInfo = parseLocalTemplateInfo(wikiRootPath, template)
  const remoteTemplateInfo = parseRemoteTemplateInfo(template)
  const backupFolder = wikiRootPath + '__' + new Date().getTime().toString()
  if (template === 'nuxt_content') {
    const localVersion = version(localTemplateInfo.version)
    if (!localVersion.isOlderThan((await remoteTemplateInfo).version)) {
      console.info(t('info.templateIsAlreadyUpdated'))
      return true
    }
    fs.mkdirSync(backupFolder)
    fs.copyFileSync(path.join(wikiRootPath, 'content'), path.join(backupFolder, 'content'))
    fs.rmSync(wikiRootPath, { recursive: true, force: true })
    await download(template, wikiRootPath)
    optionProject(folderName, prefix, branchName)
    fs.rmSync(path.join(wikiRootPath, 'content'), { recursive: true, force: true })
    fs.copyFileSync(path.join(backupFolder, 'content'), path.join(wikiRootPath, 'content'))
    fs.rmSync(backupFolder, { recursive: true, force: true })
  } else {
    isNever(template)
  }
  return true
}
