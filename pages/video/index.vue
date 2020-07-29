<template>
      <div class="video">
          <h5>首页/视频</h5>
          <h3>最新视频</h3>
          <div class="new-video">
            <div class="video-left">
              <router-link :to="'/video/'+bigId" target="_blank"><div class="video" :style="{backgroundImage: 'url('+ bigUrl +')'}"></div></router-link>
              <router-link :to="'/video/'+bigId" target="_blank"><div class="big_play"></div></router-link>
              <h4>{{bigTitle}}</h4>
           </div>
            <div class="video-right">
              <div class="new-item" v-for="(item,index) in videoArr" :key="index">
                <router-link :to="'/video/'+item.id" target="_blank"><div class="smallVideo" :style="{backgroundImage: 'url('+ item.imgPath +')'}"></div></router-link>
                <router-link :to="'/video/'+bigId" target="_blank"><div class="play"></div></router-link>
                <h4>{{item.title}}</h4>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="nav">
              <ul>
                <li v-for="(item,index) in navList" :class="{active: navIndex == index ? true : false}" @click="navChange(index,item.id)" v-show="item.id != 84">{{item.name}}</li>
              </ul>
              <span @click='openDownloadCode'>下载App查看更多>> </span>
            </div>
            <div class="content-b">
                <div class="video-item" v-for="(item,index) in itemArr">
                  <router-link :to="'/video/'+item.id" target="_blank"><div class="video_b" :style="{backgroundImage: 'url('+ item.imgPath +')'}"></div></router-link>
                  <router-link :to="'/video/'+item.id" target="_blank"><div class="play_b"></div></router-link>
                  <h4>{{item.title}}</h4>
               </div>
            </div>
          </div>
          <down-load ref='download'></down-load>
      </div>
</template>

<script>
  import axios from 'axios'
  import center from '@/plugins/center.js'
  import urlApi from "@/plugins/urlApi.js"
  export default{
      data () {
          return{
             navList: [],
             navIndex: 0,
             num: 1,
             size: 5,
             url: urlApi.testUrl,
             videoArr: [],
             bigUrl: '',
             bigTitle: '',
             bigId: '',
             id: '',
             itemArr: [],
          }
      },
      created () {
          this.getvideoData()
          this.getvideoNav()
      },
      methods:{
        openDownloadCode(){
          this.$refs['download'].open()
        },
        // 获取最新5条数据
        getvideoData () {
          axios({
            method: 'post',
            url: `${this.url}/video/list`,
            data: {
              pageNum: this.num,
              pageSize: this.size
            }
          })
            .then((res)=>{
              this.bigUrl = res.data.model[0].imgPath
              this.bigTitle = res.data.model[0].title
              this.bigId = res.data.model[0].id
              this.videoArr = res.data.model
              this.videoArr.shift()
//              console.log(res)
            })
        },
        // 进入详情
//        todetail (id) {
//            this.$router.push('/video/'+id)
//        },
        // 获取视频nav
        getvideoNav () {
          axios({
            method: 'post',
            url:`${this.url}/info/category/queryAll`,
            data:{
              type:1
            }
          })
            .then((response)=>{
              console.log(response.data.model);
              this.id = response.data.model[0].id
              this.navChange(0,this.id)
//              response.data.model.pop()
              this.navList = response.data.model
            })
        },
        // 获取指定频道下的视频列表
        navChange (index,id) {
          this.navIndex = index
          this.id = id
          axios({
              method : 'post',
              url : `${this.url}/video/${this.id}/list`,
              data: {
                pageNum: 1,
                pageSize: 10
              }
          })
            .then( (res)=>{
              console.log(res)
              this.itemArr = res.data.model
            })
        }
      },
      mounted () {
        center.$emit('tabChange',-1)
      }
  }

</script>

<style scoped>
  .video{
    width: 1200px;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 60px;
  }
  .video h5{
    width: 70px;
    height: 14px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #999999;
    margin-top: 60px;
  }
  .video h3{
    margin-top: 30px;
    width: 1200px;
    height: 40px;
    line-height: 40px;
    text-indent: 16px;
    background-color: #40597a;
    color: #ffffff;
    font-size: 16px;
  }
  .video .new-video{
    width: 1200px;
    height: 388px;
    margin-top: 12px;
    background: #fff;
  }
  .new-video .video-left{
    width: 600px;
    height: 388px;
    float: left;
    position: relative;
  }
  .video-left .video{
    width: 600px;
    height: 338px;
    background-size: cover;
    background-position: center;
  }
  .video .big_play {
    content: '';
    display: block;
    width: 60px;
    height: 60px;
    background-image: url(../../static/img/video_icon_play_60.png);
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -4em 0 0 -2.5em;
  }
  .video-left h4{
    color: #333;
    font-size: 16px;
    margin-top: 12px;
    text-indent: 16px;
  }
  .new-video .video-right{
    float: left;
    margin-left: 20px;
    width: 580px;
    height: 388px;
  }
  .video-right .new-item {
    width:280px;
    height: 188px;
    float: left;
    position: relative;
  }
  .new-item:nth-child(2n) {
    margin-left: 20px;
  }
  .video-right .new-item .smallVideo{
    width: 280px;
    height: 158px;
    background-size: cover;
    background-position: center;
  }
  .new-item .play{
    content: '';
    display: block;
    width: 60px;
    height: 60px;
    background-image: url(../../static/img/video_icon_play_60.png);
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -3em 0 0 -1.5em;
  }
  .video-right .new-item h4{
    width:280px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-indent: 10px;
    margin-top: 4px;
  }
  .content{
    margin: 0 auto;
    width: 1200px;
    overflow: hidden;
    margin-top: 40px;
  }
  .content .nav{
    width: 100%;
    /*height: 40px;*/
    overflow: hidden;
    background: #40597a;
  }
  .content .nav ul{
     float: left;
  }
  .content .nav ul li{
    padding: 12px 16px;
    font-size: 14px;
    color: #fff;
    float: left;
    cursor: pointer;
  }
  .content .nav ul li.active{
    background: #334d71;
  }
  .content .nav span{
    float: right;
    margin-right: 20px;
    margin-top: 14px;
    font-size: 12px;
    color: #fff;
  }
  .content-b {
    width: 100%;
    overflow: hidden;
    margin-top: 12px;
  }
  .content-b .video-item{
    width: 228px;
    height: 162px;
    float: left;
    margin-left: 15px;
    position: relative;
  }
  .video-item:nth-child(1){
     margin-left: 0;
   }
  .video-item:nth-child(6){
    margin-left: 0;
  }
  .content-b .video-item .video_b{
    width: 228px;
    height: 128px;
    background-size: cover;
    background-position: center;
  }
  .content-b .video-item .play_b{
    content: '';
    display: block;
    width: 60px;
    height: 60px;
    background-image: url(../../static/img/video_icon_play_60.png);
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -3em 0 0 -1.5em;
  }
  .content-b .video-item h4{
    width:100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-indent: 10px;
  }
</style>
