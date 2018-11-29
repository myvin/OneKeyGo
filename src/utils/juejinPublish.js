import axios from 'axios'
const loginApiUrl = 'https://juejin.im/auth/type/phoneNumber'
const draftStorageApiUrl = 'https://post-storage-api-ms.juejin.im/v1/draftStorage'
const updateDraftApiUrl = 'https://post-storage-api-ms.juejin.im/v1/updateDraft'
const postPublishApiUrl = 'https://post-storage-api-ms.juejin.im/v1/postPublish'

export async function login (params) {
  const { data } = await axios.post(loginApiUrl, params)
  return data
}

// 获取 postId
export async function draftStorage (params) {
  const { data } = await axios.post(draftStorageApiUrl, params)
  return data
}

// 保存草稿
export async function updateDraft (params) {
  const { data } = await axios.post(updateDraftApiUrl, params)
  return data
}

// 发布文章
export async function postPublishArticle (params) {
  const { d } = await draftStorage()
  const postId = d[0]
  const { data } = await axios.post(postPublishApiUrl, Object.assign({}, params, { postId }))
  return data
}
