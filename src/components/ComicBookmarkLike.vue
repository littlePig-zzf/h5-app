<template>
  <div>
    <p ref="like" @click.stop="toggleLike" :class="{'has-text-red': this.isLiked}">
      <img :src="`../../static/images/bottom_${this.isLiked ? 'liked' : 'like'}.png`" alt="">
      &nbsp; {{this.comic.likes}}赞
    </p>
    <p ref="bookmark" @click.stop="toggleBookmark" :class="{'has-text-red': this.isBookmarked}">
      <img :src="`../../static/images/bottom_${this.isBookmarked ? 'bookmarked' : 'bookmarke'}.png`" alt="">
      &nbsp; {{ this.isBookmarked ? '已收藏' : '收藏' }}
    </p>
  </div>
</template>
<script>
import comicChapterMixin from '../mixins/comic-chapter'
export default {
  name: 'ComicBookmarkLike',
  mixins: [comicChapterMixin],
}
</script>
