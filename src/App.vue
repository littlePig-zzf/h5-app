<template>
  <div id="app">
    <!-- <network-error v-if="!networkState"></network-error> -->
    <div v-show="networkState" class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <BottomBar class="bottom-bar" :bottomIndex="bottomIndex" v-show="showBottom"/>
    </div>
  </div>
</template>

<script>
// import NetworkError from "@/components/NetworkError";
import BottomBar from "@/components/BottomBar";

export default {
  name: "App",
  components: {
    // NetworkError,
    BottomBar
  },
  data() {
    return {
      networkState: true,
      routeGroup: ["home", "category", "bookshelf", "user"]
    };
  },

  watch: {
    $route() {
      // this.$nextTick(() => {
      // 导航变化时判断联网状态
      // this.networkState = window.navigator.onLine || (window.navigator.connection.type !== 'none')
      // });
    }
  },

  mounted() {
    console.log("asdasdasd");
  },

  computed: {
    bottomIndex() {
      const { hideBottom, group } = this.$route.meta;
      if (hideBottom) {
        return 0;
      }

      const { routeGroup } = this;
      for (const index in routeGroup) {
        if (group && group === routeGroup[index]) {
          return Number(index);
        }
      }

      return 0;
    },

    showBottom() {
      return !this.$route.meta.hideBottom;
    }
  }
};
</script>

<style lang="less">
@import "assets/css/global.less";
@import "~vux/src/styles/reset.less";
.bottom-bar {
  &.weui-tabbar {
    background: #fff;
    .weui-tabbar__item {
      padding: 8px 0 2px;
    }
    .weui-tabbar__icon {
      width: 18px !important;
      height: 18px !important;
      padding-bottom: 2px;
    }
    &:before {
      border-top-color: @border-color;
    }
  }
}
.main {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
