//vee-validate外掛程式：表單驗證區域’
import Vue from "vue"
import VeeValidate from "vee-validate"
//中文提示資訊
import zh_tw from "vee-validate/dist/locale/zh_TW"
Vue.use(VeeValidate)

//表單驗證
VeeValidate.Validator.localize("zh_TW", {
  messages: {
    ...zh_tw.messages,
    is: (field) => `${field}必須與密碼相同`, // 修改內置規則的 message，讓確認密碼和密碼相同
  },
  attributes: {
    phone: "手機門號",
    code: "驗證碼",
    password: "密碼",
    password1: "確認密碼",
    agree: '協議'
  },
})

//自訂校驗規則
VeeValidate.Validator.extend("tongyi", {
  validate: (value) => {
    return value
  },
  getMessage: (field) => field + "必須同意",
});


