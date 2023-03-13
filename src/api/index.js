// 當前這個模組：api進行統一管理
import requests from "./ajax"
import mockRequests from "./mockAjax"

// 三級聯動介面
// /api/product/getBaseCategoryList   GET  無參數

export const reqCategoryList = () => {
  // 要請求資料的時候直接調用reqCategoryList這個函數就可以了
  // 發請求:axios發請求返回結果是Promise對象
  return requests({ url: '/product/getBaseCategoryList', method: 'GET', })
}
export const reqGetBannerList = () => mockRequests.get("/banner")
export const reqGetFloorList = () => mockRequests.get("/floor")
//search請求
//當前這個【獲取搜索模塊的數據】 介面，會給服務器傳遞一個默認參數，必須得有個參數，至少是一個空Object
export const reqGetsearchInfo = (params) => { // params是向伺服器傳遞的參數，至少是一個空Object
  return requests({ url: '/list', method: 'POST', data: params }) //data 是攜帶的參數
}
//detail 產品詳情請求
//當前這個【獲取搜索模塊的數據】 介面，會給服務器傳遞一個默認參數，必須得有個參數，至少是一個空Object
export const reqGetGoodInfo = (skuId) => { // params是向伺服器傳遞的參數，至少是一個空Object
  return requests({ url: `/item/${skuId}`, method: 'GET' }) //data 是攜帶的參數
}

// 將產品添加到購物車中（或者 更新某一個產品個數）
//   /api/cart/addToCart/{ skuId }/{ skuNum }  POST 帶參數
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
}
// 獲取購物車列表數據/api/cart/cartList  GET 無參數
export const reqCartList = () => {
  return requests({ url: '/cart/cartList', method: 'GET' })
}

// 刪除購物車商品資料    /api/cart/deleteCart/{skuId}   DELETE  帶參數skuId
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
}
// 切換商品的選中狀態    /api/cart/checkCart/{skuId}/{isChecked}  GET請求 帶參數
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })
}

// 獲取驗證碼介面    /api/user/passport/sendCode/{phone} GET 
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
}

// 註冊使用者介面   /api/user/passport/register POST 帶參數
export const reqUserRegister = (data) => {
  return requests({ url: '/user/passport/register', method: 'POST', data })
}

// 登錄介面   /api/user/passport/login  POST  帶參數
export const reqUserLogin = (data) => {
  return requests({ url: '/user/passport/login', method: 'POST', data })
}

// 獲取使用者的資訊【需要帶著使用者的token向伺服器要使用者資訊】api/user/passport/auth/getUserInfo
// 用請求頭帶過去參數
export const reqUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' })
}

// 退出登錄 /api/user/passport/logout   GET  無參數
export const reqLogout = () => {
  return requests({ url: '/user/passport/logout', method: 'GET' })
}

//獲取用戶位址資訊  /api/user/userAddress/auth/findUserAddressList  GET
export const reqAddressInfo = () => {
  return requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })
}
// 獲取訂單交易頁 商品清單資訊 /api/order/auth/trade GET 無參數
export const reqOrderInfo = () => {
  return requests({ url: '/order/auth/trade', method: 'GET' })
}
//  src/api/index.js
// 提交訂單的介面  /api/order/auth/submitOrder?tradeNo={tradeNo}  POST 帶參數
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'POST', data })
}

//獲取支付訂單資訊 /api/payment/weixin/createNative/{orderId} 帶參數 GET
export const reqPayInfo = (orderId) => {
  return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })
}

// 查詢支付訂單的狀態  /api/payment/weixin/queryPayStatus/{orderId}  GET  帶參數
export const reqPayStatus = (orderId) => {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })
}
// 獲取我的訂單清單   /api/order/auth/{page}/{limit}   GET 帶參數
export const reqMyOrderList = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
}




