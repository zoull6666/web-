<template>
    <div class='trend_page'>
        <banner :bannerData='initBanner'></banner>
        <div class="content_box">
            <div class="content_card_box fix ">
               <div class='fix img_card_box'>
                   <img-card
                        v-for='(e , i) in eventCategoryData'
                        class='img_card_item'
                        @click.native='switchTrend(e.id,i)'
                        :cardData='{
                            title:e.categoryName,
                            starNum:e.importance,
                            img:e.categoryImg
                        }'/>
               </div>
               <div class='details'>
                   <i class='arrow'></i>
                   <div >
                       <div class="title">
                           <p></p>
                           <div>代表个股</div>
                       </div>
                       <div v-if='trendDetails' class='stock_box'>
                           <div class='stock_name'>
                               {{trendDetails.quotesDataJson.name}}
                           </div>
                           <span >({{trendDetails.quotesDataJson.code}})</span>
                           <span :class='{"red":trendDetails.quotesDataJson.changepercent>0,"green":trendDetails.quotesDataJson.changepercent<0}'>{{trendDetails.quotesDataJson.settlement}}</span>
                           <span :class='{"red":trendDetails.quotesDataJson.changepercent>0,"green":trendDetails.quotesDataJson.changepercent<0}'>{{trendDetails.quotesDataJson.changepercent}}%</span>
                           <span class='company_name'>| &nbsp;&nbsp;&nbsp;广州酒家</span>
                           <span class='company_name'>| &nbsp;&nbsp;&nbsp;荃银高科</span>
                           <span class='company_name'>| &nbsp;&nbsp;&nbsp;神思电子</span>
                       </div>
                   </div>
                   <div  class="related_stock">
                       <div class='clearfix'>
                           <div class='title'>
                                <p></p>
                                <div>相关个股</div>
                           </div>
                           <span class='href'>最新资金面、基本面分析>></span>
                       </div>
                       <div v-if='trendDetails' class="content">
                           <div v-for='(d , i) in trendDetails.subjectDto.detailList' class='stock_introduction'>
                               <span class='text_title'>{{d.title}}:</span>
                               {{d.content}}
                           </div>

                       </div>
                   </div>
               </div>
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
    name: 'trend_page',
    data: function() {
        return {
            eventCategoryData:[],
            trendDetails:null,
            initBanner:{},
            initCard:{},
        }
    },
    created(){
        this.initBanner = {
            title:  '趋势为王',
            text:'看穿股票趋势 · 实现价值投资',
            img:bannerImg
        }
        this.initCard = {
            title:'家电',
            starNum:4,
            img:bannerImg
        }
        this.getEventCategory()
        // this.getFutureInfoDetailForKing()
    },
    methods: {
        async switchTrend(id,index){
           await this.getFutureInfoDetailForKing(id)
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
        getFutureInfoDetailForKing(id){
            return new Promise((resolve,reject)=>{
                this.$post('/industry/manager/queryFutureInfoDetailForKingForPC',{
                    id: id || 11
                })
                .then(res=>{
                    this.trendDetails = res.model
                    resolve(res.model)
                    // console.log(res,'趋势为王类目')
                })
                .catch(err=>{
                     reject(err)
                    // console.log(err, '趋势为王类目错误')
                })
            })
        },
        getEventCategory(type){
            this.$post('/industry/manager/queryEventCategory',{
                eventType: type || 4,
                pageNum: 1,
                pageSize: 5
            })
            .then(res=>{
                this.eventCategoryData = res.model
                if(res.model){
                    this.getFutureInfoDetailForKing(res.model[0].id)
                }
                // console.log(res, '趋势为王')
            })
            .catch(err =>{
                // console.log(err, '趋势为王错误')
            })
        }
    }
}
</script>

<style lang='less' scoped>
@import url('~assets/less/index');
.trend_page{
    padding-top: 60px;
    .content_box {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        min-height: 1000px;
        .content_card_box {
            position: absolute;
            top:-82px;
            width: 100%;

            .download_app{
                cursor: pointer;
                height: 40px;
                .tcc(40px);
                font-size: 16px;
                letter-spacing: 1px;
	            color: #ffffff;
	            background-color: #eb4242;
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

            .stock_name{
                font-size: 17px;
                color: #333;
                padding-right: 3px;
            }
            span{
                padding-right: 20px;
                padding-top:2px;
            }
            .red {
              color: #eb4242;
            }

            .green {
              color: #2abd6e;
            }
            .company_name{
                color: #999;
            }
        }
        .stock_introduction{
            padding-top:20px;
            font-size: 16px;
            color:#333;
            .text_title{
                color: #333;
                font-weight: bold;
            }
        }
        .related_stock{
            margin-top: 25px;
            .title{
                float: left;
            }
            .href{
                float: right;
                cursor: pointer;
                font-size: 17px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #308ef2;
                line-height: 36px;
            }

        }

    }
}

</style>
