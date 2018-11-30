import axios from 'axios'
import querystring from 'querystring'
const loginApiUrl = 'https://juejin.im/auth/type/phoneNumber'
const draftStorageApiUrl = 'https://post-storage-api-ms.juejin.im/v1/draftStorage'
const updateDraftApiUrl = 'https://post-storage-api-ms.juejin.im/v1/updateDraft'
const postPublishApiUrl = 'https://post-storage-api-ms.juejin.im/v1/postPublish'

export async function login (params) {
  const { data } = await axios.post(loginApiUrl, params)
  return data
}

// publish flow: draftStorage -> updateDraft -> postPublishArticle
// get postId of the article
export async function draftStorage (params) {
  const { data } = await axios.post(draftStorageApiUrl, querystring.stringify(params), {
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return data
}

// save the draft
export async function updateDraft (params) {
  await axios.post(updateDraftApiUrl, querystring.stringify(params), {
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// publish the article
export async function postPublishArticle (draft, update, publish) {
  const { d } = await draftStorage(draft)
  const postId = d[0]
  await updateDraft(Object.assign({}, update, { postId }))
  const { data } = await axios.post(postPublishApiUrl, querystring.stringify(Object.assign({}, publish, { postId })), {
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return data
}
