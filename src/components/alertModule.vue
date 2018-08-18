<template>
    <div class="dialog">
        <x-dialog v-model="showToast" class="dialog-demo" hide-on-blur @on-hide="showDialog">
            <div style="padding:15px;">
                {{ title }}
            </div>
        </x-dialog>
    </div>
</template>

<script>
import { XDialog, XButton } from 'vux'
export default {
  components: {
    XDialog,
    XButton,
  },

  props: {
    value: Boolean,
    title: String,
  },
  data () {
    return {
      showToast: false,
    }
  },

  created () {
    if (typeof this.value !== 'undefined') {
      this.showToast = this.value
    }
  },

  mounted () {
    console.log('mounted')
  },

  beforeUpdate () {
    console.log('update')
    this.$destroy()
  },

  destroyed () {
    this.$el.remove()
  },

  methods: {
    showDialog () {
      this.showToast = false
      console.log('[][]')

      this.$emit('showDialogFun')
    },
  },
}
</script>

<style lang="less">
.dialog {
  font-size: .16rem;
}
</style>
