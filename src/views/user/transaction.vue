<template>
  <div :class="type">
    <scroll-page @nextPage="nextPage">
      <div class="transaction">
        <XHeader :title="title"/>
        <div class="content">
          <div class="item" v-for="(item, index) in list" :key="index">
            <dl class="user-info">
              <dd>
                <img v-if="type === 'expend'" :src="item.comic_cover" alt="">
                <img v-else :src="`../../../static/images/income_${item.type}.png`" alt="">
              </dd>
              <dt>
                <p class="type" v-if="type === 'income'">{{ item.type === 1 ? '充值' : '签到' }}</p>
                <p class="type" v-else>{{item.comic_title}}</p>
                <p class="time">{{item.created_at}}</p>
              </dt>
            </dl>
            <p class="right-txt">{{type === 'income' ? `+ ${item.money}` : item.money}}</p>
          </div>
        </div>
        <EmptyMessage message="暂无数据~~" v-show="list.length === 0"/>
      </div>
    </scroll-page>
  </div>
</template>

<script>
import XHeader from '@/components/XHeader'
import EmptyMessage from '@/components/EmptyMessage'
import ScrollPage from '@/components/ScrollPage'

export default {
  name: 'Expend',
  components: {
    XHeader,
    EmptyMessage,
    ScrollPage,
  },

  data () {
    return {
      list: [],
      type: 'expend',
      lastPage: 1,
      currentPage: 1,
    }
  },

  created () {
    this.type = this.$route.name === 'expend' ? 'expend' : 'income'
    this.fetchData()
  },

  methods: {
    async fetchData (page = 1) {
      const {type: transactType} = this
      try {
        const {data, meta} = await this.$api.user.transaction[transactType](page)
        if (page > 1) {
          this.list = [...this.list, ...data]
        } else {
          this.list = data
        }

        this.currentPage = page
        this.lastPage = meta.last_page
      } catch (error) {}
    },

    nextPage () {
      if (this.lastPage <= this.currentPage) {
        return
      }
      this.fetchData(this.currentPage + 1)
    },
  },

  computed: {
    title () {
      return `${this.type === 'expend' ? '消费' : '阅币'}记录`
    },
  },
}
</script>

<style lang="less">
@import "../../assets/less/user/transaction.less";
</style>
