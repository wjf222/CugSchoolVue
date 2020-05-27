import HttpRequest from '@/libs/axios'
import Qs from 'qs'
const axios = new HttpRequest('')
export const login = ({ userName, password }) => {
  const data = {
    userName:userName,
    userPassword:password
  }
  return axios.request({
    url: 'index/login',
    params: {
      userName,
      userPassword:password
    },
    method: 'get'
  })
}

export const getUserInfo = (token) => {
  const data = {
    token:token,
  }
  return axios.request({
    url: 'index/user',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'index/logout',
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
