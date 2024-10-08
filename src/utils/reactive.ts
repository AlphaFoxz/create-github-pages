type ReactiveWrapperType<T> = {
  value: T
  _watchCallbacks: Function[]
}

export function ref<T>(v: T): typeof data {
  const data: ReactiveWrapperType<T> = {
    value: v,
    _watchCallbacks: [],
  }
  return new Proxy(data, {
    get: (obj, k) => {
      return obj[k]
    },
    set: (obj, k, v) => {
      obj[k] = v
      for (const f of obj._watchCallbacks) {
        f(obj[k], v)
      }
      return true
    },
  })
}

export function watch(reactiveVal: ReactiveWrapperType<any>, callback: Function) {
  reactiveVal._watchCallbacks.push(callback)
}
