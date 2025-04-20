<script setup>
import { ref } from 'vue'

// 左侧轮播卡片数据
const featuredCategories = [
  {
    id: 1,
    title: 'League of Legends',
    image: '/banner_background4.jpg',
    viewers: '4.9K',
    category: 'MOBA',
    tags: ['MOBA', 'ESport'],
    featured: true,
    followed: false,
  },
  {
    id: 2,
    title: 'Dota 2',
    image: '/banner_background1.jpg',
    viewers: '5.2K',
    category: 'MOBA',
    tags: ['MOBA', 'Competitive'],
    featured: true,
    followed: false,
  },
]

// 右侧卡片数据
const sideCategories = [
  {
    id: 1,
    title: 'Fortnite',
    image: '/categories1.jpg',
    viewers: '4.9K',
    category: 'Shooter',
    followed: false,
  },
  {
    id: 2,
    title: 'Call of Duty',
    image: '/categories2.jpg',
    viewers: '125K',
    category: 'Shooter',
    followed: false,
  },
  {
    id: 3,
    title: 'PUBG',
    image: '/categories3.jpg',
    viewers: '3.6K',
    category: 'Shooter',
    followed: false,
  },
]

// 轮播控制
const currentFeaturedIndex = ref(0) // 默认显示第一个卡片

// 跟随功能
const toggleFollow = (categoryArray, categoryId) => {
  const categoryIndex = categoryArray.findIndex((category) => category.id === categoryId)
  if (categoryIndex !== -1) {
    categoryArray[categoryIndex].followed = !categoryArray[categoryIndex].followed
  }
}

// 轮播导航
const navigateFeatured = (direction) => {
  const currentIndex = currentFeaturedIndex.value

  if (direction === 'prev') {
    currentFeaturedIndex.value = currentIndex > 0 ? currentIndex - 1 : featuredCategories.length - 1
  } else {
    currentFeaturedIndex.value = currentIndex < featuredCategories.length - 1 ? currentIndex + 1 : 0
  }
}
</script>

