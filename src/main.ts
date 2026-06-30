import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import { useEditorRegistry } from './composables/useEditorRegistry'
import { textPlugin, imagePlugin, containerPlugin } from './plugins'

const app = createApp(App)
app.use(createPinia())

// Register built-in plugins before mounting so the registry is ready
const { registerPlugin } = useEditorRegistry()
registerPlugin(textPlugin)
registerPlugin(imagePlugin)
registerPlugin(containerPlugin)

app.mount('#app')
