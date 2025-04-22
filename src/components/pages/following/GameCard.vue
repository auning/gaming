<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
  viewers: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    default: '',
  },
})

// 根据标题生成一个颜色
const iconColor = computed(() => {
  const colors = ['#FFCE73', '#FFA2C0', '#A5CEA1', '#CFC8FF', '#A0D7E7', '#FFB7F5']
  const hash = props.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
})
</script>

<template>
  <div class="game-card">
    <div class="game-image" :style="{ backgroundColor: iconColor }">
      <img v-if="imageUrl && !imageUrl.includes('placeholder')" :src="imageUrl" alt="游戏封面" />
      <div v-else class="game-icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5.83333H12.5V4.16667C12.5 3.72464 12.3244 3.30072 12.0118 2.98816C11.6993 2.67559 11.2754 2.5 10.8333 2.5H9.16667C8.72464 2.5 8.30072 2.67559 7.98816 2.98816C7.67559 3.30072 7.5 3.72464 7.5 4.16667V5.83333H5C4.11594 5.83333 3.2681 6.18452 2.64297 6.80964C2.01785 7.43477 1.66667 8.28261 1.66667 9.16667V15C1.66667 15.8841 2.01785 16.7319 2.64297 17.357C3.2681 17.9821 4.11594 18.3333 5 18.3333H15C15.8841 18.3333 16.7319 17.9821 17.357 17.357C17.9821 16.7319 18.3333 15.8841 18.3333 15V9.16667C18.3333 8.28261 17.9821 7.43477 17.357 6.80964C16.7319 6.18452 15.8841 5.83333 15 5.83333ZM9.16667 4.16667H10.8333V5.83333H9.16667V4.16667ZM16.6667 15C16.6667 15.442 16.4911 15.866 16.1785 16.1785C15.866 16.4911 15.442 16.6667 15 16.6667H5C4.55797 16.6667 4.13405 16.4911 3.82149 16.1785C3.50893 15.866 3.33333 15.442 3.33333 15V9.16667C3.33333 8.72464 3.50893 8.30072 3.82149 7.98816C4.13405 7.67559 4.55797 7.5 5 7.5H15C15.442 7.5 15.866 7.67559 16.1785 7.98816C16.4911 8.30072 16.6667 8.72464 16.6667 9.16667V15Z"
            fill="white"
          />
          <path
            d="M6.66667 11.6667C7.58714 11.6667 8.33333 10.9205 8.33333 10C8.33333 9.07953 7.58714 8.33334 6.66667 8.33334C5.74619 8.33334 5 9.07953 5 10C5 10.9205 5.74619 11.6667 6.66667 11.6667Z"
            fill="white"
          />
          <path
            d="M13.3333 11.6667C14.2538 11.6667 15 10.9205 15 10C15 9.07953 14.2538 8.33334 13.3333 8.33334C12.4129 8.33334 11.6667 9.07953 11.6667 10C11.6667 10.9205 12.4129 11.6667 13.3333 11.6667Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
    <div class="game-info">
      <div class="game-title-container">
        <h3 class="game-title">{{ title }}</h3>
        <span v-if="title.includes('®')" class="registered-mark">®</span>
      </div>
      <div class="game-details">
        <span class="game-category">{{ category }}</span>
        <div class="game-viewers">
          <div class="viewers-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0007 7.99999C13.7514 10.4304 10.947 12 8.00001 12C5.05302 12 2.24771 10.4304 0.999329 8.00001C2.24863 5.56962 5.05294 4 7.99993 4C10.9469 4 13.7522 5.56958 15.0007 7.99999Z"
                stroke="#A2A5B9"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                stroke="#A2A5B9"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="viewers-count">{{ viewers.toLocaleString() }} viewers</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-card {
  display: flex;
  align-items: center;
  background-color: #242731;
  border-radius: 16px;
  padding: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 16px;
  width: 100%;
}

.game-card:hover {
  background-color: #292c37;
}

.game-image {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-icon {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
}

.game-title-container {
  display: flex;
  align-items: center;
  gap: 2px;
}

.game-title {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.registered-mark {
  font-size: 10px;
  color: #ffffff;
  position: relative;
  top: -2px;
}

.game-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.game-category {
  font-size: 12px;
  color: #a2a5b9;
}

.game-viewers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.viewers-icon {
  display: flex;
  align-items: center;
}

.viewers-count {
  font-size: 12px;
  color: #a2a5b9;
}
</style>
