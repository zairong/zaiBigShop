import {v4 as uuidv4} from 'uuid'
//生成一個永久的遊客身分
export const getUUID= ()=>{
  let uuid_token = localStorage.getItem('UUID')
  //如果沒有
  if(!uuid_token){
    //生成
    uuid_token = uuidv4()
    //放入本地存儲(只是為了驗證有沒有,沒其他功用)
    localStorage.setItem('UUID',uuid_token)
  }
  return uuid_token
}