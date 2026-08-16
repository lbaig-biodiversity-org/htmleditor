<template>
  <div class="container-header">
    <span class="container-icon">📦</span>
    <span class="container-label">{{ (node.props.label as string) || 'Container' }}</span>
  </div>
</template>

<script setup lang="ts">
import type { EditorNode } from '../types/editor'
defineProps<{ node: EditorNode }>()
</script>

<style scoped>
.container-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e6ef;
  border-radius: 6px 6px 0 0;
}

.container-icon {
  font-size: 0.95rem;
}

.container-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
</style>
