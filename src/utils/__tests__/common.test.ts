import { describe, expect, it } from '@jest/globals'
import { isValidVersion, version, strTemplate, toValidFileName } from '../common'

describe('测试公共函数', () => {
  it('测试有效版本号', () => {
    const validVersions = [
      '1.0.0',
      '1.0.0-alpha',
      '1.0.0-alpha.1',
      '1.0.0-0.3.7',
      '1.0.0-x.7.z.92',
      '1.0.0+20130313144700',
      '1.0.0-beta+exp.sha.5114f85',
    ]
    validVersions.forEach((version) => {
      expect(isValidVersion(version)).toBeTruthy()
    })

    const invalidVersions = [
      '01.0.0',
      '1.02.0',
      '1.0.03',
      '1.0',
      '1',
      '1.0.0.',
      '1.0.0-alpha&beta',
      '1.0.0+build@2021',
      '1.0.0-',
      '1.0.0+',
      '1..0',
      '.1.0',
    ]
    invalidVersions.forEach((version) => {
      expect(isValidVersion(version)).toBeFalsy()
    })
  })

  it('测试版本号比大小', () => {
    let v = version('1.0.1')
    expect(v.isEqualTo('1.0.1')).toBeTruthy()
    expect(v.isNewerThan('1.0.0')).toBeTruthy()
    expect(v.isNewerThan('1.0.1-alpha.0')).toBeTruthy()
    expect(v.isOlderThan('1.0.2')).toBeTruthy()

    expect(v.isOlderThan('1.0.0')).toBeFalsy()
    expect(v.isOlderThan('1.0.1-alpha.0')).toBeFalsy()
  })

  it('测试转换有效文件名', () => {
    const defVal = 'fileName'
    expect(toValidFileName('example?.txt', defVal)).toBe('example.txt')
    expect(toValidFileName('CON.txt', defVal)).toBe('CON.txt')
    expect(toValidFileName('file name.', defVal)).toBe('file name')
    expect(toValidFileName('<invalid>|name', defVal)).toBe('invalidname')
  })

  it('测试字符串模板', () => {
    const temp = strTemplate('Hi, i am {{name}}! {{age}}-years-old boy!')
    expect(temp.toString()).toBe('Hi, i am {{name}}! {{age}}-years-old boy!')
    temp.set('name', 'bob')
    expect(temp.toString()).toBe('Hi, i am bob! {{age}}-years-old boy!')
    temp.set('1', '1')
    expect(temp.toString()).toBe('Hi, i am bob! {{age}}-years-old boy!')
    temp.set('age', '18')
    expect(temp.toString()).toBe('Hi, i am bob! 18-years-old boy!')
  })
})
