<template>
  <div class="container chapter-list">
    <x-header v-if="showHeader"></x-header>
    <ul>
      <router-link tag="li" :to="`/chapter/${item.id}`" v-for="(item) in data" :key="item.id">
        第{{item.no}}话 &nbsp;&nbsp; {{item.title}} &nbsp;&nbsp;
        <img v-show="item.money" src="../../static/images/money.png" class="money-icon" alt="">
        {{item.money || ''}}
      </router-link>
    </ul>
  </div>
</template>

<script>
import XHeader from './XHeader'
export default {
  name: 'ChapterList',
  components: {
    XHeader,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },

    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less">
.chapter-list {
  width: 100%;
  background: #fff;
  ul {
    li {
      padding: 0 0 0 0.266667rem;
      height: 1rem;
      line-height: 1rem;
      color: @primary-color;
      border-bottom: 1px solid @border-color;
      font-size: @fz14;
      .money-icon {
        width: 17px;
        vertical-align: middle;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
