import HttpRequest from '@/libs/axios'
import Qs from 'qs'
const axios = new HttpRequest('http://39.99.203.80:8080')
export const login = ({ userName, password, Captcha, uuid }) => {
  return axios.request({
    url: 'login',
    params: {
      userName,
      userPassword:password,
      captcha:Captcha,
      uuid
    },
    method: 'get'
  })
}

export const sign = ({ userName, password }) => {
  console.log("注册开始");
  return axios.request({
    url: 'index/register',
    params: {
      userName,
      userPassword:password
    },
    method: 'get'
  })
}
export const setPersonInfo = (token,{userName,userSex,userTelephone,userEmail}) => {
  return axios.request({
    url: 'user/update',
    params: {
      token:token,
      userName,
      sex:userSex,
      telephone:userTelephone,
      email:userEmail
    },
    method: 'get'
  })
}

export const searchArticle= (searchText) =>{
  return axios.request({
    url: 'search',
    params: {
      keyword:searchText,
      currentPage:0
    },
    method: 'get'
  })
}
export const getUserInfo = (token) => {
  return axios.request({
    url: 'user',
    params: {
      token:token
    },
    method: 'get'
  })
}
export const logout = (token) => {
  return axios.request({
    url: 'logout',
    params: {
      token
    },
    method: 'get'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'get',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'get',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
