<template>
  <div id="app">
  	<transition name="fade" mode="out-in">
  		<net-work-error v-if="!routeState"></net-work-error>
  		<div v-else>
    		<keep-alive :exclude="excludeJson">
          <router-view></router-view>  
        </keep-alive>
    		<foot-tool-bar :curSelect="curRoute" :toolNav="toolNav"></foot-tool-bar>
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
      curRoute: '', //当前的路由
      toolNav: ['/','','/LineChart',''], //当前的工具栏
		  routeState: true,	//是否联网状态
      excludeJson: ["LineChart"]  //设置不需要缓存的页面
		}
	},
 	watch: {
		$route(to,from) {
			//导航变化时判断联网状态
			this.routeState = navigator.onLine? true : false;
      // console.log(to.path)
      this.curRoute = to.path;
      this.toolNav.map((item)=>{
        if(to.path == item) {
          this.curRoute = item;
        }
      })
		}
	}
}
</script>

<style lang="less">
// @import './assets/css/contant.less';
@import './assets/css/base.less';
@import '~vux/src/styles/reset.less';
</style>