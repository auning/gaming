<script setup>
// 认证页面左侧内容组件
import { onMounted, ref } from 'vue'

// 添加图片加载状态管理
const imagesLoaded = ref({
  card1: false,
  card2: false,
  card3: false,
  logo1: false,
  logo2: false,
  unityLogo: false,
})

// 图片加载完成后更新状态
const handleImageLoad = (imageKey) => {
  imagesLoaded.value[imageKey] = true
}

onMounted(() => {
  // 预加载所有图片
  const preloadImages = () => {
    const images = [
      { key: 'card1', src: '/images/login/game-card1.jpg' },
      { key: 'card2', src: '/images/login/game-card2.jpg' },
      { key: 'card3', src: '/images/login/game-card3.jpg' },
      { key: 'logo1', src: '/images/login/game-logo-part1.svg' },
      { key: 'logo2', src: '/images/login/game-logo-part2.svg' },
      { key: 'unityLogo', src: '/images/login/unity-logo.svg' },
    ]

    images.forEach((img) => {
      const imgEl = new Image()
      imgEl.onload = () => handleImageLoad(img.key)
      imgEl.src = img.src
    })
  }

  preloadImages()
})
</script>

<template>
  <div class="auth-left-content">
    <div class="logo-container">
      <div class="unity-logo">
        <div class="icon-bg">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="12" fill="url(#paint0_linear)" />
            <path
              d="M18 28H30C31.1 28 32 27.1 32 26V18C32 16.9 31.1 16 30 16H18C16.9 16 16 16.9 16 18V26C16 27.1 16.9 28 18 28Z"
              fill="white"
            />
            <path d="M26 32L30 28H26V32Z" fill="white" />
            <path d="M22 32L18 28H22V32Z" fill="white" />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0"
                y1="0"
                x2="48"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#BD4BFA" />
                <stop offset="1" stop-color="#7A5AF8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span>Unity.</span>
      </div>
      <h2 class="platform-title">A Video Gaming Platform UI Kit</h2>
    </div>

    <div class="game-cards">
      <div class="game-card">
        <div class="card-bg"></div>
        <img
          class="card-img"
          src="/images/login/game-card1.jpg"
          alt="Call of Duty"
          @load="handleImageLoad('card1')"
          :class="{ loaded: imagesLoaded.card1 }"
        />
        <div class="card-info">
          <div class="card-content">
            <div class="name">Call of Duty®</div>
            <div class="genre">Shooting</div>
          </div>
          <div class="viewers">
            <div class="dot"></div>
            <span>2.8K viewers</span>
          </div>
        </div>
      </div>

      <div class="game-card">
        <div class="card-bg"></div>
        <img
          class="card-img"
          src="/images/login/game-card2.jpg"
          alt="The Dota 2"
          @load="handleImageLoad('card2')"
          :class="{ loaded: imagesLoaded.card2 }"
        />
        <div class="card-info">
          <div class="card-content">
            <div class="name">The Dota 2</div>
            <div class="genre">eSport</div>
          </div>
          <div class="viewers">
            <div class="dot"></div>
            <span>2.8K viewers</span>
          </div>
        </div>
      </div>

      <div class="game-card">
        <div class="card-bg"></div>
        <img
          class="card-img"
          src="/images/login/game-card3.jpg"
          alt="League of Legends"
          @load="handleImageLoad('card3')"
          :class="{ loaded: imagesLoaded.card3 }"
        />
        <div class="card-info">
          <div class="card-content">
            <div class="name">League of Legends®</div>
            <div class="genre">Online Game</div>
          </div>
          <div class="viewers">
            <div class="dot"></div>
            <span>2.8K viewers</span>
          </div>
        </div>
      </div>
    </div>

    <div class="discover-more">
      <span>Discover more</span>
      <div class="icon-plus">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V16"
            stroke="#3F8CFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 12H8"
            stroke="#3F8CFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="#3F8CFF"
            stroke-width="1.5"
          />
        </svg>
      </div>
    </div>

    <div class="theme-toggle">
      <div class="toggle-container">
        <div class="toggle-bg"></div>
        <div class="toggle-slider"></div>
        <div class="toggle-icon day-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              stroke="#242731"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path d="M12 3V5" stroke="#242731" stroke-width="2" stroke-linecap="round" />
            <path d="M12 19V21" stroke="#242731" stroke-width="2" stroke-linecap="round" />
            <path d="M5 12H3" stroke="#242731" stroke-width="2" stroke-linecap="round" />
            <path d="M21 12H19" stroke="#242731" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        <div class="toggle-icon night-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              stroke="#808191"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-left-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 362px;
  height: 666x;
  position: relative;
  background: #242731;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.unity-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.icon-bg {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unity-logo span {
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
}

.platform-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.7;
  margin: 0;
  padding-left: 2px;
}

.game-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.game-card {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 80px;
  cursor: pointer;
}

.card-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1b1d21;
  opacity: 0.5;
  border-radius: 16px;
}

.card-img {
  position: absolute;
  width: 56px;
  height: 56px;
  left: 12px;
  top: 12px;
  border-radius: 12px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card-img.loaded {
  opacity: 1;
}

.logo-loaded {
  opacity: 1;
}

.game-logo img {
  width: 26px;
  height: 26px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card-info {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 16px 80px;
  height: 100%;
  z-index: 1;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;
  line-height: 1.38;
}

.genre {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
  line-height: 1.33;
}

.viewers {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #ff754c;
  border-radius: 50%;
}

.viewers span {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
  line-height: 1.33;
}

.discover-more {
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: 48px;
  gap: 12px;
  cursor: pointer;
}

.discover-more span {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #3f8cff;
  line-height: 1.43;
}

.icon-plus {
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-toggle {
  position: absolute;
  bottom: 48px;
  right: 48px;
  cursor: pointer;
}

.toggle-container {
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 100px;
}

.toggle-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(240, 243, 246, 0.1);
  border-radius: 100px;
}

.toggle-slider {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #3f8cff;
  border-radius: 50%;
  top: 2px;
  right: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.day-icon {
  left: 4px;
  opacity: 0.3;
}

.night-icon {
  right: 4px;
  opacity: 0.5;
}

@media (max-width: 1440px) {
  .auth-left-content {
    width: 35%;
    min-width: 360px;
  }
}

@media (max-width: 1024px) {
  .auth-left-content {
    display: none;
  }
}
</style>
