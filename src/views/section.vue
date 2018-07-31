<template>
  <div class="container section">
    <ComicList :list="list" v-if="hasComics"/>
  </div>
</template>

<script>
import ComicList from '@/components/ComicList'

export default {
  name: 'Section',
  components: {
    ComicList,
  },

  data () {
    return {
      list: [],
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      const {id} = this.$route.params
      const {data} = await this.$api.section(id)
      this.list = data
    },
  },

  computed: {
    hasComics () {
      return this.list.length > 0
    },
  },
}
</script>

<style lang="less">
.section {
  .comic-item {
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
