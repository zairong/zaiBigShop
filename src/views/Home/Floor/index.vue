<template>
  <div class="outer">
    <!--樓層-->
    <div class="floor">
      <div class="py-container">
        <div class="title clearfix">
          <h3 class="fl">{{ list.name }}</h3>
          <div class="fr">
            <ul class="nav-tabs clearfix">
              <li class="active" v-for="(nav, index) in list.navList" :key="index">
                <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="floor-buttom">
          <div class="blockgary">
            <ul class="jd-list">
              <li v-for="(keyword, index) in list.keywords" :key="index">{{ keyword }}</li>
            </ul>
            <img :src="list.imgUrl" />
          </div>
          <div class="floorBanner">
            <Carousel :list="list.carouselList"/>
          </div>
          <div class="split">
            <span class="floor-x-line"></span>
            <div class="floor-conver-pit">
              <img :src="list.recommendList[0]" />
            </div>
            <div class="floor-conver-pit">
              <img :src="list.recommendList[1]" />
            </div>
          </div>
          <div class="split center">
            <img :src="list.bigImg" />
          </div>
          <div class="split">
            <span class="floor-x-line"></span>
            <div class="floor-conver-pit">
              <img :src="list.recommendList[2]" />
            </div>
            <div class="floor-conver-pit">
              <img :src="list.recommendList[3]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  props: ['list'],
 
}
</script>

<style lang="less" scoped>
.outer {
  width: 1200px;
  height: 420px;
  margin: 40px auto 10px auto ;

  .floor {
    .py-container {
      height: 60px;

      .title {
        display: flex;
        height: 60px;
        text-align: center;
        align-items: center;
        padding: 0 15px;
        justify-content: space-between;
        color: rgb(210, 72, 72);
        border: rgb(198, 198, 198) solid 1px;


        .fl {
          font-size: 20px;
          width: 100px;
        }

        .fr {
          .nav-tabs {
            width: 1000px;
            display: flex;
            justify-content: flex-end;
            font-size: 16px;

            li {
              margin-left: 10px;
            }
          }
        }
      }

      .floor-buttom {
        border: rgb(198, 198, 198) solid 1px;
        border-top: none;

        display: flex;

        .blockgary {
          .jd-list {
            display: flex;
            flex-wrap: wrap;
            width: 187px;
            text-align: center;
            align-items: center;
            border: rgb(198, 198, 198) solid 0.5px;
            height: 131px;

            li {
              font-size: 12px;
              padding: 10px;
              width: 70px;
            }
          }

          img {
            border: rgb(198, 198, 198) solid 0.5px;
            border-top: none;
            border-bottom: none;
          }
        }

        .floorBanner {
          width: 330px;
          height: 360px;

          .swiper-container {
            .swiper-wrapper {
              .swiper-slide {
                img {
                  width: 100%;
                  border: rgb(198, 198, 198) solid 0.5px;
                }
              }
            }
          }
        }

        .split {
          .floor-conver-pit {
            img {
              border-top: rgb(198, 198, 198) solid 0.5px;
              border-bottom: none;

            }
          }
        }

        .center {

          img {
            border: rgb(198, 198, 198) solid 2px;
            border-bottom: none;

          }
        }
      }
    }
  }
}
</style>