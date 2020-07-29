<template>
  <div class="page" id="detail">
    <!--<div v-html="content" v-show="false"></div>-->
    <div class="main" v-if="this.cateId == 0">
      <div class="topnav">
        <span>首页/</span><span v-if="topData.cateId == 2" style="padding-top: .05rem">{{topData.cateName}}</span><span
        v-if="topData.cateId != 2">{{topData.cateName}}</span>
      </div>
      <h2>{{topData.title}}</h2>
      <div class="Introduction">
        <span>{{topData.newsSource}}</span><span>{{topData.createDate | formatDate}}</span>
      </div>
      <div class="tip" v-if="introduction !== ''">
        <p>{{introduction}}</p>
      </div>
      <div v-html="content" class="main-conten"></div>
      <h6 v-if="originalStatus == 1">本文为《将军财富》原创文章，未经授权不得转载或建立镜像。如需转载，请联系微信号jjcf2705并获得授权</h6>
      <h6 style="margin-top: 10px">免责声明：本文内容均来自市场公开信息，仅供参考研究，不构成操作建议。投资有风险，入市须谨慎</h6>
      <h6 style="display: block;margin-top: 10px">责任编辑：{{topData.author}}</h6>
    </div>
    <!--<div class="comments">-->
    <!--<h5>评论</h5>-->
    <!--<div class="comments-item" v-for="(item,index) in commentArr">-->
    <!--<img :src="item.userAvater? item.userAvater: defaultImg" class="img02"/>-->
    <!--<div class="comments-right">-->
    <!--<div class="comments-right-top">-->
    <!--<h3>{{item.nickName}}</h3>-->
    <!--</div>-->
    <!--<h4>{{item.statement}}</h4>-->
    <!--<h6>{{item.createTime | formatDate}}</h6>-->
    <!--<p style="margin-bottom: 1rem;margin-top:.3rem;font-size: 0.36rem;color: #666666;text-align: left;cursor: pointer"  @click="viewAll(item,index)" v-if="item.childrensSum >= 1">查看全部{{item.childrensSum}}条回复</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<p v-show="isCommentShow" class="noneShow">暂无评论</p>-->
    <!--<div class="downApp" v-if="iscloseShow">-->
    <!--<img src="/static/img/ic_close.png" class="close" @click="closeAct()"/>-->
    <!--<h4>查看更多评论，请下载将军财经APP查看</h4>-->
    <!--<div class="downApp-b">-->
    <!--<div class="downApp-b-l" style="margin-left: 1.3rem">-->
    <!--<img src="/static/img/androiddownload.png">-->
    <!--<p>安卓下载</p>-->
    <!--</div>-->
    <!--<div class="downApp-b-l" >-->
    <!--<img src="/static/img/iosdownload.png">-->
    <!--<p>ios下载</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="mask" v-if="ismaskShow"></div>
  </div>
</template>

<script>
  import axios from "axios"
  import {formatDate} from '@/plugins/time.js'
  import center from "@/plugins/center.js"
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
        introduction: '',  // 引言，
        topData: {},
        arrData: [],
        videoData: [],
        url: urlApi.testUrl,
        codeUrl: urlApi.codeUrl,
        isCommentShow: false,
        cateId: '',
        defaultImg: '/static/img/morentouxiang_64@2x.png', // 默认头像
        index: 0,
        content: '',
        iscloseShow: false,
        ismaskShow: false,
        originalStatus: ''
      }
    },
    created () {
      this.getData()
    },
//    asyncData ({params}) {
//         return axios({
//           method: 'post',
//           url: 'http://app.jiangjunzx.com/info/message/queryInfoDetail',
//           data: {
//             infoId: params.id
//           }
//         })
//           .then((res)=>{
//             return {
//                 content : res.data.model.content
//             }
//           })
//    },
//
    async asyncData ({params}) {
      let [item1, item2] = await Promise.all([
        axios.post('https://app.jiangjuncj.com/info/message/queryInfoDetail', {infoId: params.id}),
        axios.post('https://app.jiangjuncj.com/info/message/queryById', {id: params.id})
      ])
      return {
        content: item1.data.model.content,
        topData: item2.data.model
      }
    },
    methods: {
      getData () {
        // 获取评论数据
        axios({
          method: 'post',
          url:`${this.url}/info/comment/show/` + this.id + '/' + 0,
          data: {
            "pageSize": 20,
            "pageNum": 1
          }
        })
          .then((response) => {
//            console.log(response.data.model)
            this.commentArr = response.data.model
            if (this.commentArr == '' || this.commentArr == null) {
              this.isCommentShow = true
            } else {
              this.isCommentShow = false
            }
          })
          .catch((error) => {
            console.log(error)
          })

        // 获取资讯详情
        axios({
          method: 'post',
          url: `${this.url}/info/message/queryInfoDetail`,
          data: {
            infoId: this.id
          }
        })
          .then((response) => {
//              console.log(response.data.model.content)
              this.content = response.data.model.content.replace(/(<\/?a.*?>)/g, '')
              this.introduction = response.data.model.introduction
              this.originalStatus = response.data.model.originalStatus
            }
          )

        // 获取cateId
        axios({
          method: 'post',
          url: `${this.url}/info/message/queryById`,
          data: {
            id: this.id
          }
        })
          .then((response) => {
//              console.log(response.data.model )
              this.topData = response.data.model
            }
          )
      },
      viewAll () {
        this.iscloseShow = true
        this.ismaskShow = true
      },
      // 关闭弹窗
      closeAct () {
        this.iscloseShow = false
        this.ismaskShow = false
      }
    }
  }
