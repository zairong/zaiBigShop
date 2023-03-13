
// 本地存token
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}
// 獲取token
export const getToken = () =>{
  return localStorage.getItem('TOKEN')
}
//移除token
export const removeToken =()=>{
   localStorage.removeItem('TOKEN')
}
