import { shallowMount } from '@vue/test-utils'
import ComicBookmarkLike from '@/components/ComicBookmarkLike'

describe('ComicBookmarkLike.vue', () => {
  let cmp
  const wrap = shallowMount(ComicBookmarkLike)
  const createCmp = propsData => shallowMount(ComicBookmarkLike, {
    propsData,
  })
  beforeEach(() => {
    cmp = createCmp()
  })
  it('click event is called', () => {
    const buttonWrap = wrap.find({ ref: 'like' })
    buttonWrap.trigger('click')
    expect(cmp.vm.isLiked).toEqual(true)
  })
})
