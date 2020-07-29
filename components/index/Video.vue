<template>
  <div class="video">
    <div class="video_title">
      视频
      <div class="after" @click="toIndex()">更多 >></div>
    </div>
    <div class="video_main">
      <div class="big_size">
        <router-link :to="'/video/'+id" target="_blank"><div class="big_size_bg" :style="{backgroundImage: 'url('+ bigUrl +')'}"></div></router-link>
        <div class="big_size_title">{{bigTitle}}</div>
      </div>
      <div class="small_box">
        <div class="small_size" v-for="(item,index) in videoArr" :key="index">
          <router-link :to="'/video/'+item.id" target="_blank"><div class="video_bg" :style="{backgroundImage: 'url('+ item.imgPath +')'}"></div></router-link>
          <div class="video_title">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import urlApi from "../../plugins/urlApi.js";
  import center from "../../plugins/center.js"
  export default{
      data () {
          return{
            url: urlApi.testUrl,
            num: 1,
            size: 5,
            videoArr: [],
            bigUrl: '',
            bigTitle: '',
            itemArr: [],
            id: '',
          }
      },
      created () {
//          this.getvideoData()
            this.getvideoAlldata()
      },
      methods:{
//          toVideo (id) {
//                this.$router.push('/video/'+ id)
//            },
//          toBigvideo () {
//            this.$router.push('/video/'+ this.id)
//          },
          // 去首页
          toIndex () {
            this.$router.push('/video')
          },
          // 获取视频前5条
          getvideoData () {
            axios({
              method: 'post',
              url:`${this.url}/info/category/queryAll`,
              data: {
                type: 1
              }
            })
              .then((res)=>{
                this.cateId = res.data.model[0].id
                this.getNavdata(this.cateId)
              })
          },
          // 获取全部的最新5条数据
          getvideoAlldata () {
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
                this.id = res.data.model[0].id
                this.videoArr = res.data.model
                this.videoArr.shift()
  //              console.log(res)
              })
          },
          // 获取指定频道下的视频列表
          getNavdata(id) {
            axios({
                method : 'post',
                url : `${this.url}/video/${id}/list`,
                data: {
                  pageNum: 1,
                  pageSize: 5
                }
              }
            )
              .then((res)=>{
                console.log(res.data.model)
                this.bigUrl = res.data.model[0].imgPath
                this.bigTitle = res.data.model[0].title
                this.id = res.data.model[0].id
                this.videoArr = res.data.model
                this.videoArr.shift()
              })
          }
      },
      mounted () {
         center.$on('navData',(data)=>{
             console.log(data)
             if(data.index>=0){
               this.getNavdata(data.id)
             } else {
                 this.getvideoAlldata()
             }
         })
      }
  }
</script>

<style lang="less" scoped>
  .video {
    width: 1038px;
    height: 100%;
    float: right;

    .video_title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 17px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      background-color: #40597a;
      margin-bottom: 12px;

      .after{
        display: block;
        position: absolute;
        right: 16px;
        top: 0;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
      }
    }

    .video_main {
      width: 100%;
      height: calc(~'100% - 52px');

      .big_size {
        width: 546px;
        height: 100%;
        padding-right: 12px;
        float: left;
        cursor: pointer;

        .big_size_bg {
          width: 100%;
          height: calc(~'100% - 50px');
          position: relative;
          /*background-image: url(../../static/img/dog.jpg);*/
          background-size: cover;
          background-position: center;

          &::after {
            content: '';
            display: block;
            width: 60px;
            height: 60px;
            background-image: url(../../static/img/video_icon_play_60.png);
            background-size: 100% 100%;
            position: absolute;
            left: calc(~'50% - 30px');
            top: calc(~'50% - 30px');
          }
        }

        .big_size_title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          background-color: #ffffff;
          padding: 0 16px;
        }
      }

      .small_box {
        width: 492px;
        height: 100%;
        float: right;

        .small_size {
          width: 240px;
          height: calc(~'50% - 6px');
          float: left;

          &:nth-child(1),
          &:nth-child(3) {
            margin-right: 12px;
          }

          &:nth-child(1),
          &:nth-child(2) {
            margin-bottom: 12px;
          }

          .video_bg {
            width: 100%;
            height: calc(~'100% - 34px');
            background-color: #333333;
            position: relative;
            background-image: url(../../static/img/dog.jpg);
            background-size: cover;
            background-position: center;

            &::after {
              content: '';
              display: block;
              width: 60px;
              height: 60px;
              background-image: url(../../static/img/video_icon_play_60.png);
              background-size: 100% 100%;
              position: absolute;
              left: calc(~'50% - 30px');
              top: calc(~'50% - 30px');
            }
          }

          .video_title {
            width: 100%;
            height: 34px;
            line-height: 34px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            color: #333;
            padding: 0 10px;
            background-color: #ffffff;
            font-weight: normal;
          }
        }
      }
    }
  }

</style>
