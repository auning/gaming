<script setup>
import { ref } from 'vue'

// 主比赛数据
const mainMatch = ref({
  id: 1,
  title: 'Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs',
  viewers: 24000,
  game: 'League of Legends®',
  language: '🇺🇸 English',
  isLive: true,
  thumbnail: '/images/matches/main_match.jpg',
  gameIcon: '/images/matches/game_icon.jpg',
})

// 推荐比赛数据
const recommendedMatches = ref([
  {
    id: 1,
    thumbnail: '/images/matches/thumbnail1.jpg',
    isLive: true,
    isActive: true,
  },
  {
    id: 2,
    thumbnail: '/images/matches/thumbnail2.jpg',
    isLive: true,
    isActive: false,
  },
  {
    id: 3,
    thumbnail: '/images/matches/thumbnail3.jpg',
    isLive: true,
    isActive: false,
  },
  {
    id: 4,
    thumbnail: '/images/matches/thumbnail4.jpg',
    isLive: false,
    isActive: false,
  },
])

// 切换活动的比赛
const setActiveMatch = (matchId) => {
  recommendedMatches.value.forEach((match) => {
    match.isActive = match.id === matchId
  })
}

// 格式化观众数
const formatViewers = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(0) + 'K'
  }
  return count.toString()
}
</script>

<template>
  <div class="live-matches-section">
    <h2 class="section-title">Live Matches</h2>

    <div class="live-matches-container">
      <!-- 主比赛视频区域 -->
      <div class="main-match">
        <div class="video-container">
          <img :src="mainMatch.thumbnail" alt="Live Match" class="video-thumbnail" />

          <!-- 观众数标签 -->
          <div class="viewers-tag">{{ formatViewers(mainMatch.viewers) }} Watching</div>

          <!-- 视频控制栏 -->
          <div class="video-controls">
            <div class="control-buttons">
              <div class="control-button">
                <div class="button-bg"></div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="1" width="3" height="10" rx="1" fill="white" />
                  <rect x="7" y="1" width="3" height="10" rx="1" fill="white" />
                </svg>
              </div>
              <div class="control-button">
                <div class="button-bg"></div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4C1 2.34315 2.34315 1 4 1V1C5.65685 1 7 2.34315 7 4V10C7 11.6569 5.65685 13 4 13V13C2.34315 13 1 11.6569 1 10V4Z"
                    fill="white"
                  />
                  <path
                    d="M8.22625 9.67235L12.2263 7.17235C12.4503 7.03989 12.5825 6.79832 12.5825 6.5371C12.5825 6.27588 12.4503 6.03431 12.2263 5.90185L8.22625 3.40185C7.9743 3.25223 7.65856 3.25223 7.40661 3.40185C7.15466 3.55147 7 3.82783 7 4.0371V9.0371C7 9.24637 7.15466 9.52273 7.40661 9.67235C7.65856 9.82197 7.9743 9.82197 8.22625 9.67235Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div class="sound-bar">
              <div class="sound-bar-bg"></div>
              <div class="sound-bar-fill"></div>
              <div class="sound-bar-handle"></div>
            </div>

            <div class="extra-controls">
              <div class="control-button">
                <div class="button-bg"></div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.64817 4.3815C2.4055 2.3075 4.40367 1 6.5 1H7.5C9.59633 1 11.5945 2.3075 12.3518 4.3815C12.5135 4.81 12.75 5.539 12.75 7C12.75 8.461 12.5135 9.19 12.3518 9.6185C11.5945 11.6925 9.59633 13 7.5 13H6.5C4.40367 13 2.4055 11.6925 1.64817 9.6185C1.48649 9.19 1.25 8.461 1.25 7C1.25 5.539 1.48649 4.81 1.64817 4.3815ZM6.5 2.5H7.5C8.99667 2.5 10.3358 3.45433 10.887 4.97617C10.9973 5.25817 11.25 5.861 11.25 7C11.25 8.139 10.9973 8.74183 10.887 9.02383C10.3358 10.5457 8.99667 11.5 7.5 11.5H6.5C5.00333 11.5 3.66425 10.5457 3.11302 9.02383C3.00268 8.74183 2.75 8.139 2.75 7C2.75 5.861 3.00268 5.25817 3.11302 4.97617C3.66425 3.45433 5.00333 2.5 6.5 2.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div class="control-button">
                <div class="button-bg"></div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="4" width="10" height="6" rx="1" fill="white" />
                </svg>
              </div>
              <div class="control-button">
                <div class="button-bg"></div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 3.99935V2.33268C2 1.78039 2.44772 1.33268 3 1.33268H4.66667"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 10.0007V11.6673C2 12.2196 2.44772 12.6673 3 12.6673H4.66667"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 3.99935V2.33268C12 1.78039 11.5523 1.33268 11 1.33268H9.33333"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 10.0007V11.6673C12 12.2196 11.5523 12.6673 11 12.6673H9.33333"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- 播放按钮 -->
          <div class="play-button">
            <div class="play-button-bg"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 4.27539C5 3.23364 6.1059 2.56923 7.02421 3.04145L15.6773 7.76605C16.6462 8.26431 16.6462 9.73567 15.6773 10.2339L7.02421 14.9585C6.1059 15.4308 5 14.7663 5 13.7246V4.27539Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <!-- 比赛信息 -->
        <div class="match-info">
          <div class="match-title-container">
            <h3 class="match-title">{{ mainMatch.title }}</h3>

            <div class="live-tag">
              <span class="live-text">Live</span>
              <div class="live-icon-wrapper">
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          <div class="match-details">
            <div class="game-info">
              <div class="game-icon">
                <img :src="mainMatch.gameIcon" alt="Game Icon" />
              </div>
              <span class="game-name">{{ mainMatch.game }}</span>
            </div>

            <span class="separator">•</span>

            <div class="language">{{ mainMatch.language }}</div>
          </div>
        </div>
      </div>

      <!-- 缩略图列表 -->
      <div class="thumbnails-list">
        <div
          v-for="match in recommendedMatches"
          :key="match.id"
          :class="['thumbnail-item', { active: match.isActive }]"
          @click="setActiveMatch(match.id)"
        >
          <img :src="match.thumbnail" alt="Match thumbnail" class="thumbnail-image" />

          <!-- 活动状态标记 -->
          <div v-if="match.isActive" class="active-indicator"></div>

          <!-- 直播标签 -->
          <div v-if="match.isLive" class="thumbnail-live-tag">
            <span>Live</span>
            <div class="thumbnail-live-icon-wrapper">
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2" r="2" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-matches-section {
  width: 100%;
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 24px 0;
}

