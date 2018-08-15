import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// @see https://github.com/vuejs/vuex/blob/dev/examples/counter/store.js

const state = {
  comic: {},
  chapter: {}
};

const mutations = {
  initComic(state, comic) {
    state.comic = comic;
  },

  resetComic(state) {
    state.comic = {};
  },

  updateComic(state, comic) {
    state.comic = Object.assign({}, state.comic, comic);
  },

  initChapter(state, chapter) {
    state.chapter = chapter;
  },

  resetChapter(state) {
    state.chapter = {};
  },

  updateChapter(state, chapter) {
    state.chapter = Object.assign({}, state.chapter, chapter);
  }
};

const actions = {
  // 漫画
  initComic: ({ commit }, comic) => commit("initComic", comic),
  resetComic: ({ commit }) => commit("resetComic"),
  toggleBookmark: ({ commit }, comic) =>
    commit("updateComic", { is_bookmarked: !comic.is_bookmarked }),
  toggleLike: ({ commit }, comic) =>
    commit("updateComic", {
      is_liked: !comic.is_liked,
      likes: comic.likes + (comic.is_liked ? -1 : 1)
    }),

  // 章节
  initChapter: ({ commit }, chapter) => commit("initChapter", chapter),
  updateChapter: ({ commit }, chapter) => commit("updateChapter", chapter)
};

// getters are functions
const getters = {
  comic: state => state.comic,
  isBookmarked: state => state.comic.is_bookmarked,
  isLiked: state => state.comic.is_liked,
  chapter: state => state.chapter
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
