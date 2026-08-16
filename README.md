# htmleditor

A Vue 3 drag-and-drop editor with a plugin-based content type system.

## Features

- **Drag-and-drop canvas** — drag content types from the toolbox onto the editor canvas
- **Plugin architecture** — register new content types with custom renderer and inspector components
- **Details panel** — plugin-provided inspector UI for the currently selected element
- **Selection state** — selected elements are highlighted on the canvas

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
  main.ts                        # App bootstrap & plugin registration
  App.vue                        # Root component
  style.css                      # Global reset

  types/
    editor.ts                    # Shared TypeScript types

  utils/
    id.ts                        # ID generator

  composables/
    useEditorRegistry.ts         # Plugin / content-type registry

  store/
    editor.ts                    # Pinia store (document, selection, update)

  components/
    EditorShell.vue              # App layout shell
    TopBar.vue                   # Top navigation bar
    ToolboxPanel.vue             # Draggable component palette
    CanvasPanel.vue              # Drop target canvas
    EditorNodeView.vue           # Recursive node renderer
    DetailsPanel.vue             # Selected-node inspector panel

  plugins/
    index.ts                     # Built-in plugin definitions
    TextRenderer.vue             # Renders a text node
    TextInspector.vue            # Inspector for text nodes
    ImageRenderer.vue            # Renders an image node
    ImageInspector.vue           # Inspector for image nodes
```

## Adding a plugin

Implement an `EditorPlugin` and call `registerPlugin` before mounting:

```ts
import { useEditorRegistry } from './composables/useEditorRegistry'
import MyRenderer from './plugins/MyRenderer.vue'
import MyInspector from './plugins/MyInspector.vue'
import { createId } from './utils/id'

const { registerPlugin } = useEditorRegistry()

registerPlugin({
  id: 'my-plugin',
  contentTypes: [
    {
      type: 'my-type',
      label: 'My Component',
      icon: '✨',
      createDefault: () => ({ id: createId(), type: 'my-type', props: { value: '' } }),
      renderComponent: MyRenderer,
      inspectorComponent: MyInspector,
    },
  ],
})
```
