import { TemplateType, TemplateInfo } from '../domain/define'
import { onError, isValidFolder, isNever, strTemplate } from './common'
import fs from 'node:fs'
import path from 'node:path'
import { useI18n } from '../domain/i18n-agg'

const t = useI18n().commands.t

export function parseLocalTemplateInfo(folder: string, template: TemplateType): TemplateInfo {
  if (!isValidFolder(folder)) {
    onError(t('error.invalidFolder{name}', { name: folder }))
  }
  if (template === 'nuxt_content' || template === 'vite_press') {
    const content = fs.readFileSync(path.join(folder, 'package.json'), { encoding: 'utf8', flag: 'r' })
    const info = JSON.parse(content)
    return {
      _template: template,
      name: info.name,
      version: info.version || '0.0.0',
    }
  }
  isNever(template)
}

export async function parseRemoteTemplateInfo(template: TemplateType): Promise<TemplateInfo> {
  if (template === 'nuxt_content' || template === 'vite_press') {
    const fetchResult = await tryFetchRemoteTemplateInfo(template, 'package.json', [
      'https://raw.githubusercontent.com/AlphaFoxz/create-github-pages-template-{{template}}/base/{{targetFile}}',
    ])
    const info = JSON.parse(fetchResult)
    return {
      _template: template,
      name: info.name,
      version: info.version || '0.0.0',
    }
  } else {
    isNever(template)
  }
}

async function tryFetchRemoteTemplateInfo(
  template: TemplateType,
  targetFile: string,
  tryList: string[]
): Promise<string> {
  if (tryList.length === 0) {
    onError(t('error.networkError'))
  }
  const remoteUrl = strTemplate(tryList.pop()).set('template', template).set('targetFile', targetFile).toString()
  const response = await fetch(remoteUrl)
  if (!response.ok) {
    console.warn(t('error.networkError{info}', { info: JSON.stringify(response) }))
    return await tryFetchRemoteTemplateInfo(template, targetFile, tryList)
  }
  try {
    return await response.text()
  } catch (e) {
    return await tryFetchRemoteTemplateInfo(template, targetFile, tryList)
  }
}
