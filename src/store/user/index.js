import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {},
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.code = ''
    state.userInfo = {}
    removeToken()
    state.token=''
  }

}
const actions = {
  //取得伺服器驗證碼
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    //真實開發下列代碼都不需要寫了,後臺會直接發驗證碼到用戶門號
    if (result.code == 200) {
      commit("GETCODE", result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用戶註冊
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(result)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("faile"))
    }
  },
  //用戶登入
  async userLogin({ commit }, data) {
    let reslut = await reqUserLogin(data)
    // console.log(reslut)
    if (reslut.code == 200) {
      //token-------- 是用戶的唯一標識
      commit('USERLOGIN', reslut.data.token)
      //儲存在localStorage內(持久化存token)
      setToken(reslut.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //取得用戶資訊
  async getUersInfo({ commit }) {
    let result = await reqUserInfo()
    // 開始存儲使用者資訊
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    }
  },
  // 退出登录，向服务器发请求，通知服务器清除服务器的token
  async userLogout({ commit }) {
    let result = await reqLogout()
    // 发请求成功，清除前台的数据
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('退出登录失败'))
    }
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

