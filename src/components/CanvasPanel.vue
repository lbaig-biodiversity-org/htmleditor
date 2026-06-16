<template>
  <main
    class="canvas"
    :class="{ 'drag-over': isDragOver }"
    @dragover.prevent="isDragOver = true"
    @dragleave="isDragOver = false"
    @drop="onDrop"
    @click="store.selectNode(null)"
  >
    <div v-if="store.document.length === 0" class="empty-state">
      <div class="empty-icon">⬇️</div>
      <div class="empty-text">Drag components here to get started</div>
    </div>

    <EditorNodeView
      v-for="node in store.document"
      :key="node.id"
      :node="node"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '../store/editor'
import { useEditorRegistry } from '../composables/useEditorRegistry'
import EditorNodeView from './EditorNodeView.vue'

const store = useEditorStore()
const { getType } = useEditorRegistry()
const isDragOver = ref(false)

function onDrop(event: DragEvent) {
  isDragOver.value = false
  const type = event.dataTransfer?.getData('application/editor-type')
  if (!type) return

  const typeDef = getType(type)
  if (!typeDef) return

  store.addRootNode(typeDef.createDefault())
}
</script>

<style scoped>
.canvas {
  flex: 1;
  padding: 20px;
  background: #f1f4f9;
  overflow-y: auto;
  transition: background 0.15s;
}

.canvas.drag-over {
  background: #eef0ff;
}

.empty-state {
  height: 100%;
  min-height: 320px;
  border: 2px dashed #c9cfdb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #667085;
  background: #fff;
}

.empty-icon {
  font-size: 2rem;
}

.empty-text {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
