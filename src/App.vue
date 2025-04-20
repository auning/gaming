<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  font-family:
    'Inter',
    'Poppins',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  background-color: #1f2128;
  color: #ffffff;
}

#app {
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
}
</style>
