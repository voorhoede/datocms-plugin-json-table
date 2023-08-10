import get from 'lodash/get'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'
import AppHeader from '../components/AppHeader/AppHeader'
import PairList from '../components/PairList/PairList'
import { arrayToObj, objectToArray, getArrayFromList } from '../lib/helpers'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: Props) {
  const pluginParameters: any = ctx.parameters
  const requiredFieldsParameter: string = pluginParameters?.requiredFields

  const fieldValue: string = String(get(ctx.formValues, ctx.fieldPath))
  const parsedFieldValue: object = JSON.parse(fieldValue) || {}
  const requiredFields: any[] = getArrayFromList(requiredFieldsParameter || '')

  const valueObj = requiredFields.reduce((acc, field) => {
    if (acc[field]) {
      return acc
    } else {
      return {
        ...acc,
        [field]: '',
      }
    }
  }, parsedFieldValue)

  const valueList = objectToArray(valueObj).map((item) => {
    return {
      ...item,
      isRequired: requiredFields.indexOf(item.key) !== -1,
    }
  })

  function handleUpdateField(updatedValueList: any[]) {
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
