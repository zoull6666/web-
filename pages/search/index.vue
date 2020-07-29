<template>
    <div class='search_page'>
        <p class='result_info'>找到关于<span class='key'>“{{keyword}}”</span>的<span class='count'>{{sumNum}}</span>条结果</p>
        <div class='tabs'>
            <span @click='selectTab(1)' :class='{"selected":tabState === 1}' class='tabs_item'>资讯({{newsNum}})</span>
            <span @click='selectTab(2)' :class='{"selected":tabState === 2}' class='tabs_item'>视频({{videNum}})</span>
            <!-- <span @click='selectTab(3)' :class='{"selected":tabState === 3}' class='tabs_item'>问答(131)</span> -->
        </div>
        <div class='tab_item_conent'>
            <!-- 咨询 -->
            <div v-if='tabState === 1' class='tab1'>
                <p v-if='newsList.length==0' class='nomsg'>暂无信息</p>
                <div @click="goToNewsPage(n.id)" v-for='(n , i) in newsList' :key='n.id' class='conent_item'>
                    <div class='conent_left' v-if="n.imgPath">
                        <img :src="n.imgPath" alt="">
                    </div>
                    <div class='conent_right'>
                        <div v-html="n.title" class='title' style="-webkit-box-orient: vertical;"></div>
                        <span>{{n.newsSource}}  {{n.createDate | formatDate}}</span>
                    </div>
                </div>
            </div>
            <!-- 视频 -->
            <div v-if='tabState === 2' class='tab2'>
                <p v-if='videoList.length==0' class='nomsg'>暂无信息</p>
                <div @click='geToVideoPage(v.id)' v-for='(v , i) in videoList' :key='v.id' class='conent_item'>
                    <div class='conent_left'>
                        <!-- <img src="/img/zhangting_bg.png" alt=""> -->
                        <video :poster='v.imgPath'>
                            <source :src="v.videoPath"  type='video/mp4;'></source>
                        </video>
                    </div>
                    <div class='conent_right'>
                        <div v-html="v.title" class='title'  style="-webkit-box-orient: vertical;"> </div>
                        <span>{{v.videoSource}} {{Number(v.createDate) | formatDate}}</span>
                    </div>
                </div>
            </div>
           <!-- 问答 -->
            <!-- <div v-if='tabState === 3' class="tab3">
                <div class='problem'>
                    <div class='problem_left'>
                        <div class='title'>问：<span>乐视网老师，明天大盘会回调吗？估计要跌几天啊？</span></div>
                        <span class='time'>2019-02-21 13:44</span>
                    </div>
                    <div class='problem_right'>
                        <div>已解决</div>
                    </div>
                </div>
            </div> -->
          <div @click='openDownloadCode' class="downapp">下载大牛市APP  查看更多资讯 >></div>
        </div>
        <down-load ref='download'></down-load>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: 'searchPage',
    data: function() {
        return {
            tabState:1,
            newsList:[],
            videoList:[],
            sumNum:0,
            videNum:0,
            newsNum:0,
            keyword:'',
        }
    },
    created(){
        this.getNewsList(this.$route.query.keyword)
    },
    methods: {
        openDownloadCode(){
          this.$refs['download'].open()
        },
        geToVideoPage(id){
             this.$router.push({
                name:'video-id',
                params:{
                    id
                }
            })
        },
        goToNewsPage(id){
            this.$router.push({
                name:'information-id',
                params:{
                    id
                }
            })
        },
        getNewsList(keyword = this.$route.query.keyword){
            this.newsList = []
//            console.log(111)
            this.keyword = keyword
            this.$post('/info/message/vagueQuery',{
                title:keyword
            }).then(res =>{
                this.newsList = this.filterData(res.model,keyword)
                // console.log(this.newsList,'调用了')
                this.getVideoList(keyword)

                // console.log(res , '模糊搜索')
            }).catch(err =>{
                // console.log(err , '模糊搜索错误')
            })
        },
        getVideoList(keyword){
            this.$post('/video/search',{
                keyword: keyword ,
//                startPosition:1,
                pageNum: 1,
                pageSize:6
            }).then(res =>{
                this.videoList = this.filterData(res.model,keyword)
                this.videNum = this.videoList.length
                this.newsNum = this.newsList.length
                this.sumNum = this.newsNum + this.videNum
                // console.log(res , '模糊搜索视频')
            }).catch(err =>{
                // console.log(err , '模糊搜索视频错误')
            })
        },
        filterData(arr,key){
            arr = JSON.parse(JSON.stringify(arr))
            let reg = new RegExp(key,'g')
             arr.forEach(v => {
                v.title = v.title.replace(reg, `<span style="color:#eb4242;">${key}</span>`)
             })
             return arr
            // // console.log(arr.title)
        },
        selectTab(state){
            this.tabState = state
        }
    },
    filters:{
        formatDate(time){
            let currentTime = new Date().getTime()
            if(currentTime - time <= (60 * 60 * 1000)){
                let s = Math.ceil((currentTime - time) / 1000 / 60)
                return `${s}分钟之前`
            }else{
                return dayjs(time).format('YYYY-MM-DD HH:mm')

            }

        }
    }
}
</script>

