<template>
  <div class="page" id="detail">
    <div class="backcolor">
      <div class="main">
        <div class="topnav">
          <span>首页/</span><span>{{videoData.cateName}}</span>
        </div>
        <h2>{{videoData.title}}</h2>
        <div class="Introduction">
          <span>{{videoData.videoSource}}</span><span>{{videoData.createDate | formatDate}}</span>
        </div>
        <div class="video">
          <video :src="videoData.videoPath" controls :poster ="videoData.imgPath" style="width: 100%;" ref="video"></video>
          <div class="box1">
            <h5 style="margin-top: 100px">本视频已加密，请输入密码观看</h5>
            <div class="box-input">
              <input type="text" maxlength="1" ref="input1" class="input" @keyup="nextfocus(1)"/>
              <input type="text" maxlength="1" ref="input2" class="input" @keyup="nextfocus(2)"/>
              <input type="text" maxlength="1" ref="input3" class="input" @keyup="nextfocus(3)"/>
              <input type="text" maxlength="1" ref="input4" class="input"/>
            </div>
            <h5>添加官方客服微信jjcf-1领取密码限时体验Vip特权</h5>
          </div>
          <div class="boxmask1"></div>
          <div class="tipPwd1">密码错误</div>
        </div>
      </div>
    </div>
    <div class="comments">
      <h5>评论</h5>
      <div class="comments-item" v-for="(item,index) in commentArr">
        <img :src="item.userAvater? item.userAvater: defaultImg" class="img02"/>
        <div class="comments-right">
          <div class="comments-right-top">
            <h3>{{item.nickName}}</h3>
          </div>
          <h4>{{item.statement}}</h4>
          <h6>{{item.createTime | formatDate}}</h6>
          <p style="margin-bottom: 1rem;margin-top:.3rem;font-size: 0.36rem;color: #666666;text-align: left"  @click="viewAll()" v-if="item.childrensSum >= 1">查看全部{{item.childrensSum}}条回复</p>
        </div>
      </div>
      <p v-show="isCommentShow" class="noneShow">暂无评论</p>
      <div class="downApp" v-if="iscloseShow">
        <img src="/static/img/ic_close.png" class="close" @click="closeAct()"/>
        <h4>查看更多评论，请下载将军财经APP查看</h4>
        <div class="downApp-b">
          <div class="downApp-b-l" style="margin-left: 1.3rem">
            <img src="/static/img/androiddownload.png">
            <p>安卓下载</p>
          </div>
          <div class="downApp-b-l" >
            <img src="/static/img/iosdownload.png">
            <p>ios下载</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="ismaskShow"></div>
  </div>
</template>

