<template>
  <div
    class="node-wrapper"
    :class="{ selected: isSelected }"
    @click.stop="store.selectNode(node.id)"
  >
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
        v-for="child in node.children"
        :key="child.id"
        :node="child"
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

const props = defineProps<{ node: EditorNode }>()

const store = useEditorStore()
const { getType } = useEditorRegistry()

const typeDef = computed(() => getType(props.node.type))
const isSelected = computed(() => store.selectedNodeId === props.node.id)

function onDropChild(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/editor-type')
  if (!type) return
  const childTypeDef = getType(type)
  if (!childTypeDef) return
  const newNode = childTypeDef.createDefault()
  if (!props.node.children) {
    props.node.children = []
  }
  props.node.children.push(newNode)
}
</script>

<style scoped>
.node-wrapper {
  margin-bottom: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.15s;
}

.node-wrapper.selected {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
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
