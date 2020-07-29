<template>
  <div class="information_box">
    <div class="title">
      资讯
      <div class="after" @click="toInfo()">更多 >></div>
    </div>
    <div class="information_main" v-if="isHeadlines !== 1">
        <div class="information_main_item" v-for="(item,e) in navArr" :key="e">
          <router-link :to="'/information/'+item.id" target="_blank">
          <div class="information_main_item_content">
            {{item.title}}
          </div>
          <span>{{item.createTime | formatDate}}</span>
          </router-link>
        </div>
    </div>
    <div class="information_main" v-else>
      <div class="headlines_item" v-for="(item,i) in navArr" :key="i">
        <router-link :to="'/information/'+item.id" target="_blank" v-if="item.appInformationDetail">
          <div class="time">{{item.createTime | formatDate}}</div>
          <div class="border"></div>
          <div class="headlines_item_title" :class="{'title_active': item.topStatus == 2}">{{item.title}}</div>
          <div class="headlines_item_content">{{item.appInformationDetail.introduction}}</div>
          <div class="shares_item" v-for="codeItem in item.rotate" :class="{color2: codeItem.changepercent > 0, color1: codeItem.changepercent < 0, color3: codeItem.changepercent == 0}">
              <span>{{codeItem.name}}</span>
              <span class="code">{{returnFloat(codeItem.trade)}}</span>
              <span class="code">{{returnFloat(codeItem.changepercent)}}%</span>
          </div>
          <div class="full_btn" v-if="item.appInformationDetail.hasContent">查看原文</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { post } from "~/plugins/request"
  import {formatDate} from '../../plugins/time.js'
  import center from "../../plugins/center.js"
  import urlApi from "../../plugins/urlApi.js";
  export default {
    filters: {
      formatDate(time) {
        var date = new Date(Number(time));
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        isHeadlines: 1,
        navArr: [],
        num: 1,
        size: 10,
        url: urlApi.testUrl,
        codeUrl: urlApi.codeUrl,
        codeArr: [],
        childNav: [],
        childIndex: 0
      }
    },
    created () {
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
//            console.log(res)
            this.navArr = res.data.model
            this.navArr.forEach((item)=>{
                if (item.id == 2) {
                  this.childNav = item.sonCategoryList
                }
            })
//            this.navArr.splice(0,1)
            this.id = this.navArr[0].id
            this.getinfoData(this.id)
          })
      },
      // 获取指定资讯频道信息
      getinfoData (id) {
        console.log(id)
        if (id == 2) {
          this.isHeadlines = 1
          axios({
            method: 'post',
            url: `${this.url}/info/message/queryByCate`,
            data: {
              cateId: id,
              pageNum: this.num,
              pageSize: this.size
            }
          })
            .then( (res)=>{
              console.log(res)
              this.navArr = res.data.model
              this.getRotate()
              setInterval(()=>{
                this.getRotate()
              },3000)
            })
        } else {
          this.isHeadlines = 2
          axios({
            method: 'post',
            url: `${this.url}/info/message/queryByCate`,
            data: {
              cateId: id,
              pageNum: this.num,
              pageSize: this.size
            }
          })
            .then( (res)=>{
              console.log(res)
              this.navArr = res.data.model
            })
        }
      },
      //获取实时股票
      getRotate() {
        var that = this;
        var promiseAll = this.navArr.map((obj, index) => {
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
              that.$set(that.navArr[i], "rotate", res.data.model);
              that.navArr[i].rotate = res.data.model;
            }
          });
        });


      },
      // 进入资讯详情页
      toDetail (id) {
          this.$router.push('/information/'+id)
      },
      // 将军头条子频道切换
      childAct (id,index) {
          this.childIndex = index
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
                this.navArr = res.data.model
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
                pageNum: 1,
                pageSize: 10,
                sonCateId: id,
              }
            })
              .then((res)=>{
                console.log(res.data.model)
                this.navArr = res.data.model
              })
          }
      },
      // 进入资讯页面
      toInfo () {
          this.$router.push('/information')
      }
    },
    mounted () {
        center.$on('data-info',(data)=>{
          this.getinfoData(data.id)
        })
    }
  }

</script>

<style lang="less" scoped>
  .information_box {
    /*width: 574px;*/
    flex: 1;
    margin: 0 12px;
    overflow: hidden;

    .title {
      width: 100%;
      height: 40px;
      background-color: #40597a;
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
      color: #ffffff;
      padding: 0 16px;
      position: relative;

      .after {
        /*content: '更多 >>';*/
        display: block;
        position: absolute;
        right: 16px;
        top: 0;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
      }
    }

    .information_main {
      width: calc(~'100% + 13px');
      height: calc(~'100% - 40px');
      background-color: #ffffff;
      padding: 0 17px;
      overflow: auto;

      .information_main_item {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e5e5e5;

        .information_main_item_content {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: calc(~'100% - 120px');
          font-size: 14px;
          color: #333333;
        }
        a{
          width: 100%;
          height: 50px;
          display: block;
          overflow: hidden;
        }
        span {
          float: right;
          width: 120px;
          text-align: right;
          display: inline-block;
          font-size: 12px;
          color: #999999;
        }
      }

      .information_main_item:hover {
        .information_main_item_content {
          color: #eb4242;
          font-weight: bold;
        }
      }

      .headlines_item {
        position: relative;
        padding-left: 20px;
        overflow: hidden;

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
            content: '';
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
          height: calc(~'100% - 16px');
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
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          /* autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
          margin-bottom: 16px;
        }

        .shares_item {
          width: calc(~'50% - 16px');
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
        margin: 5px 0;

        ul{
          width: 100%;
          overflow: hidden;
           li{
             padding: 5px 12px;
             background: #e0eefd;
             float: left;
             font-size: 16px;
             margin-right: 10px;
           }
          li.active{
            background: #308ef2;
            color: #fff;
          }
        }
      }

    }
  }

</style>
