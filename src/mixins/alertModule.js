import alertModule from '@/components/alertModule'
import Vue from 'vue'

export default {
  methods: {
    createVm (title = 'hello', option) {
      const Alert = Vue.extend(alertModule)
      const $vm = new Alert({
        el: document.createElement('div'),
        propsData: {
          title,
          value: '',
        },
      })
      document.body.appendChild($vm.$el)

      $vm.$on('showDialogFun', () => {
        option.showDialog()
      })
    },
  },
}
