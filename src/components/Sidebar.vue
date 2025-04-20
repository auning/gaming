<script setup>
import { ref } from 'vue'

// 定义组件名称
defineOptions({
  name: 'GameSidebar',
})

const activePage = ref('home')

const mainMenuItems = [
  { id: 'home', label: 'New Feed', icon: 'home', active: true },
  { id: 'trending', label: 'Trending', icon: 'trending' },
  { id: 'following', label: 'Following', icon: 'profile' },
  { id: 'playlist', label: 'Playlist', icon: 'playlist' },
  { id: 'videos', label: 'Your Videos', icon: 'video', hasNew: true },
]

const followingUsers = [
  { id: 1, name: 'Dylan Hodges', avatar: 'user1.jpg', isLive: true },
  { id: 2, name: 'Vincent Parks', avatar: 'user2.jpg', hasNotification: true },
  { id: 3, name: 'Richard Bowers', avatar: 'user3.jpg', isLive: true },
  { id: 4, name: 'Isaac Lambert', avatar: 'user4.jpg', isLive: true },
  { id: 5, name: 'Lillie Nash', avatar: 'user5.jpg', hasNotification: true },
  { id: 6, name: 'Edith Cain', avatar: 'user6.jpg', isLive: true },
  { id: 7, name: 'Jerry Sherman', avatar: 'user7.jpg', hasNotification: true },
]

const toolItems = [
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'chat', label: 'Chat', icon: 'chat', notifications: 20 },
]

const setActivePage = (pageId) => {
  activePage.value = pageId
}

function getRandomColor() {
  const colors = ['#FFCE73', '#FFA2C0', '#A5CEA1', '#CFC8FF', '#FFB7F5', '#A0D7E7']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 简化版图标组件
const icons = {
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>',
  trending:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" /></svg>',
  profile:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>',
  playlist:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20V16M13,15H15V11H19V9H15V5H13V9H9V11H13V15Z" /></svg>',
  video:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H20V6H4M6,9H8V13H6V9M9,9H13V10H9V9M9,11H13V12H9V11M9,13H13V14H9V13M14,9H18V10H14V9M14,11H18V12H14V11M14,13H18V14H14V13Z" /></svg>',
  settings:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20V16Z" /></svg>',
  logo: '<svg viewBox="0 0 24 24" fill="#6c5dd3"><path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>',
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo-burger">
      <div class="logo">
        <div class="logo-icon" v-html="icons.logo"></div>
        <span class="logo-text">Unity<span class="dot">.</span></span>
      </div>
      <button class="burger-btn">
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="main-menu">
      <h3 class="menu-header">New Feeds</h3>
      <ul class="menu-list">
        <li
          v-for="item in mainMenuItems"
          :key="item.id"
          class="menu-item"
          :class="{ active: activePage === item.id }"
          @click="setActivePage(item.id)"
        >
          <div class="menu-icon" v-html="icons[item.icon]"></div>
          <span class="menu-label">{{ item.label }}</span>
          <span v-if="item.hasNew" class="new-indicator">+</span>
        </li>
      </ul>
    </nav>

    <nav class="following-menu">
      <h3 class="menu-header">Following</h3>
      <ul class="following-list">
        <li v-for="user in followingUsers" :key="user.id" class="following-item">
          <div class="user-avatar" :style="{ backgroundColor: getRandomColor() }">
            <div v-if="user.isLive" class="live-indicator"></div>
            <div v-if="user.hasNotification" class="notification-indicator"></div>
          </div>
          <span class="user-name">{{ user.name }}</span>
        </li>
        <li class="following-item load-more">
          <div class="load-more-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 8L18 14H6L12 8Z"
                fill="none"
                stroke="#808191"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="load-more-text">Load more</span>
        </li>
      </ul>
    </nav>

    <nav class="tools-menu">
      <h3 class="menu-header">Unity Gaming</h3>
      <ul class="menu-list">
        <li
          v-for="item in toolItems"
          :key="item.id"
          class="menu-item"
          :class="{ active: activePage === item.id }"
          @click="setActivePage(item.id)"
        >
          <div class="menu-icon" v-html="icons[item.icon]"></div>
          <span class="menu-label">{{ item.label }}</span>
          <span v-if="item.notifications" class="notification-count">{{ item.notifications }}</span>
        </li>
      </ul>
    </nav>

    <div class="bottom-section">
      <div class="join-box">
        <div class="join-content">
          <h3 class="join-title">Join the<br />Unity Gaming</h3>
          <p class="join-desc">Discover the best live<br />streams anywhere.</p>
          <button class="join-btn">Join Now</button>
        </div>
        <button class="close-btn">×</button>
      </div>

      <div class="theme-toggle">
        <span class="night-icon">🌙</span>
        <div class="toggle-track">
          <div class="toggle-thumb"></div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background-color: #242731;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  box-shadow: inset -1px 0px 0px 0px rgba(228, 228, 228, 0.1);
}

.logo-burger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
}

