<template>
  <div class="empty-message">
    <div class="message">
      {{message}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmptyMessage',
  props: {
    message: {
      type: String,
      default: '暂无历史记录~~',
    },
  },
}
</script>
<style lang="less">
.empty-message {
  padding: 0.4rem 0;
  background: #fff;
  .message {
    width: 80%;
    padding: 0.16rem 0;
    margin: 0 auto;
    text-align: center;
    background: #fef4f3;
    border-radius: 20px;
    color: @search-color;
    font-size: @fz12;
  }
}

</style>
