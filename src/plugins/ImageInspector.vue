<template>
  <div class="inspector">
    <div class="field">
      <label class="field-label" for="img-src">Image URL</label>
      <input
        id="img-src"
        class="field-input"
        type="url"
        :value="(node.props.src as string)"
        placeholder="https://example.com/image.png"
        @input="onSrcInput"
      />
    </div>

    <div class="field">
      <label class="field-label" for="img-alt">Alt text</label>
      <input
        id="img-alt"
        class="field-input"
        type="text"
        :value="(node.props.alt as string)"
        placeholder="Describe the image"
        @input="onAltInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditorNode } from '../types/editor'
import { useEditorStore } from '../store/editor'

const props = defineProps<{ node: EditorNode }>()
const store = useEditorStore()

function onSrcInput(event: Event) {
  store.updateNodeProps(props.node.id, {
    src: (event.target as HTMLInputElement).value,
  })
}

function onAltInput(event: Event) {
  store.updateNodeProps(props.node.id, {
    alt: (event.target as HTMLInputElement).value,
  })
}
</script>

<style scoped>
.inspector {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 6px;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
}

.field-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e2e6ef;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #1e2a3a;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.field-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
</style>
