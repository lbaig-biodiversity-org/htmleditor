<template>
  <header class="topbar">
    <span class="topbar-logo">🧩</span>
    <h1 class="topbar-title">Vue Drag &amp; Drop Editor</h1>
  </header>
</template>

<style scoped>
.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border-bottom: 1px solid #e2e6ef;
  background: #fff;
  flex-shrink: 0;
}

.topbar-logo {
  font-size: 1.4rem;
}

.topbar-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e2a3a;
}
</style>
