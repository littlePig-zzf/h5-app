<template>
  <scroll-page ref="scrollPage" @nextPage="nextPage">
    <div class="container bookshelf">
      <top-bar :tabs="tabs" :tabIndex="tabIndex" :show-button-tab="true" :show-search-button="false">
        <p class="edit-icon" v-if="list.length > 0">
          <span>编辑</span>
          <img src="../../static/images/edit.png" alt="" class="edit" v-show="!isEditing" @click.stop="toggleEdit">
          <i class="fas fa-times-circle" v-show="isEditing" @click.stop="toggleEdit"></i>
        </p>
      </top-bar>

      <div class="list">
        <template v-if="list.length > 0">
          <ul class="item" v-for="(item, index) in list" :key="index">
            <li v-show="isEditing">
              <check-icon :value.sync="item.selected"></check-icon>
            </li>
            <li class="poster"><img :src="item.cover2" alt=""></li>
            <router-link :to="`/comic/${item.id}`" tag="li" v-if="tabIndex === 0">
              <h3 class="title">{{item.title}}</h3>
              <p class="info">{{item.description}}</p>
              <p class="num">更新至{{item.chapters_num}}话</p>
              <p class="continue" >续看</p>
            </router-link>
            <router-link :to="`/chapter/${item.latest_chapter_id}`" tag="li" v-else>
              <h3 class="title">{{item.title}}</h3>
              <p class="info">{{item.description}}</p>
              <p class="num">第{{item.latest_chapter_no}}话</p>
              <p class="continue">续看</p>
            </router-link>
          </ul>
        </template>
        <EmptyMessage v-else :message="`暂无${currentTab.title}记录~~`"/>
      </div>
      <div :class="['footer', {'offset-top': isEditing}]">
        <p>
          <check-icon @update:value="toggleAll" :value="allSelected"></check-icon>
          <span>全选</span>
        </p>
        <p @click="deleteSelect"><i class="delete far fa-trash-alt"></i>删除</p>
      </div>
    </div>
    <alert v-model="selectRequire">请至少选中一项</alert>
    <confirm v-model="deleteConfirm" @on-cancel="cancelDelete" @on-confirm="confirmDelete">
      <p style="text-align:center;">你确定要删除吗？</p>
    </confirm>
  </scroll-page>
</template>

<script>
import { CheckIcon, Alert, Confirm } from 'vux'
import TopBar from '@/components/TopBar.vue'
import EmptyMessage from '@/components/EmptyMessage.vue'
import ScrollPage from '@/components/ScrollPage.vue'

export default {
  name: 'Bookshelf',
  components: {
    CheckIcon,
    Alert,
    Confirm,
    TopBar,
    EmptyMessage,
    ScrollPage,
  },

  data () {
    return {
      tabs: [
        {
          title: '收藏',
          link: {name: 'comicBookmark'},
        },
        {
          title: '历史',
          link: {name: 'comicHistory'},
        },
      ],
      list: [],
      currentPage: 0,
      lastPage: 0,
      isEditing: false,
      selectRequire: false,
      deleteConfirm: false,
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData (page = 1) {
      const method = this.$route.name
      try {
        const {data, meta} = await this.$api.comic[method](page)
        data.forEach((item) => {
          item.selected = false
        })

        this.list = page > 1 ? [...this.list, ...data] : data

        this.currentPage = page
        this.lastPage = meta.last_page
      } catch (error) {
        console.error(error)
      }
    },

    nextPage () {
      if (this.lastPage <= this.currentPage) {
        this.$vux.toast.show({type: 'text', text: '暂无更多数据'})
        return
      }
      this.fetchData(this.currentPage + 1)
    },

    toggleEdit () {
      this.isEditing = !this.isEditing
    },

    toggleAll (value) {
      this.list.forEach((item, index) => {
        item.selected = value
      })
    },

    deleteSelect () {
      if (this.idSelected.length) {
        this.deleteConfirm = true
      } else {
        this.selectRequire = true
      }
    },

    cancelDelete () {
      this.deleteConfirm = false
    },

    async confirmDelete () {
      const method = this.tabIndex === 1 ? 'batchDestoryHistory' : 'batchDestoryBookmark'
      await this.$api.comic[method](this.idSelected)

      this.isEditing = false

      // 重新获取第一页
      this.fetchData()
    },
  },

  computed: {
    tabIndex () {
      return this.$route.name === 'comicHistory' ? 1 : 0
    },

    currentTab () {
      return this.tabs[this.tabIndex]
    },

    idSelected () {
      const ids = []
      this.list.forEach((item, index) => {
        if (item.selected) {
          ids.push(item.id)
        }
      })

      return ids
    },

    allSelected () {
      // for ...of 可能不兼容?
      const {list} = this
      for (const i in list) {
        if (!list[i].selected) {
          return false
        }
      }

      return true
    },
  },

  watch: {
    $route (from, to) {
      const {group} = to.meta
      if (group && group === 'bookshelf') {
        this.list = []
        this.fetchData()
      }
    },
  },
}
</script>

<style lang="less">
@import "../assets/less/bookshelf.less";
</style>
