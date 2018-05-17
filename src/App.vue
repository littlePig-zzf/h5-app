<template>
  <div id="app">
  	<transition name="fade" mode="out-in">
  		<net-work-error v-if="!routeState"></net-work-error>
  		<div v-else>
    		<router-view></router-view>
    		<foot-tool-bar></foot-tool-bar>
  		</div>
    </transition>
  </div>
</template>

<script>
import FootToolBar from '@/components/FootToolBar'
import NetWorkError from '@/components/NetWorkError'
export default {
  	name: 'App',
  	components: {
  		FootToolBar,
  		NetWorkError
  	},
  	data() {
  		return {
  		routeState: true	//是否联网状态
  		}
  	},
 	watch: {
		$route(to,from) {
			//导航变化时判断联网状态
			this.routeState = navigator.onLine? true : false;
		}
	}
}
</script>

<style lang="less">
// @import './assets/css/contant.less';
@import './assets/css/base.less';
@import '~vux/src/styles/reset.less';
</style>