<template>
    <div class="group">
      <div class="banner">
        <img src="../../static/img/banner_qunliao.png"/>
      </div>
      <div class="main">
        <div class="search">
          <input type="text" placeholder="搜索热门群聊…" v-model="inputVal"/>
          <img src="../../static/img/ic_search.png" @click="searchAct()"/>
        </div>
        <div class="content" v-for="(item,index) in groupData" :key="index">
          <div class="content-l">
            <img :src="item.FaceUrl"/>
            <div class="content-l-r">
              <h3>{{item.Name}}</h3>
              <div class="status"><span>群状态:</span> <span class="color" v-if="item.MemberNum >= item.maxMemberCount">已满员</span> <span class="color" v-if="item.MemberNum < item.maxMemberCount">可加入</span>
              </div>
              <div class="status"><span>群成员:</span><span class="color">{{item.MemberNum}}/{{item.maxMemberCount}}</span></div>
            </div>
          </div>
          <div class="down">
            <span>APP扫码加入</span>
            <img src="../../static/img/arrow_right.png" />
          </div>
          <div class="content-r" @click="tobig(item.GroupId)">
            <canvas class="canvas"></canvas>
          </div>
        </div>
        <div class="turnPage">
          <div class="next" @click="nextAct()" v-show="nextShow">下一页<img src="../../static/img/ic_arrow_right.png"/></div>
          <div class="pre" @click="preAct()" v-show="preShow"><img src="../../static/img/ic_arrow_left.png"/>上一页</div>
        </div>
        <p v-if="isEmpty">未找到相关群聊</p>
        <div class="mask" v-if="bigShow" @click="maskAct()"></div>
      </div>
      <canvas class="bigcanvas" v-if="bigShow"></canvas>
    </div>
</template>

<script>
  import axios from 'axios'
  import QRCode from 'qrcode'
  import center from '@/plugins/center.js'
  import urlApi from "@/plugins/urlApi.js"
  let timer = null
  export default{
      data () {
          return{
            groupData: [],
            pageNum: 1,
            nextShow: true,
            preShow: false,
            url: 'https://apps.jiangjuncj.com',
            codeUrl: urlApi.codeUrl,
            sum: 0,
            inputVal: '',
            bigShow: false,
            isEmpty: false
          }
      },
      created () {
        this.getData()
      },
      methods:{
        getData () {
          axios({
            method: 'post',
            url: `${this.codeUrl}/chat/chat/group/queryChatGroupBySearch`,
            data:{
              pageSize: 15,
              pageNum: this.pageNum,
              queryValue: this.inputVal,
            }
          })
            .then((res)=>{
              this.groupData = res.data.model.GroupInfo
              this.sum = res.data.query.total
              if (this.sum/15 <= this.pageNum) {
                this.nextShow = false
              } else {
                this.nextShow = true
              }
              if (res.data.model.GroupInfo.length == 0) {
                  this.isEmpty = true
              } else {
                  this.isEmpty = false
              }
//            console.log(res.data.model.GroupInfo,'群聊')
            })
        },
        useqrcode(chatId,index){
          //生成的二维码内容，可以添加变量
          chatId=`${this.url}/discuss.html`+"?chatId="+chatId;
          var canvas = document.getElementsByClassName('canvas')[index]
//          console.log(chatId)
          QRCode.toCanvas(canvas, chatId, function (error) {
            if (error) console.error(error)
//            console.log('success!');
          })
        },
        // 上一页
        preAct () {
           if (this.pageNum >= 2) {
             this.pageNum--
             this.getData()
             this.getCode()
           }
        },
        // 下一页
        nextAct () {
          if (this.pageNum <= this.sum/15) {
            this.pageNum++
            this.getData()
            this.getCode()
          }
        },
        // 二维码生成
        getCode () {
          let timer = setTimeout(()=>{
            this.groupData.forEach( (item,index)=>{
              this.useqrcode(item.GroupId,index)
            })
            clearTimeout(timer)
          },1000)
        },
        // 放大操作
        tobig (chatId) {
          this.bigShow = true
          let timer = setTimeout(()=>{
            chatId=`${this.url}/discuss.html`+"?chatId="+chatId;
            var canvas = document.getElementsByClassName('bigcanvas')[0]
//            console.log(canvas)
            QRCode.toCanvas(canvas, chatId, function (error) {
              if (error) console.error(error)
//            console.log('success!');
            })
            clearTimeout(timer)
          },300)
        },
        maskAct () {
          this.bigShow = false
        },
        // 搜索
        searchAct () {
          this.pageNum = 1
          this.getData()
          this.getCode()
        }
      },
      watch:{
        'pageNum': function (val, oldValue) {
            console.log(val)
            if (val >= 2) {
              this.preShow = true
            } else {
              this.preShow = false
            }
//            if (val == parseInt(this.sum/15)+1) {
//              this.nextShow = false
//            }
            if (val <= this.sum/15) {
              this.nextShow = false
            } else {
              this.nextShow = true
            }
        },
        'inputVal': function (val,oldValue) {
              this.pageNum = 1
              this.getData()
              this.getCode()
              _czc.push(["_trackEvent",'桌面官网','搜索','群搜索']);
        }
      },
      mounted () {
        center.$emit('tabChange',2)
        let timer = setTimeout( ()=>{
          this.groupData.forEach( (item,index)=>{
            this.useqrcode(item.GroupId,index)
          })
          clearTimeout(timer)
        },300)
      }
  }

