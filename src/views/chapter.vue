<template>
  <scroll-page @nextPage="nextPage" ref="scroll">
    <div class="chapter">
      <x-header v-show="showBar" class="bar-header" :title="`第${chapter.no}话 ${chapter.title}`">
        <span class="remain">剩余 {{chapter.remain_num}} 话</span>
      </x-header>

      <div class="list" ref="list" v-for="(item, index) in list" :key="item.id" @click="toggleShowBar(index)">
        <div v-for="(image, subIndex) in item.images" :key="`${index}:${subIndex}`">
          <img :src="image" alt="">
        </div>

        <div class="comic-button-group">
          <ComicBookmarkLike/>
        </div>
      </div>

      <div class="bar-bottom" v-show="showBar">
        <div class="comic-button-group">
          <ComicBookmarkLike/>
        </div>

        <div class="chapter-navigation">
          <router-link to="/home" tag="span">
            <x-icon class="icon" type="ios-arrow-left" size="16"></x-icon>
            首页
          </router-link>
          <router-link :to="`/comic/${comic.id}?dir=1`" tag="span">
            目录
          </router-link>

          <span @click="scrollToBottom">
            <span>{{ nextChapterId ? '下一话' : '无' }}</span>
            <x-icon class="icon" type="ios-arrow-right" size="16"></x-icon>
          </span>
        </div>
      </div>
    </div>
    <toast v-model="showToast" width="50%" type="text">{{ toastMessage }}</toast>
  </scroll-page>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import {findIndex} from 'lodash'
import {api} from '../request/api'
import router from '../router'
import comicChapterMixin from '../mixins/comic-chapter'
import store from '../store'

import XHeader from '@/components/XHeader'
import ScrollPage from '@/components/ScrollPage'
import ComicBookmarkLike from '@/components/ComicBookmarkLike'
import ChapterBuyDialog from '@/components/ChapterBuyDialog.vue'

const ChapterBuyDialogComponent = Vue.extend(ChapterBuyDialog)
const openChapterBuyDialog = (propsData = {chapter: {}}) => {
  const Dialog = new ChapterBuyDialogComponent({
    el: document.createElement('div'),
    router,
    propsData,
  })

  Dialog.$mount()
  document.body.appendChild(Dialog.$el)
}

/**
 * 进入和更新路由时获取章节数据
 */
const prepareChapter = async (chapterId) => {
  const {data} = await api.chapter.show(chapterId)
  if (data.is_paid) {
    return data
  }

  // 自动购买默认选上
  data.user.auto_buy_chapter = true

  openChapterBuyDialog({chapter: data})
  return false
}

