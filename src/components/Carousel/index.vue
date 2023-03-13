<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分頁器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要導航按鈕 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  //成為全局組件並當成子組件使用,要用此組件可使用自定義屬性list挾帶相應的值
  props: ['list'],
  watch: {
    list: {
      // 監聽list
      immediate: true, // 立即監聽，不管你資料有沒有變化，立即上來監聽一次
      handler() {
        this.$nextTick(function () {
          new Swiper(this.$refs.cur, {
            loop: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
            },
            mousewheel: true,
            keyboard: true,
          })
        })
      },
    },
  },
}
</script>