.logo-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  color: #6c5dd3;
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
}

.dot {
  color: #6c5dd3;
}

.burger-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.burger-btn span {
  display: block;
  width: 18px;
  height: 2px;
  background-color: #fff;
}

.menu-header {
  font-size: 12px;
  color: #808191;
  font-weight: 500;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.menu-list,
.following-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 5px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  color: #808191;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: rgba(228, 228, 228, 0.05);
  color: #fff;
}

.menu-item.active {
  background-color: #6c5dd3;
  color: #fff;
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 15px;
  opacity: 0.6;
}

.menu-item.active .menu-icon {
  opacity: 1;
}

.menu-label {
  font-size: 14px;
  font-weight: 600;
  flex-grow: 1;
}

.menu-item.active .menu-label {
  color: #fff;
}

.new-indicator {
  width: 18px;
  height: 18px;
  background-color: #6c5dd3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
}

.menu-item.active .new-indicator {
  background-color: #fff;
  color: #6c5dd3;
}

.following-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.following-item:hover {
  background-color: rgba(228, 228, 228, 0.05);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
  position: relative;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #808191;
}

.live-indicator {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #7fba7a;
  border-radius: 50%;
  bottom: 0;
  right: 0;
  border: 2px solid #242731;
}

.notification-indicator {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #7fba7a;
  border-radius: 50%;
  top: 0;
  right: 0;
  border: 2px solid #242731;
}

.following-item.load-more {
  color: #808191;
}

.load-more-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(228, 228, 228, 0.1);
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.load-more-text {
  font-size: 14px;
  font-weight: 600;
}

.notification-count {
  min-width: 20px;
  height: 20px;
  background-color: #ff754c;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 0 6px;
}

.main-menu,
.following-menu,
.tools-menu {
  margin-bottom: 25px;
}

.bottom-section {
  margin-top: auto;
}

.join-box {
  background-color: #242731;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
  overflow: hidden;
}

.join-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 29, 33, 0.5);
  z-index: 0;
}

.join-content {
  position: relative;
  z-index: 1;
}

.join-title {
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 10px;
  line-height: 1.3;
  color: #fff;
}

.join-desc {
  font-size: 12px;
  color: #808191;
  margin-bottom: 20px;
  line-height: 1.4;
}

.join-btn {
  background-color: #6c5dd3;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  z-index: 2;
  cursor: pointer;
}

.theme-toggle {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #1f2128;
  border-radius: 10px;
  margin-bottom: 20px;
}

.night-icon {
  margin-right: 10px;
  opacity: 0.3;
}

.toggle-track {
  width: 40px;
  height: 20px;
  background-color: rgba(108, 93, 211, 0.2);
  border-radius: 10px;
  position: relative;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #6c5dd3;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
    padding: 15px 10px;
  }

  .logo-text,
  .menu-label,
  .user-name,
  .join-box,
  .theme-toggle {
    display: none;
  }

  .menu-header {
    text-align: center;
    padding: 0 5px;
    font-size: 10px;
  }

  .menu-item,
  .following-item {
    justify-content: center;
    padding: 10px;
  }

  .menu-icon {
    margin-right: 0;
  }

  .new-indicator,
  .notification-count {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
