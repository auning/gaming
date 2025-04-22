<script setup>
// 导入页面组件
import Sidebar from '../components/layout/Sidebar.vue'
import TopNavigation from '../components/layout/TopNavigation.vue'
// 导入关注页面组件
import StoriesSection from '../components/pages/home/StoriesSection.vue'
import PopularGames from '../components/pages/following/PopularGames.vue'
import LiveMatches from '../components/pages/following/LiveMatches.vue'
import RecommendedVideos from '../components/pages/home/RecommendedVideos.vue'
import PopularCategories from '../components/pages/home/PopularCategories.vue'
</script>

<template>
  <div class="gaming-layout">
    <div class="content-container">
      <!-- 左侧导航栏 -->
      <Sidebar class="sidebar" />

      <!-- 主内容区域 -->
      <div class="main-content">
        <!-- 顶部导航栏 -->
        <TopNavigation class="top-nav" />

        <!-- 内容区域 -->
        <div class="content-area">
          <!-- 故事区域 -->
          <StoriesSection class="stories-section" />

          <!-- 热门游戏 -->
          <PopularGames class="popular-games" />

          <!-- 直播比赛 -->
          <LiveMatches class="live-matches" />

          <!-- 推荐视频区域 -->
          <RecommendedVideos class="recommended-videos" />

          <!-- 热门分类区域 -->
          <PopularCategories class="popular-categories" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gaming-layout {
  width: 100%;
  min-height: 100vh;
  background-color: #1f2128;
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
}

.content-container {
  width: 100%;
  display: flex;
  position: relative;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  background-color: #242731;
  box-shadow: inset -1px 0px 0px 0px rgba(228, 228, 228, 0.1);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 200;
}

.main-content {
  flex: 1;
  width: calc(100% - 280px);
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 280px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-nav {
  height: 80px;
  width: 100%;
  background-color: #242731;
  box-shadow: inset 0px -1px 0px 0px rgba(228, 228, 228, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
}

.content-area {
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 1340px;
}

@media (max-width: 1660px) {
  .content-area {
    max-width: 1120px;
  }
}

@media (max-width: 1400px) {
  .content-area {
    max-width: 920px;
  }
}

@media (max-width: 1200px) {
  .sidebar {
    width: 240px;
  }

  .main-content {
    width: calc(100% - 240px);
    margin-left: 240px;
    max-width: calc(100% - 240px);
  }

  .content-area {
    max-width: 720px;
    padding: 24px 30px;
    gap: 30px;
  }
}

@media (max-width: 1000px) {
  .content-container {
    padding: 0;
  }

  .content-area {
    max-width: 100%;
    padding: 24px 40px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 0;
    display: none;
  }

  .main-content {
    width: 100%;
    margin-left: 0;
    max-width: 100%;
  }

  .content-area {
    padding: 16px 20px;
    gap: 24px;
  }
}
</style>
