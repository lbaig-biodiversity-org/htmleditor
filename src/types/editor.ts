import type { Component } from 'vue'

export type EditorNode = {
  id: string
  type: string
  props: Record<string, unknown>
  children?: EditorNode[]
}

export type ContentTypeDefinition = {
  type: string
  label: string
  icon?: string
  createDefault: () => EditorNode
  renderComponent: Component
  inspectorComponent: Component
  canHaveChildren?: boolean
}

export type EditorPlugin = {
  id: string
  contentTypes: ContentTypeDefinition[]
}
