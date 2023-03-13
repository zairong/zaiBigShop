<template>
  <div class="trade-container">
    <h3 class="title">填寫並核對訂單資訊</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <!-- 使用者位址資訊 -->
      <!-- 當數據中的 isDefault為1 是，才是默認地址 -->
      <div class="address clearFix" v-for="addressInfo in address" :key="addressInfo.id">
        <span class="username" :class="{ selected: addressInfo.isDefault == 1 }">{{ addressInfo.consignee }}</span>
        <p @click="changeDefault(addressInfo, address)">
          <span class="s1">{{ addressInfo.fullAddress }}</span>
          <span class="s2">{{ addressInfo.phoneNum }}</span>
          <span class="s3" v-show="addressInfo.isDefault == 1">默認地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">線上支付</span>
        <span class="username" style="margin-left:5px;">貨到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送貨清單</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快遞</span>
          <p>配送時間：預計8月10日（週三）09:00-15:00送達</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清單</h5>
        <ul class="list clearFix" v-for="order in orderInfo.detailArrayList" :key="order.skuId">
          <li>
            <img :src="order.imgUrl" style=" width:100px ; height: 100px;">
          </li>
          <li>
            <p>{{ order.skuName }}</p>
            <h4 style="">7天無理由退貨</h4>
          </li>
          <li>
            <h3>{{ order.orderPrice }}</h3>
          </li>
          <li>{{ order.skuNum }}</li>
          <li>有貨</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>買家留言：</h5>
        <textarea placeholder="建議留言前先與商家溝通確認" class="remarks-cont" v-model="msg"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>發票資訊：</h5>
        <div>普通發票（電子） 個人 明細</div>
        <h5>使用優惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{ orderInfo.totalNum }}</i>件商品，總商品金額</b>
          <span>${{ orderInfo.totalAmount }}</span>
        </li>
        <li>
          <b>返現：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>運費：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">應付金額:　<span>${{ orderInfo.totalAmount }}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userDefaultAddress.userAddress }}</span>
        收貨人：<span>{{ userDefaultAddress.consignee }}</span>
        <span>{{ userDefaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交訂單</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      msg: '',   //用戶留言
      orderId: '' //訂單編號
    }
  },
  mounted() {
    this.$store.dispatch('trade/getAddressInfo')
    this.$store.dispatch('trade/getOrderInfo')
  },
  computed: {
    ...mapState('trade', ['address', 'orderInfo']),
    //默認地址
    userDefaultAddress() {
      return this.address.find(item => item.isDefault == 1) || {}
    }
  },
  methods: {
    // 修改默認地址
    changeDefault(addressInfo, address) { // addressInfo你點擊的--address全部位址清單
      // 排他思想----先讓全部的位元址的isDefault為0，然後讓你點擊的為1
      address.forEach(item => {
        item.isDefault = 0
      })
      addressInfo.isDefault = 1
    },
    // 提交訂單發請求
    async submitOrder() {
      // 發請求，需要帶參數tradeNo
      let { tradeNo } = this.orderInfo // 解構賦值！！！可以直接用this.orderInfo的tradeNo
      // 其餘的六個參數
      let data = {
        consignee: this.userDefaultAddress.consignee, // 收件人姓名
        consigneeTel: this.userDefaultAddress.phoneNum, // 收件人電話
        deliveryAddress: this.userDefaultAddress.fullAddress, // 收件人地址
        paymentWay: "ONLINE", // 支付方式
        orderComment: this.msg, // 訂單備註
        // 存儲多個商品物件的陣列
        orderDetailList: this.orderInfo.detailArrayList,
      }
      // 開始發請求
      let result = await this.$API.reqSubmitOrder(tradeNo, data)
      console.log(result)
      if (result.code == 200) {
        //將伺服器回傳的訂單編號放入data
        this.orderId = result.data //訂單標號
        //路由跳轉,並將訂單編號以query參數傳到路由中
        // this.$router.push(`/pay?orderId=${this.orderId}`)
        let location = {
          name:'pay',
          query:{orderId:this.orderId}
        }
        this.$router.push(location)
      }
    },

  }
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;

        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          width: 1000px;
          padding: 20px;
          line-height: 30px;

          p {

            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {

            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        width: 200px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微軟雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;

    }
  }

}
</style>