<style lang='less' scoped>
@import url('~assets/less/currency');
.search_page {
    .banxin();
    min-height: 1100px;

    .result_info{
        padding-top: 50px;
        padding-bottom: 30px;
        font-size: 16px;
        letter-spacing: 1px;
        color: #333333;
        .key {
            font-size: 18px;
            padding:0 8px;
        }
        .count {
            color: #eb4242;
        }
    }
    .tabs {
        height: 40px;
        background-color: #40597a;
        span{
            cursor: pointer;
            .tcc(40px);
            display: inline-block;
            font-size: 14px;
            color: rgba(255,255,255,.2);
            height: 40px;
        }
        .tabs_item {
            padding:0 15px;
        }
        .selected {
            color:#fff;
            font-size: 16px;
            background-color: #334d71;
        }
    }
    .nomsg{
        text-align: center;
        font-size:16px;
        padding-bottom: 20px;
    }
    .tab_item_conent{
        margin-bottom: 24px;
        padding:30px 33px 0 23px;
        background-color: #fff;
            .conent_item {
                display: flex;
                justify-content: flex-start;
                /*height: 94px;*/
                margin-bottom: 13px;
                padding-bottom: 20px;
                border-bottom: 1px solid #ccc;
                cursor: pointer;
                .conent_left{
                    position: relative;
                    width: 164px;
                    height: 92px;
                    img{
                        // .zoom_img() //等比例缩放
                        width: 100%;
                        height: 100%;
                    }
                    video{
                        width: 100%;
                        height: 100%;
                    }
                }
                .conent_right{
                    padding-top:11px;
                    padding-left: 17px;
                    .title{
                        font-size: 20px;
                        letter-spacing: 1.6px;
                        color: #333333;
                        height: 58px;
                        line-height: 29px;
                        display: block;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    span{
                        font-size: 14px;
                        letter-spacing: 1.1px;
                        color: #999999;
                    }
                }

            }
            .downapp {
              width: calc(~"100% + 32px");
              height: 40px;
              background: #eb4242;
              text-align: center;
              line-height: 40px;
              font-size: 16px;
              color: #ffffff;
              margin-left: -16px;
            }
        }
        .problem{
            height: 50px;
            padding-top: 8px;
            border-bottom:1px solid #aaa;
            display: flex;
            justify-content: space-between;
            .problem_left{
                width: 1000px;
                .title{
                    font-size: 14px;
                    letter-spacing: 0.8px;
                    color: #333333;

                }
                .time{
                    font-size: 12px;
                    color: #999999;
                }
            }
            .problem_right{
                    padding-top:7px;

                div{
                    .tcc(20px);
                    width: 50px;
                    height: 20px;
                    border-radius: 4px;
                    border: solid 1px #999999;
                    font-size: 12px;
                    letter-spacing: 0.7px;
                    color: #999999;
                }
            }
        }
}
</style>
