<template>
  <div class="network-error">
    <h1>网络请求失败</h1>
    <p>请检查您的网络设置，并刷新页面</p>
    <x-button mini plain type="primary" @click.native="reset">刷新</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'NetWorkError',
  components: { XButton },

  methods: {
    reset () {
      window.location.reload(true)
    },
  },
}
</script>

<style lang="less">
.network-error{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  background-color: #fff;
  z-index: 9999;

  img{
    width: 4.3rem;
    margin-top: 2rem;
  }

  h1{
    font-size: 16px;
    color: #797A80;
    margin: .6rem 0 .1rem 0;
  }

  p{
    font-size: 12px;
    color: #AAABB3;
  }

  button{
    margin-top: .8rem;
  }

  .weui-btn_plain-primary {
    border: 1px solid #1aad19;
  }
}
</style>
