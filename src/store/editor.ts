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

// Returns the array that directly contains the node with the given id
function findContainingArray(nodes: EditorNode[], id: string): EditorNode[] | null {
  for (const node of nodes) {
    if (node.id === id) return nodes
    if (node.children?.length) {
      const found = findContainingArray(node.children, id)
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

    addChildNode(parentId: string, node: EditorNode) {
      const parent = findNode(this.document, parentId)
      if (!parent) return
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(node)
    },

    addRootNode(node: EditorNode) {
      this.document.push(node)
    },

    updateNodeProps(id: string, patch: Record<string, unknown>) {
      const node = findNode(this.document, id)
      if (!node) return
      node.props = { ...node.props, ...patch }
    },

    moveNodeUp(id: string) {
      const arr = findContainingArray(this.document, id)
      if (!arr) return
      const idx = arr.findIndex((n) => n.id === id)
      if (idx <= 0) return
      const tmp = arr[idx - 1]
      arr[idx - 1] = arr[idx]
      arr[idx] = tmp
    },

    moveNodeDown(id: string) {
      const arr = findContainingArray(this.document, id)
      if (!arr) return
      const idx = arr.findIndex((n) => n.id === id)
      if (idx < 0 || idx >= arr.length - 1) return
      const tmp = arr[idx + 1]
      arr[idx + 1] = arr[idx]
      arr[idx] = tmp
    },

    deleteNode(id: string) {
      const arr = findContainingArray(this.document, id)
      if (!arr) return
      const idx = arr.findIndex((n) => n.id === id)
      if (idx < 0) return

      const removedNode = arr[idx]
      if (
        this.selectedNodeId &&
        (this.selectedNodeId === id || findNode([removedNode], this.selectedNodeId))
      ) {
        this.selectedNodeId = null
      }

      arr.splice(idx, 1)
    },
  },
})
