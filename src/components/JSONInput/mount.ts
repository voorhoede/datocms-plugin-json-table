import { type Editor } from 'codemirror'
import { UnControlled as CodeMirror } from 'react-codemirror2'

export function editorWillUnmount(
  editorRef: React.RefObject<Editor>,
  wrapperRef: React.RefObject<CodeMirror & { hydrated: boolean }>,
) {
  if (editorRef.current) {
    const editorWrapper = editorRef.current.getWrapperElement()
    if (editorWrapper) editorWrapper.remove()
  }
  if (wrapperRef.current) {
    wrapperRef.current.hydrated = false
  }
}

export function editorDidMount(
  editorElement: Editor,
  editorRef: React.RefObject<Editor>,
) {
  ;(editorRef as React.MutableRefObject<Editor>).current = editorElement
}
