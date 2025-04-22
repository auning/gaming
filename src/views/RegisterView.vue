<script setup>
import AuthLayout from '@/components/features/auth/AuthLayout.vue'
import RegisterForm from '@/components/features/auth/RegisterForm.vue'
</script>

<template>
  <div class="register-view">
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  </div>
</template>

<style scoped>
.register-view {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: url('/images/login/register-background.jpg') center center / cover no-repeat fixed;
}

@media (max-width: 1024px) {
  .content-container {
    justify-content: center;
    align-items: center;
  }
}
</style>
