<template>
  <div class="x-header">
    <x-icon @click="back" type="ios-arrow-left" size="26"></x-icon>
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>

<script>
import { back } from "@/util/history";

export default {
  name: "XHeader",
  props: {
    title: {
      type: String,
      default: "目录"
    }
  },

  methods: {
    back
  }
};
</script>

<style lang="less">
.x-header {
  position: relative;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  color: #fff;
  background: @search-color;
  font-size: @fz16;
  p {
    width: 4rem;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  svg {
    position: absolute;
    top: 0.16rem;
    left: 0.05rem;
    width: 0.52rem;
    height: 0.52rem;
    fill: #fff;
  }
}
</style>
