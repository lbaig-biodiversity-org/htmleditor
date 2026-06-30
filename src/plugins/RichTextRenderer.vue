<template>
  <div class="rich-text-node">
    <EditorContent v-if="editor" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import type { EditorNode } from '../types/editor'

const props = defineProps<{ node: EditorNode }>()

const html = computed(() => (props.node.props.html as string) || '<p></p>')

const editor = useEditor({
  editable: false,
  extensions: [StarterKit],
  content: html.value,
  editorProps: {
    attributes: {
      class: 'rich-text-content',
    },
  },
})

watch(html, (value) => {
  if (!editor.value) return
  if (value === editor.value.getHTML()) return
  editor.value.commands.setContent(value, { emitUpdate: false })
})
</script>

<style scoped>
.rich-text-node {
  background: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  min-height: 44px;
}

.rich-text-node :deep(.rich-text-content) {
  outline: none;
}

.rich-text-node :deep(.rich-text-content > *:first-child) {
  margin-top: 0;
}

.rich-text-node :deep(.rich-text-content > *:last-child) {
  margin-bottom: 0;
}

.rich-text-node :deep(h1),
.rich-text-node :deep(h2),
.rich-text-node :deep(h3) {
  line-height: 1.2;
  margin: 1em 0 0.5em;
}

.rich-text-node :deep(p) {
  margin: 0.75em 0;
}

.rich-text-node :deep(ul),
.rich-text-node :deep(ol) {
  margin: 0.75em 0;
  padding-left: 1.25rem;
}
</style>
