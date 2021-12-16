import { useState, MouseEvent } from 'react'
import { Button, TextField, FieldGroup } from 'datocms-react-ui'
import styles from './KeyValuePair.module.css'

type Props = {
  id: string
  keyPair: string
  valuePair: string
  onValueChange: (value: string) => void
  onKeyChange: (value: string) => void
  onDeleteKey: (value: string) => void
  isExisting: boolean
  isRequired: boolean
}

export default function KeyValuePair({
  id,
  keyPair,
  valuePair,
  onValueChange,
  onKeyChange,
  onDeleteKey,
  isExisting,
  isRequired,
}: Props) {
  const [inputKey, setInputKey] = useState(keyPair)
  const [inputValue, setInputValue] = useState(valuePair)
  const inputIsDisabled = id.indexOf('default') === 0 && isRequired

  function handleKeyChange(newValue: string) {
    onKeyChange(newValue)
    setInputKey(newValue)
  }

  function handleValueChange(newValue: string) {
    onValueChange(newValue)
    setInputValue(newValue)
  }

  function handleDeleteKey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    onDeleteKey(inputKey)
  }

  return (
    <li className={styles.listItem}>
      <FieldGroup className={styles.fieldGroup}>
        <TextField
          required={isRequired}
          error={isExisting ? 'Key already exists' : ''}
          name={`${id}-key`}
          id={`${id}-key`}
          label="Change value of the key"
          value={inputKey}
          onChange={handleKeyChange}
          formLabelProps={{
            children: <></>,
            htmlFor: `${id}-key`,
            className: 'sr-only',
          }}
          textInputProps={{
            disabled: inputIsDisabled,
          }}
        />
      </FieldGroup>

      <FieldGroup className={styles.fieldGroup}>
        <TextField
          required={isRequired}
          error={isRequired && inputValue === '' ? 'Value is required' : ''}
          name={`${id}-value`}
          id={`${id}-value`}
          label="Change value of the key"
          value={inputValue}
          onChange={handleValueChange}
          formLabelProps={{
            children: <></>,
            htmlFor: `${id}-value`,
            className: 'sr-only',
          }}
        />
      </FieldGroup>

      {!inputIsDisabled && (
        <Button
          buttonSize="xs"
          buttonType="negative"
          leftIcon={
            <>
              <span className="sr-only">Delete item</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 448 512"
                width="1em"
                height="1em"
              >
                <path
                  d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM53.2 467a48 48 0 0047.9 45h245.8a48 48 0 0047.9-45L416 128H32z"
                  fill="currentColor"
                ></path>
              </svg>
            </>
          }
          onClick={handleDeleteKey}
        />
      )}
    </li>
  )
}
