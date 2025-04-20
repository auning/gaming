<script setup>
import { ref } from 'vue'

// 下拉菜单选项
const sortOptions = ['Popular', 'Newest', 'Most Viewed', 'Trending']
const selectedOption = ref('Popular')
const showDropdown = ref(false)

// 切换下拉菜单显示
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 选择下拉菜单选项
const selectOption = (option) => {
  selectedOption.value = option
  showDropdown.value = false
}

// 直播频道数据
const liveChannels = [
  {
    id: 1,
    title: '2020 World Champs Gaming Warzone',
    image: '/warzone1.png',
    streamer: 'Tam Tran',
    verified: true,
    game: 'Call of Duty®',
    watching: '4.2K',
  },
  {
    id: 2,
    title: 'Team Flash vs. Saigon Phantom',
    image: '/warzone2.jpg',
    streamer: 'Dash UI8',
    verified: true,
    game: 'Garena of Valor',
    watching: '4.2K',
  },
  {
    id: 3,
    title: '2020 World Champs Gaming Warzone',
    image: '/warzone3.jpg',
    streamer: 'UI8 Gaming',
    verified: true,
    game: 'Call of Duty®',
    watching: '4.2K',
  },
  {
    id: 4,
    title: '2020 World Champs Gaming Warzone',
    image: '/warzone4.jpg',
    streamer: 'Gabriel Erickson',
    verified: false,
    game: 'Garena Free Fire',
    watching: '4.2K',
  },
]
</script>

<template>
  <div class="live-channels-section">
    <!-- 标题和筛选器 -->
    <div class="section-header">
      <h2 class="section-title">Live channels</h2>
      <div class="dropdown-container">
        <button class="dropdown-button" @click="toggleDropdown">
          {{ selectedOption }}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="{ 'rotate-arrow': showDropdown }"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="#808191"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="dropdown-menu" v-if="showDropdown">
          <div
            v-for="option in sortOptions"
            :key="option"
            class="dropdown-item"
            :class="{ selected: option === selectedOption }"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <!-- 直播频道卡片容器 -->
    <div class="channel-cards">
      <div v-for="channel in liveChannels" :key="channel.id" class="channel-card">
        <!-- 卡片图片 -->
        <div class="card-image" :style="{ 'background-image': `url(${channel.image})` }"></div>

        <!-- 卡片内容 -->
        <div class="card-content">
          <h3 class="card-title">{{ channel.title }}</h3>
          <div class="streamer-info">
            <div class="avatar">
              <!-- 使用随机背景色作为头像 -->
              <div class="avatar-circle"></div>
            </div>
            <div class="streamer-details">
              <div class="streamer-name">
                <span>{{ channel.streamer }}</span>
                <div v-if="channel.verified" class="verified-badge">
                  <svg
                    width="8"
                    height="6"
                    viewBox="0 0 8 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3L3 5L7 1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="game-name">{{ channel.game }}</div>
            </div>
          </div>
        </div>

        <!-- 观看状态栏 -->
        <div class="watching-bar">
          <div class="live-tag">
            <span>Live</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 6L1 11V1Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="6" cy="6" r="5" stroke="white" stroke-width="1" />
              <path
                d="M6 1V3"
                stroke="white"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="watching-info">
            <span>{{ channel.watching }} watching</span>
            <div class="status-dot"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-channels-section {
  width: 100%;
  margin-bottom: 24px;
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin: 0;
}

.dropdown-container {
  position: relative;
}

.dropdown-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(228, 228, 228, 0.1);
  border: none;
  border-radius: 16px;
  padding: 10px 16px;
  color: #808191;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #242731;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 8px;
  z-index: 10;
  min-width: 150px;
}

.dropdown-item {
  padding: 10px 16px;
  color: #808191;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(228, 228, 228, 0.05);
}

.dropdown-item.selected {
  color: #fff;
  background-color: rgba(108, 93, 211, 0.1);
}

.rotate-arrow {
  transform: rotate(180deg);
}

.channel-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.channel-card {
  border-radius: 24px;
  overflow: hidden;
  background-color: #242731;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}

.card-image {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  border-radius: 24px 24px 0 0;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  color: #fff;
  margin-top: 0;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6em;
}

.streamer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-circle {
  width: 100%;
  height: 100%;
  background-color: #a0d7e7;
  border-radius: 50%;
}

.streamer-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.streamer-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
}

.verified-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: #7fba7a;
  border-radius: 8px;
}

.game-name {
  font-size: 12px;
  font-weight: 500;
  color: #808191;
}

.watching-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid rgba(240, 243, 246, 0.1);
  margin-top: 10px;
}

.live-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: #ff754c;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  font-size: 13px;
}

.watching-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #808191;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #0049c6;
}

@media (max-width: 1200px) {
  .channel-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .channel-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .channel-cards {
    grid-template-columns: 1fr;
  }
}
</style>
