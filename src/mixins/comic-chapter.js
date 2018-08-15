import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'resetComic',
    ]),

    async toggleBookmark () {
      const {id} = this.comic
      const method = this.isBookmarked ? 'destoryBookmark' : 'storeBookmark'

      await this.$api.comic[method](id)
      this.$store.dispatch('toggleBookmark', this.comic)
    },

    async toggleLike () {
      const {id} = this.comic
      const method = this.isLiked ? 'destoryLike' : 'storeLike'
      await this.$api.comic[method](id)
      this.$store.dispatch('toggleLike', this.comic)
    },

    async initComic (comicId) {
      const {id: oldComcid} = this.comic
      if (oldComcid === comicId) {
        return
      }

      const {data} = await this.$api.comic.show(comicId)
      this.$store.dispatch('initComic', data)
    },
  },

  computed: {
    ...mapGetters([
      'isBookmarked',
      'isLiked',
      'comic',
    ]),

    likeTag () {
      return this.comic.is_liked ? '已赞' : '点赞'
    },

    bookmarkTag () {
      return this.comic.is_bookmarked ? '已收藏' : '收藏'
    },
  },
}
