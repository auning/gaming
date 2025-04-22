<script setup>
import { ref } from 'vue'
import GameCard from './GameCard.vue'

const games = ref([
  {
    id: 1,
    title: 'Call of Duty®',
    category: 'Shooting',
    viewers: 2800,
    imageUrl: '/images/games/cod.jpg',
  },
  {
    id: 2,
    title: 'The Dota 2',
    category: 'eSport',
    viewers: 2800,
    imageUrl: '/images/games/dota2.jpg',
  },
  {
    id: 3,
    title: 'League of Legends®',
    category: 'Online Game',
    viewers: 2800,
    imageUrl: '/images/games/lol.jpg',
  },
  {
    id: 4,
    title: 'Fortnite®',
    category: 'Shooting',
    viewers: 2800,
    imageUrl: '/images/games/fortnite.jpg',
  },
])
</script>

<template>
  <section class="popular-games-section">
    <div class="games-grid">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :title="game.title"
        :category="game.category"
        :viewers="game.viewers"
        :imageUrl="game.imageUrl"
      />
    </div>
  </section>
</template>

<style scoped>
.popular-games-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1400px) {
  .games-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1200px) {
  .games-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>
