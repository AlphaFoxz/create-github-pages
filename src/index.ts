import { useArgs } from './domain/args-agg'
import { isNever, onCancel } from './utils/common'
import createProcess from './domain/execution-agg/process-create'
import updateProcess from './domain/execution-agg/process-update'
import { useI18n } from './domain/i18n-agg'

const t = useI18n().commands.t

init().catch((e: Error) => {
  console.error(e.message)
  console.error(t('signal.exitWithError'))
})

process.on('SIGINT', onCancel)

async function init() {
  console.info(t('signal.scriptStarted'))

  const argsAgg = useArgs()
  await argsAgg.commands.init()
  if (argsAgg.states.currerntOperation.value === 'create') {
    await createProcess()
  } else if (argsAgg.states.currerntOperation.value === 'update') {
    await updateProcess()
  } else {
    isNever(argsAgg.states.currerntOperation.value)
  }
  console.info(t('signal.exitWithSuccess'))
}
