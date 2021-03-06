import {
  login,
  sign,
  getUserInfo,
  getMessage,
  getReadedMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount,
  getReadedCount,
  setPersonInfo,
  searchArticle,
  searchQuestion,
  getEssaies,
  viewArticle,
  publishArticle,
  getCommentsArticle,
  publishComment,
  publishNetAsk,
  getNetAsk,
  getNetAskByAuthor,
  getNetAskById,
  getNetAnswer,
  getAnswerBySomeone,
  getAnswerByQuestionId,
  publishMyAnswer,
  getAllTags,
  sendEmail,
  imgUpload,
  essaynumOfAuthor,
  countOfAllQuestions,
  countOfAuthorQuestions,
  countOfAllAnswers,
  CountofSbAnswer,
  countOfAllofEssay,
  allOfEssay,
  deleteEssay,
  deleteQuestion,
  deleteAnswer,
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
    handleSign({ }, { email, userName, password, verifyCode }) {
      userName = userName.trim()
      return sign({
        email,
        userName,
        userPassword: password,
        verifyCode
      })
    },

    //发送邮箱验证码
    sendEmail({ }, { reciver, verifyCode }) {
      return sendEmail({ reciver, verifyCode })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(() => {
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
    setPersonInfo({ state }, { password, userName, userSex, userTelephone, userEmail }) {
      const token = state.token;
      return setPersonInfo(token, { password, userName, userSex, userTelephone, userEmail })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token)
            .then(res => {
              const data = res.data
              commit('setAvatar', data.userAvatarPath)
              commit('setUserName', data.userName)
              commit('setUserId', data.userId)
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

    imgUpload({ }, { formData }) {
      return imgUpload(formData)
    },
    //返回文章
    viewArticle({ }, { id }) {
      return viewArticle(id)
    },

    //获取某个作者的文章的数量
    essaynumOfAuthor({ state }) {
      return essaynumOfAuthor(state.userName);
    },
    //获取文章
    getEssaies({ state }, { page }) {
      return getEssaies({ page, author: state.userName })
    },

    allOfEssay({ state }, { page }) {
      return allOfEssay({ page })
    },
    //获取所有文章的数量
    countOfAllofEssay() {
      return countOfAllofEssay()
    },
    countOfAllAnswers() {
      return countOfAllAnswers()
    },

    //获取当前用户的回答数量
    CountofSbAnswer({ state }) {
      return CountofSbAnswer({ answerName: state.userName })
    },
    //获取所有问题的数目
    countOfAllQuestions() {
      return countOfAllQuestions()
    },
    //获取某个作者问题的数目
    countOfAuthorQuestions({ state }) {
      return countOfAuthorQuestions({ asker: state.userName })
    },
    //获取评论
    getCommentsArticle({ state }, { essayId, pageIndex }) {
      return getCommentsArticle({ essayId, pageIndex });
    },

    //发表评论
    publishMyComment({ state }, { id, content }) {
      return publishComment({ essayId: id, commentatorName: state.userName, commentContent: content });
    },
    //搜索问题
    searchQuestion({ }, { searchText, page }) {
      return searchQuestion(searchText, page)
    },

    //搜索文章
    searchArticle({ }, { searchText, page }) {
      return searchArticle(searchText, page)
    },
    //发表文章
    publishArticle({ state }, { article }) {
      let formData = new FormData();
      return publishArticle({
        content: article.body.contentHtml, title: article.title,
        essayAbstract: article.summary, author: state.userName,
        tags: article.tags
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({ state, commit }) {
      getUnreadCount({ receiver: state.userName }).then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList({ state, commit }) {
      let readedCount = 0
      getReadedCount({ receiver: state.userName }).then(res => {
        readedCount = res.data
        let unreadedPage = readedCount / 5 + 1
  
        for (let i = 0; i < unreadedPage; i++) {
          getReadedMessage({ pageIndex: i, receiver: state.userName }).then(res => {
            const readed = res.data.concat(state.messageReadedList)
            commit('setMessageReadedList', readed)
          })
        }
      })
      return new Promise((resolve, reject) => {
        getMessage({ pageIndex: 0, receiver: state.userName }).then(res => {
          const unread = res.data
          commit('setMessageUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    publishNetAsk({ state }, { questionTitle, questionContent }) {
      return publishNetAsk({ asker: state.userName, questionTitle, questionContent })
    },
    getNetAnswer({ }, { pageIndex }) {
      return getNetAnswer(pageIndex)
    },
    //获取当前用户的所有回答
    getAnswerBySomeone({ state }, { pageIndex }) {
      return getAnswerBySomeone({ pageIndex, answerName: state.userName })
    },
    getNetAsk({ }, { pageIndex }) {
      return getNetAsk(pageIndex)
    },
    getNetAskByAuthor({ state }, { pageIndex }) {
      return getNetAskByAuthor({ asker: state.userName, pageIndex })
    },
    getNetAskById({ }, { id }) {
      return getNetAskById(id)
    },
    getAllTags() {
      return getAllTags();
    },
    getAnswerById({ state }, { id, page }) {
      return getAnswerByQuestionId({ id, pageIndex: page })
    },

    publishMyAnswer({ state }, { content, questionId }) {
      return publishMyAnswer(content, questionId, state.userName)
    },


    //删除文章
    deleteEssay({ }, { essayId }) {
      return deleteEssay({ essayId })
    },

    deleteQuestion({ }, { questionId }) {
      return deleteQuestion({ questionId })
    },
    deleteAnswer({ }, { answerId }) {
      return deleteAnswer({ answerId })
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
