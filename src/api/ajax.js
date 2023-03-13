// 對於axios進行二次封裝
import axios from 'axios'
// 1. 利用axios物件的方法create，去創建一個axios實例
// 2. request就是axios，只不過稍微配置一下
//在當前模塊中引入store
import store from '@/store'
const requests = axios.create({
  // 配置物件
  // 基礎路徑，發請求的時候，路徑當中會出現基礎api
  baseURL: '/api',
  // 代表請求超時的時間5s，在5s之內沒有回應就失敗了
  timeout: 5000,
})

// 請求攔截器:在發請求之前，請求攔截器可以檢測到，可以在請求發出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置物件，物件立馬有一個屬性很重要，headers請求頭
  // console.log(store)
  //請求頭添加一個欄位(與後台說好的)
  if (store.state.detail.uuid_token) {
    //在請求頭添入客戶臨時唯一id
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 判斷是否有token
  if (store.state.user.token) {
    //在請求頭添入客戶token
    config.headers.token = store.state.user.token
  }
  return config
})

// 回應攔截器
requests.interceptors.response.use((res) => {
  // 成功的回呼函數：伺服器相應資料回來以後，相應攔截器可以檢測到，可以做一些事情

  return res.data
}, (error) => {
  // 伺服器回應失敗的回呼函數
  return Promise.reject(new Error('failed'))
})

// 對外暴露
export default requests;



