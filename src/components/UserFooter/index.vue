<template>
  <!-- 底部 -->
  <div class="footer">
    <div class="footer-container">
      <div class="footerList">
        <div class="footerItem">
          <h4>購物指南</h4>
          <ul class="footerItemCon">
            <li>購物流程</li>
            <li>會員介紹</li>
            <li>生活旅行/團購</li>
            <li>常見問題</li>
            <li>購物指南</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>配送方式</h4>
          <ul class="footerItemCon">
            <li>上門自提</li>
            <li>211限時達</li>
            <li>配送服務查詢</li>
            <li>配送費收取標準</li>
            <li>海外配送</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>支付方式</h4>
          <ul class="footerItemCon">
            <li>貨到付款</li>
            <li>線上支付</li>
            <li>分期付款</li>
            <li>郵局匯款</li>
            <li>公司轉帳</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>售後服務</h4>
          <ul class="footerItemCon">
            <li>售後政策</li>
            <li>價格保護</li>
            <li>退款說明</li>
            <li>返修/退換貨</li>
            <li>取消訂單</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>特色服務</h4>
          <ul class="footerItemCon">
            <li>奪寶島</li>
            <li>DIY裝機</li>
            <li>延保服務</li>
            <li>ZAIE卡</li>
            <li>ZAI通信</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>幫助中心</h4>
          <img src="./images/rongsLine.jpg" />
        </div>
      </div>
      <div class="copyright">
        <ul class="helpLink">
          <li>
            關於我們
            <span class="space"></span>
          </li>
          <li>
            聯繫我們
            <span class="space"></span>
          </li>
          <li>
            關於我們
            <span class="space"></span>
          </li>
          <li>
            商家入駐
            <span class="space"></span>
          </li>
          <li>
            行銷中心
            <span class="space"></span>
          </li>
          <li>
            友情連結
            <span class="space"></span>
          </li>
          <li>
            關於我們
            <span class="space"></span>
          </li>
          <li>
            行銷中心
            <span class="space"></span>
          </li>
          <li>
            友情連結
            <span class="space"></span>
          </li>
          <li>關於我們</li>
        </ul>
        <p>地址：XXXXXXXX</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style scoped lang="less">
  .footer .footer-container {
  width: 1200px;
  margin: 0 auto ;
  margin-bottom: 20px;
  background-color: rgb(223, 224, 224);
  .footerList {
      padding-top:15px ;
      display: flex;
      justify-content:space-around;
      border-bottom: solid ;
      .footerItem {
        h4 {
          font-size: 20px;
    
        }
        img{
            width:150px;
            height: 150px;
          }

        ul {
          font-size: 16px;

        }
      }
      .copyright {
      .helpLink {
        li {
          .space {}
        }
      }

      p {}
    }
    }
  .copyright{
    margin:5px auto;
    height: 100px;
    .helpLink{
      display: flex;
      justify-content: center;
      li{
        font-size: 16px;
        padding: 5px;
      }
    }
    p{
      text-align: center;
      margin-top: 15px;
      font-size: 16px;
    }
  }
}

</style>