import HttpRequest from '@/libs/axios'
import Qs from 'qs'
const axios = new HttpRequest('')
export const login = ({ userName, password }) => {
  const data = {
    userName:userName,
    password:password
  }
  return axios.request({
    url: 'index/login',
    data:Qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  const data = {
    token:token,
  }
  return axios.request({
    url: 'index/getInfo',
    data:Qs.stringify(data),
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
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
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
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
