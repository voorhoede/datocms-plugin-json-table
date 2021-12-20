interface ObjectType {
  key: string;
  value: string;
  id: string;
}

export function objectToArray(obj: any): ObjectType[] {
  return Object.keys(obj).map((key, index) => {
    return {
      key: key,
      value: obj[key],
      id: `default-${key}-${index}`,
    }
  })
}

export function arrayToObj(arr: Array<ObjectType>): any {
  return arr.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.key]: cur.value,
    }
  }, {})
}

export function isKeyInArray(arr: Array<ObjectType>, key: string): boolean {
  return arr.some((item) => item.key === key)
}

export function getDoubleKeysFromArray(arr: Array<ObjectType>): any[] {
  // Thanks to https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects/53212154
  const lookup = arr.reduce((acc: any, cur: ObjectType) => {
    acc[cur.key] = ++acc[cur.key] || 0
    return acc
  }, {})

  return arr
    .filter((item) => lookup[item.key])
    .map((item) => {
      return item.key
    })
}

export function getArrayFromList(str: string): any[] {
  const arr = str.split(',').map((item) => item.trim())
  return str ? arr : []
}
