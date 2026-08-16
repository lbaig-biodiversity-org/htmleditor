<template>
  <aside class="details">
    <h2 class="details-heading">Details</h2>

    <div v-if="!store.selectedNode" class="details-empty">
      Select an element on the canvas to edit its properties.
    </div>

    <template v-else>
      <div class="details-type-badge">{{ typeDef?.label ?? store.selectedNode.type }}</div>
      <component
        v-if="typeDef"
        :is="typeDef.inspectorComponent"
        :node="store.selectedNode"
      />
      <div v-else class="details-no-inspector">
        No inspector available for this type.
      </div>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '../store/editor'
import { useEditorRegistry } from '../composables/useEditorRegistry'

const store = useEditorStore()
const { getType } = useEditorRegistry()

const typeDef = computed(() =>
  store.selectedNode ? getType(store.selectedNode.type) : null
)
</script>

<style scoped>
.details {
  width: 300px;
  flex-shrink: 0;
  border-left: 1px solid #e2e6ef;
  padding: 16px;
  background: #fff;
  overflow-y: auto;
}

.details-heading {
  margin: 0 0 16px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #667085;
}

.details-empty {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.5;
}

.details-type-badge {
  display: inline-block;
  padding: 2px 10px;
  margin-bottom: 14px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.details-no-inspector {
  font-size: 0.85rem;
  color: #94a3b8;
}
</style>
