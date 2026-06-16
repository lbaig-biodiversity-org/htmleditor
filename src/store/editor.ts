import { defineStore } from 'pinia'
import type { EditorNode } from '../types/editor'

function findNode(nodes: EditorNode[], id: string): EditorNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

export const useEditorStore = defineStore('editor', {
  state: () => ({
    document: [] as EditorNode[],
    selectedNodeId: null as string | null,
  }),

  getters: {
    selectedNode(state): EditorNode | null {
      if (!state.selectedNodeId) return null
      return findNode(state.document, state.selectedNodeId)
    },
  },

  actions: {
    selectNode(id: string | null) {
      this.selectedNodeId = id
    },

    addRootNode(node: EditorNode) {
      this.document.push(node)
    },

    updateNodeProps(id: string, patch: Record<string, unknown>) {
      const node = findNode(this.document, id)
      if (!node) return
      node.props = { ...node.props, ...patch }
    },
  },
})
