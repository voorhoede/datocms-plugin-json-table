export interface ObjectType {
  key: string
  value: string
  id: string
  isRequired?: boolean
  isNonEditable?: boolean
}

const optionalFieldSuffix = '?'

export function objectToArray(obj: Record<string, string>): ObjectType[] {
  return Object.keys(obj).map((key, index) => {
    return {
      key: key,
      value: obj[key],
      id: `default-${key}-${index}`,
    }
  })
}

export function arrayToObj(arr: ObjectType[]): Record<string, string> {
  return arr.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.key]: cur.value,
    }
  }, {})
}

export function isKeyInArray(arr: ObjectType[], key: string): boolean {
  return arr.some((item) => item.key === key)
}

export function getDoubleKeysFromArray(arr: ObjectType[]): string[] {
  // Thanks to https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects/53212154
  const lookup = arr.reduce((acc: Record<string, number>, cur) => {
    acc[cur.key] = ++acc[cur.key] || 0
    return acc
  }, {})

  return arr
    .filter((item) => lookup[item.key])
    .map((item) => {
      return item.key
    })
}

export function getArrayFromList(str: string): string[] {
  const arr = str.split(',').map((item) => item.trim())
  return str ? arr : []
}

export function updateKey(
  object: Record<string, string>,
  oldKey: string,
  newKey: string,
) {
  let modifiedObject: Record<string, string> = {}

  for (let [key, value] of Object.entries(object))
    if (key === oldKey) modifiedObject[newKey] = value
    else modifiedObject[key] = value

  return modifiedObject
}

export function getOptionalField(field: string): string {
  const isOptionalField =
    field.indexOf(optionalFieldSuffix) === field.length - 1
  if (isOptionalField) {
    return field.slice(0, field.lastIndexOf(optionalFieldSuffix))
  }

  return field
}
