<template>
  <div class="inspector">
    <div class="field">
      <label class="field-label" for="text-input">Text</label>
      <textarea
        id="text-input"
        class="field-textarea"
        :value="(node.props.text as string)"
        rows="4"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditorNode } from '../types/editor'
import { useEditorStore } from '../store/editor'

const props = defineProps<{ node: EditorNode }>()
const store = useEditorStore()

function onInput(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
  store.updateNodeProps(props.node.id, { text: value })
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

.field-textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e2e6ef;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;
  color: #1e2a3a;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.field-textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
</style>
