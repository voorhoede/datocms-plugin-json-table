import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './key-value-pair.css'

export default function KeyValuePair({
  id,
  keyPair,
  valuePair,
  onValueChange,
  onKeyChange,
  onDeleteKey,
  isExisting,
  isRequired,
}) {
  const [inputKey, setInputKey] = useState(keyPair)
  const [inputValue, setInputValue] = useState(valuePair)
  const inputIsDisabled = id.indexOf('default') === 0 && isRequired

  function handleKeyChange(event) {
    onKeyChange(event.target.value)
    setInputKey(event.target.value)
  }

  function handleValueChange(event) {
    onValueChange(event.target.value)
    setInputValue(event.target.value)
  }

  function handleDeleteKey(e) {
    e.preventDefault()
    onDeleteKey(inputKey)
  }

  return (
    <li className="key-value-pair">
      <label className="sr-only" htmlFor={`${id}-key`}>
        Change value of the key
      </label>
      <input
        type="text"
        className={isExisting ? 'key-value-pair__input--error' : ''}
        id={`${id}-key`}
        defaultValue={inputKey}
        disabled={inputIsDisabled}
        onChange={handleKeyChange}
      />
      <label className="sr-only" htmlFor={`${id}-value`}>
        {isRequired
          ? `Required field to change value that has the key: ${inputKey}`
          : `Change value that has the key: ${inputKey}`}
      </label>
      <input
        type="text"
        className={
          isRequired && inputValue === '' ? 'key-value-pair__input--error' : ''
        }
        id={`${id}-value`}
        placeholder={isRequired ? 'This field is required' : ''}
        defaultValue={inputValue}
        required={isRequired}
        onChange={handleValueChange}
      />
      {!inputIsDisabled && (
        <button
          type="button"
          className="button button--danger"
          onClick={handleDeleteKey}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 448 512"
            width="1em"
            height="1em"
          >
            <path d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM53.2 467a48 48 0 0047.9 45h245.8a48 48 0 0047.9-45L416 128H32z"></path>
          </svg>
          <span className="sr-only">Delete item</span>
        </button>
      )}
    </li>
  )
}

KeyValuePair.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keyPair: PropTypes.string,
  valuePair: PropTypes.string,
  onValueChange: PropTypes.func,
  onKeyChange: PropTypes.func,
  onDeleteKey: PropTypes.func,
  isExisting: PropTypes.bool,
  isRequired: PropTypes.bool,
}
