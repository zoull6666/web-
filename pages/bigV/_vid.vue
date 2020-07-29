<template>
    <div class="bigV">
        <div v-if='!bigVinfo' class='ttc'>暂无用户信息</div>
        <div v-if='bigVinfo'>
             <nav  alt='大v主页'>
                <!--<span @click='$router.push({name:"index"})'>首页/</span><span @click='$router.push({name:"question"})'>高手问答/</span><span>大v主页</span>-->
               <span @click='$router.push({name:"index"})'>首页/</span><span>大v主页</span>
             </nav>
            <div  class='bigv_info'>
                <div class="img">
                    <div class='img_box'>
                        <img :src="bigVinfo.avatar" alt="">
                    </div>

                    <div class='V_bg'></div>
                </div>

                <div class='info'>
                    <p class='name'>{{bigVinfo.nickName}}</p>
                    <p class='introduction'>
                        {{bigVinfo.signature}}
                    </p>
                    <p class='fan'>
                        热度：{{fansNumber}}
                    </p>
                </div>
            </div>
            <div class='bigv_social'>
                <div class='tabs'>
                    <span @click='isShowFriendSocial = true' :class='{"selected":isShowFriendSocial}' class='friend'>动态({{friendCircle?friendNum:0}})</span>
                    <span @click='isShowFriendSocial = false' :class='{"selected":!isShowFriendSocial}' class='publication'>长文({{hisPost?tzNum:0}})</span>
                </div>
                <div v-if='isShowFriendSocial && friendCircle'  class='friend_circle_box'>
                    <friend-circle  v-for='(o , index) in friendCircle.model' :friendCircle='o' :key='index' :isFriendCircle='true'  class='out_style' />
                    <div class="nonetip" v-if="isNone">暂无动态</div>
                </div>
                <div v-if='!isShowFriendSocial && hisPost' class='friend_circle_box'>
                    <friend-circle  v-for='(h , index) in hisPost.model' :friendCircle='h' :key='index+"h"' :isFriendCircle='false' class='out_style' />
                    <!-- <friend-circle class='out_style' /> -->
                    <div class="nonetip" v-if="isNonetz">暂无动态</div>
                </div>
            </div>
            <p @click='openDownloadCode' class="download_app">
              下载大牛市APP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看更多大神心得 >>
            </p>
            <down-load ref='download' />
        </div>
    </div>
</template>

<script>
import FriendCircle from '~/components/FriendCircle'
import center from '../../plugins/center.js'

export default {
    name: 'bingV',
    components: {
        FriendCircle
    },
    data: function() {
        return {
            isShowFriendSocial: true,
            friendCircle:null,
            hisPost:null,
            bigVinfo:null,
            fansNumber:0,
            isNone: false,
            isNonetz:false,
            tzNum: 0,
            friendNum: 0
        }
    },
    created(){
        this.getFriendCircle(this.$route.params.vid)
        this.getBigVinfo(this.$route.params.vid)
        this.getFansNumber(this.$route.params.vid)
        this.getHisPost(this.$route.params.vid)

    },
    watch:{
        isShowFriendSocial(newV){
            if(!newV && !this.hisPost){
                this.getHisPost(this.$route.params.vid)
            }
        }
    },
    methods: {
         openDownloadCode(){
            this.$refs['download'].open()
            _czc.push(["_trackEvent",'桌面官网','下载','大v主页下载']);
        },
        getFansNumber(id){
            this.$post('/msg/forum/manager/queryIsAttention',{
              remindUserId: id
            }).then(res =>{
                this.fansNumber = res.model.fansNumber
                 console.log(res,'热度数量')
            }).catch(err =>{

                // console.log(err, '错误')
            })
        },
        getBigVinfo(id){
            this.$post('/app/login/queryUser',{
                id: id
            }).then(res =>{
                this.bigVinfo = res.model
                console.log(res,'用户的信息')
            }).catch(err =>{

                // console.log(err, '错误')
            })
        },
        getHisPost(id){ //获取他的帖子
            this.$post('/msg/community/manager/queryCircleMessage',{
                pageSize: 10,
                pageNum: 1,
                friendCircleType:1,
                userId: id,
//                circleType:3
            }).then(res =>{
                this.hisPost = res
                console.log(res,'他的帖子')
                this.tzNum = res.query.total
                if (res.model.length == 0) {
                    this.isNonetz = true
                } else {
                    this.isNonetz = false
                }
            }).catch(err =>{

                // console.log(err, '错误')
            })
        },
        getFriendCircle(id){ //获取朋友圈
            this.$post('/msg/community/manager/queryFriendMessage',{
                pageSize: 10,
                pageNum: 1,
                friendCircleType:3,
                userId: id,
                circleType:3
            }).then(res =>{
                this.friendCircle = res
                console.log(res,'朋友圈')
                this.friendNum = res.query.total
                if (res.model.length == 0) {
                  this.isNone = true
                } else {
                  this.isNone = false
                }
            }).catch(err =>{

                // console.log(err, '错误')
            })
        },
        switchTab(){
            // console.log(formatDate,'时间函数')
        }
    },
    mounted () {
      center.$emit('tabChange',-1)
      // 去除general标签及标签内容
      var generalArr = document.getElementsByTagName('general')
      for (var i=0;i<generalArr.length;i++) {
        generalArr[i].remove()
      }
    }
}
</script>

