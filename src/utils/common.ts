import fs from 'node:fs'
import nodePath from 'node:path'

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function onCancel() {
  throw Error(t('error.userCancel'))
}

export function onError(str: string) {
  throw new Error(str)
}

export function isValidPath(path: string) {
  return fs.existsSync(path)
}

export function isValidFolder(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
}

export function isValidFilePath(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isFile()
}

export function isEmptyFolder(path: string) {
  return fs.readdirSync(path).length === 0
}

export function cleanFolder(path: string, delSelf = false) {
  if (isValidFolder(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = nodePath.join(path, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        cleanFolder(curPath, true)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    if (delSelf) {
      fs.rmdirSync(path)
    }
  } else if (isValidFilePath) {
    fs.unlinkSync(path)
  } else {
    console.warn(t('error.invalidFolder{name}', { name: path }))
  }
}

export function toValidFileName(fileName: string, defVal: string): string {
  const illegalCharsRegex = /[<>:"/\\|?*\x00-\x1F]/g
  let validName = fileName.replace(illegalCharsRegex, '')
  // 去除结尾的空格和句点
  validName = validName.replace(/[. ]+$/, '')
  // 如果结果为空，返回一个默认名称
  if (validName.length === 0) {
    return defVal
  }
  return validName
}

export function isValidVersion(version: string) {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][\da-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][\da-zA-Z-]*))*))?(?:\+([\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*))?$/.test(
    version
  )
}

export function version(version1: string) {
  return {
    isValid: isValidVersion(version1),
    isOlderThan(version2: string) {
      return compareVersions(version1, version2) === -1
    },
    isNewerThan(version2: string) {
      return compareVersions(version1, version2) === 1
    },
    isEqualTo(version2: string) {
      return compareVersions(version1, version2) === 0
    },
  }
}

function compareVersions(version1, version2) {
  const parseVersion = (version) => {
    const [main, preRelease] = version.split('-')
    const [major, minor, patch] = main.split('.').map(Number)
    const pre = preRelease ? preRelease.split('.') : []
    return { major, minor, patch, pre }
  }

  const isPreRelease = (part) => /\D/.test(part)
  const comparePart = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

  const comparePreRelease = (pre1, pre2) => {
    for (let i = 0; i < Math.max(pre1.length, pre2.length); i++) {
      if (i >= pre1.length) return -1 // version1 has no more pre-release parts
      if (i >= pre2.length) return 1 // version2 has no more pre-release parts
      const isNum1 = /^\d+$/.test(pre1[i])
      const isNum2 = /^\d+$/.test(pre2[i])

      if (isNum1 && isNum2) {
        const numCompare = comparePart(+pre1[i], +pre2[i])
        if (numCompare !== 0) return numCompare
      } else if (!isNum1 && isNum2) {
        return 1 // alphabetic pre-release parts are greater than numeric ones
      } else if (isNum1 && !isNum2) {
        return -1
      } else {
        const strCompare = comparePart(pre1[i], pre2[i])
        if (strCompare !== 0) return strCompare
      }
    }
    return 0
  }

  const v1 = parseVersion(version1)
  const v2 = parseVersion(version2)

  const mainCompare =
    comparePart(v1.major, v2.major) || comparePart(v1.minor, v2.minor) || comparePart(v1.patch, v2.patch)
  if (mainCompare !== 0) return mainCompare

  // Both versions match in major.minor.patch, now compare pre-releases
  if (!v1.pre.length && !v2.pre.length) return 0 // both have no pre-release parts
  if (!v1.pre.length) return 1 // v1 is stable, hence greater
  if (!v2.pre.length) return -1 // v2 is stable, hence greater

  return comparePreRelease(v1.pre, v2.pre)
}

export function isNever(_: never) {}

export function getCurrentPath(): string {
  return process.cwd() || __dirname
}

export function strTemplate(template: string): typeof api {
  let api = {
    template,
    map: {} as Record<string, string>,
    set(key: string, value: string) {
      this.map[key] = value
      return this // 支持链式调用
    },
    toString(): string {
      let result = this.template
      Object.keys(this.map).forEach((key) => {
        const value = this.map[key]
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
        result = result.replace(regex, value)
      })
      return result
    },
  }
  return api
}
