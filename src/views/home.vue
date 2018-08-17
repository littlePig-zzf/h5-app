<template>
  <div class="container home">
    <div class="banner" v-show="banners.length > 0">
      <!-- 搜索 -->
      <top-bar :hasRedBg="false"></top-bar>

      <!-- Banner 轮播 -->
      <swiper v-model="swiperIndex" dots-position="center" auto :interval="2000">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <a :href="item.url"><img class="poster" :src="item.image"></a>
        </swiper-item>
      </swiper>
    </div>
    <template v-if="ranks && sections">
      <div class="rank">
        <router-link tag="dl" :to="`/rank/${index+1}`" v-for="(item, index) in ranks" :key="index">
          <dd>
            <img :src="`../../static/images/rank_${index+1}.png`" alt="">
          </dd>
          <dt>{{item.title}}</dt>
        </router-link>
      </div>

      <x-button type="primary" @click.native="showModule">
        自定义组件vue extend
      </x-button>

      <div class="box-padding">
        <div class="section">
          <div class="section-item" v-for="(item, index) in sections" :key="index">
            <div class="head-box">
              <p class="free-item">{{item.title}}</p>
              <router-link class="more-btn" :to="`/section/${item.id}`">更多>></router-link>
            </div>
            <ul class="comic-item">
              <router-link tag="li" :to="`/comic/${cItem.id}`" v-for="(cItem, cIndex) in item.comics" :key="cIndex">
                <img class="poster" :src="cItem.cover" alt="">
                <p class="poster-title">{{cItem.title}}</p>
                <p class="poster-subtitle">{{cItem.category_title}}</p>
              </router-link>
            </ul>
          </div>
          <div class="all-comics" v-show="showAll">
            <x-button mini plain type="primary" link="/category">
              <i class="fab fa-monero"></i>
              <span>全部作品</span>
            </x-button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <empty-message message="暂无数据"></empty-message>
    </template>
  </div>
</template>

<script>
import { Swiper, XButton, SwiperItem } from 'vux'
import TopBar from '@/components/TopBar.vue'
import alertModuleMixin from '../mixins/alertModule'

export default {
  name: 'home',
  components: {
    Swiper,
    SwiperItem,
    XButton,
    TopBar,
  },

  mixins: [alertModuleMixin],

  data () {
    return {
      swiperIndex: 0,
      banners: [],
      ranks: [],
      sections: [],
      showAll: false,
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      // 先加载首页, 如果 hash 有值再做跳转
      const {data} = await this.$api.home()
      Object.assign(this, data)

      this.showAll = true

      // 兼容旧路由 hash model
      const {hash} = window.location
      if (hash === '') return

      const pathMap = {
        '#/user': 'user',
        '#/user/pay-page': 'topup',
        '#/user/comsume-page': 'expend',
        '#/user/contact-page': 'contact',
        '#/main/clarify': 'category',
        '#/book': 'comicHistory',
      }
      const newPath = pathMap[hash]
      if (newPath !== undefined) {
        return this.$router.replace({name: newPath})
      }

      const re = /id=(\d+)/
      if (hash.indexOf('read-book') > -1) {
        const matched = hash.match(re)
        if (matched) {
          return this.$router.replace({name: 'chapter', params: {id: matched[1]}})
        }
      }

      if (hash.indexOf('book-introduce') > -1) {
        const matched = hash.match(re)
        if (matched) {
          return this.$router.replace({name: 'comic', params: {id: matched[1]}})
        }
      }
    },
    showDialogFun () {
      console.log('63456345634')
    },

    showModule () {
      this.createVm('what are you said', { showDialog: this.showDialogFun })
    },
  },
}
</script>

<style lang="less">
@import "../assets/less/home.less";
</style>
