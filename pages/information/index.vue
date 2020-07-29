<template>
  <div class="information-wrap">
      <div class="information">
        <div class="title">首页/资讯</div>
        <div class="information_nav">
          <div class="information_nav_title">资讯</div>
          <div class="information_nav_box">
            <div
              class="information_nav_item"
              v-for="(item,index) in navArr"
              :key="index"
              :class="{'information_nav_item_active':index == tabIndex}"
              @click="changeNav(item.id,index)"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="information_list">
          <div class="information_search">
            <input type="text" placeholder="请输入搜索关键词" v-model="searchVal">
            <div class="search_btn" @click="searchAct()">搜索</div>
          </div>
          <div v-show="isShow">
            <div v-if="step == 1">
              <div class="navChild">
                <ul>
                  <li v-for="(childItem,index) in childNav" :class="{active: index == childIndex}" @click="childAct(childItem.id,index)">{{childItem.name}}</li>
                </ul>
              </div>
              <div class="headlines_item" v-for="(item,index) in infoArr" :key="index">
                <router-link :to="'/information/'+item.id" target="_blank">
                  <div class="time">{{item.createTime | formatDate}}</div>
                  <div class="top" v-if="item.topStatus == 2">置顶</div>
                  <div class="top" v-if="item.topStatus == 1">热点</div>
                  <div class="border"></div>
                  <div
                    class="headlines_item_title"
                    :class="{'title_active': item.topStatus == 2}"
                  >{{item.title}}</div>
                  <div
                    class="headlines_item_content"
                  >{{item.appInformationDetail.introduction}}</div>
                  <div class="shares_item_box">
                    <div class="shares_item" v-for="codeItem in item.rotate" :class="{color2: codeItem.changepercent > 0, color1: codeItem.changepercent < 0, color3: codeItem.changepercent == 0}">
                      <span>{{codeItem.name}}</span>
                      <span class="code">{{returnFloat(codeItem.trade)}}</span>
                      <span class="code">{{returnFloat(codeItem.changepercent)}}%</span>
                    </div>
                  </div>
                  <div class="full_btn" v-if="item.appInformationDetail.hasContent">查看原文</div>
                </router-link>
              </div>
            </div>
            <div v-else>
              <div class="information_list_item" v-for="(item, index) in infoArr" :key="index">
                <router-link :to="'/information/'+item.id" target="_blank">
                  <img :src="item.imgPath" alt v-show="item.imgPath">
                </router-link>
                <router-link :to="'/information/'+item.id" target="_blank">
                  <div class="list_item_content">
                    <div class="list_item_title">{{item.title}}</div>
                    <div class="list_item_info">
                      <div class="top" v-if="item.topStatus == 2">置顶</div>
                      <div class="top" v-if="item.topStatus == 1">热点</div>
                      <span>{{item.newsSource}}</span>
                      <span>{{item.createTime | formatDate}}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="empty" v-show="!isShow">
            <img src="../../static/img/icon_zanwuzixun@2x.png"/>
            <p>暂无资讯</p>
          </div>
          <div class="loadmore" @click="tomoreAct()" ref="loadmore" v-show="isShow">{{loadmore}}</div>
        </div>
      </div>
      <div class="gotop" @click="gotop()">
      <img src="../../static/img/ic_top.png" />
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import { post } from "~/plugins/request";
  import {formatDate} from '../../plugins/time.js'
  import center from "../../plugins/center.js"
  import urlApi from "@/plugins/urlApi.js"
