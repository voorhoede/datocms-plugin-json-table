export function objectToArray(obj) {
  return Object.keys(obj).map((key, index) => {
    return {
      key: key,
      value: obj[key],
      id: `default-${key}-${index}`,
    }
  })
}

export function arrayToObj(arr) {
  return arr.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.key]: cur.value,
    }
  }, {})
}

export function isKeyInArray(arr, key) {
  return arr.some((item) => item.key === key)
}

export function getDoubleKeysFromArray(arr) {
  // Thanks to https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects/53212154
  const lookup = arr.reduce((acc, cur) => {
    acc[cur.key] = ++acc[cur.key] || 0
    return acc
  }, {})

  return arr
    .filter((item) => lookup[item.key])
    .map((item) => {
      return item.key
    })
}

export function getArrayFromList(str) {
  const arr = str.split(',').map((item) => item.trim())
  return str ? arr : []
}
