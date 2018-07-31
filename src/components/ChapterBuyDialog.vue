<template>
  <div class="chapter-buy-dialog">
    <x-dialog v-model="show" hide-on-blur>
      <x-icon @click="close" class="close-icon" type="ios-close-outline" size="20"></x-icon>
      <div class="content">
        <p class="title">订阅章节</p>
        <p class="buy-info">购买章节共计： 1话/ <span class="money">{{chapterMoney}}</span>币</p>
        <div class="all-money-box">
          余额：
          <span class="money">{{user.money}}</span>
          阅币
        </div>
        <p class="buy-tips">
          <check-icon :value.sync="user.auto_buy_chapter" type="plain">余额充足时点击下一话自动扣费，不再提示</check-icon>
        </p>
      </div>

      <p class="buy-button" ref="buy-button" @click="buy">扣{{chapterMoney}}阅币</p>
      <p class="buy-button" @click="goTotopup">去充值</p>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog, CheckIcon } from 'vux'
export default {
  name: 'ChapterBuyDialog',
  components: {
    XDialog,
    CheckIcon,
  },
  props: {
    chapter: Object,
  },

  data () {
    return {
      show: true,
      check: false,
    }
  },

  methods: {
    async buy () {
      try {
        const {id} = this.chapter
        await this.$api.chapter.buy(id, this.user.auto_buy_chapter)
        this.$vux.toast.show({
          time: 2000,
          text: '扣费成功！',
        })

        this.close()

        // 回到章节页面
        const method = this.$route.name === 'comic' ? 'push' : 'replace'
        this.$router[method](`/chapter/${id}`)
      } catch (error) {}
    },

    close () {
      this.show = false
      this.$destroy()
    },

    goTotopup () {
      this.close()
      this.$router.push(`/topup?chapter_id=${this.chapter.id}`)
    },
  },

  computed: {
    user () {
      return this.chapter.user
    },

    chapterMoney () {
      return this.chapter.money
    },
  },

  destroyed () {
    this.$el.remove()
  },
}
</script>

<style lang="less">
@font-color: #333;
.chapter-buy-dialog {
  .vux-x-dialog {
    position: relative;
  }
    .content {
      padding: 10px;
      .money {
        color: @search-color;
        font-size: 0.42rem;
      }
      .title {
        margin-bottom: 10px;
        color: @font-color;
        font-size: @fz16;
      }
      .buy-info {
        width: 80%;
        padding: 8px 0;
        margin: 0 auto;
        background: #f2f3f2;
        border-radius: 5px;
        color: @font-color;
        font-size: @fz16;
      }
      .buy-tips {
        font-size: 0;
        .vux-check-icon > .weui-icon-success:before,
        .vux-check-icon > .weui-icon-success-circle:before,
        .weui-icon-success-circle {
          color: @search-color;
        }
        .weui-icon-circle,
        .weui-icon-success-circle {
          font-size: 15px;
        }
        .vux-check-icon > span {
          color: #666;
          font-size: @fz12;
        }
      }
      .all-money-box {
        padding: 10px 0;
        font-size: @fz16;
        color: @font-color;
      }
    }
    .buy-button {
      width: 100%;
      padding: 10px 0;
      color: #fff;
      background: @search-color;
      font-size: @fz16;
    }
    .close-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      fill: #666;
    }
}
</style>
