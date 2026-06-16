<template>
  <div class="shell">
    <TopBar />
    <div class="body">
      <ToolboxPanel />
      <CanvasPanel />
      <DetailsPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from './TopBar.vue'
import ToolboxPanel from './ToolboxPanel.vue'
import CanvasPanel from './CanvasPanel.vue'
import DetailsPanel from './DetailsPanel.vue'
</script>

<style scoped>
.shell {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.body {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}
</style>
