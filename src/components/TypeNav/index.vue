<template>
  <!-- 商品分類導航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 利用事件委派:跳轉其他路由時,左邊導覽框隱藏,但移入全部商品分類顯示 -->
      <!-- 滑鼠事件mouseleave會自動觸發 -->
      <div @mouseenter="showList" @mouseleave="removeList">
        <h2 class="all">全部商品分類</h2>
        <!-- 過度動畫 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+編成式導航進行路由跳轉 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for=" c1 in cateGoryList" :key='c1.id'>
                <h3>
                  <!-- 將a標籤綁定自定義屬性 -->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}
                  </a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- 將a標籤綁定自定義屬性 -->
                        <a :data-category2Id="c2.categoryId" :data-categoryName="c2.categoryName">{{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 將a標籤綁定自定義屬性 -->
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服裝城</a>
        <a href="###">美妝館</a>
        <a href="###">ZAI超市</a>
        <a href="###">全球購</a>
        <a href="###">閃購</a>
        <a href="###">團購</a>
        <a href="###">有趣</a>
        <a href="###">秒殺</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入mapState
import { mapState } from "vuex"
export default {
  name: "TypeNav",
  data() {
    return {
      show: true
    }
  },
  mounted() {

  },
  computed: {
    ...mapState('home', ['cateGoryList']
      // {cateGoryList: (state) => state.home.cateGoryList,}
    ),
  },
  methods: {
    goSearch(event) {
      //獲取節點
      // console.log(event.target)
      //獲取節點的屬性 
      // console.log(event.target.dataset) 
      let node = event.target
      //解構賦值:將node的屬性給予 與{}內對應的名稱
      let { categoryname, category1id, category2id, category3id } = node.dataset
      //如果標籤有categoryName則為a標籤,可以進行路由跳轉
      if (categoryname) {
        //準備路由跳轉的參數對象
        let loction = { name: "search" }

        //準備路由跳轉的參數對象
        let query = { categoryName: categoryname }
        //將query添加屬性
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          loction.query = query
          loction.params = this.$route.params
        }
        //路由跳轉
        this.$router.push(loction)
      }
    },
    removeList() {
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    showList() {
      this.show = true
    }

  }
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 74px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .item:hover {
          background: skyblue;
        }

      }
    }

    //過渡動畫的樣式
    //過渡動畫開始狀態（進入）
    .sort-enter {
      height: 0px;
    }

    // 過渡動畫結束狀態（進入）
    .sort-enter-to {
      height: 461px;
    }

    // 定義動畫時間、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>