<template>
  <div class="categories-section">
    <h2 class="section-title">Popular Categories</h2>

    <div class="categories-layout">
      <!-- 左侧轮播卡片 -->
      <div class="featured-card">
        <div
          class="featured-image"
          :style="{ backgroundImage: `url(${featuredCategories[currentFeaturedIndex].image})` }"
        >
          <!-- 导航箭头 -->
          <div class="navigation-arrows">
            <button class="nav-arrow left" @click="navigateFeatured('prev')">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 4.5L6.75 9L11.25 13.5"
                  stroke="#242731"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button class="nav-arrow right" @click="navigateFeatured('next')">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 4.5L11.25 9L6.75 13.5"
                  stroke="#242731"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div class="featured-content">
            <h3 class="featured-title">{{ featuredCategories[currentFeaturedIndex].title }}</h3>

            <div class="featured-info">
              <div class="tag-container" v-if="featuredCategories[currentFeaturedIndex].tags">
                <div
                  v-for="(tag, index) in featuredCategories[currentFeaturedIndex].tags"
                  :key="index"
                  class="featured-tag"
                >
                  {{ tag }}
                </div>
              </div>

              <div class="viewers-info">
                <span>{{ featuredCategories[currentFeaturedIndex].viewers }} Viewers</span>
                <div class="status-dot"></div>
              </div>

              <button
                class="follow-button featured"
                :class="{ followed: featuredCategories[currentFeaturedIndex].followed }"
                @click="
                  toggleFollow(featuredCategories, featuredCategories[currentFeaturedIndex].id)
                "
              >
                {{ featuredCategories[currentFeaturedIndex].followed ? 'Following' : 'Follow' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧三个小卡片 -->
      <div class="category-cards">
        <div v-for="category in sideCategories" :key="category.id" class="category-card">
          <div class="card-content">
            <div class="card-image-container">
              <div class="card-image" :style="{ backgroundImage: `url(${category.image})` }"></div>
            </div>
            <div class="card-info-wrapper">
              <div class="card-info">
                <div class="card-category">{{ category.category }}</div>
                <h3 class="card-title">{{ category.title }}</h3>
                <div class="viewers-count">
                  <div class="status-dot"></div>
                  <span>{{ category.viewers }} Viewers</span>
                </div>
                <button
                  class="follow-button"
                  :class="{ followed: category.followed }"
                  @click="toggleFollow(sideCategories, category.id)"
                >
                  {{ category.followed ? 'Following' : 'Follow' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-section {
  width: 100%;
  margin-bottom: 40px;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin: 0 0 24px 0;
}

.categories-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  min-height: auto;
}

/* 右侧小卡片样式 */
.category-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.category-card {
  background-color: #242731;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  height: 128px;
  display: flex;
  flex: 1;
}

.card-content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.card-image-container {
  width: 240px;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.card-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* 移除复杂的分隔器，改用简单的方式 */
.card-info-wrapper {
  position: relative;
  flex: 1;
  margin-left: -10px;
  display: flex;
  height: 100%;
}

.card-info {
  background-color: #242731;
  flex: 1;
  padding: 18px 18px 18px 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  border-radius: 0 24px 24px 0;
}

.card-category {
  font-size: 14px;
  font-weight: 600;
  color: #3f8cff;
  margin-bottom: 6px;
  display: block;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin: 0 0 6px 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.viewers-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #808191;
  margin-bottom: 10px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #7fba7a;
}

.follow-button {
  padding: 8px 16px;
  background-color: #242731;
  border: 1px solid rgba(228, 228, 228, 0.1);
  border-radius: 16px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-block;
  width: 100px;
  text-align: center;
}

.follow-button:hover {
  background-color: rgba(228, 228, 228, 0.1);
}

.follow-button.followed {
  background-color: #6c5dd3;
  border-color: #6c5dd3;
}

/* 左侧特色卡片样式 */
.featured-card {
  height: 100%;
}

.featured-image {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
  min-height: 420px;
}

.featured-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(58, 62, 69, 0) 0%, rgba(27, 29, 33, 0.9) 100%);
  z-index: 1;
}

.navigation-arrows {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 3;
}

.nav-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.nav-arrow:hover {
  transform: scale(1.05);
}

.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  z-index: 2;
}

.featured-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin: 0 0 16px 0;
}

.featured-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tag-container {
  display: flex;
  gap: 10px;
}

.featured-tag {
  padding: 6px 12px;
  background-color: rgba(108, 93, 211, 0.5);
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.viewers-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}

.follow-button.featured {
  padding: 8px 24px;
  background-color: #6c5dd3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  width: 120px;
}

@media (max-width: 1200px) {
  .categories-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 30px;
  }

  .featured-image {
    min-height: 350px;
  }

  .category-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 20px;
    height: auto;
  }

  .category-card {
    height: auto;
    min-height: 300px;
  }

  .card-content {
    flex-direction: column;
  }

  .card-image-container {
    width: 100%;
    height: 160px;
  }

  .card-info-wrapper {
    margin-left: 0;
  }

  .card-info {
    border-radius: 0 0 24px 24px;
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .categories-layout {
    gap: 24px;
  }

  .category-cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .category-card {
    height: 146px;
    min-height: 146px;
  }

  .follow-button {
    padding: 6px 12px;
    font-size: 12px;
    width: 80px;
  }

  .follow-button.featured {
    padding: 7px 16px;
    font-size: 13px;
    width: 100px;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .featured-title {
    font-size: 20px;
  }

  .card-content {
    flex-direction: row;
  }

  .card-image-container {
    width: 240px;
    height: 100%;
  }

  .card-info-wrapper {
    margin-left: -20px;
  }

  .card-info {
    border-radius: 0 24px 24px 0;
    padding: 20px 20px 20px 40px;
  }
}
</style>
