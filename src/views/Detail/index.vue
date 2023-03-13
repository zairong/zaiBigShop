<template>
  <div class="detail">
    <!-- 商品分類導航 -->
    <TypeNav />

    <!-- 主要內容區域 -->
    <section class="con">
      <!-- 導航路徑區域 -->
      <div class="conPoin">
        <span v-show="categoryView.category1Id">{{ categoryView.category1Name }}</span>
        <span v-show="categoryView.category2Id">{{ categoryView.category2Name }}</span>
        <span v-show="categoryView.category3Id">{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要內容區域 -->
      <div class="mainCon">
        <!-- 左側放大鏡區域 -->
        <div class="previewWrap">
          <!--放大鏡效果 傳props-->
          <Zoom :skuImageList="skuImageList" />
          <!-- 小圖列表 -->
          <ImageList :skuImageList="skuImageList" />
        </div>
        <!-- 右側選擇區域佈局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <div class="priceArea">
              <div class="priceArea1">
                <div class="InfoName">{{ skuInfo.skuName }}</div>
                <div class="title">價&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>$</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降價通知</span>
                </div>
                <div class="remark">
                  <i>累計評價</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;銷</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加價購</i>
                  <em class="t-gray">滿999.00另加20.00元，或滿1999.00另加30.00元，或滿2999.00另加40.00元，即可在購物車換購熱銷商品</em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                <div class="fixWidth">以舊換新，閒置手機回收 4G套餐超值搶 禮品購</div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">全省 台北 桃園 新竹 台中 台南 高雄 ...</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for=" spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id">
                <dt class="title">選擇{{ spuSaleAttr.saleAttrName }}</dt>
                <dd changepirce="0" v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                  :class="{ active: spuSaleAttrValue.isChecked == 1 }" :key="spuSaleAttrValue.id"
                  @click="changActive(spuSaleAttrValue, spuSaleAttr.spuSaleAttrValueList)">{{
                      spuSaleAttrValue.saleAttrValueName
                  }}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="buyCount" @change="changeBuyCount">
                <a href="javascript:" class="plus" @click="buyCount++"> +</a>
                <a href="javascript:" class="mins" @click="buyCount > 1 ? buyCount-- : buyCount = 1"> - </a>
              </div>
              <div class="add">
                <a @click="addShopcar">加入購物車</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 內容詳情頁 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相關分類</h4>
          <h4>推薦品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手機</li>
              <li>手機殼</li>
              <li>記憶體卡</li>
              <li>Iphone配件</li>
              <li>貼膜</li>
              <li>手機耳機</li>
              <li>移動電源</li>
              <li>平板電腦</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple蘋果iPhone 6s (A1699) </div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入購物車</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple蘋果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入購物車</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple蘋果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入購物車</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple蘋果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入購物車</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple蘋果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入購物車</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推薦品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">選擇搭配</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless費勒斯VR</p>
                <label>
                  <input type="checkbox" value="39">
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless費勒斯VR</p>
                <label>
                  <input type="checkbox" value="50">
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless費勒斯VR</p>
                <label>
                  <input type="checkbox" value="59">
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless費勒斯VR</p>
                <label>
                  <input type="checkbox" value="99">
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已選購0件商品</div>
              <div class="price-tit">
                套餐價
              </div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入購物車</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###">
                商品介紹
              </a>
            </li>
            <li>
              <a href="###">
                規格與包裝
              </a>
            </li>
            <li>
              <a href="###">
                售後保障
              </a>
            </li>
            <li>
              <a href="###">
                商品評價
              </a>
            </li>
            <li>
              <a href="###">
                手機社區
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>解析度：1920*1080(FHD)</li>
                <li>後置攝像頭：1200萬圖元</li>
                <li>前置攝像頭：500萬圖元</li>
                <li>核 數：其他</li>
                <li>頻 率：以官網信息為准</li>
                <li>品牌： Apple</li>
                <li>商品名稱：APPLEiPhone 6s Plus</li>
                <li>商品編號：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品產地：中國大陸</li>
                <li>熱點：指紋識別，Apple Pay，金屬機身，拍照神器</li>
                <li>系統：蘋果（IOS）</li>
                <li>圖元：1000-1600萬</li>
                <li>機身記憶體：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>規格與包裝</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售後保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品評價</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手機社區</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageList from './ImageList/ImageList'
import Zoom from './Zoom/'

export default {
  name: 'Detail',
  data() {
    return {
      buyCount: 1
    }
  },
  components: {
    ImageList,
    Zoom
  },
  mounted() {
    // console.log(this.$route.params)
    this.$store.dispatch('detail/getGoodInfo', this.$route.params.skuId)
  },
  computed: {
    //取得vuex的detail模塊getters數據
    ...mapGetters('detail', ['categoryView', 'skuInfo', 'spuSaleAttrList']),

    //給予子組件數據(props)
    skuImageList() {
      //如果伺服器數據沒有回來，skuInfo則是個空{}，skuInfo.skuImageList就是undefined
      // 子组件出现skuImageList[0]就會報錯，因为undefined沒有第0項，所以skuImageList至少要是一個空陣列
      return this.skuInfo.skuImageList || []
    }

  },
  methods: {
    //產品的售賣屬性切換高亮
    //其中arr為整個陣列,spuSaleAttrValue為arr中的obj
    changActive(spuSaleAttrValue, arr) {
      //將所有陣列的obj的isChecked都設為0
      arr.forEach(item => {
        item.isChecked = 0
      })
      //當前點擊的那個obj他的isChecked設為1
      // console.log(spuSaleAttrValue)
      spuSaleAttrValue.isChecked = 1
    },
    changeBuyCount(event) {
      // 拿到表單元素  event.target.value
      // 1. 用户輸入近來的值 * 1 為NaN
      // 2. 用戶輸入的值小於1
      let value = event.target.value * 1
      if (isNaN(value) || value < 1) {
        this.buyCount = 1
      } else {
        // 3. 如果用用戶輸入小數,取整数
        this.buyCount = parseInt(value)
      }
    },
    async addShopcar() {
      try {
        await this.$store.dispatch("detail/addOrUpdateShopCart", { skuId: this.$route.params.skuId, skuNum: this.buyCount })
        //成功了,先在瀏覽器暫存buyCount,再進行路由跳轉
        sessionStorage.setItem('SKUNUM',JSON.stringify(this.skuInfo))
        this.$router.push({
          name:'addcartsuccess',
          query:{skuNum: this.buyCount}
        })
      }
      catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      &>span+span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 18px;
          line-height: 21px;
          margin-top: 15px;
          padding-bottom: 7px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }

        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                list-style: none;
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              &>li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;


                input {
                  vertical-align: middle;

                }

                span {
                  vertical-align: middle;

                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #B1191A;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            &+li>a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }

        }
      }
    }
  }
}
</style>

