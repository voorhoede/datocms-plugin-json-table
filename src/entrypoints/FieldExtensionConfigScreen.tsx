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
  const [requiredItemsValue, setRequiredItemsValue] = useState<string>(
    pluginParameters?.requiredFields
      ? String(pluginParameters?.requiredFields)
      : '',
  )

  function handleAddItemChange(newValue: boolean) {
    setAddItemValue(newValue)
    ctx.setParameters({ ...pluginParameters, addItem: newValue })
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

        <TextField
          id="requiredFields"
          name="requiredFields"
          label="Required/Optional fields"
          hint="A comma separated list of keys that should be required. Add a question mark (?) at the end of the key to make it optional. Example: key1, key2?, key3"
          value={requiredItemsValue}
          onChange={handleRequiredItemsChange}
        />
      </Form>
    </Canvas>
  )
}
