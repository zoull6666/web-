<template>
  <div class="lead">
    <div v-swiper:mySwiper="swiperOption" class="lead_swiper">
      <div class="swiper-wrapper">

        <div class="swiper-slide" v-for="(item, index) in bigVarr" :key="index" @click="tobigV(item.id)">
          <div class="head">
            <div class="head_main" :style="{backgroundImage:'url('+ item.avatar +')'}"></div>
            <img src="../../static/img/V.png"/>
          </div>
          <div class="name">{{item.nickName}}</div>
          <div class="content">{{item.signature}}</div>
          <div class="fans">热度：{{item.fansNumber}}</div>
        </div>

      </div>

      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
    <div class="gotop" @click="gotop()">
      <img src="../../static/img/ic_top.png" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import urlApi from "../../plugins/urlApi.js";
  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 6,
          spaceBetween: 30,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange() {
              // console.log('onSlideChangeEnd', this.activeIndex);
            }
          }
        },
        size: 200,
        num: 1,
        bigVarr: [],
        url: urlApi.testUrl
      }
    },
    created () {
        this.getlistData()
    },
    methods:{
      // 获取大v列表
      getlistData () {
          axios({
            method: 'post',
            url: this.url + '/msg/forum/manager/queryUser',
            data: {
               pageNum: this.num,
               pageSize: this.size
            }
          })
            .then((res)=>{
//              console.log(res.data.model)
              this.bigVarr = res.data.model
            })
      },
      // 去大V主页
      tobigV (id) {
          this.$router.push('/bigV/'+ id)
      },
      // 回到顶部
      gotop () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }

</script>

<style lang="less" scoped>
  @import "../../assets/less/currency";
  .lead{
    position: relative;
    width: 1200px;
    height: 100%;

    .lead_swiper {
      width: 1200px;
      height: 100%;

      .swiper-slide {
        height: 100%;
        width: 190px!important;
        margin-right: 12px!important;
        background-color: #FFF;
        position: relative;
        padding: 0 18px;
        padding-top: 20px;
        text-align: center;
        cursor: pointer;


        .head {
          width: 90px;
          height: 90px;
          /*padding: 5px;*/
          border-radius: 100px;
          margin: 0 auto;
          cursor: pointer;
          /*background-color: aqua;*/
          margin-bottom: 7px;
          position: relative;

          .head_main {
            .wh(100%);
            /*background-image: url(../../static/img/dog.jpg);*/
            background-size: cover;
            background-position: center;
            border-radius: 100px;
          }
          img{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
        }

        .name {
          font-size: 18px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          padding-bottom: 10px;
        }

        .content {
          position: relative;
          font-size: 12px;
          line-height: 18px;
          color: #333333;
          max-height: 72px;
          overflow: hidden;
          margin-bottom: 10px;

          // &::after {
          //   content: "...";
          //   position: absolute;
          //   bottom: 0;
          //   right: 0;
          //   padding-left: 40px;
          //   background: -webkit-linear-gradient(left, transparent, #fff 55%);
          //   background: -o-linear-gradient(right, transparent, #fff 55%);
          //   background: -moz-linear-gradient(right, transparent, #fff 55%);
          //   background: linear-gradient(to right, transparent, #fff 55%);
          // }
        }


        .fans {
          display: inline-block;
          padding: 0 10px;
          background-color: rgba(235, 66, 66, 0.2);
          border-radius: 100px;
          color: #eb4242;
          font-size: 12px;
        }
      }
    }
    .gotop{
      position: absolute;
      width: 64px;
      height: 64px;
      bottom: 0;
      right: -9%;
      background: #fff;
      line-height: 64px;
      text-align: center;
    }
    .gotop img{
      width: 36px;
      height: 21px;
      display: inline-block;
    }
  }

</style>


<style>
  .swiper-button-prev {
    width: 20px;
    height: 40px;
    background-image: url(../../static/img/ic_arrowL.png);
    left: 0;
    border-radius: 0 6px 6px 0;
  }

  .swiper-button-next {
    width: 20px;
    height: 40px;
    background-image: url(../../static/img/ic_arrowR.png);
    right: 0;
    border-radius: 6px 0 0 6px;
  }

</style>
