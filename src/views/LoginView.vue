<script setup>
import AuthLayout from '@/components/features/auth/AuthLayout.vue'
import LoginForm from '@/components/features/auth/LoginForm.vue'
</script>

<template>
  <div class="login-view">
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  </div>
</template>

<style scoped>
.login-view {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: url('/images/login/login-background.jpg') center center / cover no-repeat fixed;
}

.content-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .content-container {
    justify-content: center;
    align-items: center;
  }
}
</style>
