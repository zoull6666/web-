<template>
  <div class="nav">
    <div class="prev_btn" @click="prevAct()" v-show="isbtnShow"></div>
    <div class="nav_main">
      <div class="nav_main_position list">
        <div class="nav_main_item" v-for="(item,index) in navArr" :key="index" :class="{'nav_main_item_active':index == navIndex}" @click="navChange(index,item.id)">{{item.name}}</div>
      </div>
    </div>
    <div class="next_btn" @click="nextAct()" v-show="isbtnShow"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import center from "../../plugins/center.js"
  import urlApi from "../../plugins/urlApi.js";
  export default{
      data () {
          return{
             navArr: [],
             navIndex: 0,
             url: urlApi.testUrl,
             id: '',
             index: 0,
             isbtnShow: false
          }
      },
      created () {
          this.getNavdata()
      },
      methods:{
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
                   if (this.navArr.length>8) {
                       this.isbtnShow = true
                   } else {
                       this.isbtnShow = false
                   }
//                   this.navArr.splice(0,1)
                   this.id = this.navArr[0].id
                 })
          },
          // 获取指定频道下的资讯列表
          navChange (index,id) {
            this.navIndex = index
            this.id = id
            center.$emit('data-info',{index: index,id: id})
          },
          // nav下移
          nextAct () {
            var list = document.querySelector('.list')
            if (this.navArr.length > 7) {
                if (this.index < (this.navArr.length-7)) {
                  this.index++
                  list.style.top = -50*(this.index) + 'px'
                }
            }
            console.log(this.navArr.length)
          },
          // nav上移
          prevAct () {
            var list = document.querySelector('.list')
            if (this.index > 0 ){
              this.index--
              list.style.top = 0+ 50*(this.index) + 'px'
            }
          }
      }
  }
</script>

<style lang="less" scoped>
  .nav {
    width: 150px;
    height: 100%;
    background-color: #00214d;
    overflow: hidden;
    float: left;

    .prev_btn,
    .next_btn {
      width: 100%;
      height: 25px;
      background-size: 16px 12px;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }

    .prev_btn {
      background-image: url(../../static/img/ic_arrow_up.png);
    }

    .next_btn {
      background-image: url(../../static/img/ic_arrow_down.png);
    }

    .nav_main {
      width: 100%;
      height: calc(~'100% - 50px');
      padding: 0 30px;
      overflow: hidden;
      position: relative;

      .nav_main_position{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;


        .nav_main_item {
          width: 100%;
          height: 49px;
          font-size: 14px;
          text-align: center;
          line-height: 49px;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6)
        }

        .nav_main_item_active {
          color: rgba(255, 255, 255);
          position: relative;

          &:before {
            content: '';
            display: block;
            width: 4px;
            height: 4px;
            border-radius: 100px;
            background-color: #eb4242;
            position: absolute;
            left: 25px;
            top: calc(~'50% - 2px');
          }
        }
      }

    }
  }

</style>
