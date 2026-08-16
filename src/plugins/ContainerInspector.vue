<template>
  <div class="inspector">
    <div class="field">
      <label class="field-label" for="container-label">Label</label>
      <input
        id="container-label"
        class="field-input"
        type="text"
        :value="(node.props.label as string)"
        placeholder="Container"
        @input="onInput('label', $event)"
      />
    </div>

    <div class="field">
      <label class="field-label" for="container-direction">Layout direction</label>
      <select
        id="container-direction"
        class="field-select"
        :value="(node.props.direction as string)"
        @change="onInput('direction', $event)"
      >
        <option value="column">Vertical (column)</option>
        <option value="row">Horizontal (row)</option>
      </select>
    </div>

    <div class="field">
      <label class="field-label" for="container-gap">Gap (px)</label>
      <input
        id="container-gap"
        class="field-input"
        type="number"
        min="0"
        max="96"
        :value="(node.props.gap as number)"
        @input="onNumberInput('gap', $event)"
      />
    </div>

    <div class="field">
      <label class="field-label" for="container-padding">Padding (px)</label>
      <input
        id="container-padding"
        class="field-input"
        type="number"
        min="0"
        max="96"
        :value="(node.props.padding as number)"
        @input="onNumberInput('padding', $event)"
      />
    </div>

    <div class="field">
      <label class="field-label" for="container-bg">Background color</label>
      <div class="color-row">
        <input
          id="container-bg"
          class="field-color"
          type="color"
          :value="(node.props.background as string)"
          @input="onInput('background', $event)"
        />
        <input
          class="field-input"
          type="text"
          :value="(node.props.background as string)"
          placeholder="#ffffff"
          @input="onInput('background', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditorNode } from '../types/editor'
import { useEditorStore } from '../store/editor'

const props = defineProps<{ node: EditorNode }>()
const store = useEditorStore()

function onInput(key: string, event: Event) {
  const value = (event.target as HTMLInputElement | HTMLSelectElement).value
  store.updateNodeProps(props.node.id, { [key]: value })
}

function onNumberInput(key: string, event: Event) {
  const raw = (event.target as HTMLInputElement).value
  if (raw === '') return
  const value = parseInt(raw, 10)
  if (!isNaN(value)) {
    store.updateNodeProps(props.node.id, { [key]: value })
  }
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

.field-select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e2e6ef;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #1e2a3a;
  background: #fff;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.field-select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.color-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.field-color {
  width: 38px;
  height: 38px;
  padding: 2px;
  border: 1px solid #e2e6ef;
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
