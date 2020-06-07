import HttpRequest from '@/libs/axios'
import Qs from 'qs'
const axios = new HttpRequest('http://39.99.203.80:8080')
export const login = ({ userName, password, Captcha, uuid }) => {
  return axios.request({
    url: 'login',
    params: {
      userName,
      userPassword: password,
      captcha: Captcha,
      uuid
    },
    method: 'get'
  })
}

export const sign = ({ userName, password }) => {
  return axios.request({
    url: 'index/register',
    params: {
      userName,
      userPassword: password
    },
    method: 'get'
  })
}
export const setPersonInfo = (token, { userName, userSex, userTelephone, userEmail }) => {
  return axios.request({
    url: 'user/update',
    params: {
      token: token,
      userName,
      sex: userSex,
      telephone: userTelephone,
      email: userEmail
    },
    method: 'get'
  })
}


export const viewArticle = (id) => {
  return axios.request({
    url: 'getEssay',
    params: {
      id
    },
    method: 'get'
  })
}
export const getEssaies = (author) => {
  return axios.request({
    url: 'getEssaies',
    params: {
      author: "zhouning"
    },
    method: 'get'
  })
}

export const getAllTags = () =>{
  return axios.request({
    url: 'allTags',
    params: {
    },
    method: 'get'
  })
}
export const publishNetAsk = (questionTitle, questionContent) => {
  return axios.request({
    url: 'question/askQuestion',
    params: {
      asker: "zhouning",
      questionTitle,
      questionContent
    },
    method: 'get'
  })
}

export const publishMyAnswer = (content, questionId, answerer) => {
  return axios.request({
    url: 'answer/answerQuestion',
    params: {
      answerer,
      content,
      questionId
    },
    method: 'get'
  })
}
export const getNetAsk = (author) => {
  return axios.request({
    url: 'question/allQuestions',
    params: {
      // asker: author,
    },
    method: 'get'
  })
}
export const searchArticle = (searchText, page) => {
  return axios.request({
    url: 'search/essay',
    params: {
      keyword: searchText,
      currentPage: page
    },
    method: 'get'
  })
}

export const publishArticle = ({ content, title, essayAbstract, author }) => {
  return axios.request({
    url: "file/md",
    params: {
      content,
      title,
      essayAbstract,
      author: author
    },
    method: "get"
  })
}

export const publishComment = ({ essayId, commentatorName, commentContent }) => {
  return axios.request({
    url: "comment/addComment",
    params: {
      essayId,
      commentatorName,
      commentContent
    },
    method: "get"
  })
}
export const getUserInfo = (token) => {
  return axios.request({
    url: 'user',
    params: {
      token: token
    },
    method: 'get'
  })
}

export const getNetAskById = (id) => {
  return axios.request({
    url: 'question/getQuestion',
    params: {
      questionId: id
    },
    method: 'get'
  })
}

export const getAnswerByQuestionId = (id) => {
  return axios.request({
    url: 'answer/getAnswers',
    params: {
      questionId: id
    },
    method: 'get'
  })
}
export const getCommentsArticle = (id) => {
  return axios.request({
    url: 'comment/getComments',
    params: {
      essayId: id
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
