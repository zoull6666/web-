<template>
  <div  class="plate_box">
    <div :class='{"more_after":!isMore}' class="plate_title ">
      {{title}}
      <div class='grasp' v-if="isMore">
         解读
      </div>
    </div>
    <div v-if='data' class="plate_main">
      <div v-swiper:mySwiper="swiperOption" class="plate_swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(d, index) in data" :key="index">
            <div class="plate_main_item" v-for="(a , i) in d" :key="i+'plate'">
              <span>{{a.quotesDataJson.name}}</span>
              <span :class="{'green': a.quotesDataJson.changepercent<0,'red':a.quotesDataJson.changepercent>0}">{{a.quotesDataJson.trade}}</span>
              <span :class="{'green':a.quotesDataJson.changepercent<0,'red':a.quotesDataJson.changepercent>0}">{{a.quotesDataJson.changepercent}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot name='three'></slot>
  </div>
</template>

<script>
  export default {
    props:{
      title:{
        default:''
      },
      isMore:{
        default:true
      },
      data:Array
    },
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          loop: false,
          slidesPerView: '1',
          centeredSlides: true,
          spaceBetween: 30,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
//          on: {
//            slideChange() {
//               console.log('onSlideChangeEnd', this);
//            },
//            tap() {
//              // // console.log('onTap', this);
//            }
//          }
        }
      }
    },
    mounted () {
    }
  }

</script>


<style lang="less" scoped>
  .plate_box {
    width: 220px;
    height: calc(~'50% - 8px');
    background: #fff;
    float: left;

    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 16px;
    }
    &:nth-child(1){
      height: 100%;
    }
    &:nth-child(3){
      display: none;
    }
    &:nth-child(1),
    &:nth-child(3) {
      margin-right: 12px;
    }

    .grasp{
      display: inline-block;
      width: 36px;
      height:18px;
      background-color: #308ef2;
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
      line-height: 20px;
      text-align: center;

    }

    .plate_title {
      height: 40px;
      background-color: #40597a;
      line-height: 40px;
      padding: 0 16px;
      color: #fff;
      font-weight: bold;
      position: relative;

      &:after {
        content: '更多 >>';
        display: block;
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
      }

    }
    .more_after{
      &:after{
        content:' ' ;
      }
    }


    .plate_main {
      width: 100%;
      height: calc(~'100% - 40px');
      padding: 0 16px;
      overflow: hidden;

      .plate_swiper {
        width: 100%;
        height: 100%;
      }

      .plate_main_item {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e5e5e5;
        color: #333333;
        font-size: 13px;
        display: flex;
        cursor: pointer;

        span {
          flex: 1;
        }

        .red {
          color: #eb4242;
        }

        .green {
          color: #2abd6e;
        }

        &:nth-child(6) {
          border: none;
        }
      }
    }
  }

</style>
