<template>
  <div class="box">
    <div
      v-html = "content"
      ref="content"
      :class="{content : isOpen == true, contentAll : isOpen == false,maxHeight: isHeight == true}"
      style="-webkit-box-orient: vertical;"
    ></div>

    <span v-show="isShow" @click="toChange()">{{isOpen ? '全文': '收起'}}sdfsdfsf</span>
  </div>

</template>

<script>
  import center from '../../plugins/center.js'
  export default{
     data () {
         return{
           isShow: false,
           isOpen: true,
           isHeight: false
         }
     },
     props: ['content'],
     methods:{
       toChange () {
         this.isOpen = !this.isOpen
         this.isHeight = !this.isHeight
       }
     },
     mounted () {
         center.$on('content',()=>{
           if (this.$refs.content) {
             var content = this.$refs.content.offsetHeight
             if (content/25 > 3 ) {
               this.isShow = true
               this.isHeight = true
               this.isOpen = true
             }
           }
         })
//         var content = this.$refs.content.offsetHeight
//         if (content/25 > 3 ) {
//             this.isShow = true
//             this.isHeight = true
//         }
     }
 }

</script>

<style lang="less" scoped>
  .box{
    width: 100%;
    overflow: hidden;
    position: relative;

    .content {
      width: 100%;
      color: #333333;
      font-size: 14px;
      margin-bottom: 10px;
      /*display: -webkit-box;*/
      /*-webkit-line-clamp: 3;*/
      /*-webkit-box-orient: vertical;*/
      overflow: hidden;
      line-height: 25px;
      /*max-height: 75px;*/
      /*text-overflow: ellipsis;*/
      margin-top: 10px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .maxHeight{
      max-height: 75px;
    }
    span{
      position: absolute;
      right: 0;
      bottom: 10px;
      display: block;
      width: 100px;
      height: 25px;
      color: #308ef2;
      background: linear-gradient(to right, rgba(255,255,255,0.5) 70%, #fff 55%);
      text-align: right;
      cursor: pointer;
    }
    .contentAll{
      width: 100%;
      color: #333333;
      font-size: 14px;
      margin-bottom: 10px;
      overflow: hidden;
      line-height: 25px;
      height: auto;
      margin-top: 10px;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
</style>