.live-matches-container {
  display: flex;
  gap: 20px;
  background-color: #242731;
  border-radius: 32px;
  padding: 20px;
  height: 465px;
}

/* 主比赛视频区域 */
.main-match {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-container {
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 32px;
  overflow: hidden;
  background-color: #1a1c24;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.viewers-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(27, 29, 33, 0.5);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  background: linear-gradient(to top, rgba(27, 29, 33, 0.7), transparent);
}

.control-buttons,
.extra-controls {
  display: flex;
  gap: 10px;
}

.control-button {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.control-button svg {
  position: relative;
  z-index: 2;
}

.button-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1b1d21;
  opacity: 0.7;
  border-radius: 4px;
}

.sound-bar {
  flex: 1;
  height: 2px;
  margin: 0 15px;
  position: relative;
}

.sound-bar-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(36, 39, 49, 0.2);
  border-radius: 1px;
}

.sound-bar-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: #242731;
  border-radius: 1px;
}

.sound-bar-handle {
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #242731;
  border-radius: 50%;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-button svg {
  position: relative;
  z-index: 2;
}

.play-button-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1b1d21;
  opacity: 0.85;
  border-radius: 16px;
}

/* 比赛信息 */
.match-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.match-title-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.match-title {
  font-size: 22px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.live-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #ff754c;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 8px;
  white-space: nowrap;
  height: 24px;
}

.live-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.match-details {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #808191;
  font-size: 14px;
}

.game-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.game-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
}

.game-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.separator {
  font-size: 16px;
}

/* 缩略图列表 */
.thumbnails-list {
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thumbnail-item {
  position: relative;
  height: 100px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-item.active {
  border: 2px solid #3f8cff;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #3f8cff;
}

.thumbnail-live-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #ff754c;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.thumbnail-live-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式样式 */
@media (max-width: 1200px) {
  .live-matches-container {
    flex-direction: column;
    height: auto;
  }

  .thumbnails-list {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  .thumbnail-item {
    width: 180px;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .video-container {
    height: 240px;
  }

  .match-title {
    font-size: 18px;
  }
}
</style>
