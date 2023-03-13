<template>
  <div class="register-container">
    <!-- 註冊內容 -->
    <div class="register">
      <h3>
        註冊新用戶
        <span class="go">我有帳號，去 <a href="login.html" target="_blank">登陸</a>
        </span>
      </h3>
      <div class="content">
        <label>手機號:</label>
        <input placeholder="請輸入你的手機門號" v-model="phone" name="phone" v-validate="{ required: true, regex: /^[0-9]{10,12}$/ }"
          :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>驗證碼:</label>
        <input placeholder="請輸入你的驗證碼" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }" />
        <button style="width:100px;height:38px" @click="getCode">
          獲取驗證碼
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登錄密碼:</label>
        <input placeholder="請輸入你的密碼 3-20位" v-model="password" name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{3,20}$/ }" :class="{ invalid: errors.has('password') }" />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>確認密碼:</label>
        <input placeholder="請輸入確認密碼" v-model="password1" name="password1" v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }" />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="agree" name="agree" v-validate="{ required: true, tongyi: true }"
          :class="{ invalid: errors.has('agree') }" />
        <span>同意協定並註冊《ZAI使用者協議》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成註冊</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>關於我們</li>
        <li>聯繫我們</li>
        <li>聯繫客服</li>
        <li>商家入駐</li>
        <li>行銷中心</li>
        <li>手機ZAI</li>
        <li>銷售聯盟</li>
        <li>ZAI社區</li>
      </ul>
      <div class="address">地址：台南北區XXXXXXXX</div>
      <div class="beian">19006430號</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: true
    }
  },
  methods: {
    async getCode() {
      try {
        //如果有門號,則發actions
        this.phone && await this.$store.dispatch('user/getCode', this.phone)
        //拿小倉庫的state直接帶入code ,直接顯示在inout框內 (真實開發不會這麼做)
        this.code = this.$store.state.user.code
      } catch (error) {
        alert(error.message)
      }
    },
    // 用戶註冊--發請求
    async userRegister() {
      const success = await this.$validator.validateAll()
      if (success){
        try {
          // 如果成功----路由跳轉  
          // 變數的解構賦值
          const { phone, code, password, password1 } = this
          // 判斷phone，code存不存在，以及密碼和確認密碼是否相等
          //前面都為真的話就開始派發action
            await this.$store.dispatch("user/userRegister", {
              phone,
              code,
              password,
            })
          // 如果成功就跳轉路由---登陸頁面
          this.$router.push("/login")
        } catch (error) {
          alert(error.message)
        }
      }else{
        alert('你有地方未填選,或是填寫不正確,請重新寫入正確訊息')
      }
    },

  },

}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>



