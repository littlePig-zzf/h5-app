<template>
  <div class="scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollPage',

  data () {
    return {
      bottom: false,
    }
  },

  mounted () {
    this.addScroll()
  },

  destroyed () {
    this.removeScroll()
  },

  activated () {
    // 延迟执行, 否则会立刻调用 nextPage
    setTimeout(() => {
      this.addScroll()
    }, 300)
  },

  deactivated () {
    this.removeScroll()
  },

  methods: {
    bottomVisible () {
      const pageYOffset = window.pageYOffset
      const visible = window.innerHeight
      const pageHeight = document.documentElement.offsetHeight

      if (pageYOffset === 0) {
        return false
      }
      // 当前盒子小于当前屏幕可视高度，不监听滚动事件
      if (pageHeight < visible) return false
      return visible + pageYOffset >= pageHeight
    },

    setBottom () {
      this.bottom = this.bottomVisible()
    },

    addScroll () {
      window.addEventListener('scroll', this.setBottom)
    },

    removeScroll () {
      window.removeEventListener('scroll', this.setBottom)
    },
  },

  watch: {
    bottom (newValue) {
      if (newValue) {
        this.$emit('nextPage')
      }
    },
  },
}
</script>
