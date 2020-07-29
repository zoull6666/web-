<template>
  <div class="community">
    <div class="community_main">
      <div class="community_nav">
        <div
          class="nav_item"
          v-for="(item, index) in nav"
          :key="index"
          :class="{'nav_item_acitve' : index == navIndex}"
          @click="navChange(index)"
        >{{item.name}}</div>
      </div>
      <div class="community_list" v-show="0 == navIndex">
        <div class="community_item" v-for="(item,index) in friendData" :key="index">
          <div class="head" :style="{backgroundImage: 'url('+ item.avatar +')'}">
            <img :src="item.appUserSymbolPath" v-if="item.appUserSymbolPath">
          </div>
          <div class="community_content">
            <div class="name">{{item.nickName}}</div>
            <!--<div-->
              <!--class="content" v-html = "item.content"-->
              <!--style="-webkit-box-orient: vertical;"-->
            <!--&gt;</div>-->
            <content-com :content = item.content ></content-com>
            <!--<div class="shares_box">-->
              <!--<div class="shares_item" v-for="i in 4" :key="i">-->
                <!--<span>平安证券</span>-->
                <!--<span>105.23</span>-->
                <!--<span>10.02%</span>-->
              <!--</div>-->
            <!--</div>-->
            <div class="img_box">
              <img :src="imgitem.dataVal" preview="1" class="thumbnail" v-for="(imgitem,index) in item.communityImgList" :key="index" v-if="item.communityImgList.length == 1">
              <img :src="imgitem.dataVal" preview="1" class="thumbnail active span"  v-for="(imgitem,index) in item.communityImgList" :key="index" v-if="item.communityImgList.length == 4"></img>
              <img :src="imgitem.dataVal" preview="1" class="thumbnail span" v-for="(imgitem,index) in item.communityImgList" :key="index" v-if="item.communityImgList.length != 1 && item.communityImgList.length != 4"></img>
            </div>
            <!--<div class="video_box"></div>-->
            <div class="info_box">
              <span>{{item.createTime | formatDate}}</span>
              <span>点赞{{item.pariseNumber}} 评论{{item.commentNumber}}</span>
            </div>
            <div class="comments">
              <ul>
                <li v-for="contentItem in item.communityCommentDtoList">
                  <span class="color-b">{{contentItem.nickName}}</span><span v-show="contentItem.parentNickName">&nbsp;回复&nbsp;</span><span class="color-b">{{contentItem.parentNickName}}</span><span>:&nbsp;{{contentItem.statement}}</span>
                </li>
                <div class="moreComment" @click='openDownloadCode' v-show="item.commentNumber >10"><span>展开更多回复&nbsp;</span><img src="../../static/img/ic_loading.png"/></div>
              </ul>
            </div>
            <div class="comment_box"></div>
          </div>
        </div>
        <div @click='openDownloadCode' class="downapp">下载大牛市APP 立即提问股市大神 >></div>
      </div>
      <div class="community_list" v-show="1 == navIndex">
        <div class="community_item" v-for="(item,index) in longTextData" :key="index">
          <div class="head" :style="{backgroundImage: 'url('+ item.avatar +')'}">
            <img :src="item.appUserSymbolPath" v-if="item.appUserSymbolPath">
          </div>
          <div class="community_content">
            <div class="name">{{item.nickName}}</div>
            <p>{{item.createTime | formatDate}}</p>
            <h4 class="h4">{{item.topic}}</h4>
            <!--<div-->
              <!--class="content" v-html="item.content"-->
              <!--style="-webkit-box-orient: vertical;"-->
            <!--&gt;</div>-->
            <!--<p>{{item.content.match(/<general>(.*?)<\/general>/g)}}</p>-->
            <!--<p v-for="(i,index) in item.content.match(/<general>(.*?)<\/general>/ig)">{{i.slice(9, -10)}}{{+index}}</p>-->
            <content1-com
              :content = item.content
              @openDownloadCode = "openDownloadCode"
            ></content1-com>
            <!--<div class="shares_box">-->
              <!--<div class="shares_item" v-for="i in 4" :key="i">-->
                <!--<span>平安证券</span>-->
                <!--<span>105.23</span>-->
                <!--<span>10.02%</span>-->
              <!--</div>-->
            <!--</div>-->
            <div class="img_box">
              <img :src="imgitem.slice(9, -10)"  preview="0" class="thumbnail" v-for="(imgitem,index) in item.content.match(/<general>(.*?)<\/general>/ig)" :key="index" v-if="item.content.match(/<general>(.*?)<\/general>/ig) == 1">
              <!--<img :src="imgitem.slice(9, -10)" preview="0" class="thumbnail active span"  v-for="(imgitem,index) in item.content.match(/<general>(.*?)<\/general>/ig)" :key="index" v-if="item.content.match(/<general>(.*?)<\/general>/ig).length == 4"></img>-->
              <img :src="imgitem.slice(9, -10)" preview="0" class="thumbnail span" v-for="(imgitem,index) in item.content.match(/<general>(.*?)<\/general>/ig) ? item.content.match(/<general>(.*?)<\/general>/ig).slice(0,3) : item.content.match(/<general>(.*?)<\/general>/ig)" :key="index" v-if="item.content.match(/<general>(.*?)<\/general>/ig) != 1 && item.content.match(/<general>(.*?)<\/general>/ig) != 4"></img>
            </div>
            <!--<div class="video_box"></div>-->
            <div class="info_box">
              <!--<span style="color: #308ef2;">最新回帖：</span><span>{{item.updateTime | formatDate}}</span>-->
              <span>点赞{{item.pariseNumber}} 评论{{item.commentNumber}}</span>
            </div>
            <div class="comment_box"></div>
          </div>
        </div>
        <div @click='openDownloadCode' class="downapp">下载大牛市APP 立即提问股市大神 >></div>
      </div>
    </div>
    <div class="lead_list">
      <div class="title">入驻金V</div>
      <div class="lead_list_item" v-for="(item,index) in bigVarr" :key="index" @click="tobigV(item.id)">
        <div class="head" :style="{backgroundImage:'url('+ item.avatar +')'}">
          <img src="../../static/img/V.png">
        </div>
        <div class="list_item_content">
          <div class="name">{{item.nickName}}</div>
          <div class="content">{{item.signature}}</div>
          <div class="fan">热度：{{item.fansNumber}}</div>
        </div>
      </div>
      <div class="btn_box">
        <div class="next_btn" @click="tonextAct()" v-if="isNextShow">下一页&gt;&gt;</div>
        <div class="prev_btn" @click="tonextPrev()" v-if="isPrevShow">&lt;&lt;上一页</div>
      </div>
    </div>
    <down-load ref='download'></down-load>
  </div>
