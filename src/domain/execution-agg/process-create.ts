import fs from 'node:fs'
import { isEmptyFolder, isValidFolder, onError } from '../../utils/common'
import { useArgs } from '../args-agg'
import { useI18n } from '../i18n-agg'
import { download } from '../../utils/download'
import { optionProject } from '../../utils/option'

const argsAgg = useArgs()
const t = useI18n().commands.t

export default async function (): Promise<void> {
  await argsAgg.commands.init()
  const { folderName, template, prefix, branchName } = argsAgg.states.createArgs.value

  if (fs.existsSync(folderName) && !isValidFolder(folderName)) {
    onError(t('error.invalidFolder{name}', { name: folderName }))
  }
  if (fs.existsSync(folderName) && !isEmptyFolder(folderName)) {
    onError(t('error.duplicateFolder{name}', { name: folderName }))
  }
  await download(template, `./${folderName}`)
  optionProject(folderName, prefix, branchName)
}
