import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import KeyValuePair from '../key-value-pair/key-value-pair'
import {
  isKeyInArray,
  getDoubleKeysFromArray,
} from '../../lib/helpers'
import './pair-list.css'

export default function PairList({
  valueList,
  mayAddItem,
  onUpdateField,
}) {
  const [updatingValueList, setUpdatingValueList] = useState(valueList)
  const [newItemId, setNewItemId] = useState(0)
  const [existingElementKeys, setExistingElementKeys] = useState([])

  function handleUpdateField(updatedValueList) {
    setUpdatingValueList(updatedValueList)
    onUpdateField(updatedValueList)
  }

  function handleAddItem(e) {
    e.preventDefault()
    if (!isKeyInArray(updatingValueList, '')) {
      setNewItemId(newItemId + 1)
      setUpdatingValueList([
        ...updatingValueList,
        { key: '', value: '', id: `added-${newItemId}` },
      ])
    }
  }

  function handleKeyChange(key, index) {
    const newObj = {
      ...updatingValueList[index],
      key: key,
    }

    let newList = [...updatingValueList]
    newList[index] = newObj

    handleUpdateField(newList)
  }

  function handleValueChange(value, index) {
    const newObj = {
      ...updatingValueList[index],
      value: value,
    }
    let newList = [...updatingValueList]
    newList[index] = newObj

    handleUpdateField(newList)
  }

  function deleteItem(idToDelete) {
    const newList = updatingValueList.filter((item) => idToDelete !== item.id)
    handleUpdateField(newList)
  }

  useEffect(() => {
    setExistingElementKeys(getDoubleKeysFromArray(updatingValueList))
  }, [updatingValueList])

  return (
    <>
      <form>
        <ul>
          {updatingValueList.map((item, index) => {
            return (
              <KeyValuePair
                key={item.id}
                id={item.id}
                keyPair={item.key}
                valuePair={item.value}
                onValueChange={(value) => handleValueChange(value, index)}
                onKeyChange={(value) => handleKeyChange(value, index)}
                onDeleteKey={() => deleteItem(item.id)}
                isExisting={existingElementKeys.some((key) => key === item.key)}
                isRequired={item.isRequired}
              />
            )
          })}
        </ul>
        {mayAddItem && (
          <button
            className="button button--small"
            type="button"
            disabled={isKeyInArray(updatingValueList, '')}
            onClick={handleAddItem}
          >
            <svg aria-hidden="true" viewBox="0 0 448 512" width="1em" height="1em">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
            </svg>
            <span>Add item</span>
          </button>
        )}
      </form>
      {existingElementKeys.length > 0 && (
        <p className="pair-list__error">All keys need to be unique</p>
      )}
    </>
  )
}

PairList.propTypes = {
  valueList: PropTypes.array.isRequired,
  mayAddItem: PropTypes.bool,
  onUpdateField: PropTypes.func,
}
