<script setup>
// 实现搜索功能
import { ref } from 'vue'

const searchQuery = ref('')
const isSearchFocused = ref(false)

// 提交搜索
const submitSearch = () => {
  console.log('搜索:', searchQuery.value)
  // 实际应用中这里应该调用搜索API或更新路由
}
</script>

<template>
  <nav class="top-navigation">
    <div class="navigation-container">
      <!-- 左侧区域 -->
      <div class="left-section">
        <!-- 浏览选项 -->
        <div class="browse-option">
          <div class="browse-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="browse-text">Browse</span>
          <div class="dropdown-icon">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- 中间区域 - 搜索栏 -->
      <div class="center-section">
        <div class="search-container">
          <div class="search-box" :class="{ focused: isSearchFocused }">
            <div class="search-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                  stroke="#808191"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 15.75L12.75 12.75"
                  stroke="#808191"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Everything"
              v-model="searchQuery"
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
              @keyup.enter="submitSearch"
            />
          </div>
        </div>
      </div>

      <!-- 右侧区域 - 用户信息区 -->
      <div class="right-section">
        <div class="user-actions">
          <!-- 创建按钮 -->
          <button class="action-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4.16669V15.8334"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.16669 10H15.8334"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <!-- 消息按钮 -->
          <button class="action-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3334 13.75C18.3334 14.0815 18.2016 14.3995 17.9672 14.6339C17.7328 14.8683 17.4148 15 17.0834 15H5.00002L1.66669 18.3333V2.91667C1.66669 2.58515 1.7985 2.26722 2.03293 2.03279C2.26736 1.79836 2.58528 1.66667 2.91669 1.66667H17.0834C17.4148 1.66667 17.7328 1.79836 17.9672 2.03279C18.2016 2.26722 18.3334 2.58515 18.3334 2.91667V13.75Z"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="5.83335" cy="8.33335" r="1.25" fill="#808191" />
              <circle cx="10" cy="8.33335" r="1.25" fill="#808191" />
              <circle cx="14.1667" cy="8.33335" r="1.25" fill="#808191" />
            </svg>
          </button>

          <!-- 通知按钮 -->
          <button class="action-button notification-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6.66669C15 5.34061 14.4732 4.07871 13.5355 3.14101C12.5979 2.20331 11.3261 1.66669 10 1.66669C8.67392 1.66669 7.40215 2.20331 6.46447 3.14101C5.52678 4.07871 5 5.34061 5 6.66669V11.6667L2.5 14.1667H17.5L15 11.6667V6.66669Z"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 14.1667C7.5 14.8297 7.76339 15.4656 8.23223 15.9344C8.70107 16.4033 9.33696 16.6667 10 16.6667C10.663 16.6667 11.2989 16.4033 11.7678 15.9344C12.2366 15.4656 12.5 14.8297 12.5 14.1667"
                stroke="#808191"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="notification-badge">2</span>
          </button>

          <!-- 用户头像 -->
          <div class="user-avatar">
            <div class="avatar-inner">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#0049C6" />
                <path
                  d="M14.0001 15.9999L8.66675 25.9999H27.3334L22.0001 15.9999L18.0001 19.9999L14.0001 15.9999Z"
                  fill="#B3E5FC"
                />
                <path d="M14 16L8.66667 26H18.6667V20L14 16Z" fill="#4FC3F7" />
                <path d="M18.6667 20V26H27.3334L22 16L18.6667 20Z" fill="#2196F3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.top-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: #242731;
  box-shadow: inset 0px -1px 0px 0px rgba(228, 228, 228, 0.1);
  width: 100%;
}

.navigation-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1340px;
  padding: 0 40px;
}

.left-section {
  display: flex;
  align-items: center;
  min-width: 120px;
}

.browse-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.browse-option:hover {
  background-color: rgba(228, 228, 228, 0.05);
}

.browse-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.browse-text {
  font-size: 14px;
  font-weight: 600;
  color: #808191;
  margin-right: 8px;
}

.dropdown-icon {
  display: flex;
  align-items: center;
}

.center-section {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 460px;
  margin: 0 20px;
}

.search-container {
  width: 100%;
  max-width: 440px;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.05);
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.2s ease;
  width: 100%;
}

.search-box.focused {
  background-color: rgba(228, 228, 228, 0.1);
}

.search-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.search-box input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #808191;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
}

.search-box input::placeholder {
  color: #808191;
}

.right-section {
  display: flex;
  align-items: center;
  min-width: 180px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
  width: 100%;
}

.action-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-button:hover {
  background-color: rgba(228, 228, 228, 0.05);
}

.notification-button {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  background: linear-gradient(to right, #ff544d, #ff754c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1660px) {
  .navigation-container {
    max-width: 1120px;
  }
}

@media (max-width: 1400px) {
  .navigation-container {
    max-width: 920px;
  }
}

@media (max-width: 1200px) {
  .navigation-container {
    max-width: 720px;
    padding: 0 30px;
  }
}

@media (max-width: 1000px) {
  .navigation-container {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .navigation-container {
    padding: 0 20px;
  }

  .left-section {
    min-width: 80px;
  }

  .browse-option {
    padding: 6px 10px;
  }

  .center-section {
    max-width: 60%;
    margin: 0 10px;
  }

  .right-section {
    min-width: 160px;
  }

  .user-actions {
    gap: 12px;
  }

  .action-button {
    width: 36px;
    height: 36px;
  }
}
</style>
