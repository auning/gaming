<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerApi } from '@/services/api/auth.service'

const router = useRouter()
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
  // 清空之前的消息
  errorMessage.value = ''
  successMessage.value = ''

  // 表单验证
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '密码不匹配'
    return
  }

  if (!fullName.value || !email.value || !password.value) {
    errorMessage.value = '请填写所有必填字段'
    return
  }

  // 邮箱格式验证
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errorMessage.value = '请输入有效的邮箱地址'
    return
  }

  // 密码长度验证(6-20个字符)
  if (password.value.length < 6 || password.value.length > 20) {
    errorMessage.value = '密码长度必须在6-20个字符之间'
    return
  }

  // 准备注册数据
  const userData = {
    username: fullName.value,
    email: email.value,
    password: password.value,
    confirm_password: confirmPassword.value,
  }

  loading.value = true
  try {
    console.log('开始注册请求，数据:', userData)
    const result = await registerApi(userData)
    console.log('注册成功，返回数据:', result)

    // 确保有user_id或id
    const userId = result.user_id || result.id || '成功'
    successMessage.value = `注册成功，用户ID: ${userId}`

    // 清空表单
    fullName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    // 1.5秒后跳转到登录页
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    console.error('注册失败详情:', error)

    if (error.response) {
      // 服务器返回了错误响应
      console.error('服务器错误响应:', error.response)
      errorMessage.value = error.response.data?.message || `注册失败 (${error.response.status})`
    } else if (error.request) {
      // 请求发送了但没有收到响应
      console.error('无服务器响应:', error.request)
      errorMessage.value = '服务器无响应，请稍后重试'
    } else {
      // 请求设置时出错
      console.error('请求错误:', error.message)
      errorMessage.value = '请求错误: ' + error.message
    }
  } finally {
    loading.value = false
  }
}

const googleRegister = () => {
  // 谷歌注册逻辑
  console.log('使用谷歌注册')
}

const goToLogin = () => {
  router.push('/login')
}

const handleClose = () => {
  // 关闭注册页面，返回首页
  router.push('/')
}
</script>

<template>
  <div class="register-form-container">
    <div class="register-form">
      <div class="form-bg">
        <div class="bg-overlay"></div>
        <div class="bg-content"></div>
      </div>

      <div class="close-button" @click="handleClose">
        <div class="close-icon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L13 13" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path d="M13 1L1 13" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <h1 class="form-title">Sign up</h1>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div class="form-content">
        <div class="form-inputs">
          <div class="input-group">
            <label>Full Name</label>
            <div class="input-container">
              <input type="text" v-model="fullName" placeholder="Enter your full name" />
            </div>
          </div>

          <div class="input-group">
            <label>Email</label>
            <div class="input-container">
              <input type="email" v-model="email" placeholder="Enter your email" />
            </div>
          </div>

          <div class="input-group">
            <label>Password</label>
            <div class="input-container">
              <input type="password" v-model="password" placeholder="Create a password" />
            </div>
          </div>

          <div class="input-group">
            <label>Confirm Password</label>
            <div class="input-container">
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button class="register-button" @click="register" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </div>

        <div class="divider">
          <span>Or continue with</span>
        </div>

        <button class="google-button" @click="googleRegister">Google</button>
      </div>

      <div class="login-account">
        <span class="login-account-text">Already have an account?</span>
        <span class="login-account-link" @click="goToLogin">Sign in</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 480px;
  margin-left: 480px; /* 与LoginForm保持一致的左边距 */
}

.register-form {
  position: relative;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  z-index: 5;
}

.form-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.5s;
  z-index: -1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1b1d21;
  opacity: 0.8;
  border-radius: 40px;
  filter: blur(32px);
}

.bg-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #242731;
  border-radius: 40px;
}

.form-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 40px;
  color: #ffffff;
  margin-bottom: 40px;
  width: 100%;
  text-align: left;
}

.form-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
}

.input-container {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  height: 54px;
  background-color: rgba(228, 228, 228, 0.1);
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

input::placeholder {
  color: #808191;
}

input:focus {
  outline: none;
  border: 1px solid #3f8cff;
}

.register-button {
  width: 100%;
  height: 54px;
  background-color: #6c5dd3;
  border: none;
  border-radius: 16px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 8px 0;
}

.divider span {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
}

.google-button {
  width: 100%;
  height: 54px;
  background-color: #3f8cff;
  border: none;
  border-radius: 16px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.login-account {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.login-account-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
}

.login-account-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #3f8cff;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 100;
  border-radius: 50%;
  background-color: #26282f;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: #313540;
}

.close-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 移除不需要的关闭按钮背景样式 */
.close-button-bg,
.close-button-shadow,
.close-button-content {
  display: none;
}

@media (max-width: 1024px) {
  .register-form-container {
    width: 100%;
    margin-left: 0;
  }

  .register-form {
    max-width: 90%;
  }
}

.error-message {
  background-color: rgba(255, 87, 87, 0.1);
  color: #ff5757;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  width: 100%;
}

.success-message {
  background-color: rgba(75, 222, 151, 0.1);
  color: #4bde97;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  width: 100%;
}

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