export default {
  filters: {
    formatDate(time) {
      var date = new Date(Number(time));
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      tabIndex: 0,
      step: 2,
      navArr: [],
      num: 1,
      size: 10,
      infoArr: [],
      codeArr: [],     // 股票列表
      id: '',
      searchVal: '',
      loadmore: '加载更多',
      isShow: true,
      navIndex: 0,
      url: urlApi.testUrl,
      codeUrl: urlApi.codeUrl,
      childNav: [],
      childIndex: 0,
      childId: '',
      flag: true
    };
  },
  created() {
      this.getNavdata()
  },
  methods:{
    returnFloat(value) {
      var value =  Math.floor(value * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    // 获取资讯列表
    getNavdata () {
      axios({
        method: 'post',
        url: `${this.url}/info/category/queryAll`,
        data: {
          type: 0
        }
      })
        .then( (res)=>{
          console.log(res)
          this.navArr = res.data.model
          this.navArr.forEach((item)=>{
            if (item.id == 2) {
              this.childNav = item.sonCategoryList
              this.childId = this.childNav.length == 0 ? 36 : this.childNav[0].id
            }
          })
//          this.navArr.splice(0,1)
          this.id = this.navArr[0].id
          this.changeNav(this.id,0)
        })
    },
    // 点击切换nav
    changeNav (id,index) {
      this.id = id
      this.tabIndex = index
      this.num = 1
      this.getinfoData()
    },
    // 获取单独资讯列表信息
    getinfoData () {
      this.isShow = true
      this.flag = true
      if (this.id == 2) {
        this.step = 1
        if (this.childId == 36) {
          axios({
            method: 'post',
            url: `${this.url}/info/message/queryByCate`,
            data: {
              cateId: this.id,
              pageNum: this.num,
              pageSize: this.size
            }
          })
            .then( (res)=>{
//              console.log(res)
//              console.log(res.data.query.total/10 > this.num)
              if (this.num <=1) {
                this.infoArr = res.data.model
              } else {
                this.infoArr = this.infoArr.concat(res.data.model)
              }
              if (res.data.query.total/10 > this.num) {
                this.loadmore= '加载更多'
              } else {
                this.loadmore= '已加载全部'
              }
            })
        } else {
          axios({
            method: 'post',
            url: `${this.url}/info/message/queryBySon`,
            data:{
              cateId: 2,
              pageNum: this.num,
              pageSize: this.size,
              sonCateId: this.childId,
            }
          })
            .then( (res)=>{
              console.log(res)
              console.log(res.data.query.total/10 > this.num)
              if (this.num <=1) {
                this.infoArr = res.data.model
              } else {
                this.infoArr = this.infoArr.concat(res.data.model)
              }
              if (res.data.query.total/10 > this.num) {
                this.loadmore= '加载更多'
              } else {
                this.loadmore= '已加载全部'
              }
            })
        }
      } else {
        this.step = 2
        axios({
          method: 'post',
          url: `${this.url}/info/message/queryByCate`,
          data: {
            cateId: this.id,
            pageNum: this.num,
            pageSize: this.size
          }
        })
          .then( (res)=>{
            console.log(res)
            if (this.num <=1) {
              this.infoArr = res.data.model
            } else {
              this.infoArr = this.infoArr.concat(res.data.model)
            }
            if (res.data.query.total/10 > this.num) {
              this.loadmore = '加载更多'
            } else {
              this.loadmore = '已加载全部'
            }
            this.getRotate()
            setInterval(()=>{
              this.getRotate()
            },3000)
//            this.infoArr = res.data.model
          })
      }
    },
    //获取实时股票
    getRotate() {
        console.log()
      var that = this;
      var promiseAll = this.infoArr.map((obj, index) => {
        if (obj.appInformationDetail.relatedStockList.length) {
          return axios.post(
            `${this.codeUrl}/stock/kline/queryQuotesSimpleList`, {
              codes: obj.appInformationDetail.relatedStockList,
              userId: 3
            }
          );
        }
      });

      axios.all(promiseAll).then(function (resArr) {
        resArr.forEach(function (res, i) {
          if (res) {
            that.$set(that.infoArr[i], "rotate", res.data.model);
            that.infoArr[i].rotate = res.data.model;
          }
        });
      });
    },
    // 获取更多内容
    tomoreAct () {
        this.num++
        if (this.flag) {
          this.getinfoData()
        } else {
           this.searchAct()
        }
    },
    // 将军头条子频道切换
    childAct (id,index) {
      this.num = 1
      this.childIndex = index
      this.childId = id
      if (id == 36) {
        axios({
          method: 'post',
          url: `${this.url}/info/message/queryByCate`,
          data: {
            cateId: 2,
            pageNum: this.num,
            pageSize: this.size
          }
        })
          .then( (res)=>{
            console.log(res)
            this.infoArr = res.data.model
            this.getRotate()
            setInterval(()=>{
              this.getRotate()
            },3000)
          })
      } else {
        axios({
          method: 'post',
          url: `${this.url}/info/message/queryBySon`,
          data:{
            cateId: 2,
            pageNum: this.num,
            pageSize: this.size,
            sonCateId: id,
          }
        })
          .then((res)=>{
            console.log(res.data.model)
            this.infoArr = res.data.model
          })
      }
    },
    // 搜索
    searchAct () {
      this.flag = false
      axios({
        method: 'post',
        url: `${this.url}/info/message/vagueQuery`,
        data: {
          title: this.searchVal,
          pageNum: this.num,
          pageSize: this.size
        }
      })
        .then((res)=>{
          if (res.data.query.total == 0) {
              this.isShow = false
          } else if (res.data.query.total/10 > this.num) {
              this.step = 2
              this.isShow = true
              if (this.num <=1) {
                this.infoArr = res.data.model
              } else {
                this.infoArr = this.infoArr.concat(res.data.model)
              }
              this.loadmore= '加载更多'
          } else {
            this.loadmore= '已加载全部'
          }
        })
    },
    // 回到顶部
    gotop () {
//      document.body.scrollTop = 0
//      document.documentElement.scrollTop = 0
        window.scroll(0,0)
    }
  },
  mounted () {
    center.$emit('tabChange',-1)
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/currency";
.information-wrap{
  width: 1400px;
  margin: 0 auto;
  position: relative;
  .information {
  margin: 0 auto;
  width: 1200px;
  padding-top: 60px;
  overflow: hidden;
  position: relative;
  .title {
    font-size: 16px;
    color: #999999;
    padding: 30px 0;
    text-indent: 5px;
  }
  .information_nav {
    width: 150px;
    background-color: #00214d;
    padding-bottom: 30px;
    float: left;
    .information_nav_title {
      font-size: 18px;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
      height: 90px;
      line-height: 90px;
      background-color: #40597a;
    }
    .information_nav_box {
      .w100();
      padding: 30px 28px;
    }
    .information_nav_item {
      .w100();
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .pos(r);
      cursor: pointer;
    }
    .information_nav_item_active {
      color: #ffffff;
      &:before {
        .d-b-i();
        .wh(4px);
        .pos(a);
        .radius(100px);
        top: calc(~"50% - 2px");
        left: 2px;
        background-color: #eb4242;
      }
    }
  }
  .information_list {
    overflow: hidden;
    width: calc(~"100% - 162px");
    background-color: #ffffff;
    float: right;
    padding: 16px;
    margin-bottom: 40px;
    .information_search {
      width: calc(~"100% - 120px");
      height: 40px;
      border: solid 1px #cccccc;
      margin-bottom: 20px;
      .pos(r);
      input {
        border: none;
        background: #ffffff;
        .wh(100%);
        padding-left: 14px;
        font-size: 14px;
      }
      .search_btn {
        background: #eb4242;
        height: 40px;
        width: 120px;
        cursor: pointer;
        .pos(a);
        right: -120px;
        top: -1px;
        .tcc(40px);
        color: #ffffff;
        font-size: 14px;
      }
    }
    .headlines_item {
      position: relative;
      padding-left: 20px;
      overflow: hidden;
      .top {
        width: 32px;
        height: 16px;
        font-size: 12px;
        color: #eb4242;
        border: 1px solid #eb4242;
        text-align: center;
        line-height: 16px;
        .pos(a);
        right: 0;
        top: 0;
      }

      &:first-child {
        margin-top: 30px;
      }

      .time {
        font-size: 12px;
        color: #308ef2;
        position: relative;
        padding-left: 18px;
        padding-bottom: 20px;
        left: -20px;

        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 9px;
          height: 9px;
          border-radius: 100px;
          background-color: #308ef2;
          left: 0;
          top: 4px;
        }
      }

      .border {
        width: 1px;
        height: calc(~"100% - 16px");
        bottom: 0;
        background-color: #308ef2;
        position: absolute;
        left: 3.5px;
      }

      .headlines_item_title {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        padding-bottom: 16px;
      }

      .title_active {
        color: #eb4242;
      }

      .headlines_item_content {
        font-size: 14px;
        color: #333333;
        margin-bottom: 16px;
      }
      .shares_item_box {
        overflow: hidden;
        .shares_item {
          width: calc(~"30% - 30px");
          height: 30px;
          float: left;
          margin-right: 16px;
          margin-bottom: 16px;
          line-height: 30px;
          font-size: 14px;
          display: flex;
          color: #333333;

          span {
            flex: 1;
            text-align: center;
          }
        }

        .color1 {
          background-color: rgba(42, 189, 110, 0.1);
        }

        .color1 .code:nth-child(2),
        .color1 .code:nth-child(3) {
          color: #2abd6e;
        }

        .color2 {
          background-color: rgba(235, 66, 66, 0.1);
        }

        .color3 {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .color2 .code:nth-child(2),
        .color2 .code:nth-child(3) {
          color: #eb4242;
        }
        .shares_up {
          background-color: rgba(235, 66, 66, 0.1);

          .code {
            color: #eb4242;
          }
        }
      }

      .full_btn {
        text-decoration: underline;
        color: #308ef2;
        font-size: 14px;
        padding-bottom: 16px;
      }
    }
    .navChild{
      width: 100%;
      overflow: hidden;
      margin: 10px 0;

      ul{
        width: 100%;
        overflow: hidden;
        li{
          padding: 5px 12px;
          background: #e0eefd;
          float: left;
          font-size: 16px;
          margin-right: 10px;
          cursor: pointer;
        }
        li.active{
          background: #308ef2;
          color: #fff;
        }
      }
    }
    .information_list_item {
      .w100();
      height: 92px;
      display: flex;
      margin-bottom: 30px;

      img {
        width: 164px;
        height: 92px;
        padding-right: 20px;
        display: block;
      }
      .list_item_content {
        flex: 1;
        .h100();
        .pos(r);
        .list_item_title {
          font-size: 20px;
          overflow: hidden;
          color: #333;
          text-overflow: ellipsis;
          display: -webkit-box;
          /* autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
        }
        .list_item_info {
          .pos(a);
          bottom: 0;
          font-size: 14px;
          color: #999999;
          width: 300px;
          span {
            padding-right: 16px;
            /*color: #333;*/
          }
          .top {
            display: inline-block;
            border: solid 1px #eb4242;
            color: #eb4242;
            text-align: center;
            padding: 0 5px;
            border-radius: 2px;
            margin-right: 16px;
          }
        }
      }
    }
    .loadmore {
      width: 120px;
      height: 30px;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      color: #eb4242;
      border: 1px solid #eb4242;
      margin: 0 auto;
      margin-top: 20px;
      cursor: pointer;
    }
    .empty{
      text-align: center;
    }
    .empty img{
      margin: 50px auto;
    }
  }
  }
  .gotop{
    position: absolute;
    width: 64px;
    height: 64px;
    bottom: 40px;
    right: 10px;
    background: #fff;
    line-height: 64px;
    text-align: center;
  }
  .gotop img{
    width: 36px;
    height: 21px;
    display: inline-block;
  }
}
</style>

