// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'

import ChapterList from '@/components/ChapterList'

describe('XHeader.vue', () => {
  it('li is equal to the length of the items', () => {
    // const Constructor = Vue.extend(BottomBar)
    const res = [{
      id: 1,
      title: 1,
      no: 'sdfs',
      money: 4,
    },
    {
      id: 2,
      title: 2,
      no: 'sdfs',
      money: 4,
    },
    ]
    const wrap = shallowMount(ChapterList, {
      propsData: {
        data: res,
      },
    })

    expect(wrap.findAll('img')).toHaveLength(res.length)
  })
})
