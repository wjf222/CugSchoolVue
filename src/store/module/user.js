import {
  login,
  sign,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount,
  setPersonInfo,
  searchArticle,
  getEssaies,
  viewArticle,
  publishArticle,
  getCommentsArticle,
  publishComment
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password, Captcha, uuid }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password,
          Captcha,
          uuid
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          commit('setAccess', ['super_admin'])
          resolve()
        }).catch(err => {
          alert("登录失败，请检查输入");
          reject(err)
        })
      })
    },
    //注册
    handleSign({ commit }, { userName, password }) {
      userName = userName.trim()
      console.log("进入注册");
      return sign({
        userName,
        password
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        console.log("logout :" + state.token);
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    getPersonInfo({ state, commit }) {
      return getUserInfo(state.token)
    },
    setPersonInfo({ state }, { userName, userSex, userTelephone, userEmail }) {
      const token = state.token;
      return setPersonInfo(token, { userName, userSex, userTelephone, userEmail })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token)
            .then(res => {
              const data = res.data
              console.log(data);
              commit('setAvatar', "http://39.99.203.80:8080/images/1.jpg")
              commit('setUserName', data.name)
              commit('setUserId', data.user_id)
              commit('setAccess', ['super_admin', 'admin'])
              commit('setHasGetInfo', true)
              resolve(data)
            }).catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    },

    //返回文章
    viewArticle({ state, commit }, { id }) {
      return viewArticle(id)
    },

    //获取文章
    getEssaies({ state, commit }, { page }) {
      return getEssaies(page)
    },

    //获取评论
    getCommentsArticle({ state }, { id }) {
      return getCommentsArticle(id);
    },
    publishMyMyComment({state},{id,content}){
      console.log(content);
      return publishComment({essayId:id,commentatorName:"zhouning",commentContent:content});
    },
    //搜索文章
    searchArticle({ state, commit }, { searchText, page }) {
      return searchArticle(searchText, page)
    },

    publishArticle({ state }, { article }) {
      console.log(article);
      return publishArticle({
        content: article.body.contentHtml, title: article.title,
        essayAbstract: article.summary, author: state.userName
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据当前点击的消息的id获取内容
    getContentByMsgId({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
