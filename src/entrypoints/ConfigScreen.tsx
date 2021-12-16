import { useEffect, useState } from 'react'
import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'
import ReactMarkdown from 'react-markdown'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  const fileName = 'README.md'
  const [markDown, setMarkDown] = useState('')

  useEffect(() => {
    import(`../../${fileName}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setMarkDown(res))
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log(markDown)
  }, [markDown])

  return (
    <Canvas ctx={ctx}>
      <ReactMarkdown disallowedElements={['img', 'h1']} linkTarget="_parent _blank">{markDown}</ReactMarkdown>
    </Canvas>
  )
}
