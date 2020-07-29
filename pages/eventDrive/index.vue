<template>
  <div class='event_drive'>
    <banner :bannerData='initBanner'></banner>
    <div class="content_box">
      <div class="content_card_box clearfix ">
        <div v-if='eventCategoryData.length!=0' class='clearfix img_card_box'>
          <img-card
            v-for='(e , i) in eventCategoryData'
            class='img_card_item'
            @click.native='switchEevent(e.id,i,e.eventType)'
            :cardData='{
                            title:e.categoryName,
                            starNum:e.importance,
                            img:e.categoryImg
                        }'/>
        </div>
        <div v-if='eventCategoryDetails && !isEmpty' class='details'>
          <i class='arrow'></i>
          <div v-if="type == 4">
            <div v-for='(d , i) in eventCategoryDetails.detailList' :key='i+"d"'>
              <div class="title" :title='d.title'>
                <p></p>
                <div>{{d.title}}</div>
              </div>
              <div class="content">
                {{d.content}}
              </div>
            </div>
            <div v-if='eventCategoryDetails.quotesDataJson'>
              <div class="title">
                <p></p>
                <div>相关个股</div>
                <!--<div v-if='$route.query.eventType!==4'>相关个股</div>-->
                <!--<div v-if='$route.query.eventType==4'>技术走势</div>-->
              </div>
              <div v-if='eventCategoryDetails.quotesDataJson' class='stock_box'>
                <div class='stock_name'>
                  {{eventCategoryDetails.quotesDataJson.name}}
                </div>
                <span>({{eventCategoryDetails.quotesDataJson.code}})</span>
                <span :class='{"red":eventCategoryDetails.quotesDataJson.changepercent>0,"green":eventCategoryDetails.quotesDataJson.changepercent<0}'>{{eventCategoryDetails.quotesDataJson.settlement}}</span>
                <span :class='{"red":eventCategoryDetails.quotesDataJson.changepercent>0,"green":eventCategoryDetails.quotesDataJson.changepercent<0}'>{{eventCategoryDetails.quotesDataJson.changepercent}}%</span>
              </div>
              <div v-if='eventCategoryDetails.subjectDto.detailList' class="content">
                <div class="title">
                  <p></p>
                  <div>技术走势</div>
                </div>
                <div v-for='h in eventCategoryDetails.subjectDto.detailList' class='stock_introduction'>
                  <span class='title'>{{h.title}}:</span>
                  {{h.content}}
                </div>
              </div>
            </div>
          </div>
          <div v-if="type != 4">
            <div v-for='(d , i) in eventCategoryDetails.detailList' :key='i+"d"'>
              <div class="title" :title='d.title'>
                <p></p>
                <div>{{d.title}}</div>
              </div>
              <div class="content">
                {{d.content}}
              </div>
            </div>
            <div v-if='eventCategoryDetails.hideStockList'>
              <div class="title">
                <p></p>
                <div>相关个股</div>
                <!--<div v-if='$route.query.eventType!==4'>相关个股</div>-->
                <!--<div v-if='$route.query.eventType==4'>技术走势</div>-->
              </div>
              <div v-if='eventCategoryDetails.hideStockList[0].quotesDataJson' class='stock_box'>
                <div class='stock_name'>
                  {{eventCategoryDetails.hideStockList[0].quotesDataJson.name}}
                </div>
                <span>({{eventCategoryDetails.hideStockList[0].quotesDataJson.code}})</span>
                <span :class='{"red":eventCategoryDetails.hideStockList[0].quotesDataJson.changepercent>0,"green":eventCategoryDetails.hideStockList[0].quotesDataJson.changepercent<0}'>{{eventCategoryDetails.hideStockList[0].quotesDataJson.trade}}</span>
                <span :class='{"red":eventCategoryDetails.hideStockList[0].quotesDataJson.changepercent>0,"green":eventCategoryDetails.hideStockList[0].quotesDataJson.changepercent<0}'>{{eventCategoryDetails.hideStockList[0].quotesDataJson.changepercent}}%</span>
              </div>
              <div v-if='eventCategoryDetails.hideStockList.length!=0' class="content">
                <div v-for='h in eventCategoryDetails.hideStockList[0].detailList' class='stock_introduction'>
                  <span class='title'>{{h.title}}:</span>
                  {{h.content}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="isEmpty">暂无内容</div>
        <p @click='openDownloadCode' class="download_app">
          下载大牛市APP 查看剩下50%内容 >>
        </p>
      </div>
    </div>
    <down-load ref='download'></down-load>
  </div>

</template>

<script>
  import Banner from '~/components/Banner'
  import ImgCard from '~/components/ImgCard'
  var bannerImg = require('~/static/img/banner_qianfu.png')
  export default {
    components:{
      Banner,
      ImgCard
    },
    name: 'eventDrive',
    data: function() {
      return {
        initBanner:{},
        initCard:{},
        eventCategoryData:[],
        eventCategoryDetails:{},
        type: 0,
        id: '',
        isEmpty: false
      }
    },
    created(){
      this.eventTypeData(this.$route.query.eventType)
      this.getEventDrive(this.$route.query.eventType)
      // this.getCategoryByIndustryIdForPC()
    },
    methods: {
      eventTypeData(type){
        switch(~~type){
          case 1:
            this.initBanner = {
              title:  '事件驱动',
              text:'关注最新事件 · 寻找潜力牛股',
              img:bannerImg
            }
            break
          case 3:
            this.initBanner = {
              title:  '涨价驱动',
              text:'股市风云之间 · 理性把握异动',
              img:bannerImg
            }
            break
          case 2:
            this.initBanner = {
              title:  '行业变革',
              text:'知悉行业变革 · 投资快人一步',
              img:bannerImg
            }
            break
          case 4:
            this.initBanner = {
              title:  '趋势为王',
              text:'看穿股票趋势 · 实现价值投资',
              img:bannerImg
            }
            break

        }
      },
      async switchEevent(id,index,type){
        if (type == 4) {
          this.type = 4
          await this.getTrendking(id)
        } else {
          this.type = type
          await this.getCategoryByIndustryIdForPC(id)
        }
        let arrow = document.querySelector('.arrow')
        switch(index){
          case 0:
            arrow.style.left = '102px'
            break;
          default:
            arrow.style.left = (index * 244 + 102)+ 'px'
        }
      },
      openDownloadCode(){
        this.$refs['download'].open()
      },
      getCategoryByIndustryIdForPC(id){
        this.id =id
        return new Promise((resolve,reject)=>{
          this.$post('/industry/manager/queryCategoryByIndustryIdForPC',{
            id: id
          })
            .then(res =>{
              this.eventCategoryDetails = res.model
//              this.eventCategoryDetails.detailList.forEach((item)=>{
//                  item.content = item.content.replace(/\n/g, '<br/>').replace(/<\/?.+?>/g,'')
//              })
              console.log(res.model)
              if (res.model == null) {
                this.isEmpty = true
              } else {
                this.isEmpty = false
              }
              resolve(res.model)
              console.log(res, '详情')
            })
            .catch(err=>{
              reject(err)
              // console.log(err, '详情错误')
            })
        })
      },
      getTrendking(id){
        this.id =id
        return new Promise((resolve,reject)=>{
          this.$post('/industry/manager/queryFutureInfoDetailForKingForPC',{
            id: id
          })
            .then(res =>{
              this.eventCategoryDetails = res.model
              if (res.model == null) {
                this.isEmpty = true
              } else {
                this.isEmpty = false
              }
              resolve(res.model)
//              console.log(res, '详情')
            })
            .catch(err=>{
              reject(err)
              // console.log(err, '详情错误')
            })
        })
      },
      getEventDrive(type=1){
        this.$post('/industry/manager/queryEventCategory',{
          eventType: type,
          pageNum: 1,
          pageSize: 5
        })
          .then(res=>{
            this.eventCategoryData = res.model
            console.log(res.model)
            if (res.model.length == 0) {
              this.isEmpty = true
            } else {
              this.isEmpty = false
            }
            if(res.model){
                if (type == 4) {
                  this.type = 4
                  this.getTrendking(res.model[0].id)
                } else {
                  this.type = type
                  this.getCategoryByIndustryIdForPC(res.model[0].id)
                }
            }
//            console.log(res, '事件驱动')
          })
          .catch(err =>{
            // console.log(err, '事件驱动错误')
          })
      }
    },
    mounted () {
//        setInterval(()=>{
//        this.getTrendking(this.id)
//        this.getCategoryByIndustryIdForPC(this.id)
//      },20000)
    }
  }
</script>

<style lang='less' scoped>
  @import url('~assets/less/index');
  .event_drive{
    padding-top: 60px;
    .content_box {
      position: relative;
      top: -82px;
      width: 1200px;
      margin: 0 auto;
      min-height: 600px;
      .content_card_box {
        /*position: absolute;*/
        /*top:-82px;*/
        width: 100%;
        overflow: hidden;

        .download_app{
          cursor: pointer;
          height: 40px;
          .tcc(40px);
          font-size: 16px;
          letter-spacing: 1px;
          color: #ffffff;
          background-color: #eb4242;
        }
        .empty{
          width: 100%;
          height: 550px;
          line-height: 550px;
          text-align: center;
          font-size: 20px;
        }
      }
    }
    .red{
      color:#eb4242;
    }
    .green{
      color: #2abd6e;
    }

    .img_card_item{
      float: left;
      margin-right: 20px;
      cursor: pointer;
    }

    .content_box .img_card_item:nth-child(5n){
      margin-right: 0px;
    }

    .details{
      position: relative;
      margin-top:20px;
      padding:38px 30px 29px 20px;
      background-color: #fff;
      border-top: 2px solid #eb4242;
      .arrow{
        position: absolute;
        top:-14px;
        left: 102px;
        width: 21px;
        height: 14px;
        background: url('/img/arrow.png') no-repeat;
      }
      .title{
        position: relative;
        width: 110px;
        height: 36px;
        font-size: 20px;
        color: #333333;
        p{
          position:absolute;
          top:-8px;
          left: -8px;
          border:1px solid #ccc;
          width: 100%;
          height: 36px;
          z-index: 2;
        }
        div{
          .tcc(36px);
          .lineHide();
          position:absolute;
          z-index: 10;
          width: 100%;
          height: 36px;
          background-color: #ccc;


        }
      }
      .content{
        padding-top:19px;
        padding-bottom: 39px;
        font-size: 16px;
        color:#333;
      }
      .stock_box{
        display: flex;
        padding-bottom: 18px;
        padding-top: 20px;
        justify-content: flex-start;
        border-bottom: 1px solid #e5e5e5;

        .stock_name{
          font-size: 17px;
          color: #333;
          padding-right: 3px;
        }
        span{
          padding-right: 20px;
          margin-top: 3px;
        }
      }
      .stock_introduction{
        padding-top:20px;
        font-size: 16px;
        color:#333;
        .title{
          color: #333;
          font-weight: bold;
        }
      }

    }
  }

</style>
