<template>
    <div class="group">
      <div class="title">
        热门群聊
        <div class="after" @click="toGroup()">更多 >></div>
      </div>
      <div class="content" v-for="(item,index) in groupData" :key="index">
        <div class="content-l">
          <img :src="item.FaceUrl"/>
          <div class="content-l-r">
            <h3>{{item.Name}}</h3>
            <div class="status"><span>群状态:</span><span class="color" v-if="item.MemberNum >= item.MaxMemberNum ">已满员</span><span class="color" v-if="item.MemberNum < item.MaxMemberNum ">可加入</span></div>
            <div class="status"><span>群成员:</span><span class="color">{{item.MemberNum}}/{{item.MaxMemberNum}}</span></div>
          </div>
        </div>
        <!--<div class="down">-->
          <!--<span>APP扫码加入</span>-->
          <!--<img src="../../static/img/arrow_right.png" />-->
        <!--</div>-->
        <div class="content-r" @click="tobig(item.GroupId)">
          <canvas class="canvas"></canvas>
          <p></p>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import QRCode from 'qrcode'
  import center from '../../plugins/center.js'
  import urlApi from "../../plugins/urlApi.js";
  export default{
     data () {
         return{
            groupData: [],
            url: 'https://apps.jiangjuncj.com',
            codeUrl: urlApi.codeUrl,
         }
     },
     methods:{
         toGroup () {
              this.$router.push('/group')
         },
         getData () {
            axios({
              method: 'post',
              url: `${this.codeUrl}/chat/chat/group/getAllGroup`,
              data:{
                  pageSize: 3,
                  pageNum: 1
              }
            })
              .then((res)=>{
                this.groupData = res.data.model.GroupInfo
//                console.log(res.data.model.GroupInfo,'群聊')
              })
         },
         useqrcode(chatId,index){
           //生成的二维码内容，可以添加变量
           chatId=`${this.url}/discuss.html`+"?chatId="+chatId;
           var canvas = document.getElementsByClassName('canvas')[index]
           console.log(chatId)
           QRCode.toCanvas(canvas, chatId, function (error) {
             if (error) console.error(error)
             console.log('success!');
           })
         },
         // 放大操作
         tobig (chatId) {
           center.$emit('isMaskright',{isShow:true,chatId: chatId})
         },
     },
    created () {
      this.getData()
    },
    components: {
      QRCode,
    },
    mounted () {
       var timer = setTimeout(()=>{
         this.groupData.forEach( (item,index)=>{
           this.useqrcode(item.GroupId,index)
         })
         clearTimeout(timer)
       },1000)
    }
  }
</script>

<style lang="less" scoped>
  .group {
    position: absolute;
    right: 0;
    top: 0;
    /*width: 450px;*/
    width: 100%;
    background-color: #ffffff;
    /*height: 100%;*/
    /*overflow: hidden;*/

    .title {
      width: 100%;
      height: 40px;
      background-color: #40597a;
      line-height: 40px;
      color: #ffffff;
      font-weight: bolder;
      padding: 0 18px;
      position: relative;

      .after {
        /*content: "更多>>";*/
        display: block;
        position: absolute;
        right: 16px;
        top: 0;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
      }
    }

    .content{
      width: 400px;
      /*margin: 0 auto;*/
      height: 116px;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      float: left;
      .content-l{
        float: left;
        width: 70%;
        img{
          width: 64px;
          height: 64px;
          float: left;
          border-radius: 50%;
          margin-top: 20px;
          margin-left: 22px;
          /*margin-left: 16px;*/
        }
        .content-l-r{
          float: left;
          margin-top: 20px;
          margin-left: 16px;
          /*width: 70%;*/
          overflow: hidden;
          h3{
            font-family: MicrosoftYaHei-Bold;
            font-size: 16px;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #333333;
            font-weight: bold;
          }
          .status{
            margin-top: 5px;
            span{
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #999999;
            }
            .color{
              color: #308ef2;
              margin-left: 10px;
            }
          }
        }
      }
      .down{
        position: absolute;
        right: 88px;
        bottom: 13px;
        span{
          font-size: 12px;
        }
      }
      .content-r{
        float: left;
        /*margin-right: 16px;*/
        margin-top: 16px;
        width: 94px;
        height: 94px;
        position: relative;
        .canvas{
          width: 100%!important;
          height: auto!important;
        }
        p{
          width: 1px;
          height: 76px;
          position: absolute;
          right: -26px;
          top: 10px;
          background: #ccc;
        }
      }
      &:nth-of-type(4){
        p{
          display: none;
        }
      }
    }
    .bigcanvas{
      width: 300px!important;
      height: auto!important;
      position: absolute;
      left: -350px;
      top: calc(50% - 150px);
      z-index: 10;
    }
  }

</style>
