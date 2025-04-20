<script setup>
// 故事数据
const stories = [
  { id: 1, userName: 'Gabriel Erickson', time: '14m ago', online: true, bgColor: '#FFCE73' },
  {
    id: 2,
    userName: 'Gabriel Erickson',
    time: '14m ago',
    online: true,
    bgColor: '#FFA2C0',
    hasNew: true,
  },
  { id: 3, userName: 'Gabriel Erickson', time: '14m ago', online: false, bgColor: '#A5CEA1' },
  {
    id: 4,
    userName: 'Gabriel Erickson',
    time: '14m ago',
    online: true,
    bgColor: '#CFC8FF',
    isLive: true,
  },
  {
    id: 5,
    userName: 'Gabriel Erickson',
    time: '14m ago',
    online: true,
    bgColor: '#FFCE73',
    isLive: true,
  },
  { id: 6, userName: 'Gabriel Erickson', time: '14m ago', online: true, bgColor: '#A0D7E7' },
  {
    id: 7,
    userName: 'Gabriel Erickson',
    time: '14m ago',
    online: true,
    bgColor: '#FFB7F5',
    hasNew: true,
  },
]
</script>

<template>
  <section class="stories-section">
    <div class="stories-container">
      <h3 class="stories-title">From Channels You Follow</h3>

      <div class="stories-list">
        <!-- 添加故事按钮 -->
        <div class="story-card add-story">
          <div class="add-button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 4V14"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 9H14"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="story-info">
            <p class="story-username">Add Yours</p>
            <p class="story-time">&nbsp;</p>
          </div>
        </div>

        <!-- 故事列表 -->
        <div v-for="story in stories" :key="story.id" class="story-card">
          <div class="story-avatar" :class="{ online: story.online }">
            <!-- 头像背景环 -->
            <div class="avatar-ring"></div>
            <!-- 头像 -->
            <div class="avatar-circle" :style="{ backgroundColor: story.bgColor }"></div>

            <!-- 显示新消息或直播指示器 -->
            <div v-if="story.hasNew" class="new-indicator">
              <span>+</span>
            </div>
            <div v-if="story.isLive" class="live-indicator">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.25V3.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 3.75L7.125 5.25"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 3.75L4.875 5.25"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 6.75C9 7.74456 8.60491 8.69839 7.90165 9.40165C7.19839 10.1049 6.24456 10.5 5.25 10.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="3" cy="9" r="1.5" stroke="white" stroke-width="1.5" />
              </svg>
            </div>
          </div>

          <div class="story-info">
            <p class="story-username">{{ story.userName }}</p>
            <p class="story-time">{{ story.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stories-section {
  width: 100%;
  margin-bottom: 24px;
}

.stories-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #242731;
  border-radius: 24px;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/* 添加模糊阴影效果 */
.stories-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(240, 243, 246, 0.1);
  filter: blur(87px);
  opacity: 0.1;
  z-index: 0;
  pointer-events: none;
}

.stories-title {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #fff;
  position: relative;
  z-index: 1;
}

.stories-list {
  display: flex;
  overflow-x: auto;
  gap: 82px;
  padding-bottom: 12px;
  padding-top: 10px;
  min-height: 120px;
  scrollbar-width: thin;
  scrollbar-color: #6c5dd3 #242731;
  position: relative;
  z-index: 1;
}

.stories-list::-webkit-scrollbar {
  height: 6px;
}

.stories-list::-webkit-scrollbar-track {
  background: #1f2128;
  border-radius: 3px;
}

.stories-list::-webkit-scrollbar-thumb {
  background-color: #6c5dd3;
  border-radius: 3px;
}

.story-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  min-height: 100px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-top: 5px;
}

.story-card:hover {
  transform: translateY(-5px);
}

.story-avatar {
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: 12px;
}

.avatar-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #0049c6;
  box-sizing: border-box;
}

.avatar-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 50%;
  background-color: #3f8cff;
}

.story-avatar.online::after {
  content: '';
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 10px;
  height: 10px;
  background-color: #7fba7a;
  border: 2px solid #242731;
  border-radius: 50%;
  z-index: 1;
}

.story-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.story-username {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  margin-bottom: 2px;
  color: #fff;
}

.story-time {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #808191;
  white-space: nowrap;
}

.add-story .add-button {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #6c5dd3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.new-indicator {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: #6c5dd3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  z-index: 2;
}

.live-indicator {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 24px;
  height: 24px;
  background-color: #ff754c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

@media (max-width: 768px) {
  .stories-container {
    padding: 16px;
  }

  .stories-title {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .stories-list {
    gap: 60px;
    min-height: 100px;
  }

  .story-avatar {
    width: 60px;
    height: 60px;
  }

  .add-story .add-button {
    width: 60px;
    height: 60px;
  }
}
</style>
