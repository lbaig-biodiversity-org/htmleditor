import type { EditorPlugin } from '../types/editor'
import { createId } from '../utils/id'
import TextRenderer from './TextRenderer.vue'
import TextInspector from './TextInspector.vue'
import ImageRenderer from './ImageRenderer.vue'
import ImageInspector from './ImageInspector.vue'
import ContainerRenderer from './ContainerRenderer.vue'
import ContainerInspector from './ContainerInspector.vue'

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

export const containerPlugin: EditorPlugin = {
  id: 'core-container',
  contentTypes: [
    {
      type: 'container',
      label: 'Container',
      icon: '📦',
      canHaveChildren: true,
      createDefault: () => ({
        id: createId(),
        type: 'container',
        props: {
          label: 'Container',
          direction: 'column',
          gap: 8,
          padding: 8,
          background: '#ffffff',
        },
        children: [],
      }),
      renderComponent: ContainerRenderer,
      inspectorComponent: ContainerInspector,
    },
  ],
}
