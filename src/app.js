import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/app-header/app-header'
import PairList from './components/pair-list/pair-list'
import { arrayToObj, objectToArray, getArrayFromList } from '../lib/helpers'

export default function App({ plugin }) {
  const fieldPath = JSON.parse(plugin.getFieldValue(plugin.fieldPath)) || {}
  const requiredFields = getArrayFromList(
    plugin.parameters.instance.requiredFields
  )

  const valueObj = requiredFields.reduce((acc, field) => {
    if (acc[field]) {
      return acc
    } else {
      return {
        ...acc,
        [field]: '',
      }
    }
  }, fieldPath)

  const valueList = objectToArray(valueObj).map(item => {
    return {
      ...item,
      isRequired: requiredFields.indexOf(item.key) !== -1,
    }
  })

  function handleUpdateField(updatedValueList) {
    const updatedValueObj = arrayToObj(updatedValueList)
    delete updatedValueObj['']
    const updatedFieldPath = JSON.stringify(updatedValueObj)
    plugin.setFieldValue(plugin.fieldPath, updatedFieldPath)
  }

  return (
    <>
      <AppHeader />
      <PairList
        valueList={valueList}
        mayAddItem={plugin.parameters.instance.addItem}
        onUpdateField={handleUpdateField}
      />
    </>
  )
}

App.propTypes = {
  plugin: PropTypes.object.isRequired,
}