</script>

<style scoped>
  #detail {
    width: 100%;
    /*overflow: hidden;*/
    padding-top: 60px;
    min-height: 850px;
    background: #fff;
  }

  .backcolor {
    width: 100%;
    background: #111;
    overflow: hidden;
  }

  .topnav {
    width: 100%;
    overflow: hidden;
    margin-top: 50px;
  }

  .topnav span {
    float: left;
    display: block;
    cursor: pointer;
  }

  .main {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 100px;
  }

  .main h2 {
    font-size: 20px;
    color: #333;
    text-align: left;
    margin-top: 25px;
  }

  .main h6 {
    font-size: 16px;
    color: #999;
    margin-right: 5px;
    text-align: left;
  }

  .main .tip {
    width: 100%;
    background: #f5f5f5;
    margin-top: 40px;
  }

  .main .tip p {
    font-size: 16px;
    width: 98%;
    text-align: left;
    margin-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .Introduction {
    text-align: left;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .comments {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    margin-top: 50px;
  }

  .comments h5 {
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

  .comments .comments-item .img02 {
    float: left;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .comments .comments-item .comments-right {
    width: 95%;
    /*height: 100%;*/
    float: left;
    border-bottom: 2px solid #eee;
  }

  .comments-item .comments-right .comments-right-top {
    width: 100%;
  }

  .comments-right .comments-right-top {
    overflow: hidden;
  }

  .comments-right .comments-right-top h3 {
    font-size: 16px;
    color: #409ad6;
    float: left;
    margin-top: 10px;
  }

  .comments-right h4 {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-all;
  }

  .comments-right h6 {
    /*font-size: 36px;*/
    color: #999;
    margin-bottom: 10px;
    text-align: left;
  }

  .comments-right .list li.name {
    color: #409ad6;
  }

  .comments-right .list li {
    background: #f5f5f5;
    width: 100%;
    overflow: hidden;
    margin: 15px 0;
  }

  .comments-right span {
    font-size: 18px;
    color: #666666;
  }

  .noneShow {
    font-size: 20px;
    text-align: center;
    /*border-bottom: 0.05rem solid #eee;*/
    line-height: 150px;
  }

  /*/deep/ img{*/
  /*width: 100%;  */
  /*}*/
  .main-conten {
    font-size: 15px;
    overflow: hidden;
    text-align: left;
    margin-bottom: 10px;
  }

  >
  >
  >
  .main-conten p {
    font-family: MicrosoftYaHei !important;
    font-size: 20px !important;
    margin-bottom: 30px;
  }

  >
  >
  >
  .main-conten span {
    font-family: MicrosoftYaHei !important;
    font-size: 20px !important;
  }

  >
  >
  >
  .main-conten img {
    width: 100%;
  }

  >
  >
  >
  .main-conten strong {
    font-weight: bold;
  }

  b, strong, h1, h2, h3, h4, h5, h6 {
    font-weight: 800;
  }

  .downApp {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 550px;
    height: 400px;
    background: #fff;
    z-index: 20;
    margin: -5em 0 0 -5em;
  }

  .close {
    position: absolute;
    right: 3%;
    top: 4%;
    width: 16px;
    height: 16px;
  }

  .downApp h4 {
    color: #333;
    font-size: 20px;
    margin: 60px auto;
  }

  .downApp .downApp-b {
    width: 100%;
    overflow: hidden;
  }

  .downApp .downApp-b .downApp-b-l {
    float: left;
    margin: 0 10px;
    width: 200px;
    overflow: hidden;
    /*height: 2rem;*/
  }

  .downApp .downApp-b .downApp-b-l img {
    width: 180px;
    height: 180px;
  }

  .downApp .downApp-b .downApp-b-l p {
    color: #333;
    font-size: 20px;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    top: 0;
  }
</style>
