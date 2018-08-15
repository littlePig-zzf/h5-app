<template>
  <button-tab :value="tabIndex">
    <template v-for="(item, index) in tabs">
      <button-tab-item :key="index" @on-item-click="$router.push(item.link)">
        {{ item.title }}
      </button-tab-item>
    </template>
  </button-tab>
</template>

<script>
import {ButtonTab, ButtonTabItem} from 'vux'

export default {
  name: 'TopButtonTab',
  props: {
    tabIndex: {
      type: Number,
      default: 0,
    },

    tabs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ButtonTab,
    ButtonTabItem,
  },
}

</script>
