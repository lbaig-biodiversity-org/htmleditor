<template>
  <aside class="toolbox">
    <h2 class="toolbox-heading">Components</h2>
    <div
      v-for="typeDef in types"
      :key="typeDef.type"
      class="toolbox-item"
      draggable="true"
      @dragstart="onDragStart($event, typeDef.type)"
    >
      <span v-if="typeDef.icon" class="toolbox-item-icon">{{ typeDef.icon }}</span>
      {{ typeDef.label }}
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorRegistry } from '../composables/useEditorRegistry'

const { getAllTypes } = useEditorRegistry()
const types = computed(() => getAllTypes())

function onDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/editor-type', type)
}
</script>

<style scoped>
.toolbox {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #e2e6ef;
  padding: 16px;
  background: #f8f9fc;
  overflow-y: auto;
}

.toolbox-heading {
  margin: 0 0 12px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #667085;
}

.toolbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: #fff;
  border: 1px solid #e2e6ef;
  border-radius: 8px;
  cursor: grab;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e2a3a;
  transition: box-shadow 0.15s, border-color 0.15s;
  user-select: none;
}

.toolbox-item:hover {
  border-color: #4f46e5;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.1);
}

.toolbox-item-icon {
  font-size: 1.1rem;
}
</style>
