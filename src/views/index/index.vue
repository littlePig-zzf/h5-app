<template>
	<div>
		<grid>
		  <grid-item label="Grid" v-for="i in 5" :key="i">
		    s
		  </grid-item>
		</grid>
		<XButton type="primary">asas</XButton>
	</div>
</template>

<script type="text/javascript">
import { Grid, GridItem, XButton } from 'vux'
import wxConfig from '@/assets/js/wxConfig'
export default {
  components: {
    Grid,
    GridItem,
    XButton
  },
  data() {
  	return {

  	}
  },
  mounted() {
  	this.init();
  },
  methods: {
  	init() {
  		wxConfig();
  	}
  }
}
</script>