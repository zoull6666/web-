<template>
    <div class="rise_stop_relay">
         <banner :bannerData='initBanner'></banner>
        <div class="content_box">
            <div class="content_card_box ">
                <div class='box clearfix' v-if='riseStopRelayData.length!=0'>
                    <stock-card v-for='(r, index) in riseStopRelayData' :key='index.id' :cradData='r' class="stock_card "/>
                </div>
                <div class="empty" v-if="isEmpty">暂无内容</div>
                <p @click='openDownloadCode' class="download_app">
                    下载大牛市APP 提前把握涨停股 >>
                </p>
            </div>
        </div>
        <down-load ref='download'></down-load>
    </div>
</template>

<script>
import StockCard from '~/components/StockCard'
import Banner from '~/components/Banner'
import center from '../../plugins/center.js'

var bannerImg = require('~/static/img/banner_zhangting.png')
export default {
    name: 'riseStopRelay',
    components: {
        StockCard,
        Banner
    },
    data() {
        return {
            riseStopRelayData:[],
            initBanner:{},
            isEmpty: false
        }
    },
    created(){
        this.initBanner = {
            title: '涨停接力',
            text:'涨停不止一刻 · 接力永攀高峰',
            img:bannerImg
        }
        // // console.log(this.$post,'1233')
       this.getLimitUpListForCategory()
    },
    methods: {
        openDownloadCode(){
            this.$refs['download'].open()
        },
        getLimitUpListForCategory(pageNum = 1, pageSize=6){
            this.$post('/industry/manager/queryLimitUpListForCategory',{
                pageNum,
                pageSize
            }).then(res=>{
                this.riseStopRelayData = res.model
                if (res.model.length == 0) {
                  this.isEmpty = true
                } else {
                  this.isEmpty = false
                }
//                console.log(res,'涨停接力')
            })
        }
    },
    mounted () {
      center.$emit('tabChange',-1)
      var timer = setInterval(()=>{
        this.getLimitUpListForCategory(1, 6)
      },3000)
    }
}
</script>

<style lang="less" scoped>
@import url('~assets/less/index');
.rise_stop_relay {
    padding-top: 60px;
    padding-bottom: 0;
    .content_box {
        position: relative;
        top:-82px;
        width: 1200px;
        margin: 0 auto;
        min-height: 354px;
        .content_card_box {
            width: 100%;
            .stock_card{
                float: left;
                margin-right: 17px;
                margin-bottom: 18px;
            }
            &.content_card_box .stock_card:nth-child(3n){
                 margin-right: 0px;
            }
            .box{
                width: 100%;
            }
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
}
</style>
