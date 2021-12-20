import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      <p>
        This DatoCMS plugin makes it possible to add/insert a key and value to
        output a simple JSON table. The plugin is build as a custom field editor
        for DatoCMS JSON fields.
      </p>
    </Canvas>
  )
}
