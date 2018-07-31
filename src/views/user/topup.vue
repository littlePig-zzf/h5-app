<template>
  <div class="topup">
    <x-header title="我要充值"></x-header>
    <div class="content" v-if="topup.length">
      <p class="vip-user" v-if="user.vip_expire_at">
        <img src="../../../static/images/user_vip.png" alt="">
        VIP用户，过期时间：<span>{{user.vip_expire_at}}</span>
      </p>
      <p class="remain-coin" v-if="chapter && user.money < chapter.money">
        阅币金额不足 <br>阅读本章需要<span>{{chapter.money}}</span>阅币，当前余额：<span>{{user.money}}</span> 阅币
      </p>
      <p :class="['remain-coin', {'no-padding' : user.vip_expire_at}]" v-else>
        剩余金额：<span>{{user.money}}</span> 阅币
      </p>

      <form ref="Form" action="/order" method="POST">
        <input type="hidden" name="_token" :value="token">
        <ul class="item">
          <li v-for="(item, index) in topup" :key="index" :class="{'active': selectedIndex === index}" @click="selectedIndex = index">
            <img v-show="item.type === 1" class="icon" src="../../../static/images/recommend.png" alt="">
            <img v-show="item.type === 3" class="icon vip" src="../../../static/images/vip.png" alt="">

            <template v-if="item.type <= 1">
              <p class="money">{{item.pay_money}}.00元</p>
              <p class="coin">{{item.title}}</p>
            </template>
            <p class="money vip-money" v-else>
              <img class="vip-icon" src="../../../static/images/user_vip.png" alt="">
              <span v-html="item.title"></span>
            </p>

            <p class="info">{{item.sub_title}}</p>
          </li>
        </ul>
        <input type="hidden" name="topup_id" v-model="topupId">
        <x-button type="primary" @click.native="comfirmSubmit">确认充值</x-button>
      </form>

      <div class="pay-info">
        <p class="title">充值说明</p>
        <p class="info">
          1：漫画，是一种艺术形式，是用简单而夸张的手法来描绘生
          活或时事的图画。一般运用变形、比喻、象征、暗示、影射的
          方法。构成幽默诙谐的画面或画面组，以取得讽刺或歌颂的效
          果。
        </p>
        <p class="info">
          2：漫画作为绘画作品经历了一个发展过程，从最初作为少数
          人的兴趣爱好，已成为人们的普遍读物，更是学生的最爱，并
          成为了漫画控。虽然才刚蓬勃的漫画，却早在800年前，日本
          已有了漫画的开始。近年的作品主导一般为日本漫画和美国漫画。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
import XHeader from '@/components/XHeader'

export default {
  name: 'Topup',
  components: {
    XButton,
    XHeader,
  },
  data () {
    return {
      topup: [],
      user: {},
      chapter: {},
      selectedIndex: 0,
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      const chapterId = this.$route.query.chapter_id || 0
      const {data} = await this.$api.topup(chapterId)

      Object.assign(this, data)
    },

    /**
     * 确认支付, 支付成功后跳转到用户中心页面
     */
    comfirmSubmit (e) {
      e.preventDefault()
      this.$refs.Form.submit()
    },
  },

  computed: {
    topupId () {
      if (this.topup.length === 0) {
        return 0
      }

      const selectedTopup = this.topup[this.selectedIndex]
      return selectedTopup ? selectedTopup['id'] : 0
    },

    token () {
      return document.head.querySelector('meta[name="csrf-token"]').content
    },
  },
}
</script>

<style lang="less">
@import "../../assets/less/user/topup.less";
</style>
