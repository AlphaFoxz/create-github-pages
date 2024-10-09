import { ref } from '../utils/reactive'
import prompts from 'prompts'
import { onCancel, isNever, getCurrentPath, toValidFileName } from '../utils/common'
import { CreateArgs, UpdateArgs, OperationType } from '../define'
import { LangName } from '../lang/define'
import path from 'node:path'

const isReady = ref(false)
const currerntOperation = ref<OperationType>('create')
const createArgs = ref<CreateArgs>({})
const updateArgs = ref<UpdateArgs>({})
const defaultPrefix = path.basename(getCurrentPath())
const defaultProjectName = '.github-pages'
const defaultBranchName = 'main'

async function selectLang(): Promise<LangName> {
  const { lang } = await prompts(
    [
      {
        name: 'lang',
        type: 'select',
        message: 'Choose The language during this creation process',
        choices: [
          { title: 'English', value: 'en' },
          { title: '中文', value: 'zh' },
        ],
      },
    ],
    { onCancel }
  )
  updateLang(lang)
  return lang
}

async function selectOperationType(): Promise<OperationType> {
  const { operationType } = await prompts(
    [
      {
        name: 'operationType',
        type: 'select',
        message: t('args.operationType'),
        choices: [
          { title: t('args.operationType.create'), value: 'create' },
          { title: t('args.operationType.update'), value: 'update' },
        ],
      },
    ],
    { onCancel }
  )
  currerntOperation.value = operationType
  return operationType
}

async function configCreateArgs() {
  const { template, folderName, prefix, branchName } = await prompts(
    [
      {
        name: 'template',
        type: 'select',
        message: t('args.template'),
        choices: [{ title: 'Nuxt Content', value: 'nuxt_content' }],
      },
      {
        name: 'folderName',
        type: 'text',
        message: t('args.folderName'),
        initial: defaultProjectName,
        onState: (state) => {
          return toValidFileName(state.value, defaultProjectName)
        },
      },
      {
        name: 'prefix',
        type: 'text',
        message: t('args.prefix'),
        initial: `/${defaultPrefix}`,
        onState: (state) => {
          if (!state.value || /(\s|\/|\\)+/.test(state.value)) {
            return ''
          }
          return state.value
        },
      },
      {
        name: 'branchName',
        type: 'text',
        message: t('args.branchName'),
        initial: defaultBranchName,
        onState: (state) => {
          if (!state.value.trim()) {
            return defaultBranchName
          }
          return state.value
        },
      },
    ],
    { onCancel }
  )
  createArgs.value.template = template
  createArgs.value.branchName = branchName
  createArgs.value.prefix = prefix
  createArgs.value.folderName = folderName
}

async function configUpdateArgs() {
  const { template, folderName, prefix, branchName } = await prompts(
    [
      {
        name: 'template',
        type: 'select',
        message: t('args.template'),
        choices: [{ title: 'Nuxt Content', value: 'nuxt_content' }],
      },
      {
        name: 'folderName',
        type: 'text',
        message: t('args.folderName'),
        initial: defaultProjectName,
        onState: (state) => {
          return toValidFileName(state.value, defaultProjectName)
        },
      },
      {
        name: 'prefix',
        type: 'text',
        message: t('args.prefix'),
        initial: `/${defaultPrefix}`,
        onState: (state) => {
          if (!state.value || /(\s|\/|\\)+/.test(state.value)) {
            return ''
          }
          return state.value
        },
      },
      {
        name: 'branchName',
        type: 'text',
        message: t('args.branchName'),
        initial: defaultBranchName,
        onState: (state) => {
          if (!state.value.trim()) {
            return defaultBranchName
          }
          return state.value
        },
      },
    ],
    { onCancel }
  )
  updateArgs.value.template = template
  updateArgs.value.branchName = branchName
  updateArgs.value.prefix = prefix
  updateArgs.value.folderName = folderName
}

async function init() {
  if (isReady.value) {
    return
  }
  await selectLang()
  const operationType = await selectOperationType()
  if (operationType === 'create') {
    await configCreateArgs()
  } else if (operationType === 'update') {
    await configUpdateArgs()
  } else {
    isNever(operationType)
  }
  isReady.value = true
}

export function useArgs() {
  return {
    action: {
      init,
    },
    state: {
      isReady,
      currerntOperation,
      createArgs,
      updateArgs,
    },
  }
}
