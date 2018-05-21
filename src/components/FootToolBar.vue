<template>
	<tabbar style="position: fixed" v-if="ifShowTabbar">
    <tabbar-item :selected="curSelect == toolNav[0]" :link="toolNav[0]">
      <x-icon slot="icon" type="ios-arrow-thin-down" size="30"></x-icon>
      <span slot="label">Wechat</span>
    </tabbar-item>
    <tabbar-item :selected="curSelect == 1" show-dot>
      <x-icon slot="icon" type="ios-arrow-thin-left" size="30"></x-icon>
      <span slot="label">Message</span>
    </tabbar-item>
    <tabbar-item :selected="curSelect == toolNav[2]" :link="toolNav[2]">
      <x-icon slot="icon" type="ios-circle-filled" size="30"></x-icon>
      <span slot="label">Explore</span>
    </tabbar-item>
    <tabbar-item :selected="curSelect == 3" badge="2">
      <x-icon slot="icon" type="ios-arrow-thin-left" size="30"></x-icon>
      <span slot="label">News</span>
    </tabbar-item>
  </tabbar>
</template>

<script type="text/javascript">
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
export default {
	name: 'FootToolBar',
	components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
	},
  props: {
    ifShowTabbar: { //是否显示底部工具栏
      type: Boolean,
      default: true
    },
    curSelect: { //当前选中的工具栏
      type: String,
      default: 0
    },
    toolNav: { //显示的工具栏
      type: Array,
      default: []
    }
  },
  data () {
    return {
      tabJson: [
        {title: 'Wechat'},
        {title: 'Message'},
        {title: 'Explore'},
        {title: 'News'}
      ]
    }
  },
  methods: {
    changeFun(val) {
      console.log(val)
    },
    clickFun() {
      console.log('单击事件')
    }
  }
}
</script>