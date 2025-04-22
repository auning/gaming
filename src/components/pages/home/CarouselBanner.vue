<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
// 导入game服务替代直接使用axios
import { game } from '@/services'

// 轮播状态
const carouselItems = ref([])
const currentIndex = ref(0)
const currentItem = computed(() => carouselItems.value[currentIndex.value] || {})
const autoplayInterval = ref(null)
const progressWidth = ref(0)
const progressInterval = ref(null)
const loading = ref(true)
const error = ref(null)

// 从API获取轮播数据
const fetchCarouselData = async () => {
  try {
    loading.value = true
    // 使用game服务获取轮播数据
    const response = await game.getCarouselList(4)

    // 添加控制台输出，查看API响应结构
    console.log('轮播图API响应数据:', response)

    // 将API返回的数据映射到组件数据结构
    if (response) {
      // 处理嵌套的list结构
      let dataList = []

      // 首先检查标准API格式 - API直接返回的数组
      if (Array.isArray(response)) {
        dataList = response
      }
      // 处理嵌套的list结构
      else if (response.list && Array.isArray(response.list)) {
        // 检查是否有内层list
        if (response.list[0] && response.list[0].list && Array.isArray(response.list[0].list)) {
          dataList = response.list[0].list
        } else {
          dataList = response.list
        }
      } else if (response.data && Array.isArray(response.data)) {
        dataList = response.data
      }

      // 输出处理后的数据列表
      console.log('处理后的轮播图数据列表:', dataList)

      // 确保有数据后再映射
      if (dataList.length > 0) {
        carouselItems.value = dataList.map((item) => {
          console.log('处理的单个轮播项:', item)

          // 处理图片URL，确保完整路径
          const processImageUrl = (url) => {
            if (!url) return ''
            if (url.startsWith('http')) return url
            if (url.startsWith('/')) {
              // 如果是相对路径但以/开头，直接使用
              return url
            }
            // 其他情况添加/
            return `/${url}`
          }

          return {
            // 精确映射接口提供的字段
            id: item.id || 0,
            title: item.title || '',
            subTitle: item.sub_title || '',
            description: item.description || '',
            image: processImageUrl(item.main_image || item.image || ''),
            thumbnail: processImageUrl(item.thumb_image || item.thumbnail || ''),
            link: item.link || '',
            isLike: item.is_like || 0,
            gameType: item.game_type || '',
            language: item.language || '',
            buttonText: item.button_text || 'Watch',
            previewImage: processImageUrl(item.preview_image || ''),
            gameIcon: processImageUrl(item.game_icon || ''),
            languageIcon: item.language_icon || item.languageIcon || '',
            // 为缩略图添加颜色属性
            thumbnailColor: getThumbnailColor(item.id || 0), // 基于ID生成颜色
          }
        })
        return // 成功获取数据，不需要使用备用数据
      }
    }

    // 如果没有获取到有效数据，使用备用数据
    console.log('未获取到有效轮播图数据，使用备用数据')
    useDefaultCarouselData()
  } catch (err) {
    console.error('获取轮播数据失败:', err)
    error.value = '加载数据失败，请刷新页面重试'
    // 使用默认数据作为备份
    useDefaultCarouselData()
  } finally {
    loading.value = false
  }
}

// 使用默认轮播图数据
const useDefaultCarouselData = () => {
  carouselItems.value = [
    {
      title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
      subTitle: 'Quarter Finals Match',
      description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
      image: '/banner_background1.jpg',
      thumbnail: '/backgrounds/gaming/thumbnail_1.png',
      thumbnailColor: '#4E5166',
      gameType: 'League of Legends®',
      language: '🇺🇸 English',
      languageIcon: '🇺🇸',
      buttonText: 'Watch',
      gameIcon: '/icons/lol_icon.png',
      link: '/watch/game1',
      isLike: 0,
      previewImage: '/banner_background1.jpg',
    },
    {
      title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
      subTitle: 'Semi Finals Match',
      description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
      image: '/banner_background2.jpg',
      thumbnail: '/backgrounds/gaming/thumbnail_2.png',
      thumbnailColor: '#865FC1',
      gameType: 'League of Legends®',
      language: '🇺🇸 English',
      languageIcon: '🇺🇸',
      buttonText: 'Watch',
      gameIcon: '/icons/lol_icon.png',
      link: '/watch/game2',
      isLike: 0,
      previewImage: '/banner_background2.jpg',
    },
    {
      title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
      subTitle: 'Group Stage Match',
      description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
      image: '/banner_background3.jpg',
      thumbnail: '/backgrounds/gaming/thumbnail_3.png',
      thumbnailColor: '#FF754C',
      gameType: 'League of Legends®',
      language: '🇺🇸 English',
      languageIcon: '🇺🇸',
      buttonText: 'Watch',
      gameIcon: '/icons/lol_icon.png',
      link: '/watch/game3',
      isLike: 0,
      previewImage: '/banner_background3.jpg',
    },
    {
      title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
      subTitle: 'Finals Match',
      description: 'Live streaming of Renegades vs Chiefs at ESL Pro League',
      image: '/banner_background4.jpg',
      thumbnail: '/backgrounds/gaming/thumbnail_active.png',
      thumbnailColor: '#3F8CFF',
      gameType: 'League of Legends®',
      language: '🇺🇸 English',
      languageIcon: '🇺🇸',
      buttonText: 'Watch',
      gameIcon: '/icons/lol_icon.png',
      link: '/watch/game4',
      isLike: 0,
      previewImage: '/banner_background4.jpg',
    },
  ]
}