</template>

<script>
  import axios from 'axios'
  import urlApi from "../../plugins/urlApi.js";
  import {formatDate} from '../../plugins/time.js'
  import center from '../../plugins/center.js'
  import contentCom from '../../components/content/content.vue'
  import content1Com from '../../components/content1/content.vue'
  import content2Com from '../../components/content2/content.vue'
  import content3Com from '../../components/content3/content.vue'
  export default {
    filters: {
      formatDate(time) {
        var date = new Date(Number(time));
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        img: 2,
        nav: [
          {
            name: "动态"
          },
          {
            name: "长文"
          }
        ],
        navIndex: 0,
        url: urlApi.testUrl,
        num: 1,
        size: 10,
        friendData: [],  // 朋友圈数据
        basicData: [],   // 基本面数据
        technologyData: [], // 技术面数据
        futureData: [], // 朋友圈数据
        bigSize: 6,
        bigNum: 1,
        bigVarr: [],
        isNextShow: true,
        isPrevShow: true,
        longTextData: [] // 长文数据
      };
    },
    created () {
        this.getfriendData()
//        this.getBasicData()
//        this.getTechnology()
        this.getlistData()
//        this.getFutureData()
        // 获取长文数据
        this.getLongtext()
    },
    components:{
        contentCom,
        content1Com,
        content2Com,
        content3Com
    },
    async asyncData({params}){
       let [item1,item2,item3] = await Promise.all([
           axios.post('https://app.jiangjuncj.com/msg/community/manager/queryFriendMessage',{ circleType: 3,
             friendCircleType: 3,
             pageNum: 1,
             pageSize: 10,}),
           axios.post('https://app.jiangjuncj.com/msg/community/manager/queryLongTextORExcept',{
             pageSize:10,
             pageNum:1,
             friendCircleType:3,
             type:0
           }),
           axios.post('https://app.jiangjuncj.com/msg/forum/manager/queryUser',{
             pageNum: 1,
             pageSize: 100,}),
      ])
       return{
         friendData: item1.data.model,
         longTextData: item1.data.model,
         bigVarr: item3.data.model
       }
    },
    methods:{
      openDownloadCode(){
            this.$refs['download'].open()
            _czc.push(["_trackEvent",'桌面官网','下载','将军社区']);
      },
      navChange (index) {
        this.navIndex = index
        if (index == 0) {
          center.$emit('content')
        } else if(index == 1){
          center.$emit('contentOne')
        } else if(index == 2){
          center.$emit('contentTwo')
        } else if (index == 3) {
          center.$emit('contentThree')
        }

      },
      // 获取朋友圈数据
      getfriendData () {
        axios({
          method: 'post',
          url: this.url + '/msg/community/manager/queryFriendMessage',
          data:{
            circleType: 3,
            friendCircleType: 3,
            pageNum: this.num,
            pageSize: this.size,
          }
        })
          .then((response)=>{
            // console.log(response)
            response.data.model.forEach((item)=>{
              item.content = item.content.replace(/(<[^\s\/>]+)\b[^>]*>/gi,"$1>").replace(/\n/g, '<br/>').replace(/<\/?.+?>/g,"")
            })
            this.friendData = response.data.model
          })
      },
      // 获取长文数据
      getLongtext () {
        axios({
          method: 'post',
          url: `${this.url}/msg/community/manager/queryLongTextORExcept`,
          data:{
            pageSize:10,
            pageNum:1,
            friendCircleType:3,
            type:0
          }
        })
          .then( (res)=>{
             console.log(res.data.model)
             this.longTextData = res.data.model
          })
      },
      // 获取大v列表
      getlistData () {
        axios({
          method: 'post',
          url: this.url + '/msg/forum/manager/queryUser',
          data: {
            pageNum: this.bigNum,
            pageSize: this.bigSize
          }
        })
          .then((res)=>{
            console.log(res.data.model)
            console.log(res.data.query.total)
            if (res.data.query.total/6 <= this.bigNum) {
                this.isNextShow = false
            } else {
                this.isNextShow = true
            }
            if (this.bigNum <= 1) {
                this.isPrevShow = false
            } else {
               this.isPrevShow = true
            }
            this.bigVarr = res.data.model
          })
      },
      // 大v列表下一页
      tonextAct () {
          this.bigNum++
          this.getlistData()
      },
      // 大v列表上一页
      tonextPrev () {
          this.bigNum--
          this.getlistData()
      },
      // 去大v主页
      tobigV (id) {
        this.$router.push('/bigV/'+ id)
      }
    },
    mounted () {
      center.$emit('tabChange',1)
    }
  }
