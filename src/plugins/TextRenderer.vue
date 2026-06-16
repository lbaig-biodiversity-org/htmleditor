<template>
  <div class="text-node">
    {{ node.props.text }}
  </div>
</template>

<script setup lang="ts">
import type { EditorNode } from '../types/editor'
defineProps<{ node: EditorNode }>()
</script>

<style scoped>
.text-node {
  padding: 14px 16px;
  background: #fff;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1e2a3a;
  min-height: 44px;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
