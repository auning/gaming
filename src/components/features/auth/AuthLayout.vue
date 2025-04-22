<script setup>
import AuthLeftContent from './AuthLeftContent.vue'

defineProps({
  formTitle: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="auth-view">
    <div class="content-container">
      <div class="left-section">
        <AuthLeftContent />
      </div>
      <div class="right-section">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-view {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: visible;
  background-color: transparent;
  z-index: 2;
}

.content-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 2;
  justify-content: center;
  align-items: center;
}

.left-section {
  position: absolute;
  left: 320px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.right-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media (max-width: 1024px) {
  .left-section {
    display: none;
  }
}
</style>
