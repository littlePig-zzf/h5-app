<template>
  <router-link
    tag="div"
    class="comic-item"
    :to="`/comic/${item.id}`"
  >
    <div class="head clearfix">
      <span v-show="showCategoryTag" class="tag">{{item.category_title}}</span>
      <i v-show="!showCategoryTag" class="icon fab fa-pagelines"></i>
      <h3 class="title">{{item.title}}</h3>
      <span class="read">阅读 &gt;</span>
    </div>
    <img class="poster" :src="item.cover" :alt="item.title">
    <div class="update-info">
      <p class="update">
        <img src="/images/new.png" alt="">
        更新到第{{item.chapters_num}}话
      </p>
      <div class="detail" v-if="showDetail">
        <p>
          <img src="/images/likes.png" alt="">
          <span>{{item.likes}}</span>
        </p>
        <p>
          <img src="/images/views.png" alt="">
          <span>{{item.views}}</span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ComicItem",
  props: {
    item: Object,
    showCategoryTag: {
      type: Boolean,
      default: false
    },
    showDetail: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
.comic-item {
  margin-top: 10px;
  .head {
    padding: 0.2rem;
    color: #999;
    background: #fff;
    .tag {
      padding: 2px;
      margin-right: 2px;
      color: #fff;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background: #fdd791;
      font-size: @fz11;
      -webkit-text-size-adjust: none !important;
      transform: scale(0.8);
      -webkit-transform: scale(0.8);
    }
    .icon {
      color: @tag-color;
    }
    .title {
      display: inline-block;
      padding-left: 5px;
      font-size: 0.3rem;
      color: @primary-color;
    }
    .read {
      float: right;
      font-size: 0.3rem;
      margin-top: 0.05rem;
    }
  }
  .poster {
    display: inline-block;
    margin-bottom: 0;
    width: 100%;
    min-height: 3rem;
    background: #f2f3f2;
  }
  .update-info {
    padding: 0.2rem;
    background: #fff;
    overflow: hidden;
    .update {
      float: left;
      font-size: @fz14;
      img {
        width: 20px;
        vertical-align: middle;
      }
    }
    .detail {
      float: right;
      font-size: @fz12;
      p {
        display: inline-block;
        padding-right: 0.266667rem;
        img {
          width: 14px;
        }
        &:last-child {
          padding-right: 0;
        }
      }
    }
  }
}
</style>
