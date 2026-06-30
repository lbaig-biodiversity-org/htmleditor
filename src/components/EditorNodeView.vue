<template>
  <div
    class="node-wrapper"
    :class="{ selected: isSelected }"
    @click.stop="store.selectNode(node.id)"
  >
    <!-- Reorder / node controls -->
    <div class="node-controls" @click.stop>
      <button
        class="ctrl-btn"
        :disabled="isFirst"
        title="Move up"
        @click="store.moveNodeUp(node.id)"
      >↑</button>
      <button
        class="ctrl-btn"
        :disabled="isLast"
        title="Move down"
        @click="store.moveNodeDown(node.id)"
      >↓</button>
    </div>

    <component
      v-if="typeDef"
      :is="typeDef.renderComponent"
      :node="node"
    />
    <div v-else class="unknown-node">
      Unknown type: <code>{{ node.type }}</code>
    </div>

    <!-- Recursive children if the type supports them -->
    <div
      v-if="typeDef?.canHaveChildren"
      class="children-drop-zone"
      @dragover.prevent
      @drop.stop="onDropChild"
    >
      <EditorNodeView
        v-for="(child, i) in node.children"
        :key="child.id"
        :node="child"
        :isFirst="i === 0"
        :isLast="i === (node.children?.length ?? 0) - 1"
      />
      <div v-if="!node.children?.length" class="children-placeholder">
        Drop here
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EditorNode } from '../types/editor'
import { useEditorStore } from '../store/editor'
import { useEditorRegistry } from '../composables/useEditorRegistry'

const props = defineProps<{
  node: EditorNode
  isFirst?: boolean
  isLast?: boolean
}>()

const store = useEditorStore()
const { getType } = useEditorRegistry()

const typeDef = computed(() => getType(props.node.type))
const isSelected = computed(() => store.selectedNodeId === props.node.id)

function onDropChild(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/editor-type')
  if (!type) return
  const childTypeDef = getType(type)
  if (!childTypeDef) return
  store.addChildNode(props.node.id, childTypeDef.createDefault())
}
</script>

<style scoped>
.node-wrapper {
  position: relative;
  margin-bottom: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.15s;
}

.node-wrapper.selected {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

/* Controls bar: hidden until hover or selected */
.node-controls {
  display: none;
  position: absolute;
  top: 4px;
  right: 4px;
  gap: 2px;
  z-index: 10;
}

.node-wrapper:hover .node-controls,
.node-wrapper.selected .node-controls {
  display: flex;
}

.ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: #fff;
  border: 1px solid #e2e6ef;
  border-radius: 4px;
  font-size: 0.8rem;
  line-height: 1;
  cursor: pointer;
  color: #475569;
  transition: background 0.1s, border-color 0.1s, color 0.1s;
}

.ctrl-btn:hover:not(:disabled) {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #fff;
}

.ctrl-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.unknown-node {
  padding: 12px;
  background: #fff1f2;
  color: #9f1239;
  border-radius: 8px;
  font-size: 0.85rem;
}

.children-drop-zone {
  margin: 8px;
  min-height: 48px;
  border: 2px dashed #c9cfdb;
  border-radius: 6px;
  padding: 8px;
}

.children-placeholder {
  text-align: center;
  color: #94a3b8;
  font-size: 0.8rem;
  padding: 8px 0;
}
</style>
