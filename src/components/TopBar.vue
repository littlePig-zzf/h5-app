<template>
  <div :class="['top-bar', {'red-bg': hasRedBg}]">
    <top-button-tab v-show="showButtonTab"
      :class="{'red-color': hasRedBg}"
      :tabIndex="tabIndex"
      :tabs="tabs"
    >
    </top-button-tab>
    <router-link tag="p" class="search-button" to="/search" v-show="showSearchButton">
      <img :class="{'imgW': hasRedBg}" src="../../static/images/search0.png" alt="">
    </router-link>
    <slot></slot>
  </div>
</template>

<script>
import TopButtonTab from './TopButtonTab.vue'

export default {
  name: 'TopBar',
  props: {
    hasRedBg: {
      type: Boolean,
      default: true,
    },

    showButtonTab: {
      type: Boolean,
      default: false,
    },

    showSearchButton: {
      type: Boolean,
      default: true,
    },

    tabIndex: {
      type: Number,
      default: 0,
    },

    searchPlaceHolder: {
      type: String,
      default: null,
    },

    tabs: {
      type: Array,
      default: () => [
        {
          title: '首页',
          link: '/home',
        },
        {
          title: '分类',
          link: '/category',
        },
      ],
    },
  },

  components: { TopButtonTab },

  data () {
    return {}
  },

  methods: {},
}
</script>

<style lang="less">
@bg: rgba(0,0,0,.8);
@transparentBg: transparent;

.top-bar {
  font-size: 0;
  text-align: center;
  .search-button {
    position: absolute;
    top: 10px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    min-width: 0.6rem;
    min-height: 0.61rem;
    border-radius: 100%;
    z-index: 10;
    img {
      padding-top: 0.1rem;
      width: 0.40rem;
      &.imgW {
        width: 0.43rem;
        height: 0.43rem;
      }
    }
  }
  &.red-bg {
    width: 100%;
    height: 0.9rem;
    background: @search-color;
    .search-button {
      top: 0.18rem;
      background: @transparentBg;
    }
  }
  .vux-button-group {
    position: absolute;
    top: 0.52rem;
    left: 50%;
    margin-left: -1.33333rem;
    width: 2.666667rem;
    z-index: 10;
    &>a {
      font-size: @fz14;
      height: 0.6rem;
      line-height: 0.6rem;
      background: @bg;
      color: #fff;
      &.vux-button-group-current {
        background: #fff;
        color: @theme-color;
        &:after {
          background: @bg;
          z-index: -1;
        }
      }
      &.vux-button-tab-item-first {
        border-radius: 32px;
        background: transparent;
        &.vux-button-group-current {
          background: #fff;
        }
        &:after {
          border-right: none;
          border-color: #fff;
          background: @bg;
          z-index: -1;
        }
      }
      &.vux-button-tab-item-last {
        margin-left: -0.012rem;
        border-radius: 32px;
        background: transparent;
        &.vux-button-group-current {
         background: #fff;
        }
        &:after {
          border-left: none;
          border-color: #fff;
          background: @bg;
          z-index: -1;
        }
      }
    }
  }
  .red-color {
    top: 8px;
    &>a {
      background: @transparentBg;
      &.vux-button-group-current:after,
      &.vux-button-tab-item-first:after,
      &.vux-button-tab-item-last:after {
        background: @transparentBg;
      }
    }
  }

}
</style>
