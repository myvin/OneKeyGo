import axios from 'axios'
import request from 'request-promise'
import querystring from 'querystring'
import jsdom from 'jsdom'
import { remote } from 'electron'

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
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          body: querystring.stringify(params)
        }
      }).then(res => {
        success && success(res)
      }).catch(e => {
        catchErr && catchErr(e)
      })
    })
  })
}
