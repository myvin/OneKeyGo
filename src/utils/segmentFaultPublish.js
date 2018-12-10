import axios from 'axios'
import request from 'request-promise'
import jsdom from 'jsdom'
import { remote } from 'electron'
import db from '../database/index'

const segmentFault = Object.assign({}, db.getState().platforms.segmentFault)

const { JSDOM } = jsdom

const segmentfaultUrl = 'https://segmentfault.com'

// login api needs token parameter and PHPSESSID parameter
// the token parameter is in the script of the index html： w.SF.token
// the PHPSESSID parameter is written in cookie by the segmentfault server

const getToken = (res) => {
  const dom = new JSDOM(res.data, {
    runScripts: 'dangerously'
  })
  const { window } = dom
  const { SF } = window
  return SF.token || ''
}

// do not use await/async, cause it will throw the error: await is a reversed word in the callback function of the remote.session.defaultSession.cookies.get api
export function login (params, success, catchErr) {
  axios.get(segmentfaultUrl).then(res => {
    const token = getToken(res)

    remote.session.defaultSession.cookies.get({
      url: segmentfaultUrl
    }, (error, cookies) => {
      console.log('electron 获取 cookie error: ', error)
      request({
        url: `${segmentfaultUrl}/api/user/login?_=${token}`,
        method: 'POST',
        headers: {
          Referer: `${segmentfaultUrl}/`,
          contentType: 'application/x-www-form-urlencoded',
          cookie: `PHPSESSID=${cookies[0].value}`
        },
        form: params
      }).then(res => {
        success && success(res, token, cookies[0].value)
      }).catch(e => {
        catchErr && catchErr(e)
      })
    })
  })
}

export async function save ({
  title,
  text
}) {
  const body = {
    do: 'saveArticle',
    type: 1,
    title,
    text,
    weibo: 0,
    blogId: 0,
    id: '',
    articleId: '',
    'tags[]': '',
    url: ''
  }
  const data = await request({
    method: 'POST',
    url: `${segmentfaultUrl}/api/article/draft/save?_=${segmentFault.token}`,
    headers: {
      Referer: `${segmentfaultUrl}/write`,
      contentType: 'application/x-www-form-urlencoded',
      cookie: `PHPSESSID=${segmentFault.PHPSESSID}`
    },
    form: body,
    json: true
  })
  return data
}

export async function add ({
  title,
  text,
  draftId
}) {
  const body = {
    title,
    text,
    id: '',
    blogId: 0,
    'tags[]': '',
    weibo: 0,
    license: 0,
    draftId,
    created: '',
    type: 1,
    url: ''
  }
  const data = await request({
    method: 'POST',
    url: `${segmentfaultUrl}/api/articles/add?_=${segmentFault.token}`,
    headers: {
      Referer: `${segmentfaultUrl}/write`,
      contentType: 'application/x-www-form-urlencoded',
      cookie: `PHPSESSID=${segmentFault.PHPSESSID}`
    },
    form: body,
    json: true
  })
  return data
}

export async function search ({
  token,
  PHPSESSID,
  q
}) {
  const data = await request({
    method: 'GET',
    url: `${segmentfaultUrl}/api/tags/search?_=${token}&q=${q}`,
    headers: {
      Referer: `${segmentfaultUrl}/write`,
      cookie: `PHPSESSID=${PHPSESSID}`
    },
    json: true
  })
  return data
}
