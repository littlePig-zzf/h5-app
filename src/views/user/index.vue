<template>
  <div class="container user-module">
    <div class="head-item">
      <dl class="head-img">
        <dd><img :src="user.avatar" alt=""></dd>
        <dt>
          <p class="username">{{user.name}}<img v-if="user.vip_expire_at" class="vip-icon" src="../../../static/images/user_vip.png" alt=""></p>
          <p class="coin-num"><img src="../../../static/images/user_meney.png" alt=""> {{user.money}} 阅币</p>
        </dt>
      </dl>
      <p :class="['sign', {'grey-color': user.signed_in_today}]" @click="signin">{{ user.signed_in_today ? '已签到' : '签到' }}</p>
    </div>
    <ul class="user-operate">
      <li @click="goToMenu(item)" v-for="(item, index) in menuList" :key="index">
        <img :src="`../../../static/images/user_${item.icon}.png`" alt="">
        <span>{{item.title}}</span>
        <x-icon class="icon" type="ios-arrow-right" size="18" v-if="item.path"></x-icon>
        <XSwitch
          v-else
          :value="user.auto_buy_chapter"
          :prevent-default="true"
          @on-click="toggleAutoBuy"
          title=""
          class="switch-btn"
        />
      </li>
    </ul>
    <x-dialog v-model="showDialog">
      <div class="dialog-cont">
        <p>恭喜你今日签到成功！</p>
        <p>阅币 + <span class="coin-num">{{moneyChange}}</span> </p>
      </div>
    </x-dialog>
  </div>
</template>

<script type="text/javascript">
import { XDialog, XSwitch, Group } from 'vux'
export default {
  name: 'User',
  components: {
    XDialog,
    XSwitch,
    Group,
  },

  data () {
    return {
      user: {},
      moneyChange: 0,
      showDialog: false,
      menuList: [
        {title: '我要充值', path: {name: 'topup'}, icon: 'topup'},
        {title: '消费记录', path: {name: 'expend'}, icon: 'expend'},
        {title: '阅币记录', path: {name: 'income'}, icon: 'income'},
        {title: '自动购买付费章节', icon: 'auto_buy_chapter'},
        {title: '联系我们', path: {name: 'contact'}, icon: 'contact'},
      ],
    }
  },

  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name === '/topup') {
        vm.init()
      }
    })
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      const {data} = await this.$api.user.index()
      this.user = data
    },

    async signin () {
      if (this.signed_in_today) return

      try {
        const {data} = await this.$api.user.signIn()

        this.user.signed_in_today = true
        this.user.money = data.money
        this.moneyChange = data.money_change

        this.showDialog = true
        setTimeout(() => {
          this.showDialog = false
        }, 3000)
      } catch (error) {
        this.user.signed_in_today = true
      }
    },

    goToMenu (item) {
      const {path} = item
      if (!path) return

      this.$router.push(path)
    },

    async toggleAutoBuy () {
      const {data} = await this.$api.user.toggleAutoBuyChapter()
      this.user.auto_buy_chapter = data.auto_buy_chapter
    },
  },
}
</script>

<style lang="less">
@import "../../assets/less/user/index.less";
</style>
