<template>
    <div class="latent_future">
        <banner :bannerData='initBanner'>
            <div slot='label' class='label_box'>
                <div class="label_item" @click='$router.push({name:"eventDrive",query:{eventType:1}})'>
                    事件驱动
                </div>
                <div class="label_item " @click='$router.push({name:"eventDrive",query:{eventType:3}})'>
                    涨价驱动
                </div>
                <div class="label_item" @click='$router.push({name:"eventDrive",query:{eventType:2}})'>
                    行业变革
                </div>
                <div class="label_item" @click='$router.push({name:"eventDrive",query:{eventType:4}})'>
                    趋势为王
                </div>
             </div>
        </banner>
        <div v-if='eventDriveData.length!=0' class="content_box">
            <div class="content_card_item" v-for='(e , i ) in eventDriveData' :key='e.id'>
                <div class='title'>
                    <span class='label_name'>{{e.eventName}}</span>
                    <div class='link'>
                        进入<span @click='$router.push({name:"eventDrive",query:{eventType:e.eventType}})'>{{e.eventName}}</span>>>
                    </div>
                </div>
                <div class='content' v-for='h in e.hideStockList'>
                    <div class="content_head">
                        <div class='label'>{{e.categoryName}}</div>
                        <div class='star'>
                            重要性: <star :starNum='e.importance' />
                        </div>
                    </div>
                    <div v-if='h.quotesDataJson' class='stock_box'>
                        <div class='stock_name'>
                            {{h.quotesDataJson.name}}
                        </div>
                        <span class='code'>({{h.quotesDataJson.code}})</span>
                        <span class='span'  :class="{'green':h.quotesDataJson.changepercent<0,'red':h.quotesDataJson.changepercent>0}">{{h.quotesDataJson.settlement}}</span>
                        <span class='span' :class="{'green':h.quotesDataJson.changepercent<0,'red':h.quotesDataJson.changepercent>0}">{{h.quotesDataJson.changepercent}}%</span>
                    </div>
                    <div v-if='h.detail' class='text_box'>
                        <span class='text_title'>{{h.detail.title}}:</span>
                        {{h.detail.content}}
                    </div>
                    <div v-if="e.categoryNameList.length!=0" class='more'>
                        更多题材:&nbsp;&nbsp;
                        <span v-for='(c , ix ) in e.categoryNameList'>
                            {{c}}<b v-show='ix != (e.categoryNameList.length-1)'>、</b>
                        </span>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import Banner from '~/components/Banner'
import Star from '~/components/Star'
import center from '../../plugins/center.js'

var bannerImg = require('~/static/img/banner_qianfu.png')
export default {
    name: 'latentFuture',
    components:{
        Banner,
        Star
    },
    data: function() {
        return {
            initBanner:{},
            eventDriveData:[]
        }
    },
    created(){
         this.initBanner = {
            title:  '潜伏未来',
            text:'',
            img:bannerImg
        }
        this.getLatentFuture()
    },
    methods: {
        getLatentFuture(type){
            this.$post('/industry/manager/queryFutureFirstCategory')
            .then(res=>{
                this.eventDriveData = res.model
                // console.log(res,'潜伏未来')
            })
            .catch(err=>{
                // console.log(err, '潜伏未来错误')
            })
        }
    },
    mounted () {
      center.$emit('tabChange',-1)
    }
}
</script>

<style lang='less' scoped>
@import url('~assets/less/index');
.latent_future{
    padding-top: 60px;
    .content_box {
        width: 1200px;
        margin: 0 auto;
        padding-top: 40px;
        min-height: 900px;
        .content_card_item {
            float: left;
            width: 590px;
            height: 374px;
            margin-right: 20px;
            margin-bottom: 20px;
            background-color: #fff;
           .title{
               display: flex;
               justify-content: space-between;
               padding:0 16px;
               height: 40px;
               background-color: #40597a;
               color: #ffffff;
               line-height: 40px;
               .label_name{
                   font-size: 16px;
               }
               .link{
                   cursor: pointer;
                   font-size: 12px;
                   span{
                       color:#eb4242;
                   }
               }
           }
           .content{
               padding:0 20px;
               .content_head{
                   height: 104px;
                   display:flex;
                   justify-content: space-between;
                   align-items: center;
                   border-bottom: 1px solid rgba(235,66,66,.6);
                   .label{
                       height: 44px;
                       padding: 0 11px;
                       background-color: #e5e5e5;
                       font-size: 24px;
                       color: #eb4242;
                       .tcc(44px)
                   }
                   .star{
                       font-size: 16px;
                       color:#333;
                   }
               }
               .stock_box{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 77px;
                    .stock_name{
                        font-size: 17px;
                        color: #333;
                        padding-right: 3px;
                    }
                    .code{
                        padding-right: 20px;
                    }
                    .span{
                        padding-right: 20px;
                        /*color:#eb4242;*/
                    }
                   .red {
                     color: #eb4242;
                   }

                   .green {
                     color: #2abd6e;
                   }
                }
                .text_box{
                    max-height: 86px;
                    overflow: hidden;
                    .textHide(4);
                    color: #333333;
                    font-size:16px;
                    .text_title{
                        font-weight: bold;
                    }
                }
                .more{
                    margin-top: 29px;
                    font-size: 16px;
                    color: #333;
                    span{
                        cursor: pointer;
                        font-weight: bold;
                    }
                }
           }
        }
        &.content_box .content_card_item:nth-child(2n){
            margin-right: 0;
        }
    }
     .label_box{
        width: 540px;
        margin:  57px auto 0 auto;
        display: flex;
        justify-content: space-around;
        .label_item{
            cursor: pointer;
            width: 120px;
            height: 36px;
            font-size: 20px;
            color: #00214d;
            background-color:rgba(255,255,255,.6);
            .tcc(36px)
        }
        .selected{
            background-color:rgba(255,255,255,.9);
        }
    }
}
</style>
