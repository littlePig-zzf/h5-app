<template>
  <div class="container rank" :class="{ 'recommend' : isRecommendView }">
    <TopBar :showButtonTab="showButtonTab" :tabs="tabs" :tabIndex="tabIndex"/>

    <!-- 星期 tab -->
    <tab :line-width="3" custom-bar-width="15px" v-if="isRecommendView" :value="dayIndex">
      <tab-item
        v-for="(item, index) in orderedWeeks"
        :key="index"
        @on-item-click="selectDay"
      >
      {{item.name}}
      </tab-item>
    </tab>

    <template v-if="hasComics">
      <ComicList :list="list" :class="{ 'pt8' : !hasComics, 'pb10': hasComics }"/>
      <EmptyMessage message="没有更多数据"/>
    </template>
  </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
import {findIndex} from 'lodash'
import TopBar from '@/components/TopBar'
import ComicList from '@/components/ComicList'
import EmptyMessage from '@/components/EmptyMessage'

export default {
  name: 'Rank',
  components: {
    TopBar,
    ComicList,
    EmptyMessage,
    Tab,
    TabItem,
  },

  data () {
    return {
      tabs: [
        {
          title: '人气榜',
          link: '/rank/3',
        },
        {
          title: '热门',
          link: {
            name: 'recommend',
            query: {
              day: 0,
            },
          },
        },
      ],
      showButtonTab: false,
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],

      // 排行榜
      ranks: [],

      // 热门/推荐
      recommends: {},

    }
  },

  created () {
    this.init()
  },

  watch: {
    $route (to, from) {
      if (!this.isRankView && !this.isRecommendView) {
        return
      }

      if (['comic', 'recommend', 'rank'].indexOf(from.name) < 0 || !this.hasComics) {
        this.init()
      }
    },
  },

  methods: {
    async init () {
      const {name, params, query} = this.$route
      if (name === 'recommend') {
        await this.recommend(query.day || 0)
      } else {
        await this.rank(params.id || 1)
      }

      this.showButtonTab = true
    },

    async recommend () {
      if (this.hasComics) {
        return
      }
      const {data} = await this.$api.recommend(this.currentDay)
      this.$set(this.recommends, this.currentDay, data)
    },

    async rank (id = 1) {
      const {data} = await this.$api.rank(id)
      const {title, comics} = data

      this.$set(this.tabs, 0, {title, link: this.$route.path})
      this.ranks = comics
    },

    selectDay (index) {
      const day = this.orderedWeeks[index].value

      // 更新第二个 tab 路由的日期参数
      this.$set(this.tabs[1].link, 'query', {day})

      // 替换路由
      this.$router.replace({name: 'recommend', query: { day }})
    },
  },

  computed: {
    isRankView () {
      return this.$route.name === 'rank'
    },
    isRecommendView () {
      return this.$route.name === 'recommend'
    },
    tabIndex () {
      return this.isRankView ? 0 : 1
    },
    currentDay () {
      let {day} = this.$route.query
      day = day ? Number.parseInt(day, 10) : 0

      return (day > 6 || day < 0) ? 0 : day
    },
    currentRecommend () {
      return this.recommends[this.currentDay]
    },
    hasComics () {
      if (this.isRankView) {
        return this.ranks.length > 0
      }

      return this.currentRecommend && Array.isArray(this.currentRecommend) && this.currentRecommend.length > 0
    },
    list () {
      return this.isRankView ? this.ranks : this.currentRecommend
    },
    orderedWeeks () {
      const day = new Date().getDay()
      const o = []

      for (let i = 0; i < 7; i++) {
        let dIndex = (day - i + 7) % 7
        let name = i === 0 ? '今天' : (i === 1 ? '昨天' : this.weeks[dIndex])
        let d = {
          value: i, name: name,
        }
        o.unshift(d)
      }

      return o
    },
    dayIndex () {
      return findIndex(this.orderedWeeks, {value: this.currentDay})
    },
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.rank {
  background: #f5f5f5;
  .vux-tab,
  .vux-tab .vux-tab-item {
    font-size: @fz14;
    height: 41px;
  }
  .scrollable .vux-tab-item {
    flex: 0 0 1.07rem;
  }
  .vux-tab-container {
    height: 40px;
  }
}

.recommend {
  .comic-item {
    &:first-child {
      margin-top: 8px !important;
    }
  }
}

.pt8 {
  padding-top: 8px;
}
.pb10 {
  padding-bottom: 10px;
}
</style>
