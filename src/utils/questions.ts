import prompts from 'prompts'
import lang from '../lang'
import { onCancel } from './common'
import path from 'node:path'

import { TemplateType } from '../define'

const t = lang.action.t
const updateLang = lang.action.updateLang

let result: {
  template?: TemplateType
  folderName?: string
  prefix?: string
  branchName?: string
} = {}

export async function getCustomAnswers(): Promise<typeof result> {
  const defaultProjectName = '.git-pages'
  const defaultBranchName = 'main'
  const defaultPrefix = path.basename(process.cwd()) || path.basename(__dirname)
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

  result = await prompts(
    [
      {
        name: 'template',
        type: 'select',
        message: t('question.template'),
        choices: [{ title: 'Nuxt Content', value: 'nuxt_content' }],
      },
      {
        name: 'folderName',
        type: 'text',
        message: t('question.folderName'),
        initial: defaultProjectName,
        onState: (state) => {
          if (!state.value || /(\s|\/|\\)+/.test(state.value)) {
            return state.value
          }
          return defaultProjectName
        },
      },
      {
        name: 'prefix',
        type: 'text',
        message: t('question.prefix'),
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
        message: t('question.branchName'),
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
  return result
}
