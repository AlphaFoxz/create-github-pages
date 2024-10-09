import fs from 'node:fs'
import { isEmptyFolder, isValidFolder, onError } from './utils/common'
import { useArgs } from './stores/args'
import { download } from './utils/download'
import { optionProject } from './utils/option'

const argsStore = useArgs()

export default async function (): Promise<void> {
  await argsStore.action.init()
  const { folderName, template, prefix, branchName } = argsStore.state.createArgs.value

  if (fs.existsSync(folderName) && !isValidFolder(folderName)) {
    onError(t('error.invalidFolder{name}', { name: folderName }))
  }
  if (fs.existsSync(folderName) && !isEmptyFolder(folderName)) {
    onError(t('error.duplicateFolder{name}', { name: folderName }))
  }
  await download(template, `./${folderName}`)
  optionProject(folderName, prefix, branchName)
}
