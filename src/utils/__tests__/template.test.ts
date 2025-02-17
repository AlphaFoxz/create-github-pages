import { describe, expect, it } from 'vitest'
import { parseLocalTemplateInfo, parseRemoteTemplateInfo } from '../template'
import { getCurrentPath, isValidVersion } from '../common'

describe('测试模板工具相关功能', () => {
  it('测试解析本地package.json', () => {
    const info = parseLocalTemplateInfo(getCurrentPath(), 'nuxt_content')
    expect(isValidVersion(info.version)).toBeTruthy()
    expect(info.name).toBe('create-github-pages')
  })

  it('测试解析远程package.json', async () => {
    const info = await parseRemoteTemplateInfo('nuxt_content')
    expect(isValidVersion(info.version)).toBeTruthy()
    expect(info.name).toBe('nuxt_content')
  })
})
