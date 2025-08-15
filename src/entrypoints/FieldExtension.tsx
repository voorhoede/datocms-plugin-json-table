import { useState } from 'react'
import get from 'lodash/get'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'
import AppHeader from '../components/AppHeader/AppHeader'
import PairList from '../components/PairList/PairList'
import JSONInput from '../components/JSONInput/JSONInput'
import {
  arrayToObj,
  objectToArray,
  getArrayFromList,
  updateKey,
  getOptionalField,
  type ObjectType,
} from '../lib/helpers'
import { type PluginParameters } from '../lib/types'
import ShowJSONEditorField from '../components/ShowJSONEditorField/ShowJSONEditorField'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: Props) {
  const [showJSONEditor, setShowJSONEditor] = useState(false)

  const pluginParameters: PluginParameters = ctx.parameters
  const requiredFieldsParameter = pluginParameters?.requiredFields
  const showSwitchToJSONEditor = Boolean(pluginParameters?.switchToJSONEditor)

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
    const isOptionalField =
      item.key.lastIndexOf('?') === item.key.length - 1 &&
      requiredFields.indexOf(item.key) !== -1
    const isRequired =
      requiredFields.indexOf(item.key) !== -1 &&
      item.key.lastIndexOf('?') !== item.key.length - 1
    const isNonEditable =
      requiredFields.indexOf(item.key) !== -1 || isOptionalField

    if (isOptionalField) {
      item.key = getOptionalField(item.key)
    }

    return {
      ...item,
      isRequired,
      isNonEditable,
    }
  })

  function handleUpdateField(updatedValueList: ObjectType[]) {
    const updatedValueObj = arrayToObj(updatedValueList)
    delete updatedValueObj['']
    const updatedFieldPath = JSON.stringify(updatedValueObj, null, 2)

    if (JSON.stringify(parsedFieldValue) !== JSON.stringify(updatedValueObj)) {
      updateFieldValue(updatedFieldPath)
    }
  }

  function updateFieldValue(newValue: string) {
    ctx.setFieldValue(ctx.fieldPath, newValue)
  }

  return (
    <Canvas ctx={ctx}>
      {showSwitchToJSONEditor && (
        <ShowJSONEditorField
          value={showJSONEditor}
          onChange={setShowJSONEditor}
        />
      )}

      {showJSONEditor && (
        <JSONInput fieldValue={fieldValue} onChange={updateFieldValue} />
      )}

      {!showJSONEditor && (
        <div>
          <AppHeader />
          <PairList
            valueList={valueList}
            mayAddItem={Boolean(pluginParameters?.addItem)}
            onUpdateField={handleUpdateField}
          />
        </div>
      )}
    </Canvas>
  )
}
