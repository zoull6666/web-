<template>
  <div class="questions">
    <div class="title">
      高手问答
      <div class="after" @click="toQuestion()">更多 >></div>
    </div>
    <div class="questions_list">
      <div class="questions_list_item" v-for="(item,index) in questionArr" :key="index">
        <p v-html="'问：'+ item.content" @click="toDetail(item.id,index)"></p>
        <span>{{item.createTime | formatDate}}</span>
      </div>
    </div>
    <div class="detail" v-show="isShow">
      <div class="header-q">
        <div :style="{backgroundImage:'url('+ boxArr.avatar + ')'}" class="img01">
          <img :src="boxArr.symbolPath" v-if="boxArr.symbolPath"/>
        </div>
        <div class="header-q-r">
          <p>{{boxArr.nickName}}</p>
          <div class="time-q">
            <h3>提问</h3><span>{{boxArr.createTime | formatDate}}</span>
          </div>
        </div>
      </div>
      <div class="content" v-html="boxArr.content"></div>
      <div class="picture">
        <!--<img :src="qusetionImg.dataVal" v-for="(qusetionImg,index) in boxArr.forumImgs" :key="index"/>-->
        <img :src="imgitem.dataVal" v-for="(imgitem,index) in boxArr.forumImgs" :key="index" v-if="boxArr.forumImgs.length == 1">
        <img :src="imgitem.dataVal" class="active span"  v-for="(imgitem,index) in boxArr.forumImgs" :key="index" v-if="boxArr.forumImgs.length == 4"></img>
        <img :src="imgitem.dataVal" class="span" v-for="(imgitem,index) in boxArr.forumImgs" :key="index" v-if="boxArr.forumImgs.length != 1 && boxArr.forumImgs.length != 4"></img>
      </div>
      <div class="detail-b">
        <div class="header-q">
          <div :style="{backgroundImage:'url('+ answerUser.avatar + ')'}" class="img01">
            <img :src="answerUser.symbolPath" v-if="answerUser.symbolPath"/>
          </div>
          <div class="header-q-r">
            <p>{{answerUser.nickName}}</p>
            <div class="time-q">
              <h3 style="background:#f4dbc4;color: #f27100;">回答</h3><span>{{answerObj.createTime | formatDate}}</span>
            </div>
          </div>
        </div>
        <div class="content" style="padding-bottom: 30px;" v-html="answerObj.context"></div>
        <div class="picture">
          <img :src="imgitem.dataVal" v-for="(imgitem,index) in answerObj.forumImgs" :key="index" v-if="answerObj.forumImgs.length == 1">
          <img :src="imgitem.dataVal" class="active span"  v-for="(imgitem,index) in answerObj.forumImgs" :key="index" v-if="answerObj.forumImgs.length == 4"></img>
          <img :src="imgitem.dataVal" class="span" v-for="(imgitem,index) in answerObj.forumImgs" :key="index" v-if="answerObj.forumImgs.length != 1 && answerObj.forumImgs.length != 4"></img>
        </div>
      </div>
      <img src="../../static/img/ic_close.png" class="img02" @click="tocloseAct()"/>
    </div>
    <div class="mask" v-show="isShow" @touchmove.prevent></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import urlApi from "../../plugins/urlApi.js";
  import {formatDate} from '../../plugins/time.js'
  import center from '../../plugins/center.js'
  export default{
      filters: {
        formatDate(time) {
          var date = new Date(Number(time));
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      data () {
          return{
            url: urlApi.testUrl,
            questionArr: [],
            tabIndex: 0,
            answerObj: {},
            answerUser: {},
            boxArr: {},
            isShow: false
          }
      },
      created () {
          this.getData()
      },
      methods:{
        // 获取问答数据
        getData () {
          axios({
            method: 'post',
            url: this.url + '/msg/forum/manager/queryList',
            data: {
              pageSize: 7,
              pageNum: 1,
              isAnswer: 1
            }
          })
            .then((res) => {
              res.data.model.map((item) => {
                item.content = item.content.replace(/(<[^\s\/>]+)\b[^>]*>/gi, "$1>").replace(/\n/g, '<br/>').replace(/<\/?.+?>/g, "")
              })
              this.questionArr = res.data.model
            })
        },
        // 获取问答详情数据
        getboxData (id) {
          axios({
            method: 'post',
            url: this.url + '/msg/forum/manager/queryDetail',
            data: {
              id: id
            }
          })
            .then((res) => {
              console.log(res)
              res.data.model.content = res.data.model.content.replace(/(<[^\s\/>]+)\b[^>]*>/gi, "$1>").replace(/\n/g, '<br/>').replace(/<\/?.+?>/g, "")
              this.boxArr = res.data.model
              this.answerUser = res.data.model.forumRemindUsers[0].user
              this.answerObj = res.data.model.forumAnswers[0]
              this.answerObj.context = this.answerObj.context.replace(/(<[^\s\/>]+)\b[^>]*>/gi, "$1>").replace(/\n/g, '<br/>').replace(/<\/?.+?>/g, "")
            })
        },
        toDetail (id,index) {
          this.tabIndex = index
          this.isShow = true
          this.getboxData(id)
          center.$emit('isMask',true)
        },
        tocloseAct () {
          this.isShow = false
          center.$emit('isMask',false)
        },
        // 去问答页面
        toQuestion () {
            this.$router.push('/question')
        }
      }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/currency";

  .questions {
    position: absolute;
    left: 162px;
    top: 0;
    width: 576px;
    background-color: #ffffff;
    height: 100%;

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

    .questions_list {
      width: 100%;
      height: calc(~'100% - 40px');
      padding: 0 18px;
      overflow: hidden;

      .questions_list_item {
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        height: 50px;
        padding: 10px 0;
        position: relative;
        color: #333333;
        p{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 80%;
        }
        p:hover{
          color: #eb4242;
          font-weight: bold;
          cursor: pointer;
        }
        &:after {
          content: "已解决";
          display: block;
          position: absolute;
          right: 0;
          top: 13px;
          color: #999999;
          width: 50px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 4px;
          border: 1px solid #e5e5e5;
        }

        &:last-child {
          border: none;
        }

        span {
          font-weight: normal;
          color: #999999;
          font-size: 12px;
        }
      }

      .questions_list_item_active {
        p {
          color: #eb4242;
          font-weight: bold;
        }
      }
    }
  }
  .detail{
    width: 640px;
    overflow: hidden;
    background: #fff;
    position: fixed;
    top: 10%;
    left: 50%;
    margin: 10em 0 0 -22em;
    z-index: 10;
  }
  .detail .header-q{
    width: 100%;
    height: 92px;
  }
  .detail .header-q img{
    width: 50px;
    height: 50px;
    float: left;
    margin-top: 30px;
    margin-left: 30px;
    border-radius: 50%;
  }
  .detail .header-q .img01{
    width: 50px;
    height: 50px;
    float: left;
    margin-top: 30px;
    margin-left: 30px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .detail .header-q .img01 img{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: 0;
    border-radius: 0;
  }
  .detail .header-q .header-q-r{
    float: left;
    margin-left: 15px;
  }
  .header-q .header-q-r p{
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #308ef2;
    margin-top: 34px;
  }
  .time-q{
    margin-top: 5px;
  }
  .header-q .header-q-r h3{
    float: left;
    width: 44px;
    height: 18px;
    background-color: #e5e5e5;
    border-radius: 9px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;

    color: #999999;
    text-align: center;
  }
  .header-q .header-q-r span{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    float: left;
    margin-left: 10px;
  }
  .detail .content{
    margin-left: 30px;
    margin-right: 36px;
    padding-bottom: 20px;
  }
  .detail .picture{
    margin-left: 30px;
    margin-right: 36px;
    width: 355px;
    overflow: hidden;
  }
  .detail .picture img{
    max-height: 300px;
    max-width: 300px;
  }
  .span{
    width: 112px;
    height: 112px;
    display: block;
    float: left;
    margin-right: 6px;
    margin-bottom: 6px;
  }
  .span.active{
    margin-right: 10px;
  }
  .detail .picture img:nth-child(n*n){
    margin-left: 0;
  }
  .detail .detail-b{
    background: #F5F5F5;
  }
  .detail .img02{
    position: absolute;
    right: 20px;
    top: 20px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .question .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
  }
</style>
