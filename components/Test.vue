<template>

  <div v-swiper:mySwiper="swiperOption" class="up_box_swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, index) in 10" :key="index">
        {{index}}
      </div>

    </div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  .test {
    width: 300px;
    background-color: aqua;
  }

</style>
