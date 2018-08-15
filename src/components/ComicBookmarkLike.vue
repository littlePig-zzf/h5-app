<template>
  <div>
    <p @click.stop="toggleLike" :class="{'has-text-red': this.isLiked}">
      <img :src="`/images/bottom_${this.isLiked ? 'liked' : 'like'}.png`" alt="">
      &nbsp; {{this.comic.likes}}赞
    </p>
    <p @click.stop="toggleBookmark" :class="{'has-text-red': this.isBookmarked}">
      <img :src="`/images/bottom_${this.isBookmarked ? 'bookmarked' : 'bookmarke'}.png`" alt="">
      &nbsp; {{ this.isBookmarked ? '已收藏' : '收藏' }}
    </p>
  </div>
</template>
<script>
import comicChapterMixin from "@/mixins/comic-chapter";
export default {
  name: "ComicBookmarkLike",
  mixins: [comicChapterMixin]
};
</script>
