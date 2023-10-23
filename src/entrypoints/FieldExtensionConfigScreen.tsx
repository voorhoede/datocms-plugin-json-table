import { useState } from 'react'
import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk'
import { Canvas, Form, SwitchField, TextField } from 'datocms-react-ui'

type Props = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export default function FieldExtensionConfigScreen({ ctx }: Props) {
  const pluginParameters = ctx.parameters
  const [addItemValue, setAddItemValue] = useState<boolean>(
    Boolean(pluginParameters?.addItem),
  )

  const [exportAsArrayValue, setExportAsArrayValue] = useState<boolean>(
    pluginParameters?.exportAsArray
      ? Boolean(pluginParameters?.exportAsArray)
      : false,
  )

  const [requiredItemsValue, setRequiredItemsValue] = useState<string>(
    pluginParameters?.requiredFields
      ? String(pluginParameters?.requiredFields)
      : '',
  )

  function handleAddItemChange(newValue: boolean) {
    setAddItemValue(newValue)
    ctx.setParameters({ ...pluginParameters, addItem: newValue })
  }

  function handleExportAsArray(newValue: boolean) {
    setExportAsArrayValue(newValue)
    ctx.setParameters({ ...pluginParameters, exportAsArray: newValue })
  }

  function handleRequiredItemsChange(newValue: string) {
    setRequiredItemsValue(newValue)
    ctx.setParameters({ ...pluginParameters, requiredFields: newValue })
  }

  return (
    <Canvas ctx={ctx}>
      <Form>
        <SwitchField
          id="addItem"
          name="addItem"
          label="User may add item"
          value={addItemValue}
          onChange={handleAddItemChange}
        />

        <SwitchField
          id="exportAsArray"
          name="exportAsArray"
          label="Export values as an array of key-value pairs"
          value={exportAsArrayValue}
          onChange={handleExportAsArray}
        />

        <TextField
          id="requiredFields"
          name="requiredFields"
          label="Required fields"
          hint="A comma separated list of keys that should be required"
          value={requiredItemsValue}
          onChange={handleRequiredItemsChange}
        />
      </Form>
    </Canvas>
  )
}
