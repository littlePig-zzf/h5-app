<template>
  <div class="search">
    <template v-if="queryKeyword">
      <ComicList :list="searchResult"/>
      <EmptyMessage message="暂无数据" v-if="searchResult.length === 0"/>
    </template>
    <template v-else>
      <div class="header">
        <x-icon @click="back" type="ios-arrow-left" size="26"></x-icon>
        <input type="text" placeholder="搜索漫画名称" ref="keywordInput" v-model.trim="keyword" @keyup.enter="submit">
        <img class="icon" src="../../static/images/search.png" alt="">
        <span class="keyword" @click="submit">搜索</span>
      </div>
      <div class="content">
        <p>热门搜索</p>
        <ul class="hot">
          <router-link tag="li" :to="`/comic/${item.id}`" v-for="(item, index) in hotList" :key="index">
            {{item.title}}
          </router-link>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import ComicList from '@/components/ComicList'
import EmptyMessage from '@/components/EmptyMessage'
import {back} from '../util/history'

export default {
  name: 'Search',
  components: {
    ComicList,
    EmptyMessage,
  },

  data () {
    return {
      keyword: '',
      hotList: [],
      searchResult: [],
    }
  },

  created () {
    this.init()
  },

  methods: {
    back,
    async init () {
      if (this.queryKeyword) {
        this.searchResult = []
        const {data} = await this.$api.search.index(this.queryKeyword)
        this.searchResult = data
      } else {
        const {data} = await this.$api.search.hot()
        this.hotList = data
      }
    },

    submit () {
      const {keyword} = this
      if (!keyword) {
        return
      }
      this.$router.push({
        name: 'search',
        query: {
          keyword,
        },
      })
    },
  },

  watch: {
    $route (to, from) {
      if (to.name !== 'search') {
        return
      }

      this.init()
    },
  },

  computed: {
    queryKeyword () {
      let {keyword} = this.$route.query
      return keyword ? keyword.trim() : false
    },
  },
}

</script>

<style lang="less">
@import "../assets/less/search.less";
</style>
