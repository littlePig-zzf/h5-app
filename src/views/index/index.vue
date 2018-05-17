<template>
	<div class="page">
		<div class="content"></div>
    <foot-tool-bar></foot-tool-bar>
	</div>
</template>

<script type="text/javascript">
import wxConfig from '@/assets/js/wxConfig'
import FootToolBar from '@/components/FootToolBar'
export default {
  components: {
    FootToolBar
  },
  data() {
  	return {

  	}
  },
  mounted() {
  	// this.init();
  },
  methods: {
  	// init() {
  	// 	wxConfig();
  	// },
  	seeChart() {
  		this.$router.push({path: '/LineChart'})
  	}
  }
}
</script>

<style lang="less">
.page {
  .weui-tabbar {
    position: fixed;
  }
}
</style>