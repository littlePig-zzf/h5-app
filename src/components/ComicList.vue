<template>
  <div class="comic-list">
    <ComicItem
      v-for="(item, index) in list"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script>
import ComicItem from './ComicItem.vue'

export default {
  name: 'ComicList',
  components: {
    ComicItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="less">
.comic-list {
  background: #f5f5f5;
  font-size: 0;
}
</style>
