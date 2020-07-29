<template>
  <div class="index">
    <div class="banner">
      <!--<a href="http://akmt.jinanzhonglu.com.cn/v/500" target="_blank"><img src="../static/img/banner_AIcaopan.png" alt=""></a>-->
      <img src="../static/img/newBanner.jpg" alt="">
    </div>
    <div class="main model">
      <div @click='$router.push({name:"todayHotspot"})' class="today_box">
        <img src="../static/img/rechao_bg.png"/>
        <h3>今日热炒</h3>
      </div>
      <div class="four_box">
        <div @click='$router.push({name:"eventDrive",query:{eventType:1}})' class="four_box_item">
          <img src="../static/img/shijian_bg.png"/>
          <h3>事件驱动</h3>
          <h4>潜伏未来</h4>
        </div>
        <div @click='$router.push({name:"eventDrive",query:{eventType:3}})' class="four_box_item">
          <img src="../static/img/zhangjia_bg.png"/>
          <h3>涨价驱动</h3>
          <h4>潜伏未来</h4>
        </div>
        <div @click='$router.push({name:"eventDrive",query:{eventType:2}})' class="four_box_item">
          <img src="../static/img/hangye_bg.png"/>
          <h3>行业变革</h3>
          <h4>潜伏未来</h4>
        </div>
        <div @click='$router.push({name:"eventDrive",query:{eventType:4}})' class="four_box_item">
          <img src="../static/img/qushi_bg.png"/>
          <h3>趋势为王</h3>
          <h4>潜伏未来</h4>
        </div>
      </div>
      <!-- @click="$router.push({name:'riseStopRelay'})" -->
      <div @click="$router.push({name:'riseStopRelay'})" class="up_box">
        <h3>涨停接力</h3>
        <div v-swiper:mySwiper="swiperOption" class="up_box_swiper">
          <div v-if='riseStopRelayData'  class="swiper-wrapper">
            <div class="swiper-slide" v-for="(r, index) in riseStopRelayData" :key="index">
              <div class="top">
                <div class="title top_item">
                  {{r.quotesDataJson.name}} ({{r.quotesDataJson.code}})</div>
                <div :class="{'code_green':r.quotesDataJson.changepercent<0,'red':r.quotesDataJson.changepercent>0}" class="top_item">{{r.quotesDataJson.trade}}</div>
                <div :class="{'code_green':r.quotesDataJson.changepercent<0,'red':r.quotesDataJson.changepercent>0}" class="top_item">{{r.quotesDataJson.changepercent}}%</div>
                <div class="star top_item">连板可能性: <star :starNum="~~r.importance"></star> </div>
              </div>
              <div v-if='r.detailList' class="content" style="-webkit-box-orient: vertical;">
                {{r.detailList[0].title}}：
                {{r.detailList[0].content}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main information">
      <com-infonav></com-infonav>
      <com-information></com-information>
      <div class="plate">
        <com-plate :title='"沪深板指"' :isMore='false' >
          <div slot='three' class="plate_main">
            <div v-if='plateData1' class="plate_swiper">
                <div v-for='(p,i) in plateData1' class="plate_main_item" :key='i+"zhishu"' >
                  <span>{{p.name}}</span>
                  <span :class="{'green': p.changepercent<0,'red':p.changepercent>0}">{{p.trade}}</span>
                  <span :class="{'green':p.changepercent<0,'red':p.changepercent>0}">{{p.changepercent}}%</span>
                </div>
                <div class="plate_main_item" v-for="(item,index) in codeinfoData" :key="index">
                  <span>{{item.name}}</span>
                  <span :class="{'green': item.changepercent<0,'red':item.changepercent>0}">{{item.trade}}</span>
                  <span :class="{'green':item.changepercent<0,'red':item.changepercent>0}">{{item.changepercent}}%</span>
                </div>
            </div>
          </div>
        </com-plate>
        <com-plate @click.native='$router.push({name:"todayHotspot"})' :title='"今日热炒"' :data='plateData2'></com-plate>
        <com-plate @click.native='$router.push({name:"latentFuture",query:{eventType:1}})' :title='"潜伏未来"' :data='plateData3'></com-plate>
        <com-plate @click.native="$router.push({name:'riseStopRelay'})" :title='"涨停接力"' :data='plateData4'></com-plate>
      </div>
    <!-- ss -->
    </div>
    <div class="main radio">
      <!--<com-audio></com-audio>-->
      <!--<com-questions></com-questions>-->
      <com-group></com-group>
    </div>
    <div class="main video">
       <com-videonav></com-videonav>
      <com-video></com-video>
    </div>
    <div class="main lead">
      <com-lead></com-lead>
    </div>
    <div class="flex_box">
      <img src="../static/img/title_bg.png"/>
      <!--<div class="img"></div>-->
      <div class="title">牛市直播间<img src="../static/img/arrow_down.png" class="arrow"/></div>
      <div class="flex_box_qr" style="display:none"><a href="http://kqwv.hftqjx.cn/v/800da" target="_blank"></a></div>
      <div class="flex_box_qr" @click="zbAct()"><a href="http://sung.bam6r5.cn/v/800aa" target="_blank"></a></div>
      <!--<div class="flex_box_qr">-->
        <!--<a href="http://akmt.jinanzhonglu.com.cn/v/500" target="_blank"></a>-->
        <!--<img src="../static/img/title_bg.png"/>-->
        <!--<div class="title">AI操盘手直播<img src="../static/img/arrow_down.png" class="arrow"/></div>-->
      <!--</div>-->
    </div>
    <div class="stock">
        <div class="stockImg"></div>
        <div class="stockTitle">
          <span>模拟炒股</span>
          <img src="../static/img/arrow_down.png"></img>
        </div>
        <div class="stockContent">
          <div class="img-logo"></div>
          <a href="http://sim.jiangjuncj.com" target="_blank"> <p @click="intoAct()">立即进入</p></a>
        </div>
    </div>
    <canvas class="bigcanvas" v-if="bigShow"></canvas>
    <div class="masker" v-show="isShow"></div>
    <div class="masker" v-show="isShowRight" @click="toClose()"></div>
  </div>
</template>

<script>
  import Star from '~/components/Star'
  import Lead from '~/components/index/Lead'
//  import Audio from '~/components/index/Audio'
  import Questions from '~/components/index/Questions'
  import infoNav from '~/components/index/infoNav'
  import videoNav from '~/components/index/videoNav'
  import Information from '~/components/index/Information'
  import Plate from '~/components/index/Plate'
  import Video from '~/components/index/Video'
  import Group from '~/components/index/hotGroup'
  import axios from 'axios'
  import urlApi from '@/plugins/urlApi.js'
  import center from '@/plugins/center.js'
  import QRCode from 'qrcode'
  import {
    post
  } from '~/plugins/request'
  export default {
    components: {
      'com-lead': Lead,
//      'com-audio': Audio,
      'com-questions': Questions,
       'com-infonav': infoNav,
      'com-videonav': videoNav,
      'com-information': Information,
      'com-plate': Plate,
      'com-video': Video,
      'com-group': Group,
      Star
    },
    data() {
      return {
        isShow: false,
        banners: 5,
        upStopPageNum:2,
        swiperOption: {
          // effect: 'slide',
          direction: 'vertical',
          loop: false,
          slidesPerView: '1',
          centeredSlides: true,
          spaceBetween: 30,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          on: {
            slideChange() {
              // console.log('onSlideChangeEnd', this);
            },
            tap() {
               console.log('onTap', this);
            },
          }
        },
        riseStopRelayData:[],
        plateData1:[],
        plateData2:[],
        plateData3:[],
        plateData4:[],
        codeinfoData: [],
        isShowRight: false,
        bigShow: false,
        url: 'https://apps.jiangjuncj.com',
        codeUrl: urlApi.codeUrl,
      }
    },
    created(){
          this.getLimitUpListForCategory()
          this.getTodyHotListForCategory()
          this.getLatentFuture()
          this.getStockExponent(['sz399001','sh000001','sz399006'])
//          this.$nextTick(()=>{
//            this.mySwiper.on('reachEnd',()=>{ //涨停接力滚动
//              this.getLimitUpListForCategory(this.upStopPageNum,4,2)
//            })
//          })
          this.getcodeInfo()
    },
    methods:{
      // 点击模拟炒股的统计
      intoAct () {
        _czc.push(["_trackEvent",'桌面官网','点击','模拟炒股']);
      },
      // 点击直播的事件统计
      zbAct () {
        _czc.push(["_trackEvent",'桌面官网','点击','直播']);
      },
      toClose () {
        this.isShowRight = false
        center.$emit('close')
      },
      initData(data){
        let arr =[]
          for(let i=0;i<data.length;i+=3){
            arr.push(data.slice(i,i+3))
          }
          return arr
      },
      async getStockExponent(arr){
        this.plateData1 = []
        for(let i = 0;i<arr.length;i++){
           await this.$post(`${this.codeUrl}/stock/exponent/query`,{
              zscode:arr[i]
            })
            .then(res=>{
              this.plateData1.push(res.model)
//               console.log(res,'三大扳指')
            })
        }
//        console.log(this.plateData1)
      },
      // 获取三大扳指下面显示的四个数据
      getcodeInfo (pageNum = 1,pageSize = 9) {
          this.$post(`${this.codeUrl}/stock/exponent/queryAll`,{
              pageNum,
              pageSize
          })
            .then ( (res)=>{
//              console.log(res.model.splice(4,6))
              this.codeinfoData = res.model.splice(3,6)
            })
      },
      getLatentFuture(pageNum = 1, pageSize=9){ // 潜伏未来
          this.$post('/industry/manager/queryStockQuotesDataForPC',{
              dataType: 1,
              pageNum,
              pageSize
          })
          .then(res=>{
             let arr = []
              res.model.forEach(d =>{
                arr.push({quotesDataJson:d})
              })
              this.plateData3 = this.initData(arr)
//               console.log(arr,'潜伏未来')
          })
          .catch(err=>{
              // console.log(err, '潜伏未来错误')
          })
      },
      getTodyHotListForCategory(pageNum = 1, pageSize=9){ // 今日热炒
      // /industry/manager/queryTodyHotListForCategory
        this.$post('/industry/manager/queryStockQuotesDataForPC',{
                dataType:0,
                pageNum,
                pageSize
            })
            .then(res=>{
              let arr = []
              res.model.forEach(d =>{
                arr.push({quotesDataJson:d})
              })
                this.plateData2 = this.initData(arr)
                // let arr = null
                // res.model.forEach(v =>{
                //   if(v.hideStockList){
                //   arr =  v.hideStockList.map(h=>{
                //       return {
                //        quotesDataJson: h.quotesDataJson
                //       }
                //     })
                //   }
                // })
//                 console.log(this.plateData2,'今日热炒')
            })

      },
      getLimitUpListForCategory(pageNum = 1, pageSize=9,state=1){// 涨停接力
        this.$post('/industry/manager/queryLimitUpListForCategory',{
                pageNum,
                pageSize
            })
            .then(res=>{
              if(state===1){
                 this.riseStopRelayData = res.model.slice(0,4)
                 this.plateData4 = this.initData(res.model)
              }
              if(state==2){
                 this.upStopPageNum++
                 if(res.model.length==0){
                   this.swiperOption.loop = true
                 }
                 res.model.forEach(r=>{
                    this.riseStopRelayData.push(r)
                 })
              }
//                console.log(this.riseStopRelayData,'涨停接力')
            })
        },
    },
    mounted () {
        center.$on('isMask',(data)=>{
            this.isShow = data
        })
        center.$on('isMaskright',(data)=>{
          this.isShowRight = data.isShow
          this.bigShow = data.isShow
          var timer = setTimeout(()=>{
            Timeout(timer)
            data.chatId=`${this.url}/discuss.html`+"?chatId="+data.chatId;
            var canvas = document.getElementsByClassName('bigcanvas')[0]
            QRCode.toCanvas(canvas, data.chatId, function (error) {
              if (error) console.error(error)
//              console.log('success!');
            })
          },300)
        })
        center.$on('close',()=>{
          this.bigShow = false
        })
        center.$emit('tabChange',0)
        var timerA = setInterval(()=>{
          this.getLimitUpListForCategory()
          this.getTodyHotListForCategory()
          this.getLatentFuture()
          this.getcodeInfo()
          this.getStockExponent(['sz399001','sh000001','sz399006'])
        },6000)
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/currency";

  .index {
    .wh(100%);
    min-width: 1200px;
    padding-top: 60px;
    position: relative;

    .main {
      width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    .code_green{
      color: #2abd6e !important;
    }

    .banner {
      .w100();
      height: 200px;
      background-size: cover;
      margin-bottom: 40px;
      background-color: #00143c;

      img {
        display: block;
        width: 1200px;
        .h100();
        margin: 0 auto;
        background-color: #252525;
      }
    }

    .model {
      height: 280px;
      margin-bottom: 40px;

      .today_box {
        width: 300px;
        .h100();
        background-image: url(../static/img/rechao_bg.png);
        background-size: 100% 100%;
        background-position: center;
        .transition(background, 1s);
        float: left;
        position: relative;
        overflow: hidden;
        img{
          cursor: pointer;
          transition: all 0.6s;
        }
        img:hover{
          transform: scale(1.4);
        }
        h3 {
          position: absolute;
          font-size: 28px;
          color: #ffffff;
          font-weight: bolder;
          bottom: 40px;
          left: 30px;
        }
      }



      .four_box {
        width: 300px;
        .h100();
        background-color: #565656;
        float: left;

        .four_box_item {
          float: left;
          width: 50%;
          height: 50%;
          /*background-image: url(../static/img/dog.jpg);*/
          background-size: 100% 100%;
          background-position: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          /*padding-top: 50px;*/

          h3 {
            font-size: 18px;
            color: #ffffff;
            position: absolute;
            left: 30px;
            top: 60px;
          }

          h4 {
            font-size: 14px;
            color: #ffffff;
            font-weight: normal;
            position: absolute;
            left: 30px;
            top: 90px;
          }

          &:nth-child(1) {
            /*background-image: url(../static/img/shijian_bg.png);*/
          }

          &:nth-child(2) {
            /*background-image: url(../static/img/zhangjia_bg.png);*/
          }

          &:nth-child(3) {
            /*background-image: url(../static/img/hangye_bg.png);*/
          }

          &:nth-child(4) {
            /*background-image: url(../static/img/qushi_bg.png);*/
          }
          img{
            cursor: pointer;
            transition: all 0.6s;
          }
          img:hover{
            transform: scale(1.4);
          }
        }
      }

      .up_box {
        width: 600px;
        .h100();
        float: left;
        background-image: url(../static/img/zhangting_bg.png);
        background-size: 100% 100%;
        background-position: center;
        .transition(background, 1s);
        position: relative;

        h3 {
          font-size: 28px;
          color: #ffffff;
          position: absolute;
          top: 31px;
          right: 39px;
        }

        .up_box_swiper {
          .w100();
          height: 100px;
          position: absolute;
          bottom: 0;
          padding: 0 20px;

          .top {
            .w100();
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color: #ffffff;

            .top_item {
              float: left;
              padding-right: 15px;
            }

            .title {
              font-size: 18px;
              color: #ffffff;
            }

            .red {
              color: #eb4242;
            }

            .star {
              padding-left: 20px;
            }
          }

          .content {
            /*padding-top: 10px;*/
            font-size: 12px;
            color: #fff;
            word-wrap:break-word;
            word-break:break-all;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            overflow: hidden;
            height: 60px;
            line-height: 20px;
            text-overflow: ellipsis;
            width: 100%;
          }
        }
      }

      .today_box:hover,
      .up_box:hover,
      .four_box_item:hover {
        background-size: 120% 120%;
        background-position: center;
      }
    }

    .information {
      height: 390px;
      margin-bottom: 40px;
      display: flex;

      .plate {
        width: 452px;
        height: 100%;
      }
    }

    .radio {
      height: 156px;
      margin-bottom: 40px;
    }

    .video {
      height: 402px;
      margin-bottom: 40px;
    }

    .lead {
      height: 265px;
      margin-bottom: 40px;
    }
    @media screen and(max-width: 2580px){
      .flex_box {
        position: fixed;
        background-color: #002c66;
        width: 186px;
        right: 8px;
        bottom: calc(50% - 116px);
        z-index: 100;
        padding: 65px 0 20px 0;
        border-radius: 16px;

        .title {
          font-size: 22px;
          color: #ffffff;
          text-align: center;
          position: absolute;
          top: 26px;
          left: 36px;
        }
        img{
          width: 208px;
          position: absolute;
          top: 18px;
          left: -13px;
        }
        .arrow{
          width: 11px;
          position: absolute;
          top: 9px;
          left: 115px;
        }
        .flex_box_qr {
          width: 140px;
          height: 112px;
          background-color: #ffffff;
          margin: 0 auto;
          background-image: url(../static/img/xzapp.png);
          /*background-image: url(../static/img/xzapp.png);*/
          /*background-size: 100% 100%;*/
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          margin-top: 35px;
          position: relative;

          &::before {
            content: '扫码下载';
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            position: absolute;
            top: -40px;
            width: 100%;
          }
          a{
            width: 100%;
            height: 100%;
            display: block;
          }
          &:nth-child(5) {
            background-image: url(../static/img/AIcaopan_1920.png);
            margin-top: 124px;
            position: relative;
            &::before {
              content: '【AI智能操盘】';
              font-size: 18px;
            }
            img{
              position: absolute;
              left: -36px;
              top: -90px;
            }
            .title{
              position: absolute;
              left: -3px;
              top: -84px;
            }
            .arrow{
              width: 11px;
              position: absolute;
              top: 10px;
              left: 136px;
            }
          }
          &:nth-child(4) {
            background-image: url(../static/img/dayingjia_1920.png);
            height: 92px;
            margin-top: 55px;
            &::before {
              content: '【大赢家直播】';
              font-size: 18px;
            }
          }

          &:nth-child(3) {
            background-image: url(../static/img/jgt02.png);
            /*margin-top: 84px;*/
            /*position: relative;*/
            height: 92px;
            margin-top: 55px;
            &::before {
              content: '【牛散大学直播】';
              font-size: 15px;
            }
          }
        }
      }
      .stock{
        position: fixed;
        background-color: #002c66;
        width: 258px;
        left: 8px;
        bottom: calc(50% - 135px);
        z-index: 100;
        height: 270px;
        border-radius: 16px;
        .stockContent{
          width: 214px;
          height: 156px;
          background-color: #001939;
          border-radius: 12px;
          margin: 0 auto;
          margin-top: 92px;
          text-align: center;
          overflow: hidden;
          .img-logo{
            margin-top: 30px;
            background-image: url("../static/img/stock/ic_logo_w.png");
            width: 135px;
            height: 38px;
            background-repeat: no-repeat;
            background-size: cover;
            display: inline-block;
          }
          p{
            margin-top: 30px;
            width: 170px;
            height: 40px;
            background-color: #40597a;
            border-radius: 20px;
            display: inline-block;
            font-size: 20px;
            line-height: 40px;
            color: #fff;
            cursor: pointer;
          }
        }
        .stockImg{
          position: absolute;
          top: 20px;
          left: -8px;
          width: 280px;
          height: 45px;
          background-image: url("../static/img/stock/title_bg_right.png");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .stockTitle{
          position: absolute;
          top: 24px;
          left: 80px;
          span{
            font-size: 22px;
            color: #fff;
          }
        }
      }
    }
    @media screen and(max-width: 1900px){
      .flex_box {
        position: fixed;
        background-color: #002c66;
        width: 132px;
        right: 6px;
        bottom: calc(50% - 95px);
        z-index: 100;
        padding: 48px 0 20px 0;
        border-radius: 10px;

        .title {
          font-size: 16px;
          color: #ffffff;
          text-align: center;
          position: absolute;
          top: 21px;
          left: 25px;
        }
        img{
          width: 148px;
          position: absolute;
          top: 18px;
          left: -10px;
        }
        .arrow{
          width: 11px;
          position: absolute;
          top: 9px;
          left: 85px;
        }
        .flex_box_qr {
          width: 100px;
          height: 80px;
          background-color: #ffffff;
          margin: 0 auto;
          background-image: url(../static/img/xzapp.png);
          /*background-image: url(../static/img/xzapp.png);*/
          /*background-size: 100% 100%;*/
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          margin-top: 35px;
          position: relative;

          &::before {
            content: '扫码下载';
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            position: absolute;
            top: -35px;
            width: 100%;
          }
          a{
            width: 100%;
            height: 100%;
            display: block;
          }
          &:nth-child(5) {
            background-image: url(../static/img/AIcaopan.png);
            margin-top: 94px;
            position: relative;
            &::before {
              content: '【AI智能操盘】';
              font-size: 14px;
            }
            img{
              position: absolute;
              left: -26px;
              top: -66px;
            }
            .title{
              position: absolute;
              left: -2px;
              top: -62px;
            }
            .arrow{
              width: 11px;
              position: absolute;
              top: 7px;
              left: 101px;
            }
          }
          &:nth-child(4) {
            background-image: url(../static/img/dayingjia.png);
            height: 66px;
            &::before {
              content: '【大赢家直播】';
              font-size: 14px;
            }
          }

          &:nth-child(3) {
            background-image: url(../static/img/jgt01.png);
            /*margin-top: 84px;*/
            /*position: relative;*/
            height: 66px;
            &::before {
              content: '【牛散大学直播】';
              font-size: 12px;
            }
          }
        }
      }
      .stock{
        position: fixed;
        background-color: #002c66;
        width: 136px;
        left: 8px;
        bottom: calc(50% - 90px);
        z-index: 100;
        height: 180px;
        border-radius: 16px;
        .stockContent{
          width: 120px;
          height: 80px;
          background-color: #001939;
          border-radius: 12px;
          margin: 0 auto;
          margin-top: 82px;
          text-align: center;
          overflow: hidden;
          .img-logo{
            margin-top: 10px;
            background-image: url("../static/img/stock/ic_logo_w.png");
            width: 80px;
            height: 22px;
            background-repeat: no-repeat;
            background-size: cover;
            display: inline-block;
          }
          p{
            margin-top: 10px;
            width: 90px;
            height: 20px;
            background-color: #40597a;
            border-radius: 20px;
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            color: #fff;
            cursor: pointer;
          }
        }
        .stockImg{
          position: absolute;
          top: 30px;
          left: -8px;
          width: 158px;
          height: 40px;
          background-image: url("../static/img/stock/newLeft.png");
          background-repeat: no-repeat;
          background-size: cover;
          /*background-position: center;*/
        }
        .stockTitle{
          position: absolute;
          top: 35px;
          left: 35px;
          span{
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
    .masker{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9;
    }
    .bigcanvas{
      position: fixed;
      width: 300px!important;
      height: auto!important;
      left: calc(50% - 150px);
      top: calc(50% - 150px);
      z-index: 10;
    }
  }

</style>

<style>
  body {
    /*width: calc(100% + 20px)*/
    width: 100%;
  }

</style>
