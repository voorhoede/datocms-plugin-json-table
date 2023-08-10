import {
  connect,
  OnBootCtx,
  RenderFieldExtensionCtx,
  RenderManualFieldExtensionConfigScreenCtx,
} from 'datocms-plugin-sdk'
import { render } from './utils/render'
import migrateFields from './lib/migrateFields'

import ConfigScreen from './entrypoints/ConfigScreen'
import FieldExtension from './entrypoints/FieldExtension'
import FieldExtensionConfigScreen from './entrypoints/FieldExtensionConfigScreen'

import 'datocms-react-ui/styles.css'
import './styles/index.css'

const fieldSettings = {
  id: 'jsonTable',
  name: 'JSON table',
}

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  manualFieldExtensions() {
    return [
      {
        id: fieldSettings.id,
        name: fieldSettings.name,
        type: 'editor',
        fieldTypes: ['json'],
        configurable: true,
      },
    ]
  },
  renderManualFieldExtensionConfigScreen(
    _,
    ctx: RenderManualFieldExtensionConfigScreenCtx,
  ) {
    return render(<FieldExtensionConfigScreen ctx={ctx} />)
  },
  renderFieldExtension(_, ctx: RenderFieldExtensionCtx) {
    return render(<FieldExtension ctx={ctx} />)
  },
  async onBoot(ctx: OnBootCtx) {
    await migrateFields(ctx, fieldSettings.id)
  },
})
