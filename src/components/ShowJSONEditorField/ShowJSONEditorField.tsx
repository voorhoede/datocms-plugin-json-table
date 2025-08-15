import { SwitchField } from 'datocms-react-ui'
import * as styles from './ShowJSONEditorField.module.css'

type Props = {
  value: boolean
  onChange: (value: boolean) => void
}

export default function ShowJSONEditorField({ value, onChange }: Props) {
  return (
    <div className={styles.root}>
      <SwitchField
        id="showJSONEditor"
        name="showJSONEditor"
        label="Show JSON editor"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
