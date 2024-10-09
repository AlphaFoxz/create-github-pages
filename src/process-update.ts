import fs from 'node:fs'
import path from 'node:path'
import { useArgs } from './stores/args'
import { cleanFolder, isNever, version } from './utils/common'
import { parseLocalTemplateInfo, parseRemoteTemplateInfo } from './utils/template'
import { download } from './utils/download'
import { optionProject } from './utils/option'

const argsStore = useArgs()

export default async function (): Promise<void> {
  await argsStore.action.init()
  const { folderName, template, prefix, branchName } = argsStore.state.updateArgs.value
  const wikiRootPath = path.join('.', folderName)
  const localTemplateInfo = parseLocalTemplateInfo(wikiRootPath, template)
  const remoteTemplateInfo = await parseRemoteTemplateInfo(template)
  const backupFolder = wikiRootPath + '__' + new Date().getTime().toString()
  console.info(`local version: `, localTemplateInfo.version)
  console.info(`remote version: `, remoteTemplateInfo.version)

  if (template === 'nuxt_content') {
    const localVersion = version(localTemplateInfo.version)
    if (!localVersion.isOlderThan(remoteTemplateInfo.version)) {
      console.info(t('info.templateIsAlreadyUpdated'))
    }
    fs.mkdirSync(backupFolder, { recursive: true })
    fs.renameSync(path.join(wikiRootPath, 'content'), path.join(backupFolder, 'content'))
    cleanFolder(wikiRootPath)
    await download(template, wikiRootPath)
    optionProject(folderName, prefix, branchName)
    cleanFolder(path.join(wikiRootPath, 'content'), true)
    fs.renameSync(path.join(backupFolder, 'content'), path.join(wikiRootPath, 'content'))
    fs.rmSync(backupFolder, { recursive: true, force: true })
  } else {
    isNever(template)
  }
}