<script>
  import axios from "axios"
  import {formatDate} from '@/plugins/time.js'
  import urlApi from "@/plugins/urlApi.js"
  export default{
    filters: {
      formatDate(time) {
        var date = new Date(Number(time));
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data () {
      return {
        commentArr: [],
        isCommentShow: false,
        id: this.$route.params.id,
        videoData: [],
        isCommentShow: false,
        cateId: '',
        name: '',
        url: urlApi.testUrl,
        codeUrl: urlApi.codeUrl,
        defaultImg: '/static/img/morentouxiang_64@2x.png', // 默认头像
        index: 0,
        iscloseShow: false,
        ismaskShow: false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        // 获取视频详情数据
        axios.post(`${this.url}/video/get/ /`+this.id)
          .then((response)=>{
            console.log(response.data.model);
            this.videoData = response.data.model
          })

        // 获取视频评论数据
        axios({
          method: 'post',
          url: `${this.url}/info/comment/show/`+ this.id +'/'+1,
          data:{
            "pageSize": 20,
            "pageNum": 1
          }
        })
          .then( (response)=>{
            this.commentArr = response.data.model
            if(this.commentArr == '' || this.commentArr == null) {
              this.isCommentShow = true
            } else {
              this.isCommentShow = false
            }
          })
          .catch( (error) => {
            console.log(error)
          })
      },
      viewAll () {
        this.iscloseShow = true
        this.ismaskShow = true
      },
      // 关闭弹窗
      closeAct () {
        this.iscloseShow = false
        this.ismaskShow = false
      },
      // 统计视频播放量
      getVideotimes (id,hasPwd,index) {
        var video=document.getElementsByClassName("video1")[index];
        var box1=document.getElementsByClassName("box1")[index];
        var boxmask1 = document.getElementsByClassName("boxmask1")[index];
        var tipPwd1 = document.getElementsByClassName("tipPwd1")[index];
        var inputKeyup1 = this.$refs.input1
        var inputKeyup2 = this.$refs.input2
        var inputKeyup3 = this.$refs.input3
        var inputKeyup4 = this.$refs.input4
        inputKeyup1.value = ''
        inputKeyup2.value = ''
        inputKeyup3.value = ''
        inputKeyup4.value = ''
        var inputn = document.getElementsByClassName('input')[0]
        var that = this
        if (hasPwd == 1) {
          video.pause();
          box1.style.display = 'block'
          boxmask1.style.display = 'block'
          inputKeyup4.addEventListener("keyup", function(event) {
            if (inputKeyup1.value && inputKeyup2.value && inputKeyup3.value && inputKeyup4.value) {
              axios({
                method: 'post',
                url: `${this.url}/video/checkVideoPwd`,
                data:{
                  videoId: id,
                  pwd: inputKeyup1.value + inputKeyup2.value + inputKeyup3.value + inputKeyup4.value
                }
              })
                .then((res)=>{
//                  console.log(res)
                  if (res.data.success) {
                    video.play();
                    that.flag = false
                    box1.style.display = 'none'
                    boxmask1.style.display = 'none'
                    that.videoNum ()
                  } else {
                    let timerA = setTimeout(()=>{
                      tipPwd1.style.display = 'block'
                      clearTimeout(timerA)
                    },2000)
                    let timerB = setTimeout(()=>{
                      tipPwd1.style.display = 'none'
                      inputKeyup1.value = ''
                      inputKeyup2.value = ''
                      inputKeyup3.value = ''
                      inputKeyup4.value = ''
                      inputn.focus()
                      clearTimeout(timerB)
                    },4000)
                  }
//                    setTimeout(()=>{

//                    },2000)
                })
            } else {

            }
          })
        } else {
          that.flag = false
          video.play();
          that.videoNum ()
        }
      },
      nextfocus (index) {
        var inputn = document.getElementsByClassName('input')[index]
        inputn.focus()
      },
      videoNum () {
        axios({
          method: 'post',
          url: `${this.url}/video/browse/`+this.id
        })
          .then ( (response)=>{
            this.videoData.browseNumber = response.data.model
          })
      },
    },
    mounted () {
      var video = this.$refs.video
      var that = this
      video.addEventListener('play',function () {
        if (that.flag) {
          that.getVideotimes(that.videoData.id,that.videoData.hasPwd,0)
        } else {
//          console.log('play')
        }
      })
      video.addEventListener('pause',function () {
        console.log('pause')
      })
    }
  }
</script>

<style scoped>
  #detail{
    width: 100%;
    overflow: hidden;
    padding-top: 60px;
  }
  .backcolor{
    width: 100%;
    background: #111;
    overflow: hidden;
  }
  .topnav{
    width: 100%;
    overflow: hidden;
    margin-top: 50px;
  }
  .topnav span{
    float: left;
    display: block;
    cursor: pointer;
  }
  .main{
    width: 1200px;
    margin: 0 auto;
  }
  .main h2{
    font-size: 30px;
    color: #fff;
    text-align: left;
    margin-top: 25px;
  }
  .main span{
    font-size: 16px;
    color: #fff;
    margin-right: 5px;
    text-align: left;
  }
  .Introduction{
    text-align: left;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .comments{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    margin-top: 50px;
  }
  .comments h5{
    height: 75px;
    width: 100%;
    color: #222;
    font-size: 18px;
    line-height: 100px;
    border-bottom: 2px solid #eee;
    /*text-indent: .4rem;*/
    text-align: left;
  }
  .comments .comments-item {
    /*width: 13.82rem;*/
    /*height: 6.56rem;*/
    margin: 15px auto;
    overflow: hidden;
  }
  .comments .comments-item .img02{
    float: left;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .comments .comments-item .comments-right{
    width: 95%;
    /*height: 100%;*/
    float: left;
    border-bottom: 2px solid #eee;
  }
  .comments-item .comments-right .comments-right-top{
    width: 100%;
  }
  .comments-right .comments-right-top{
    overflow: hidden;
  }
  .comments-right .comments-right-top h3{
    font-size: 16px;
    color: #409ad6;
    float: left;
    margin-top: 10px;
  }
  .comments-right h4{
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: left;
    word-wrap:break-word;
    word-break:break-all;
  }
  .comments-right h6{
    font-size: 9px;
    color: #999;
    margin-bottom: 10px;
    text-align: left;
  }
  .comments-right .list li.name{
    color: #409ad6;
  }
  .comments-right .list li{
    background: #f5f5f5;
    width: 100%;
    overflow: hidden;
    margin: 15px 0;
  }
  .comments-right span{
    font-size: 18px;
    color: #666666;
  }
  .noneShow{
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
    line-height: 150px;
  }
  /*/deep/ img{*/
  /*width: 100%;  */
  /*}*/
  .main-conten{
    font-size: 30px;
  }
  b,strong,h1,h2,h3,h4,h5,h6{ font-weight:800;}
  .comments .downApp{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 550px;
    height: 400px;
    background: #fff;
    z-index: 20;
    margin: -5em 0 0 -5em;
  }
  .close{
    position: absolute;
    right: 3%;
    top: 4%;
    width: 16px;
    height: 16px;
  }
  .comments .downApp h4{
    color: #333;
    font-size: 20px;
    margin: 60px auto;
  }
  .comments .downApp .downApp-b{
    width: 100%;
    overflow: hidden;
  }
  .comments .downApp .downApp-b .downApp-b-l{
    float: left;
    margin: 0 10px;
    width: 200px;
    overflow: hidden;
    /*height: 2rem;*/
  }
  .downApp .downApp-b .downApp-b-l img{
    width: 180px;
    height: 180px;
  }
  .downApp .downApp-b .downApp-b-l p{
    color: #333;
    font-size: 20px;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    left: 0;
    top: 0;
  }

  .video{
    width: 100%;
    position: relative;
  }
  .video video{
    width: 100%;
  /*height: 100%;*/
  }
  .video .box1{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 10%;
    display: none;
  }
  .video .box1 h5{
    font-size: .72rem;
    color: #fff;
    text-align: center;
  }
  .video .box1 .box-input{
    width: 100%;
    overflow: hidden;
    margin-top: 30px;
    text-align: center;
    z-index: 4;
  }
  .video .box-input .input{
    width: 100px;
    height: 100px;
    /*line-height: 2rem;*/
    border: 1px solid #ffffff;
    /*float: left;*/
    background: rgba(0,0,0,0.5);
    margin-left: 20px;
    color: #fff;
    font-size: 40px;
    text-align: center;
    display: inline-block;
    outline: none;
  }
  .video .box1 h5{
    font-size: 28px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
  .boxmask1{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    display: none;
  }
  .tipPwd1{
    position: absolute;
    left: 50%;
    top: 50%;
    color: #fff;
    width: 200px;
    height: 50px;
    z-index: 4;
    border-radius: 10px .10px;
    background: rgba(0,0,0,0.7);
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    margin: -1em 0 0 -3.5em;
    display: none;
  }


</style>
