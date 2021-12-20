import { useState, useEffect, MouseEvent } from 'react'
import { Button, Form } from 'datocms-react-ui'
import KeyValuePair from '../KeyValuePair/KeyValuePair'
import { isKeyInArray, getDoubleKeysFromArray } from '../../lib/helpers'
import styles from './PairList.module.css'

type Props = {
  valueList: any[]
  mayAddItem: boolean
  onUpdateField: (list: any[]) => void
}

export default function PairList({
  valueList,
  mayAddItem,
  onUpdateField,
}: Props) {
  const [updatingValueList, setUpdatingValueList] = useState<any[]>(valueList)
  const [newItemId, setNewItemId] = useState<number>(0)
  const [existingElementKeys, setExistingElementKeys] = useState<any[]>([])

  function handleUpdateField(updatedValueList: any[]) {
    setUpdatingValueList(updatedValueList)
    onUpdateField(updatedValueList)
  }

  function handleAddItem(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!isKeyInArray(updatingValueList, '')) {
      setNewItemId(newItemId + 1)
      setUpdatingValueList([
        ...updatingValueList,
        { key: '', value: '', id: `added-${newItemId}` },
      ])
    }
  }

  function handleKeyChange(key: string, index: number) {
    const newObj = {
      ...updatingValueList[index],
      key: key,
    }

    let newList = [...updatingValueList]
    newList[index] = newObj

    handleUpdateField(newList)
  }

  function handleValueChange(value: string, index: number) {
    const newObj = {
      ...updatingValueList[index],
      value: value,
    }
    let newList = [...updatingValueList]
    newList[index] = newObj

    handleUpdateField(newList)
  }

  function deleteItem(idToDelete: string) {
    const newList = updatingValueList.filter((item) => idToDelete !== item.id)
    handleUpdateField(newList)
  }

  useEffect(() => {
    setExistingElementKeys(getDoubleKeysFromArray(updatingValueList))
  }, [updatingValueList])

  return (
    <>
      <Form>
        <ul>
          {updatingValueList.map((item, index) => {
            return (
              <KeyValuePair
                key={item.id}
                id={item.id}
                keyPair={item.key}
                valuePair={item.value}
                onValueChange={(value: string) =>
                  handleValueChange(value, index)
                }
                onKeyChange={(value: string) => handleKeyChange(value, index)}
                onDeleteKey={() => deleteItem(item.id)}
                isExisting={existingElementKeys.some((key) => key === item.key)}
                isRequired={item.isRequired}
              />
            )
          })}
        </ul>
        {mayAddItem && (
          <Button
            buttonSize="xs"
            leftIcon={
              <svg
                aria-hidden="true"
                viewBox="0 0 448 512"
                width="1em"
                height="1em"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" fill="currentColor"></path>
              </svg>
            }
            disabled={isKeyInArray(updatingValueList, '')}
            onClick={handleAddItem}
          >
            <span>Add item</span>
          </Button>
        )}
      </Form>
      {existingElementKeys.length > 0 && (
        <p className={styles.error}>All keys need to be unique. Saving this can result in data loss.</p>
      )}
    </>
  )
}
