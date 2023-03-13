<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">訂單提交成功，請您及時付款，以便儘快為您發貨~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">請您在提交訂單<em class="orange time">4小時</em>之內完成支付，超時訂單會自動取消。訂單號：<em>{{ orderId }}</em></span>
          <span class="fr"><em class="lead">應付金額：</em><el-button type="red"></el-button><em class="orange money">${{ payInfo.totalFee }}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要說明：</h4>
        <ol>
          <li>尚品匯商城支付平臺目前支持<span class="zfb">支付寶</span>支付方式。</li>
          <li>其它支付管道正在調試中，敬請期待。</li>
          <li>為了保證您的購物支付流程順利完成，請保存以下支付寶資訊。</li>
        </ol>
        <h4>支付寶帳戶資訊：（很重要，<span class="save">請保存！！！</span>）</h4>
        <ul>
          <li>支付帳號：11111111</li>
          <li>密碼：111111</li>
          <li>支付密碼：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平臺</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付網銀</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中國銀聯</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode"
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {}, // 至少是個對象
      timer: null, //定時器
      code: "", // 支付的狀態碼
    }
  },
  computed: {
    // 訂單號
    orderId() {
      return this.$route.query.orderId
    },
  },
  mounted() {
    // 發請求 獲取訂單支付資訊
    this.getPayInfo()
  },
  methods: {
    // 獲取支付的資訊
    async getPayInfo() {
      let result = await this.$API.reqPayInfo(this.orderId)
      if (result.code == 200) {
        // 存儲支付資訊
        this.payInfo = result.data
      }
    },
    // 遮罩層/彈出框
    async open() {
      // 生成二維碼地址
      let url = await QRCode.toDataURL(this.payInfo.codeUrl)
      this.$alert(`<img src=${url} />`, "請你微信支付", {
        dangerouslyUseHTMLString: true, // 是否將 message 屬性作為 HTML 片段處理
        center: true, // 中間佈局
        showCancelButton: true, // 是否顯示取消按鈕
        cancelButtonText: "支付遇見問題", // 取消按鈕的文本內容
        confirmButtonText: "已支付成功", // 確定按鈕的文本內容
        showClose: true, // MessageBox 是否顯示右上角關閉按鈕
        beforeClose: (type, instance, done) => {
          // type：可以區分 取消 | 確定 按鈕
          // instance：當前元件實例
          // done 關閉彈出框的方法
          // 關閉彈出框之前的配置

          // 如果你點擊了[支付遇見問題]
          if (type == "cancel") {
            alert("請聯繫管理員ZAI-RONG")
            // 清除計時器
            clearInterval(this.timer)
            this.timer = null
            // 關閉彈出框
            done()
          } else {
            // 判斷是否真的支付了
            if (this.code == 200) {
              // 關閉計時器
              clearInterval(this.timer)
              this.timer = null
              // 關閉彈出框
              done()
              // 跳轉到下一頁路由
              this.$router.push("/paysuccess")
            } else {
              alert("未支付成功!!!我不想花錢錢!!!但我還是要進成功支付頁面")
              // 清除計時器
              clearInterval(this.timer)
              this.timer = null
              // 關閉彈出框
              done()
              // 跳轉到下一頁路由
              this.$router.push("/paysuccess")
            }
          }
        },
      })
      // 你需要知道支付成功 | 失敗
      // 支付成功，路由的跳轉；如果支付失敗，提示資訊
      // 計時器沒有，開啟一個新的的計時器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          console.log(result)
          // 發請求獲取 使用者支付狀態
          let result = await this.$API.reqPayStatus(this.orderId)
          // 支付成功
          if (result.code == 200) {
            // 清除計時器
            clearInterval(this.timer)
            this.timer = null
            // 保存支付成功返回的code ，然後之後 點擊支付成功 判斷你的code==200，然後進行路由跳轉
            this.code = result.code
            // 關閉彈出框
            this.$msgbox.close()
            // 跳轉到下一頁路由
            this.$router.push("/paysuccess")
          }
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微軟雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>


