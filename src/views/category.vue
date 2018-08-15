<template>
  <scroll-page ref="scrollPage" @nextPage="nextPage">
    <div class="container category">
      <top-bar :searchPlaceHolder="searchPlaceHolder" :tabIndex="tabIndex" :showButtonTab="true"></top-bar>

      <div class="tag">
        <ul v-for="(item, index) in categories" :key="index">
          <li v-for="(subItem, subIndex) in item.list"
            :key="subIndex"
            :class="{'active': item.sub_index === subIndex}"
            @click="changeCategory(subIndex, index)"
          >{{subItem.title}}</li>
        </ul>
      </div>
      <div class="content">
        <template v-if="comics.length">
          <router-link class="panel" tag="div" :to="`/comic/${item.id}`" v-for="(item, index) in comics" :key="index">
            <div class="panel-image">
              <img :src="item.cover2" alt="">
            </div>
            <div class="panel-block">
              <h3 class="title">{{item.title}}</h3>
              <span class="tips">更新到{{item.chapters_num}}话</span>
              <p class="updated-at">更新时间： {{item.updated_at}}</p>
              <span class="tag">{{item.category_title}}</span>
            </div>
          </router-link>
        </template>
        <EmptyMessage :message="message" v-if="emptyData"/>
      </div>
    </div>
  </scroll-page>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import EmptyMessage from '@/components/EmptyMessage.vue'
import ScrollPage from '@/components/ScrollPage.vue'

export default {
  name: 'category',
  components: {
    TopBar,
    EmptyMessage,
    ScrollPage,
  },

  data () {
    return {
      searchPlaceHolder: '搜索漫画名称',
      categories: [],
      comics: [],
      currentPage: 1,
      lastPage: 1,
      queryParams: {
        page: 1,
      },
      tabIndex: 1,
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$refs.scrollPage.removeScroll()
    next()
  },

  created () {
    this.init()
  },

  activated () { // 被激活
    // 定位到「分类」tab
    this.tabIndex = 1
  },

  deactivated () { // 离开页面
    this.tabIndex = 0
  },

  methods: {
    async init () {
      // 获取全部类别
      const {data} = await this.$api.category()

      // 默认类别参数值为列表第一项, 即 -1
      for (const item of data) {
        const {key, list, sub_index: subIndex} = item
        this.queryParams[key] = list[subIndex] ? list[subIndex].id : list[0].id
      }

      this.categories = data
      this.fetchComics()
    },

    async fetchComics (page = 1) {
      this.queryParams.page = page

      try {
        const {data, meta} = await this.$api.comic.list(this.queryParams)

        this.comics = page > 1 ? [...this.comics, ...data] : data

        // 最后一页处理
        this.currentPage = page
        this.lastPage = meta.last_page
      } catch (error) {}
    },

    nextPage () {
      if (!this.hasMorePage) return

      this.fetchComics(this.currentPage + 1)
    },

    changeCategory (subIndex, index) {
      const {sub_index: cateSubIndex} = this.categories[index]
      if (cateSubIndex === subIndex) return

      this.categories[index].sub_index = subIndex

      const {key, list} = this.categories[index]
      this.queryParams[key] = list[subIndex].id

      // 每次查询初始化第一页
      this.fetchComics(1)
    },
  },

  computed: {
    hasMorePage () {
      return this.lastPage > this.currentPage
    },

    emptyData () {
      return !this.hasMorePage || this.comics.length === 0
    },

    message () {
      if (!this.emptyData) return ''

      return this.comics.length === 0 ? '暂无数据~~' : '没有更多数据'
    },
  },
}
</script>

<style lang="less">
@import "../assets/less/category.less";
</style>
