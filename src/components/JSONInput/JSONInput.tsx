import { useRef, useState } from 'react'
import { FieldError } from 'datocms-react-ui'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'

import { editorDidMount, editorWillUnmount } from './mount'

import 'codemirror/lib/codemirror.css'
import './datocmsJSONInputTheme.css'

type Props = {
  fieldValue: string
  onChange: (value: string) => void
}

export default function JSONInput({ fieldValue, onChange }: Props) {
  const [invalidFormat, setInvalidFormat] = useState(false)
  const editorRef = useRef(null)
  const wrapperRef = useRef(null)

  function handleOnBlur(value: string) {
    try {
      JSON.parse(value)
      setInvalidFormat(false)
      onChange(value)
    } catch (error) {
      console.error('Invalid JSON:', error)
      setInvalidFormat(true)
    }
  }

  return (
    <>
      <CodeMirror
        ref={wrapperRef}
        className="JsonInput"
        value={fieldValue}
        options={{
          mode: 'javascript',
          lineNumbers: true,
          theme: 'default',
          tabSize: 2,
          smartIndent: false,
        }}
        editorDidMount={(editorElement) => {
          editorDidMount(editorElement, editorRef)
        }}
        editorWillUnmount={() => editorWillUnmount(editorRef, wrapperRef)}
        onBlur={(editor) => {
          const value = editor.getValue()
          handleOnBlur(value)
        }}
      />

      {invalidFormat && <FieldError>Format not valid</FieldError>}
    </>
  )
}
