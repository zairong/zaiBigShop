<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">單價（元）</div>
        <div class="cart-th4">數量</div>
        <div class="cart-th5">小計（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <!-- ischecked 判斷勾選框是否勾上 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)">
          </li>
          <!-- img -->
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <!-- price -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <!-- 修改購買個數 -->
          <li class="cart-list-con5">
            <a class="mins" @click="update('mins', -1, cart)">-</a>
            <input autocomplete="off" minnum="1" class="itxt" :value="cart.skuNum"
              @change="update('change', $event.target.value * 1, cart)" />
            <a class="plus" @click="update('plus', 1, cart)">+</a>
          </li>

          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">刪除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>

        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 當購物車商品array長度>0才勾選上 ,當購物車商品array長度=0，不能被點擊 -->
        <input class="chooseAll"
               type="checkbox" 
              :checked="isAllChecked && cartInfoList.length > 0"
              :disabled="cartInfoList == 0" 
               @change="updateAllCartChecked"
              />
        <span>全選</span>
      </div>
      <div class="option">
        <a @click="deleteAllcheckedCart">刪除選中的商品</a>
        <a>移到我的關注</a>
        <a>清除下櫃商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已選擇
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>總價（不含運費） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn" >結算:</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('shopcart/getShopCartList')
    },
    // 購物車裡 修改某一個產品的個數, 需要節流限制時間範圍內只執行一次
    //避免點擊 -(減號)太快, 伺服器反應不過來而造成負數
    update: throttle(async function (type, disNum, cart) {
      //disNum 代表 現在狀態的數位 與 起始狀態的數位 的差值
      // 目前disNum 形參： + 號變化量（1),- 號 變化量 （-1），input 最終的量（並不是變化量）
      // 向伺服器發請求，修改數量
      switch (type) {
        // 加號
        case "plus": {
          // 帶給伺服器變化的量
          disNum = 1
          break
        }
        // 減號
        case "mins": {
          // 判斷產品的數量是否大於1，大於1才能減，傳遞給伺服器-1
          if (cart.skuNum > 1) {
            disNum = -1
          } else {
            // 產品的個數小於等於1，傳遞給伺服器的個數為 0
            disNum = 0
          }
          break
        }
        //input
        case "change": {
          //非法的
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
            //有小數點的
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          }
        }

      }
      // 派發action 發請求
      try {
        // 代表的是修改購物車中產品數量修改成功
        await this.$store.dispatch("detail/addOrUpdateShopCart", {
          skuId: cart.skuId,
          //disNum 正數代表+ , 負數代表-
          skuNum: disNum,
        })
        // 再一次獲取伺服器的最新資料進行展示
        this.getData()
      } catch (error) {
        // 修改失敗
        alert(error.message)
      }
    }, 1000),

    //刪除購物車產品列表
    async deleteCartById(cart) {
      try {
        console.log(cart.skuId)
        await this.$store.dispatch('shopcart/deleteCartListBySkuId', cart.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //勾選/取消勾選購買物品
    async updateChecked(cart, event) {
      try {
        let checked = event.target.checked ? "1" : "0" // 注意，介面文檔要的是string類型
        await this.$store.dispatch("shopcart/updateCheckedById", {
          skuId: cart.skuId,
          isChecked: checked,
        })
        this.getData()
      } catch (error) {
        alert(err.message)
      }
    },
    //刪除全部被勾選的購買物品,此回調函數無法蒐集到有用的參數
    async deleteAllcheckedCart() {
      try {
        // 派發actions
        await this.$store.dispatch("shopcart/deleteAllCheckedCart")
        // 再次發請求獲取購物車列表
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改全部商品的勾選狀態
    async updateAllCartChecked(event) {
      try {
        // console.log(event.target.checked); // 返回的是布耳植
        let isChecked = event.target.checked ? "1" : "0" // 需要的是string(0,1)
        // 派發actions 
        await this.$store.dispatch('shopcart/updateAllCartIsChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },

  },
  computed: {
    ...mapGetters('shopcart', ['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //總價格
    totalPrice() {
      // array.reduce常用於"條件計算"
      return this.cartInfoList.reduce((pre, cartInfo) => {
        return (cartInfo.skuPrice * cartInfo.skuNum) + pre
      }, 0)
      // return this.cartInfoList.reduce((pre, cartInfo) => pre + (cartInfo.skuPrice * cartInfo.skuNum ), 0)
    },
    //全選
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }

  }

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>





