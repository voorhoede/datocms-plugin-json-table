import get from 'lodash/get'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'
import AppHeader from '../components/AppHeader/AppHeader'
import PairList from '../components/PairList/PairList'
import {
  arrayToObj,
  objectToArray,
  getArrayFromList,
  updateKey,
  getOptionalField,
  type ObjectType,
} from '../lib/helpers'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: Props) {
  const pluginParameters: {
    requiredFields?: string
    addItem?: boolean
  } = ctx.parameters
  const requiredFieldsParameter = pluginParameters?.requiredFields

  const fieldValue: string = String(get(ctx.formValues, ctx.fieldPath))
  const parsedFieldValue: Record<string, string> = JSON.parse(fieldValue) || {}
  const requiredFields = getArrayFromList(requiredFieldsParameter || '')

  const valueObj = requiredFields.reduce((acc, field) => {
    let actualField = getOptionalField(field)

    if (acc[actualField] !== undefined) {
      return updateKey(acc, actualField, field)
    } else {
      return {
        ...acc,
        [field]: '',
      }
    }
  }, parsedFieldValue)

  const valueList = objectToArray(valueObj).map((item) => {
    const isRequired =
      requiredFields.indexOf(item.key) !== -1 &&
      item.key.indexOf('?') !== item.key.length - 1
    const isNonEditable =
      requiredFields.indexOf(item.key) !== -1 ||
      item.key.indexOf('?') === item.key.length - 1
    item.key = getOptionalField(item.key)

    return {
      ...item,
      isRequired,
      isNonEditable,
    }
  })

  function handleUpdateField(updatedValueList: ObjectType[]) {
    const updatedValueObj = arrayToObj(updatedValueList)
    delete updatedValueObj['']
    const updatedFieldPath = JSON.stringify(updatedValueObj)

    if (JSON.stringify(parsedFieldValue) !== JSON.stringify(updatedValueObj)) {
      ctx.setFieldValue(ctx.fieldPath, updatedFieldPath)
    }
  }

  return (
    <Canvas ctx={ctx}>
      <AppHeader />

      <PairList
        valueList={valueList}
        mayAddItem={Boolean(pluginParameters?.addItem)}
        onUpdateField={handleUpdateField}
      />
    </Canvas>
  )
}
