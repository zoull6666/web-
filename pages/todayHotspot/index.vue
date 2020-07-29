<template>
    <div class='event_drive'>
        <banner :bannerData='initBanner'></banner>
        <div class="content_box">
            <div class="content_card_box clearfix" v-if="todatHotData">
               <div v-if='todatHotData.length!=0' class='clearfix img_card_box'>
                   <img-card
                        v-for='(e , i) in todatHotData'
                        class='img_card_item'
                        @click.native='switchEevent(e.id,i)'
                        :cardData='{
                            title:e.categoryName,
                            starNum:e.importance,
                            img:e.categoryImg
                        }'/>
               </div>
               <div v-if='todatHotDetails && !isEmpty' class='details'>
                   <i class='arrow'></i>
                   <div v-for='(d , i) in todatHotDetails.detailList' :key='i+"d"'>
                       <div class="title" v-if="widthArr">
                           <p v-if="widthArr.length>0" :style="'width: '+ widthArr[i].offsetWidth+'px'" ></p>
                           <div ref="titleWidth">{{d.title}}</div>
                       </div>
                       <div class="content">
                           {{d.content}}
                       </div>
                   </div>
                   <div v-if='todatHotDetails.leaderStock'>
                       <div class="title-head">
                           <p></p>
                           <div>龙头股</div>
                       </div>
                       <div v-if='todatHotDetails.leaderStock.quotesDataJson' class='stock_box'>
                           <div class='stock_name'>
                               {{todatHotDetails.leaderStock.quotesDataJson.name}}
                           </div>
                           <span>({{todatHotDetails.leaderStock.quotesDataJson.code}})</span>
                           <span :class="{'green':todatHotDetails.leaderStock.quotesDataJson.changepercent<0,'red':todatHotDetails.leaderStock.quotesDataJson.changepercent>0}">{{todatHotDetails.leaderStock.quotesDataJson.trade}}</span>
                           <span :class="{'green':todatHotDetails.leaderStock.quotesDataJson.changepercent<0,'red':todatHotDetails.leaderStock.quotesDataJson.changepercent>0}">{{todatHotDetails.leaderStock.quotesDataJson.changepercent}}%</span>
                       </div>
                       <div v-if='todatHotDetails.leaderStock.length!=0' class="content">
                           <div v-for='h in todatHotDetails.leaderStock.detailList' class='stock_introduction'>
                               <span class='title'>{{h.title}}:</span>
                               {{h.content}}
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
var bannerImg = require('~/static/img/banner_rechao.png')
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
            todatHotData:[],
            todatHotDetails:{},
            id: '',
            isEmpty: false,
            widthArr: []
        }
    },
    created(){
        this.initBanner = {
            title: '今日热炒',
            text:'把握今日热点 · 机遇稍纵即逝',
            img:bannerImg,
            bgcolor:true
        }
        this.initCard = {
            title:'家电',
            starNum:4,
            img:bannerImg
        }
        this.getTodayHotspot()
        // this.getCategoryByIndustryIdForPC()
    },
    methods: {
       async switchEevent(id,index){
            await  this.getTodyHotListForCategory(id)
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
        getTodyHotListForCategory(id){
            this.id = id
            return new Promise((resolve,reject)=>{
                this.$post('/industry/manager/queryTodyHotInfoDetail',{
                    id: id || 11
                })
                .then(res =>{
//                    if(Array.isArray(res.model.detailList)){
//                        var arr =[]
//                    res.model.detailList.forEach(v =>{
//                        if(v.title == "炒作原因"){
//                            arr.push(v)
//                        }
//                    })
//                    res.model.detailList = arr
//                    }
                    this.todatHotDetails = res.model
                    if (res.model == null) {
                        this.isEmpty = true
                    } else {
                      this.isEmpty = false
                    }
                    resolve(res.model)
//                    console.log(res, '详情')
                })
                .catch(err=>{
                    reject(err)
                    // console.log(err, '详情错误')
                })
            })
        },
        getTodayHotspot(type){
            this.$post('/industry/manager/queryTodyHotListForCategory',{
                eventType: type || 1,
                pageNum: 1,
                pageSize: 5
            })
            .then(res=>{
                this.todatHotData = res.model
                if (res.model.length == 0) {
                  this.isEmpty = true
                } else {
                  this.isEmpty = false
                }
                if(res.model){
                    this.getTodyHotListForCategory(res.model[0].id)
                }
                console.log(res, '今日热炒')
            })
            .catch(err =>{
                // console.log(err, '今日热炒错误')
            })
        }
    },
    mounted () {
        var timer2 = setInterval(()=>{
               this.getTodyHotListForCategory(this.id)
            },3000)
      var timer = setTimeout( ()=>{
        this.widthArr = this.$refs.titleWidth
        clearTimeout(timer)
      },250)
    }
}
</script>

<style lang='less' scoped>
@import url('../../assets/less/index');
.event_drive{
    padding-top: 60px;
    .content_box {
        position: relative;
        width: 1200px;
        top:-82px;
        margin: 0 auto;
        min-height: 600px;
        .content_card_box {
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
            width: 1000px;
            height: 36px;
            font-size: 20px;
	          color: #333333;
            p{
                position:absolute;
                top:-8px;
                left: -8px;
                border:1px solid #ccc;
                /*width: 100%;*/
                height: 36px;
                z-index: 2;
            }
            div{
                .tcc(36px);
                position:absolute;
                z-index: 10;
                padding: 0 10px;
                height: 36px;
                background-color: #ccc;


            }
        }
        .title-head{
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
            position:absolute;
            z-index: 10;
            width:100%;
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
            .red {
              color: #eb4242;
            }

            .green {
              color: #2abd6e;
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
