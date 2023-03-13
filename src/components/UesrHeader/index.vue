<template>
  <!-- 頭部 -->
  <header class="header">
    <!-- 頭部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <router-link to="/home">首頁</router-link>
          <p v-if="!nickName">
            <span>請</span>
            <router-link to="/login" class="login">登錄</router-link>
            <router-link to="/register" class="register">免費註冊</router-link>
          </p>
          <p v-else>
            <a>{{ nickName }}</a>
            <a class="register" @click="logout">退出登入</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的訂單</router-link>
          <router-link to="/shopcart">我的購物車</router-link>
          <a href="#">我的ZAI</a>
          <a href="#">ZAI會員</a>
          <a href="#">企業採購</a>
          <a href="#">關注ZAI</a>
          <a href="#">合作招商</a>
          <a href="#">商家後臺</a>
        </div>
      </div>
    </div>
    <!--頭部第二行 搜索區域-->
    <div class="bottom">
      <div class="searchArea">
        <form action="#" class="searchForm">
          <input @keyup.enter="goSearch" type="text" id="autocomplete" class="input-error input-xxlarge"
            v-model="keyword" />
          <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "UserHeader",
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    nickName() {
      return this.$store.state.user.userInfo.nickName
    }
  },
  methods: {
    goSearch() {
      if (this.$route.query) {
        let loction = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        }
        loction.query = this.$route.query
        this.$router.push(loction)
      }
    },
    //退出登入派發action
    logout() {
      this.$store.dispatch('user/userLogout')
      this.$router.push("/home")

    }
  },
  mounted() {
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  }
}

</script>

<style scoped lang="less">
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>