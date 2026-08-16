<template>
  <div class="image-node">
    <img
      v-if="node.props.src"
      :src="(node.props.src as string)"
      :alt="(node.props.alt as string) || ''"
      class="image-el"
    />
    <div v-else class="image-placeholder">
      🖼️ No image — set a URL in the Details panel
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditorNode } from '../types/editor'
defineProps<{ node: EditorNode }>()
</script>

<style scoped>
.image-node {
  background: #fff;
  padding: 12px;
  border-radius: 8px;
}

.image-el {
  max-width: 100%;
  display: block;
  border-radius: 4px;
}

.image-placeholder {
  padding: 24px;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  background: #f8f9fc;
  border: 1px dashed #c9cfdb;
  border-radius: 6px;
}
</style>