</script>


<style lang="less" scoped>
@import "../../assets/less/currency";
.community {
  margin: 0 auto;
  width: 1200px;
  padding-top: 60px;
  overflow: hidden;
  .community_main {
    width: 900px;
    margin-top: 50px;
    float: left;
    .community_nav {
      .w100();
      height: 40px;
      background-color: #40597a;
      .nav_item {
        float: left;
        width: 82px;
        cursor: pointer;
        .h100();
        text-align: center;
        line-height: 40px;
        color: rgba(255, 255, 255, 0.6);
        &.nav_item_acitve {
          color: #ffffff;
          background-color: #334d71;
        }
      }
    }
    .community_list {
      background: #ffffff;
      padding: 0 16px;
      margin-bottom: 40px;
      .community_item {
        .w100();
        padding-top: 30px;
        overflow: hidden;

        .head {
          .wh(60px);
          .radius(100px);
          .pos(r);
          float: left;
          margin-right: 15px;
          /*background-color: #999;*/
          /*background-image: url(../../static/img/dog.jpg);*/
          background-size: 100% 100%;
          background-position: center;
          img {
            .pos(a);
            .wh(100%);
            /*border-radius: 50%;*/
          }
        }
        &:last-child .community_content {
          border: none;
        }
        .community_content {
          float: left;
          width: calc(~"100% - 75px");
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 10px;

          .name {
            color: #308ef2;
            font-size: 16px;
            padding-bottom: 10px;
            font-weight: bold;
          }
          h4{
            font-size: 18px;
            color: #333;
            margin-top: 10px;
          }
          p{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
          }
          .content {
            width: 100%;
            color: #333333;
            font-size: 14px;
            margin-bottom: 10px;
            display: -webkit-box;
                     -webkit-line-clamp: 3;
                     -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 10px;
          }
          .shares_box {
            width: 100%;
            overflow: hidden;
            .shares_item {
              width: 30%;
              float: left;
              margin-right: 16px;
              height: 30px;
              font-size: 14px;
              color: #333333;
              display: flex;
              background-color: rgba(235, 66, 66, 0.1);
              margin-bottom: 12px;
              span {
                flex: 1;
                text-align: center;
                line-height: 30px;
              }
            }
          }
          .img_box {
            overflow: hidden;
            width: 370px;
            img {
              /*<!--.wh(112px);-->*/
              max-height: 300px;
              max-width: 300px;
              float: left;
              display: block;
              margin-right: 6px;
              margin-bottom: 6px;
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
          }
          .video_box {
            .pos(r);
            width: 500px;
            height: 280px;
            background-image: url(../../static/img/dog.jpg);
            background-size: cover;
            background-position: center;
            &:after {
              .wh(60px);
              display: block;
              content: "";
              .pos(a);
              left: calc(~"50% - 30px");
              top: calc(~"50% - 30px");
              background-image: url(../../static/img/video_icon_play_44.png);
              background-size: 100% 100%;
              background-position: center;
            }
          }
          .info_box {
            .w100();
            padding-bottom: 19px;
            font-size: 14px;
            color: #999999;
            margin-top: 10px;
            & span:last-child {
              float: right;
            }
          }
          .comment_box {
            background-color: #e5e5e5;
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
        cursor: pointer;
      }
    }
  }
  .lead_list {
    margin-top: 50px;
    float: right;
    width: 288px;
    /*height: 500px;*/
    overflow: hidden;
    // background-color: #40597a;
    .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      font-size: 16px;
      background-color: #40597a;
      padding-left: 16px;
    }
    .lead_list_item {
      background-color: #fff;
      height: 100px;
      padding: 0 16px;
      cursor: pointer;
      .pos(r);
      .head {
        .wh(44px);
        .pos(a);
        top: calc(~"50% - 22px");
        background-image: url(../../static/img/dog.jpg);
        background-size: 100% 100%;
        background-position: center;
        border-radius: 100px;
        cursor: pointer;
        img {
          .wh(100%);
        }
      }
      .list_item_content {
        .pos(a);
        right: 16px;
        width: calc(~"100% - 92px");
        .h100();
        border-bottom: 1px solid #e5e5e5;
        .name {
          font-size: 16px;
          color: #333;
          padding-top: 14px;
          // padding-bottom: 8px;
        }
        .content {
          font-size: 12px;
          color: #999999;
          overflow: hidden;
          margin-top: 5px;
          line-height:16px;
          max-height:32px;
          position: relative;
          /*text-overflow: ellipsis;*/
          /*display: -webkit-box;*/
          /* autoprefixer: off */
          /*-webkit-box-orient: vertical;*/
          /* autoprefixer: on */
          /*-webkit-line-clamp: 2;*/
        }
        .content::after {
          content: "\02026";      // '...'
          position:absolute;
          bottom:0;
          right:0;
          padding-left:40px;
          background:-webkit-linear-gradient(left,#ffffff33 70%,#fff 55%);
          background:-o-linear-gradient(right,#ffffff33 70%,#fff 55%);
          background:-moz-linear-gradient(right,#ffffff33 70%,#fff 55%);
          background:linear-gradient(to right,#ffffff33 70%,#fff 55%);
        }
        .fan {
          font-size: 12px;
          color: #eb4242;
          padding-top: 8px;
        }
      }
    }
  }
  .btn_box {
    .w100();
    margin: 12px 0;
    height: 30px;
    overflow: hidden;
    .prev_btn,
    .next_btn {
      float: right;
      width: 70px;
      height: 30px;
      background-color: #ffffff;
      font-size: 12px;
      color: #333333;
      text-align: center;
      line-height: 30px;
      margin-left: 12px;
      cursor: pointer;
    }
  }
}
.comments{
  width: 100%;
  overflow: hidden;
  background: #e5e5e5;
}
.comments ul{
  width: 100%;
  overflow: hidden;
}
.comments ul li{
  padding: 10px 15px;
}
.comments ul li span{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #333333;
}
.comments ul li .color-b{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #308ef2
}
.moreComment{
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 30px;
}
.moreComment span{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #308ef2;
  cursor: pointer;
}
.moreComment img{
  cursor: pointer;
}
</style>
