import client from './client'

export const BASE_URL = 'https://test-manhua.alaskamob.com'
// export const BASE_URL = 'https://comic.alaskamob.com'
export const API_URL = BASE_URL + '/1/api/v1/'

const apiClicent = client(API_URL)

export const api = {
  home: () => apiClicent.get('home'),
  category: () => apiClicent.get('category'),
  topup: (chapterId) => apiClicent.get('topup', {params: {chapter_id: chapterId}}),
  rank: (id) => apiClicent.get(`rank/${id}`),
  section: (id) => apiClicent.get(`section/${id}`),
  recommend: (day) => apiClicent.get('comic/recommend', {params: {day}}),
  contact: () => apiClicent.get('contact'),
  comic: {
    list: (params) => apiClicent.get('comic', {params}),
    show: (id) => apiClicent.get(`comic/${id}`),
    storeBookmark: (id) => apiClicent.post(`comic/${id}/bookmark`),
    destoryBookmark: (id) => apiClicent.delete(`comic/${id}/bookmark`),
    storeLike: (id) => apiClicent.post(`comic/${id}/like`),
    destoryLike: (id) => apiClicent.delete(`comic/${id}/like`),
    comicHistory: (page) => apiClicent.get('comic/history', {params: {page}}),
    comicBookmark: (page) => apiClicent.get('comic/bookmark', {params: {page}}),
    batchDestoryBookmark: (ids) => apiClicent.delete(`comic/bookmark`, {params: {comic_ids: ids}}),
    batchDestoryHistory: (ids) => apiClicent.delete(`comic/history`, {params: {comic_ids: ids}}),
  },
  chapter: {
    show: (id) => apiClicent.get(`chapter/${id}`),
    buy: (id, autoBuyChapter) => apiClicent.post(`chapter/${id}/buy`, {auto_buy_chapter: autoBuyChapter}),
  },
  user: {
    index: () => apiClicent.get('user'),
    signIn: () => apiClicent.patch('user/sign-in'),
    toggleAutoBuyChapter: () => apiClicent.post('user/toggle-auto-buy-chapter'),
    transaction: {
      expend: (page) => apiClicent.get('user/transaction/expend', {params: {page}}),
      income: (page) => apiClicent.get('user/transaction/income', {params: {page}}),
    },
  },
  search: {
    index: (keyword) => apiClicent.post(`search`, {keyword}),
    hot: () => apiClicent.get(`search/hot`),
  },
}
