//對於axios進行二次封裝
import axios from "axios";
//底下的代碼也是創建axios實例
let requests = axios.create({
  //基礎路徑
  baseURL: "/mock",
  //請求不能超過5S
  timeout: 5000,
});

//請求攔截器----在項目中發請求（請求沒有發出去）可以做一些事情
requests.interceptors.request.use((config) => {
  //現在的問題是config是什麼?配置物件
  return config;
});

//回應攔截器----當伺服器手動請求之後，做出回應（相應成功）會執行的
requests.interceptors.response.use(
  (res) => {
    //
    //相應成功做的事情
    return res.data;
  },
  (err) => {
    alert("伺服器回應資料失敗");
  }
);
//最終需要對外暴露（不對外暴露外面模組沒辦法使用）
//這裡的代碼是暴露一個axios實例
export default requests;


