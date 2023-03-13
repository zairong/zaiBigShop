<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部結果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分類的麵包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <!-- 關鍵字的麵包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的麵包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTradMark">×</i></li>
            <!-- 品牌屬性的麵包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key=index>{{ attrValue.split(':')[1]
            }}<i @click="removeAttr(index)">×</i></li>

          </ul>
        </div>

        <!--selector @trademarkInfo為榜定自訂義事件的名稱,trademarkInfo為自訂義事件回調-->
        <SearchSelector @trademarkInfo="trademarkInfo" @getAttrInfo="getAttrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的結構 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>綜合</a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>價格</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 切記在進行路由跳轉時別忘了帶參數id(params參數) -->
                    <router-link :to = "`/detail/${good.id}`" ><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>$</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>1998</span>人評價</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入購物車</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分頁器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  //建立要給伺服器的默認參數
  data() {
    return {
      searchParams: {
        //產品相應的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //產品的名字
        categoryName: "",
        //搜索的關鍵字
        keyword: "",
        //排序:初始狀態應該是綜合且降冪
        order: "1:desc",
        //第幾頁
        pageNo: 1,
        //每一頁展示條數
        pageSize: 5,
        //平臺屬性的操作
        props: [],
        //品牌
        trademark: "",
      }
    }
  },
  components: {
    SearchSelector
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('search', ['goodsList',]),
    ...mapState('search', ['searchList']),
    //是否包含1,有的話就是綜合
    isOne() {
      return this.searchParams.order.includes(1)
    },
    //是否包含2,有的話就是價格
    isTwo() {
      return this.searchParams.order.includes(2)
    },
    // 是昇冪還是降冪
    isAsc() { // 昇冪
      return this.searchParams.order.includes('asc')
    },
    isDesc() { // 降冪
      return this.searchParams.order.includes('desc')
    }

  },
  beforeMount() {
    // console.log(this.$route.query); // 可以拿到傳遞過來的query參數
    // console.log(this.$route.params); //  可以拿到傳遞過來的params參數
    //在發請求之前，把介面需要傳遞的參數，進行整理
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
    console.log(this.searchParams)
  },
  methods: {
    getPageNo(pageNo) {
      // 整理带给伺服器的参数
      this.searchParams.pageNo = pageNo
      // 再次發请求
      this.getData()
    },
    //向伺服器發請求獲取search模塊數據(根據發出不同的參數,伺服器會返回不同的數遽進行展示)
    getData() {
      this.$store.dispatch('search/getSearchList', this.searchParams)
    },
    //移除左選單點選的搜尋物件麵包屑
    removeCategoryName() {
      // 把searchParams.categoryName和哪些分級的id也置空
      // 帶給伺服器參數 是可有可無的：如果屬性值為空的字串還是會把相應的欄位帶給伺服器
      // 但是你把相應的欄位變為undefined，當前這個欄位不會帶給伺服器-------性能更好
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 位址也需要修改<自己跳轉自己的路由>
      // 嚴謹：本意是刪除query參數，如果路徑當中出現了params參數，路由跳轉的時候應該帶著
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params, })
      }
      this.getData()
    },
    //移除搜尋框中的關鍵字麵包屑
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.getData()
      //通知兄弟組件UserHeader清除關鍵字
      this.$bus.$emit('clear')
      //路由跳轉
      // 嚴謹：本意是刪除query參數，如果路徑當中出現了query參數，路由跳轉的時候應該帶著
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    //自訂義事件回調
    trademarkInfo(trademark) {
      // console.log(trademark)
      //整理品牌欄位的參數 "ID:品牌名稱"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //再次向伺服器發請求獲取search模塊列表數據進行展示
      this.getData()
    },
    //刪除品牌麵包屑
    removeTradMark() {
      //將trademark參數設置為空
      this.searchParams.trademark = undefined
      //再次向伺服器發請求
      this.getData()
    },
    //取得品牌的屬性值及相對應的屬性名(自訂義事件回調)
    getAttrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //去重
      // if (this.searchParams.props.indexOf(props) == -1) {
      //   this.searchParams.props.push(props)
      // }
      //如果不重複,才進行push
      if (!this.searchParams.props.includes(props)) {
        this.searchParams.props.push(props)
      }
      //再次向伺服器發請求
      this.getData()
    },
    removeAttr(index) {
      // array.splice(從哪裡刪除, 刪除幾個)
      this.searchParams.props.splice(index, 1)
      //再次向伺服器發請求
      this.getData()
    },
    // 排序操作
    changeOrder(flag) {
      // flag是一個形參，他是一個標記，代表使用者點擊的時候綜合（1）還是價格（2）【用戶點擊的時候傳進來的】

      let orginOrder = this.searchParams.order // 獲得起始的狀態 1:desc默認綜合
      let orginFlag = this.searchParams.order.split(":")[0] // 拿到現在狀態是 綜合還是 價格
      let orginSort = this.searchParams.order.split(":")[1] // 拿到現在是昇冪還是降冪

      let newOrder = ''
      // 這個語句可以確定默認的和你點擊的orginFlag是一樣的
      if (orginFlag === flag) {
        // 如果預設值和咱們點擊的是一樣的，就切換昇冪和降冪
        newOrder = `${flag}:${orginSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 假如默認是綜合，我們卻點擊了價格，讓點擊傳入的參數flag=2 就是價格，然後默認是降冪
        newOrder = `${flag}:${orginSort = 'desc'}`
      }
      this.searchParams.order = newOrder
      // 再次發請求
      this.getData()
    }
  },
  watch: {
    // 監聽路由的資訊是否發生變化，如果發生變化再次發請求
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // console.log(this.searchParams)
      //再次發AJAX請求
      this.getData()
      //每一次請求完畢,必須要把相應的1,2,3級分類的id置空
      //讓他接收下一次1,2,3級分類的id
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 100%;
        height: 66px;
        display: flex;
        justify-content: center;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>


