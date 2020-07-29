<template>
  <div>
    <div class="nav">
      <div class="main nav_main">
        <img src="../static/img/logo.png" alt="将军财经" class="logo" @click="changeTab(0)">
        <div class="nav_warp">
          <div class="nav_item" v-for="(item, index) in nav" :key="index" :class="{'nav_item_active':index == tabindex}" @click="changeTab(index)">{{item}}</div>
          <!--<div class="nav_item"  :class="{nav_item_active: 0 == index ? true: false }" @click="changeTab(0)">首页</div>-->
          <!--<div class="nav_item"  :class="{nav_item_active: 1 == index ? true: false }" @click="changeTab(1)">高手问答</div>-->
          <!--<div class="nav_item"  :class="{nav_item_active: 2 == index ? true: false }" @click="changeTab(2)">将军社区</div>-->
          <!--<div class="nav_item"  :class="{nav_item_active: 3 == index ? true: false }" @click="changeTab(3)">产品下载</div>-->
          <!--<div class="nav_item"  :class="{nav_item_active: 4 == index ? true: false }" @click="changeTab(4)">关于我们</div>-->
        </div>
        <div class="search">
          <input v-model="keyword" type="text" placeholder="搜你想搜的...">
          <div @click='searchFun' class="btn"></div>
        </div>
      </div>
    </div>
    <nuxt />
    <com-foot></com-foot>
  </div>
</template>

<script>
  import Foot from '~/components/Foot'
  import center from '@/plugins/center.js'
  export default {
    components:{
      'com-foot':Foot
    },
    data() {
      return {
        nav: ['首页', '牛人社区','热门群聊','产品下载', '关于我们'],
        tabindex: 0,
        keyword:''
      }
    },
    methods:{
      searchFun() {
        // 统计点击数据
        _czc.push(["_trackEvent",'首页搜索','资讯视频']);
        if(!this.keyword) return
        let childrenArr = this.$children.map(v=>{
          return v.$el.className
        })
        if(childrenArr.includes('search_page')){

          this.$router.push({name:'search',query:{
            keyword:this.keyword
          }})
          let currentPage = this.$children[childrenArr.indexOf('search_page')]
          this.$route.query.keyword = this.keyword
          currentPage.$children[0].getNewsList()

          return
        }

        this.$router.push({name:'search',query:{
          keyword:this.keyword
        }})
      },
      changeTab (index) {
          this.tabindex = index
          if (index == 3) {
              this.$router.push('/downApp')
          } else if (index == 0) {
            this.$router.push('/')
          } else if(index == 1){
            this.$router.push('/community')
          } else if (index == 4){
            this.$router.push('/us')
          } else if (index == 2){
            this.$router.push('/group')
          }
      }
    },
    created () {
      center.$on('tabChange',(index)=>{
        this.tabindex = index
      })
    },
    watch:{
      '$route':function(to,from){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
//        window.pageYOffset = 0
      }
    },
    mounted () {
    }
  }

</script>


<style lang="less" scoped>
  @import "../assets/less/currency";
  .nav {
    .w100();
    height: 60px;
    background-color: #00214d;
    position: fixed;
    z-index: 20;

    .nav_main {
      .h100();
      width: 1200px;
      /*position: relative;*/
      overflow: hidden;
      margin: 0 auto;
      /*left:50%;*/
      /*top:50%;*/
      /*transform:translate(-50%,-50%);*/
      // background-color: aquamarine;

      .logo {
        display: block;
        float: left;
        margin-top: 15px;
        height: 26px;
        width: 91px;
        cursor: pointer;
        /*margin-left: 10px;*/
      }

      .nav_warp {
        float: left;
        height: 60px;
        margin-left: 180px;
        padding-top: 22px;

        .nav_item {
          color: #ffffff;
          float: left;
          font-size: 16px;
          padding: 0 8px;
          margin: 0 12px;
          cursor: pointer;
        }

        .nav_item_active {
          color: #eb4242;
          position: relative;

          &::after {
            content: '';
            width: 100%;
            display: block;
            border-bottom: 2px solid #eb4242;
            bottom: -17px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }

      .search {
        width: 300px;
        height: 32px;
        background-color: #ffffff;
        float: right;
        margin-top: 14px;
        border-radius: 16px;
        overflow: hidden;
        padding: 0 16px;

        input {
          .h100();
          width: calc(~'100% - 32px');
          border: none;
          float: left;
        }

        .btn {
          float: left;
          // background: #00214d;
          height: 100%;
          width: 32px;
          color: #fff;
          background-image: url(../static/img/ic_search.png);
          background-size: 16px 16px;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
  }

</style>
