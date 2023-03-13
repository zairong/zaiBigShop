// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入store 在路由守衛條件判斷,派發action
import store from '@/store'
// 使用外掛程式
Vue.use(VueRouter)
// 先把VueRouter原型物件的push，先保存一份
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

// 重寫push | replace
// 參數：告訴原來的push方法，你往哪裡跳轉（傳遞哪些參數）
VueRouter.prototype.push = function push(location) { return originalPush.call(this, location).catch(err => err) }
VueRouter.prototype.replace = function replace(location) { return originalReplace.call(this, location).catch(err => err) }

// 配置路由
let router = new VueRouter({
  //路由信息
  routes,
  //滾動行為
  scrollBehavior(to, from, savedPosition) {
    // 始終滾動到頂部
    return { y: 0 }
  },
})

// 全域守衛：前置守衛（在路由跳轉之前進行判斷）
router.beforeEach(async (to, from, next) => {
  // 用戶登錄了，才會有token，未登錄一定不會有token 
  let token = store.state.user.token
  // 使用者資訊，從首頁跳轉到搜尋網頁的時候，使用者資訊會沒有
  let name = store.state.user.userInfo.name
  if (token) { //  用戶登錄
    // 用戶登錄了 不能去login，停留在首頁
    if (to.path == '/login') { // 用戶登陸了去登錄頁
      next('/home')
      console.log('用戶登錄了 不能去login，停留在首頁')
    } else { // 使用者登陸了去其他頁面
      // 登錄了，但是 去的不是login【home|search|detail|shopcart】
      // 但你要有使用者資訊才能去這些地方，那就放行
      if (name) { // 使用者登錄了去其他頁面且一直有使用者資訊
        // 有使用者資訊，直接放行
        next()
        console.log('使用者登錄了去其他頁面還有使用者資訊噢')
      } else { // 使用者登錄了去其他頁面但是沒有使用者資訊
        try {
          // 再次派發請求，獲取到使用者資訊，然後放行
          await store.dispatch('user/getUersInfo')
          next()
          console.log('使用者登錄去了其他頁面但是沒有使用者資訊-我去獲取資訊成功了')
        } catch (error) {
          // token失效了，獲取不到使用者的資訊，我們要重新登陸
          // 我們要清空token 
          await store.dispatch('user/userLogout')
          next('/login')
          console.log('清空使用者資訊跳去登陸頁面')
        }
      }
    }
  } else {
    // 未登錄----不能去【交易頁面】，不能去【支付頁面】，不能去【支付成功頁面】，不能去【個人中心】
    // 去了上面的就要去【登錄頁面】

    let toPath = to.path // 去哪?
    if (toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/trade') != -1) { 
      // 包含以上路徑,跳到登入頁面
      // 把未登錄的時候想去 而沒有去成的地方，存儲於位址欄中【query參數】
      // 有query參數就往 query參數的地址跳轉，沒有的話就就往 主頁跳轉
      next('/login?redirect=' + toPath) // redirect重定向
      alert('您還未登入,請進行登入!!!')
    } else{
      //去的不是上面這些路由（home|search|shopCart）---放行
      next();
   }
  }

})

export default router


