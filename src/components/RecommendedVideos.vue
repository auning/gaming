<script setup>
import { ref } from 'vue'

// 视频数据
const videos = [
  {
    id: 1,
    title: '2020 World Champs Gaming Warzone',
    image: '/recommended1.jpg',
    author: 'Tam Tran',
    verified: true,
    game: 'Call of Duty®',
    viewers: '4.2K',
    live: true,
  },
  {
    id: 2,
    title: 'Team Flash vs. Saigon Phantom',
    image: '/recommended2.jpg',
    author: 'Dash UI8',
    verified: true,
    game: 'Garena of Valor',
    viewers: '4.2K',
    live: true,
  },
  {
    id: 3,
    title: '2020 World Champs Gaming Warzone',
    image: '/recommended3.jpg',
    author: 'UI8 Gaming',
    verified: true,
    game: 'Call of Duty®',
    viewers: '4.2K',
    live: true,
  },
  {
    id: 4,
    title: '2020 World Champs Gaming Warzone',
    image: '/recommended4.jpg',
    author: 'Gabriel Erickson',
    verified: true,
    game: 'Garena Free Fire',
    viewers: '4.2K',
    live: true,
  },
]

// 过滤选项
const filterOptions = ['Most Recent', 'Most Popular', 'Trending', 'Featured']

const selectedFilter = ref('Most Recent')
const showFilterDropdown = ref(false)

const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value
}

const selectFilter = (filter) => {
  selectedFilter.value = filter
  showFilterDropdown.value = false
}
</script>

<template>
  <div class="recommended-videos">
    <div class="section-header">
      <h2 class="section-title">Recommended Videos</h2>
      <div class="filter-dropdown" :class="{ active: showFilterDropdown }">
        <button class="filter-button" @click="toggleFilterDropdown">
          {{ selectedFilter }}
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#808191"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="dropdown-menu" v-if="showFilterDropdown">
          <button
            v-for="option in filterOptions"
            :key="option"
            @click="selectFilter(option)"
            class="dropdown-item"
            :class="{ selected: selectedFilter === option }"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div class="videos-grid">
      <div v-for="video in videos" :key="video.id" class="video-card">
        <div class="card-inner">
          <div class="thumbnail">
            <img :src="video.image" alt="Video thumbnail" />
          </div>
          <div class="video-content">
            <h3 class="video-title">{{ video.title }}</h3>
            <div class="creator-info">
              <div class="avatar">
                <div class="avatar-circle" :class="`avatar-${video.id}`"></div>
              </div>
              <div class="creator-details">
                <div class="creator-name">
                  {{ video.author }}
                  <span class="verified-badge" v-if="video.verified">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="12" height="12" rx="6" fill="#7FBA7A" />
                      <path
                        d="M4.5 6L5.5 7L7.5 5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div class="game-title">{{ video.game }}</div>
              </div>
            </div>
          </div>
          <div class="video-stats">
            <div class="live-tag">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="12" height="12" rx="4" fill="#FF754C" />
              </svg>
              <span>Live</span>
            </div>
            <div class="viewers">
              <div class="dot"></div>
              <span>{{ video.viewers }} watching</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommended-videos {
  width: 100%;
  margin-bottom: 40px;
  border-radius: 24px;
  background: linear-gradient(90deg, rgba(108, 93, 211, 0.1) 0%, rgba(108, 93, 211, 0.05) 100%);
  padding: 24px;
  position: relative;
}

.recommended-videos::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  border: 1px solid rgba(108, 93, 211, 0.2);
  pointer-events: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin: 0;
}

.filter-dropdown {
  position: relative;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(228, 228, 228, 0.1);
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #808191;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: rgba(228, 228, 228, 0.15);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: #242731;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
  min-width: 160px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #808191;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: rgba(228, 228, 228, 0.05);
}

.dropdown-item.selected {
  color: #6c5dd3;
  background-color: rgba(108, 93, 211, 0.1);
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.video-card {
  background-color: #242731;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.video-card:hover {
  transform: translateY(-5px);
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.thumbnail {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px 24px 0 0;
}

.video-content {
  padding: 16px;
  flex-grow: 1;
}

.video-title {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin: 0 0 16px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 12px;
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
  border-radius: 50%;
  background-color: #a0d7e7;
}

.avatar-1 {
  background-color: #ff8a65;
}

.avatar-2 {
  background-color: #64b5f6;
}

.avatar-3 {
  background-color: #7fba7a;
}

.avatar-4 {
  background-color: #ba68c8;
}

.creator-details {
  display: flex;
  flex-direction: column;
}

.creator-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #fff;
}

.verified-badge {
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
}

.video-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid rgba(240, 243, 246, 0.1);
}

.live-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background-color: #ff754c;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #fff;
}

.viewers {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #808191;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #0049c6;
}

@media (max-width: 1200px) {
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
