<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for=" (img, index) in skuImageList" :key="img.id">

        <!-- 添加偽類(active)  -->
        <img :src="img.imgUrl" :class="{ active: currentIndex == index }" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      //默認初始index值 = 0
      currentIndex: 0
    }
  },
  watch: {
    skuImageList() {
      // 當DOM更新後再執行
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 3, // 顯示幾個圖片
          slidesPerGroup: 1, // 每一次切换圖片的張數
        })
      })
    },
  },
  methods: {
    // 點哪張圖亮哪張 & 當點擊圖片時，把圖片當前的索引值傳過去
    //然後進行兄弟組件間通信(全局事件總線)
    changeCurrentIndex(index) {
      this.currentIndex = index
      // console.log(this.currentIndex)
      //傳給zoom組件
      this.$bus.$emit('getCurrentIndex',this.currentIndex)
    }
  },

}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>