</script>

<style lang="less" scoped>
.group{
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
  height: 100%;
  position: relative;
  .banner{
     /*background-image: url("../../static/img/banner_qunliao.png");*/
     /*background-repeat: no-repeat;*/
     /*background-position: center;*/
     /*background-size: cover;*/
     width: 100%;
     /*height: 342px;*/
     overflow: hidden;
     img{
       width: 100%;
       /*height: 100%;*/
     }
  }
  .main{
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      min-height: 400px;
      margin-bottom: 40px;
      position: relative;
     .search{
       width: 300px;
       height: 32px;
       margin-top: 40px;
       position: relative;
       input{
         width: 300px;
         height: 32px;
         text-indent: 16px;
         font-family: MicrosoftYaHei;
         font-size: 14px;
         font-weight: normal;
         font-stretch: normal;
         line-height: 44px;
         letter-spacing: 0px;
         color: #999999;
         background-color: #ffffff;
         border-radius: 16px;
         border: none;
         line-height: 32px;
       }
       img{
          position: absolute;
          right: 24px;
          bottom: 8px;
          cursor: pointer;
       }
     }
     .content{
      width: 388px;
      /*margin: 0 auto;*/
      height: 144px;
      background: #fff;
      float: left;
      margin-top: 30px;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      margin-right: 18px;
       &:nth-child(3n+1){
         margin-right: 0;
       }
      .content-l{
        float: left;
        width: 70%;
        img{
          width: 64px;
          height: 64px;
          float: left;
          border-radius: 50%;
          margin-top: 30px;
          margin-left: 16px;
        }
        .content-l-r{
          float: left;
          margin-top: 30px;
          margin-left: 16px;
          h3{
            font-family: MicrosoftYaHei-Bold;
            font-size: 16px;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #333333;
            font-weight: bold;
          }
          .status{
            margin-top: 2px;
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
        right: 105px;
        bottom: 30px;
        span{
          font-size: 12px;
        }
      }
      .content-r{
        float: right;
        margin-right: 16px;
        margin-top: 24px;
        width: 94px;
        height: 94px;
        .canvas{
          width: 100%!important;
          height: auto!important;
        }
      }
    }
     .turnPage{
        width:100%;
        height: 30px;
        float: left;
        margin-top: 30px;
       .pre{
         float: right;
         width: 70px;
         height: 30px;
         background: #fff;
         text-align: center;
         margin-right: 12px;
         cursor: pointer;
       }
       .next{
         float: right;
         width: 70px;
         height: 30px;
         background: #fff;
         text-align: center;
         cursor: pointer;
       }
     }
     .mask{
       width: 100%;
       height: 100%;
       background: rgba(0,0,0,0.6);
       position: fixed;
       left: 0;
       top: 0;
     }
      p{
        text-align: center;
      }
  }
  .bigcanvas{
    width: 300px!important;
    height: auto!important;
    position: fixed;
    left: calc(50% - 150px);
    top: calc(50% - 150px);
    z-index: 2;
  }
}

</style>
