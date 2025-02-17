import fs from 'node:fs'
import path from 'node:path'
import { useArgs } from '../args-agg'
import { useI18n } from '../i18n-agg'
import { cleanFolder, isNever, version } from '../../utils/common'
import { parseLocalTemplateInfo, parseRemoteTemplateInfo } from '../../utils/template'
import { download } from '../../utils/download'
import { optionProject } from '../../utils/option'

const argsAgg = useArgs()
const t = useI18n().commands.t

export default async function (): Promise<void> {
  await argsAgg.commands.init()
  const { folderName, template, prefix, branchName } = argsAgg.states.updateArgs.value
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
  } else if (template === 'vite_press') {
    const localVersion = version(localTemplateInfo.version)
    if (!localVersion.isOlderThan(remoteTemplateInfo.version)) {
      console.info(t('info.templateIsAlreadyUpdated'))
    }
    fs.mkdirSync(backupFolder, { recursive: true })
    fs.renameSync(path.join(wikiRootPath, 'public'), path.join(backupFolder, 'public'))
    cleanFolder(wikiRootPath)
    await download(template, wikiRootPath)
    optionProject(folderName, prefix, branchName)
    cleanFolder(path.join(wikiRootPath, 'public'), true)
    fs.renameSync(path.join(backupFolder, 'public'), path.join(wikiRootPath, 'public'))
    fs.rmSync(backupFolder, { recursive: true, force: true })
  } else {
    isNever(template)
  }
}
