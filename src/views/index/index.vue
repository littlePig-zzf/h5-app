<template>
	<div>
		<grid>
		  <grid-item label="Grid" v-for="i in 5" :key="i">
		    s
		  </grid-item>
		</grid>
	</div>
</template>

<script type="text/javascript">
import { Grid, GridItem } from 'vux'
export default {
  components: {
    Grid,
    GridItem
  }
}
</script>