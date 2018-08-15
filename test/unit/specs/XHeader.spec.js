// import Vue from 'vue'
import {
  shallowMount
} from '@vue/test-utils'

import XHeader from '@/components/XHeader'

describe('XHeader.vue', () => {
  it('should render correct contents', () => {
    // const Constructor = Vue.extend(BottomBar)
    const wrapper = shallowMount(XHeader)
    expect(wrapper.props().title).toBe('目录')
  })
})