// 生成缩略图颜色
const getThumbnailColor = (id) => {
  const colors = ['#4E5166', '#865FC1', '#FF754C', '#3F8CFF']
  return colors[id % colors.length]
}

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
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length
  resetAutoplay()
  startProgressAnimation()
}

// 上一个轮播项
const prevItem = () => {
  currentIndex.value =
    (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length
  resetAutoplay()
  startProgressAnimation()
}

// 重置自动轮播
const resetAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }

  autoplayInterval.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length
    startProgressAnimation()
  }, 5000)
}

// 组件挂载时获取数据并启动自动轮播
onMounted(() => {
  fetchCarouselData().then(() => {
    if (carouselItems.value.length > 0) {
      resetAutoplay()
      startProgressAnimation()
    }
  })
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
    <!-- 加载中状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误提示 -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="fetchCarouselData">重试</button>
    </div>

    <div v-else>
      <!-- 主图显示区域 -->
      <div class="main-carousel">
        <div class="carousel-content">
          <div class="carousel-item" :style="{ 'background-image': `url(${currentItem.image})` }">
            <div class="carousel-overlay">
              <div class="carousel-info">
                <div class="tag-container">
                  <div class="live-tag">
                    <span>Live</span>
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
                <h3 v-if="currentItem.subTitle" class="carousel-subtitle">
                  {{ currentItem.subTitle }}
                </h3>
                <div class="game-info">
                  <div class="game-details">
                    <div
                      class="game-icon"
                      v-if="currentItem.gameIcon"
                      :style="{ 'background-image': `url(${currentItem.gameIcon})` }"
                    ></div>
                    <span class="game-title">{{ currentItem.gameType }}</span>
                  </div>
                  <span class="divider">•</span>
                  <span class="language">
                    <span v-if="currentItem.languageIcon" class="language-icon">{{
                      currentItem.languageIcon
                    }}</span>
                    {{ currentItem.language }}
                  </span>
                </div>
                <button class="watch-button">{{ currentItem.buttonText || 'Watch' }}</button>
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
            :key="index"
            class="thumbnail-item"
            :class="{ active: index === currentIndex }"
            @click="goToItem(index)"
          >
            <div
              class="thumbnail"
              :style="
                item.thumbnail
                  ? { 'background-image': `url(${item.thumbnail})` }
                  : { 'background-color': item.thumbnailColor }
              "
            ></div>
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
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  width: 100%;
  margin-bottom: 36px;
  position: relative;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 440px;
  background-color: #242731;
  border-radius: 24px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(108, 93, 211, 0.3);
  border-radius: 50%;
  border-top-color: #6c5dd3;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 440px;
  background-color: #242731;
  border-radius: 24px;
  padding: 20px;
  text-align: center;
}

.error-container button {
  margin-top: 16px;
  padding: 8px 24px;
  background-color: #6c5dd3;
  border: none;
  border-radius: 16px;
  color: white;
  cursor: pointer;
}

.main-carousel {
  width: 100%;
  height: 440px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
}

.carousel-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #e4e4e4;
  margin: 0 0 10px 0;
}

.language-icon {
  display: inline-block;
  margin-right: 4px;
}

/* 其他现有样式保持不变 */
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
  background-size: cover;
  background-position: center;
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
  background-size: cover;
  background-position: center;
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

  .carousel-subtitle {
    font-size: 16px;
  }

  .thumbnail-item {
    width: 100px;
    height: 60px;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
  }

  .loading-container,
  .error-container {
    height: 400px;
  }
}
</style>
