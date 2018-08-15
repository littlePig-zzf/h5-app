<template>
  <div class="contact">
    <x-header title="联系我们"></x-header>
    <div class="code">
      <img :src="contact.qrcode" alt="">
    </div>
    <p class="wechat">客服微信号：{{contact.id}}</p>
    <p class="info">长按识别上方二维码，添加{{contact.name}}为好友</p>
  </div>
</template>

<script>
import XHeader from "@/components/XHeader";
export default {
  name: "ContactModule",
  components: {
    XHeader
  },
  data() {
    return {
      contact: {}
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      const { data } = await this.$api.contact();
      this.contact = data;
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/user/contact.less";
</style>
