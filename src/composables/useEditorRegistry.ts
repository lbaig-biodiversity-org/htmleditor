import { shallowReactive } from 'vue'
import type { ContentTypeDefinition, EditorPlugin } from '../types/editor'

const registry = shallowReactive(new Map<string, ContentTypeDefinition>())

export function useEditorRegistry() {
  function registerPlugin(plugin: EditorPlugin) {
    for (const typeDef of plugin.contentTypes) {
      registry.set(typeDef.type, typeDef)
    }
  }

  function getType(type: string): ContentTypeDefinition | undefined {
    return registry.get(type)
  }

  function getAllTypes(): ContentTypeDefinition[] {
    return Array.from(registry.values())
  }

  return {
    registerPlugin,
    getType,
    getAllTypes,
  }
}
