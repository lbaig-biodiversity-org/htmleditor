import type { EditorPlugin } from '../types/editor'
import { createId } from '../utils/id'
import TextRenderer from './TextRenderer.vue'
import TextInspector from './TextInspector.vue'
import ImageRenderer from './ImageRenderer.vue'
import ImageInspector from './ImageInspector.vue'

export const textPlugin: EditorPlugin = {
  id: 'core-text',
  contentTypes: [
    {
      type: 'text',
      label: 'Text',
      icon: '📝',
      createDefault: () => ({
        id: createId(),
        type: 'text',
        props: {
          text: 'Edit me',
        },
      }),
      renderComponent: TextRenderer,
      inspectorComponent: TextInspector,
    },
  ],
}

export const imagePlugin: EditorPlugin = {
  id: 'core-image',
  contentTypes: [
    {
      type: 'image',
      label: 'Image',
      icon: '🖼️',
      createDefault: () => ({
        id: createId(),
        type: 'image',
        props: {
          src: '',
          alt: '',
        },
      }),
      renderComponent: ImageRenderer,
      inspectorComponent: ImageInspector,
    },
  ],
}
