<template>
	<div class="page">
		<div class="content">
        <p>i am index</p> 
    </div>
	</div>
</template>

<script type="text/javascript">
import wxConfig from '@/assets/js/wxConfig'
export default {
  components: {
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
