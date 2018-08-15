<template>
  <tabbar style="position: fixed" :value="bottomIndex">
    <template v-for="(item, index) in bottomList">
      <tabbar-item :key="index" :link="`/${item.link}`">
        <img slot="icon" :src="`/images/bottom_${item.link}.png`" alt="">
        <img slot="icon-active" :src="`/images/bottom_${item.link}_active.png`" afalt="">
        <span slot="label">{{ item.title }}</span>
      </tabbar-item>
    </template>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  name: "Footer",
  components: {
    Tabbar,
    TabbarItem
  },

  props: {
    bottomIndex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      bottomList: [
        { title: "首页", link: "home" },
        { title: "分类", link: "category" },
        { title: "书架", link: "bookshelf" },
        { title: "我的", link: "user" }
      ]
    };
  }
};
</script>
