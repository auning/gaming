<template>
  <component :is="iconComponent" v-if="iconComponent" v-bind="$attrs" />
  <span v-else class="icon-fallback"></span>
</template>

<script>
export default {
  name: 'IconManager',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      iconComponent: null,
    }
  },
  watch: {
    name: {
      immediate: true,
      handler: 'loadIcon',
    },
  },
  methods: {
    async loadIcon() {
      if (!this.name) return

      try {
        // 尝试动态导入图标
        const iconName = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        const module = await import(`./icons/${iconName}.vue`)
        this.iconComponent = module.default
      } catch (error) {
        console.error(`无法加载图标: ${this.name}`, error)
        this.iconComponent = null
      }
    },
  },
}
</script>

<style scoped>
.icon-fallback {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 4px;
}
</style>
