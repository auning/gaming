<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 轮播图数据
const carouselItems = [
  {
    id: 1,
    title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
    description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
    image: '/banner_background1.jpg',
    thumbnail: '/backgrounds/gaming/thumbnail_1.png',
    thumbnailColor: '#4E5166',
    tag: 'Live',
    game: 'League of Legends®',
    language: '🇺🇸 English',
  },
  {
    id: 2,
    title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
    description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
    image: '/banner_background2.jpg',
    thumbnail: '/backgrounds/gaming/thumbnail_2.png',
    thumbnailColor: '#865FC1',
    tag: 'Live',
    game: 'League of Legends®',
    language: '🇺🇸 English',
  },
  {
    id: 3,
    title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
    description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
    image: '/banner_background3.jpg',
    thumbnail: '/backgrounds/gaming/thumbnail_3.png',
    thumbnailColor: '#FF754C',
    tag: 'Live',
    game: 'League of Legends®',
    language: '🇺🇸 English',
  },
  {
    id: 4,
    title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
    description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
    image: '/banner_background4.jpg',
    thumbnail: '/backgrounds/gaming/thumbnail_active.png',
    thumbnailColor: '#3F8CFF',
    tag: 'Live',
    game: 'League of Legends®',
    language: '🇺🇸 English',
  },
]

// 轮播状态
const currentIndex = ref(0)
const currentItem = computed(() => carouselItems[currentIndex.value])
const autoplayInterval = ref(null)
const progressWidth = ref(0)
const progressInterval = ref(null)

// 开始进度条动画
const startProgressAnimation = () => {
  progressWidth.value = 0

  if (progressInterval.value) {
    clearInterval(progressInterval.value)
  }

  progressInterval.value = setInterval(() => {
    if (progressWidth.value >= 100) {
      clearInterval(progressInterval.value)
    } else {
      progressWidth.value += 0.5
    }
  }, 25) // 5000ms / 200 = 25ms
}

// 切换到指定轮播项
const goToItem = (index) => {
  currentIndex.value = index
  resetAutoplay()
  startProgressAnimation()
}

// 下一个轮播项
const nextItem = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.length
  resetAutoplay()
  startProgressAnimation()
}

// 上一个轮播项
const prevItem = () => {
  currentIndex.value = (currentIndex.value - 1 + carouselItems.length) % carouselItems.length
  resetAutoplay()
  startProgressAnimation()
}

// 重置自动轮播
const resetAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }

  autoplayInterval.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % carouselItems.length
    startProgressAnimation()
  }, 5000)
}

// 组件挂载时启动自动轮播
onMounted(() => {
  resetAutoplay()
  startProgressAnimation()
})

// 组件卸载时停止自动轮播和进度条动画
onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
  }
})
</script>

<template>
  <section class="carousel-section">
    <!-- 主图显示区域 -->
    <div class="main-carousel">
      <div class="carousel-content">
        <div class="carousel-item" :style="{ 'background-image': `url(${currentItem.image})` }">
          <div class="carousel-overlay">
            <div class="carousel-info">
              <div class="tag-container">
                <div class="live-tag">
                  <span>{{ currentItem.tag }}</span>
                  <div class="live-icon">
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
                </div>
              </div>
              <h2 class="carousel-title">{{ currentItem.title }}</h2>
              <div class="game-info">
                <div class="game-details">
                  <div class="game-icon"></div>
                  <span class="game-title">{{ currentItem.game }}</span>
                </div>
                <span class="divider">•</span>
                <span class="language">{{ currentItem.language }}</span>
              </div>
              <button class="watch-button">Watch</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载进度条 -->
      <div class="progress-bar">
        <div class="progress-bg"></div>
        <div class="progress-fill" :style="{ width: `${progressWidth}%` }"></div>
      </div>
    </div>

    <!-- 缩略图导航 -->
    <div class="thumbnail-nav">
      <button class="nav-arrow prev-arrow" @click="prevItem">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11L4 7L9 3"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="thumbnails-container">
        <div
          v-for="(item, index) in carouselItems"
          :key="item.id"
          class="thumbnail-item"
          :class="{ active: index === currentIndex }"
          @click="goToItem(index)"
        >
          <div class="thumbnail" :style="{ 'background-color': item.thumbnailColor }"></div>
        </div>
      </div>

      <button class="nav-arrow next-arrow" @click="nextItem">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3L10 7L5 11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  width: 100%;
  margin-bottom: 36px;
  position: relative;
}

.main-carousel {
  width: 100%;
  height: 440px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
}

.carousel-content {
  width: 100%;
  height: 100%;
}

.carousel-item {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 24px;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(to top, rgba(27, 29, 33, 0.9) 0%, rgba(58, 62, 69, 0) 100%);
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.carousel-info {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tag-container {
  margin-bottom: 5px;
}

.live-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ff754c;
  border-radius: 8px;
  padding: 4px 12px;
  width: fit-content;
}

.live-tag span {
  font-size: 13px;
  font-weight: 500;
  color: white;
}

.live-icon {
  display: flex;
  align-items: center;
}

.carousel-title {
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.5px;
  color: white;
  margin-bottom: 5px;
}

.game-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 5px;
}

.game-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.game-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
}

.game-title,
.language {
  font-size: 14px;
  color: white;
  font-weight: 400;
  line-height: 1.7;
}

.divider {
  font-size: 14px;
  color: white;
}

.watch-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c5dd3;
  border: none;
  border-radius: 16px;
  padding: 18px 43px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-top: 24px;
  width: fit-content;
}

.watch-button:hover {
  background-color: #5a4cba;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.progress-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(228, 228, 228, 0.1);
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #6c5dd3;
  transition: width 0.3s linear;
}

.thumbnail-nav {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  gap: 16px;
  z-index: 10;
}

.thumbnails-container {
  display: flex;
  gap: 12px;
}

.thumbnail-item {
  width: 56px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.thumbnail-item:hover {
  opacity: 0.9;
}

.thumbnail-item.active {
  border-radius: 12px;
  transform: scale(1.1);
  opacity: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.thumbnail-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  z-index: 1;
}

.thumbnail {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.nav-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #3f8cff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 10;
}

.nav-arrow:hover {
  background-color: #2378f5;
}

@media (max-width: 768px) {
  .main-carousel {
    height: 400px;
  }

  .carousel-overlay {
    padding: 24px;
  }

  .carousel-info {
    max-width: 100%;
  }

  .carousel-title {
    font-size: 24px;
  }

  .thumbnail-item {
    width: 100px;
    height: 60px;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
  }
}
</style>
