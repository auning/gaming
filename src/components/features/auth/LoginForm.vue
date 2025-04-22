<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/api/auth.service'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
})

const errors = reactive({})
const loading = ref(false)
const submitSuccess = ref(false)
const responseMessage = ref('')

const validate = () => {
  const newErrors = {}

  // 用户名验证
  if (!form.username) {
    newErrors.username = '请输入用户名'
  }

  // 密码验证
  if (!form.password) {
    newErrors.password = '请输入密码'
  }

  // 更新错误对象
  Object.assign(errors, newErrors)

  // 如果没有错误返回true
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  // 清空之前的错误和消息
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  responseMessage.value = ''
  submitSuccess.value = false

  if (!validate()) return

  loading.value = true
  try {
    // 使用表单中的username作为username_or_email参数传递
    const result = await login(form.username, form.password)
    submitSuccess.value = true

    // 保存token到本地存储
    if (result.token) {
      localStorage.setItem('accessToken', result.token)
    }

    // 保存用户信息或进行其他操作
    if (result.user) {
      responseMessage.value = `登录成功，欢迎 ${result.user.username}`
    } else {
      responseMessage.value = '登录成功'
    }

    // 登录成功后可以重置表单
    form.username = ''
    form.password = ''

    // 可以触发其他操作，如跳转到首页
    setTimeout(() => {
      window.location.href = '/'
    }, 1500)
  } catch (error) {
    console.error('登录失败:', error)
    responseMessage.value = error.response?.data?.message || '登录失败，用户名或密码错误'
  } finally {
    loading.value = false
  }
}

const googleLogin = () => {
  // 谷歌登录逻辑
  console.log('使用谷歌登录')
}

const createAccount = () => {
  // 注册逻辑
  router.push('/register')
}

const handleClose = () => {
  // 关闭登录页面，返回首页
  router.push('/')
}
</script>

<template>
  <div class="login-form-container">
    <div class="login-form">
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

      <h1 class="form-title">Sign in</h1>

      <div class="form-content">
        <div class="form-inputs">
          <div class="input-group">
            <label>Usename or email</label>
            <div class="input-container">
              <input
                type="text"
                v-model="form.username"
                placeholder="Enter your username or email"
              />
            </div>
          </div>

          <div class="input-group">
            <label>Password</label>
            <div class="input-container">
              <input type="password" v-model="form.password" placeholder="Enter your password" />
            </div>
          </div>

          <button class="login-button" @click="handleSubmit">Continue</button>
        </div>

        <div class="divider">
          <span>Or continue with</span>
        </div>

        <button class="google-button" @click="googleLogin">Google</button>
      </div>

      <div class="create-account">
        <span class="create-account-text">New user?</span>
        <span class="create-account-link" @click="createAccount">Create an account</span>
      </div>

      <div
        v-if="responseMessage"
        :class="['response-message', submitSuccess ? 'success' : 'error']"
      >
        {{ responseMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 480px;
  margin-left: 480px;
}

.login-form {
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

.login-button {
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

.create-account {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.create-account-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
}

.create-account-link {
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

/* 关闭按钮背景、阴影和内容 */
.close-button-bg,
.close-button-shadow,
.close-button-content {
  display: none;
}

@media (max-width: 1024px) {
  .login-form-container {
    width: 100%;
  }

  .login-form {
    max-width: 90%;
  }
}

.response-message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.success {
  background-color: #e8f5e9;
  color: #388e3c;
}

.error {
  background-color: #ffebee;
  color: #e53935;
}
</style>
