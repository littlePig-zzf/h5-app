<template>
  <div class="comic">
    <div class="hero" v-show="!onlyShowDirectory">
      <img :src="comic.cover" alt="">
      <div class="summary">
        <div class="tool-box clearfix">
          <div class="tool-left">
            <router-link to="/home" tag="p" class="home">
              <img src="../../static/images/top_home.png" alt="">
            </router-link>
          </div>
          <div class="tool-right">
            <p :class="{'grey-bg': comic.is_liked}" @click="toggleLike">
              <img src="../../static/images/top_like.png" alt="">
              <span>{{likeTag}}</span>
            </p>
            <p :class="{'grey-bg': comic.is_bookmarked}" @click="toggleBookmark">
              <img src="../../static/images/top_bookmark.png" alt="">
              <span>{{bookmarkTag}}</span>
            </p>
          </div>
        </div>
        <div class="text">
          <div class="text-inner">
            <h1>{{comic.title}}</h1>
            <div class="sub-info clearfix">
              <span class="book-tag">{{comic.category_title}}</span>
              <p class="update-num">{{statusTag}}/更新至{{comic.chapters_num}}话</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content" :class="{ 'only-show-directory': onlyShowDirectory }">
      <tab :line-width="1" custom-bar-width="60px" v-model="tabIndex" v-show="!onlyShowDirectory">
        <tab-item selected>详情</tab-item>
        <tab-item>选集</tab-item>
      </tab>
      <div class="description">
        <div class="card" v-if="!onlyShowDirectory && tabIndex === 0">
          <h3>作品简介</h3>
          <p class="detail">{{comic.description}}</p>
          <div class="foot clearfix">
            <p class="fl-left">发布日期：{{comic.published_at}}</p>
            <div class="fl-right">
              <p>
                <img src="../../static/images/likes.png" alt="">
                <span>{{comic.likes}}</span>
              </p>
              <p>
                <img src="../../static/images/views.png" alt="">
                <span>{{comic.views}}</span>
              </p>
            </div>
          </div>
        </div>
        <ChapterList v-else :data="comic.chapters" :showHeader="onlyShowDirectory"/>
      </div>
    </div>

    <div class="footer" v-show="!onlyShowDirectory">
      <router-link :to="`/comic/${comic.id}?dir=1`" tag="p">
        订阅购买
      </router-link>
      <p class="read-now" @click="readNow">开始阅读</p>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import ChapterList from '@/components/ChapterList.vue'
import comicChapterMixin from '../mixins/comic-chapter'

export default {
  name: 'Comic',

  components: {
    Tab,
    TabItem,
    ChapterList,
  },

  mixins: [comicChapterMixin],

  data () {
    return {
      tabIndex: 0,
      onlyShowDirectory: false,
    }
  },

  methods: {
    /**
     * 开始阅读-默认从第一章节开始
     * 1. 获取章节信息
     * 2. 需要付费 -> 调用购买弹窗
     * 3. 免费 -> 进入阅读/已付费 -> 重新请求
     * 4. 直接访问章节详情页面则回到 2
     */
    async readNow () {
      const {chapters} = this.comic
      if (chapters === undefined || chapters.length === 0) {
        return
      }

      const chapter = chapters[0]
      this.$router.push(`/chapter/${chapter.id}`)
    },
  },

  computed: {
    statusTag () {
      if (this.comic['is_paid']) {
        return '付费'
      }

      return this.comic['is_finished'] ? '已完结' : '连载中'
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.onlyShowDirectory = !!to.query.dir // 转换成布尔值
      vm.initComic(Number(to.params.id))
      window.scrollTo(0, 0)
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.onlyShowDirectory = !!to.query.dir
    next()
  },
}
</script>

<style lang="less">
@import "../assets/less/comic.less";
</style>