export default {
  name: 'Chapter',
  components: {
    ScrollPage,
    Toast,
    XHeader,
    ComicBookmarkLike,
  },

  mixins: [comicChapterMixin],

  data () {
    return {
      // 页面中加载的所有章节
      list: [],
      showBar: false,

      // 下一话加载完成提示
      showToast: false,
      toastMessage: '',

      // 正在加载下一话
      nextPageLoading: false,

      timer: null,
    }
  },

  async beforeRouteEnter (to, from, next) {
    // 从目录页面返回
    if (store.state.chapter.id === Number(to.params.id)) {
      return next()
    }

    const data = await prepareChapter(to.params.id)
    if (!data) {
      return next(false)
    }

    next(vm => {
      vm.setChapterData(data)
      vm.checkComic()
    })
  },

  mounted () {
    window.addEventListener('scroll', this.autoSetChapter)
  },

  activated () {
    setTimeout(() => {
      window.addEventListener('scroll', this.autoSetChapter)
    }, 500)
  },

  deactivated () {
    window.removeEventListener('scroll', this.autoSetChapter)
  },

  destroyed () {
    this.$store.dispatch('initChapter', {})
    window.removeEventListener('scroll', this.autoSetChapter)
  },

  methods: {
    ...mapActions([
      'initChapter',
      'updateChapter',
    ]),

    checkComic () {
      const {comic_id: comicId} = this.chapter
      if (this.comic.id !== comicId) {
        this.initComic(comicId)
      }
    },

    setChapterData  (data) {
      const {list} = this
      if (list.length > 0) {
        const lastItem = list[list.length - 1]
        if (lastItem.comic_id !== this.comic.id) {
          // Comic ID 变动
          this.list = []
          this.list.push(data)
        } else {
          const i = findIndex(this.list, {id: data.id})
          if (i >= 0) {
            // 章节已存在, 定位
            window.scrollTo(0, list[i].offsetTop || 0)
          } else if (!this.nextChapterId || this.nextChapterId !== data.id) {
            // 章节不连续, 重置列表
            this.list = []
            this.list.push(data)
          } else {
            this.list.push(data)
          }
        }
      } else {
        this.list.push(data)
      }

      this.$store.dispatch('initChapter', data)
    },

    async nextPage () {
      const {nextChapterId, nextPageLoading} = this
      if (nextPageLoading) {
        return
      }

      this.toastMessage = nextChapterId ? '已为你加载下一话' : '到底了哦~'
      if (!nextChapterId) {
        this.showToast = true
        return
      }

      this.nextPageLoading = true
      this.showBar = false
      this.timer && clearTimeout(this.timer)

      const data = await prepareChapter(nextChapterId)
      this.nextPageLoading = false

      if (!data) {
        return
      }

      this.showToast = true
      this.setChapterData(data)
    },

    toggleShowBar (index) {
      this.showBar = !this.showBar
      // 显示不点击隐藏定时5s自动隐藏
      if (this.showBar) {
        this.timer = setTimeout(() => {
          this.showBar = false
        }, 5000)
      } else {
        this.timer && clearTimeout(this.timer)
      }
    },

    scrollToBottom () {
      window.scrollTo(0, document.documentElement.offsetHeight - 1)
      this.nextPage()
    },

    /**
     * 当前屏幕范围内的可见章节
     */
    visibleChapterIndex () {
      if (this.list.length <= 1) {
        return false
      }

      const {list} = this.$refs
      const pageYOffset = window.pageYOffset
      const innerHeight = window.innerHeight

      // 倒序! 页面同时出现两个满足条件的 list 时, 取最后一个
      for (let i = list.length - 1; i >= 0; i--) {
        const item = list[i]
        if ((item.offsetTop + item.offsetHeight + innerHeight >= pageYOffset) && (item.offsetTop <= pageYOffset + innerHeight)) {
          return i
        }
      }

      return false
    },

    autoSetChapter () {
      const {list, chapter} = this
      if (list.length <= 1) {
        return false
      }

      const visible = this.visibleChapterIndex()
      if (visible === false) {
        return
      }

      const visibleItem = list[visible]
      if (!visibleItem) {
        return
      }

      if (visibleItem.id !== chapter.id) {
        this.$store.dispatch('initChapter', visibleItem)
      }
    },
  },

  computed: {
    ...mapGetters([
      'chapter',
    ]),

    nextChapterId () {
      if (this.list.length === 0) {
        return false
      }

      const lastItem = this.list[this.list.length - 1]
      const currentIndex = findIndex(this.comic.chapters, {id: lastItem.id})
      if (currentIndex < 0) {
        return false
      }

      const nextChapter = this.comic.chapters[currentIndex + 1]
      return nextChapter ? nextChapter.id : false
    },

  },

  watch: {
    chapter (newChapter) {
      if (newChapter.id) {
        // 设置各章节的 offsetTop
        const listRef = this.$refs.list
        if (listRef !== undefined) {
          this.list.forEach((item, index) => {
            if (listRef[index]) {
              item.offsetTop = listRef[index].offsetTop
            }
          })
        }

        // 替换 URL
        this.$router.replace(`/chapter/${newChapter.id}`)
      }
    },
  },
}
</script>
<style lang="less">
@import "../assets/less/chapter.less";
</style>
