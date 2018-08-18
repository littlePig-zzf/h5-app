import alertModule from '@/components/alertModule'
import Vue from 'vue'

export default {
  data () {
    return {
      $vm: '',
    }
  },
  methods: {
    createVm (title = 'hello', value, option) {
      const Alert = Vue.extend(alertModule)
      this.$vm = new Alert({
        el: document.createElement('div'),
        propsData: {
          title,
          value,
        },
      })
      document.body.appendChild(this.$vm.$el)

      this.$vm.$on('showDialogFun', () => {
        option.showDialog()
      })
    },
  },
}