<style lang="less" scoped>
@import "~assets/less/currency";
.bigV {
    padding-top: 60px;
    padding-bottom: 40px;
    width: 1200px;
    min-height: 1400px;
    margin: 0 auto;
    // min-height: calc(~"100% - 364px");
    .ttc{
        text-align: center;
    }
    nav {
        padding-top:59px;
        padding-bottom: 43px;
        font-size: 14px;
        letter-spacing: 0.8px;
        color: #999;
        span{
            cursor: pointer;
        }
    }
    .bigv_info {
        display: flex;
        justify-content: flex-start;
        padding:34px 45px 0 24px;
        height: 192px;
        background-color: #ffffff;
        .img_box{
             .wh(124px);
            .radius(50%);
            overflow: hidden;
        }
        .img {
             position: relative;
            .wh(124px);
            .radius(50%);
            img{
                width: 100%;
                height: 100%;
            }
            .V_bg{
                position: absolute;
                top: 0;
                left: 0;
                width: 124px;
                height: 124px;
                background: url('/img/V.png') no-repeat;
                background-size: 124px 124px;
                z-index:2;
            }
        }
        .info{
            width: 1007px;
            padding-left: 14px;
            .name {
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 0px;
                color: #333333;
            }
            .introduction {
                margin-top:19px;
                margin-bottom: 20px;
                height: 44px;
                font-size: 18px;
                color:#666;
            }
            .fan {
                width: 140px;
                height: 22px;
                .tcc(22px);
                font-size: 16px;
                background-color: rgba(235,66,66,.2);
                border-radius: 11px;
                color: #eb4242;
            }
        }
    }
    .nonetip{
    text-align: center;
    padding: 20px 0;
    color: #000;
    font-size: 20px;
    width: 100%;
  }
    .bigv_social {
        margin-top: 20px;
        background-color: #fff;
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
            .friend {
               padding:0 15px;
            }
            .publication {
                padding: 0 25px;
            }
            .selected {
                color:#fff;
                font-size: 16px;
                background-color: #334d71;
            }
        }
        .friend_circle_box {
            margin:30px 30px 30px 16px;
            .out_style{
                padding-bottom: 30px;
                margin-bottom: 30px;
                border-bottom: 1px solid #e5e5e5;
            }
            &.friend_circle_box .out_style:last-child{
                border-bottom: 0;
                padding-bottom: 0;
                margin-bottom: 0;
            }
        }
    }
    .download_app{
        cursor: pointer;
        height: 40px;
        .tcc(40px);
        font-size: 16px;
        letter-spacing: 1px;
        color: #ffffff;
        background-color: #eb4242;
        margin-top: 10px;
    }

}
</style>
