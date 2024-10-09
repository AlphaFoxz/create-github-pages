import { TemplateType, TemplateInfo } from '../define'
import { onError, isValidFolder, isValidVersion, isNever, strTemplate } from './common'
import fs from 'node:fs'
import path from 'node:path'

export function parseLocalTemplateInfo(folder: string, template: TemplateType): TemplateInfo {
  if (!isValidFolder(folder)) {
    onError(t('error.invalidFolder{name}', { name: folder }))
  }
  if (template === 'nuxt_content') {
    const content = fs.readFileSync(path.join(folder, 'package.json'), 'utf8')
    const info = JSON.parse(content)
    if (!isValidVersion(info.version)) {
      onError(t('error.validVersionNotDetected'))
    }
    return {
      _template: template,
      name: info.name,
      version: info.version,
    }
  }
  isNever(template)
}

export async function parseRemoteTemplateInfo(template: TemplateType): Promise<TemplateInfo> {
  if (template === 'nuxt_content') {
    const fetchResult = await tryFetchRemoteTemplateInfo(template, 'package.json', [
      'https://raw.githubusercontent.com/AlphaFoxz/create-github-pages-template-{{template}}/base/{{targetFile}}',
    ])
    const info = JSON.parse(fetchResult)
    if (!isValidVersion(info.version)) {
      onError(t('error.validVersionNotDetected'))
    }
    return {
      _template: template,
      name: info.name,
      version: info.version,
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
