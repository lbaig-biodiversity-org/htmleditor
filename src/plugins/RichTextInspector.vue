<template>
  <div class="inspector">
    <div class="toolbar">
      <button class="tool-btn" :class="{ active: editor?.isActive('bold') }" @click="toggleBold">
        B
      </button>
      <button class="tool-btn" :class="{ active: editor?.isActive('italic') }" @click="toggleItalic">
        I
      </button>
      <button
        class="tool-btn"
        :class="{ active: editor?.isActive('heading', { level: 2 }) }"
        @click="toggleHeading"
      >
        H2
      </button>
      <button
        class="tool-btn"
        :class="{ active: editor?.isActive('bulletList') }"
        @click="toggleBulletList"
      >
        • List
      </button>
      <button
        class="tool-btn"
        :class="{ active: editor?.isActive('orderedList') }"
        @click="toggleOrderedList"
      >
        1. List
      </button>
    </div>

    <EditorContent v-if="editor" :editor="editor" class="editor-surface" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import type { EditorNode } from '../types/editor'
import { useEditorStore } from '../store/editor'

const props = defineProps<{ node: EditorNode }>()
const store = useEditorStore()

const html = computed(() => (props.node.props.html as string) || '<p></p>')

const editor = useEditor({
  extensions: [StarterKit],
  content: html.value,
  editorProps: {
    attributes: {
      class: 'rich-text-content',
    },
  },
  onUpdate({ editor }) {
    store.updateNodeProps(props.node.id, { html: editor.getHTML() })
  },
})

watch(html, (value) => {
  if (!editor.value) return
  if (value === editor.value.getHTML()) return
  editor.value.commands.setContent(value, { emitUpdate: false })
})

function toggleBold() {
  editor.value?.chain().focus().toggleBold().run()
}

function toggleItalic() {
  editor.value?.chain().focus().toggleItalic().run()
}

function toggleHeading() {
  editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
}

function toggleBulletList() {
  editor.value?.chain().focus().toggleBulletList().run()
}

function toggleOrderedList() {
  editor.value?.chain().focus().toggleOrderedList().run()
}
</script>

<style scoped>
.inspector {
  display: grid;
  gap: 10px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tool-btn {
  border: 1px solid #d7dce8;
  background: #fff;
  color: #334155;
  border-radius: 6px;
  padding: 5px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.tool-btn.active {
  border-color: #4f46e5;
  color: #4f46e5;
  background: #eef2ff;
}

.editor-surface {
  border: 1px solid #e2e6ef;
  border-radius: 8px;
  min-height: 180px;
  padding: 10px;
  background: #fff;
}

.editor-surface :deep(.rich-text-content) {
  min-height: 160px;
  outline: none;
}

.editor-surface :deep(p:first-child) {
  margin-top: 0;
}
</style>
