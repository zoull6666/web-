<template>
    <div class="friend_circle">
       <div class='friend_circle_img'>
          <div class='img':style="{backgroundImage:'url('+friendCircle.avatar+')'}">
              <!--<img :src='friendCircle.avatar' alt="">-->
              <img :src="friendCircle.appUserSymbolPath" v-if="friendCircle.appUserSymbolPath"/>
          </div>
       </div>
       <div class='friend_circle_content'>
           <div>
               <p class='name bigSize'>{{friendCircle.nickName}}</p>
               <p v-if='!isFriendCircle' class='time'>{{friendCircle.createTime | formatDate}}</p>
               <p class="topic">{{friendCircle.topic}}</p>
            </div>
           <!--<p v-html="friendCircle.content.replace(/(<[^\s\/>]+)\b[^>]*>/gi,'$1>')" class='text'></p>-->
           <content1-com
             :content = friendCircle.content
             @openDownloadCode = "openDownloadCode"
           ></content1-com>
           <div v-if='false' class="clearfix stock_name_box">
               <div class="stock_name">
                    <div class="div">
                        <span class='name'>华子科技</span>
                        <!-- <span class='code'> (233232)</span> -->
                    </div>
                    <div class="div">129.01</div>
                    <div class="div">+10000%</div>
                </div>
               <div class="stock_name">
                    <div class="div">
                        <span class='name'>华子科技</span>
                        <!-- <span class='code'> (233232)</span> -->
                    </div>
                    <div class="div">129.01</div>
                    <div class="div">+10000%</div>
                </div>
           </div>
           <div class='conment_imgs'>
               <!--<div v-for='(img , index) in friendCircle.communityImgList' :key='index' class='imgs_item'>-->
                   <!--<img :src="img.dataVal" alt="">-->
                 <img :src="img.dataVal"  preview="2" class="thumbnail" v-for='(img , index) in friendCircle.communityImgList' :key='index' v-if="friendCircle.communityImgList.length == 1"/>
                 <img :src="img.dataVal"  preview="2" class="thumbnail active span"  v-for='(img , index) in friendCircle.communityImgList' :key='index' v-if="friendCircle.communityImgList.length == 4"/>
                 <img :src="img.dataVal"  preview="2" class="thumbnail span" v-for='(img , index) in friendCircle.communityImgList' :key='index' v-if="friendCircle.communityImgList.length != 1 && friendCircle.communityImgList.length != 4"/>
               <!--</div>-->
           </div>
           <div class='time_info'>
               <div class='time'>
                  <!--<span v-if='!isFriendCircle' class='reply'>最新回帖：</span>-->
                  <!--<span v-if='!isFriendCircle'>{{friendCircle.updateTime | formatDate}}</span>-->
                  <!--<span v-if='isFriendCircle'>{{friendCircle.createTime | formatDate}}</span>-->
               </div>
               <div class='approval'>
                   <span>点赞{{friendCircle.pariseNumber}}</span>
                   <span>评论{{friendCircle.commentNumber}}</span>
               </div>
           </div>
           <div v-if='friendCircle.communityCommentDtoList' class='review_box'>
               <div v-for='(c , index) in friendCircle.communityCommentDtoList' :key='c.id' class='review'>
                   <span class='name'>{{c.nickName}}：</span>
                  <span v-if='c.parentNickName' >
                       回复&nbsp;<span class='name'>{{c.parentNickName}}</span>
                  </span>
                   <span class='content'>{{c.statement}}</span>
               </div>

               <div v-show='friendCircle.communityCommentDtoList.length>=10' @click='showMore' class='more_reply'>展开更多回复<i></i></div>
           </div>
        </div>
       <down-load ref='download' />
    </div>
</template>

<script>
import dayjs from 'dayjs'
import content1Com from '../content1/content.vue'
import center from '../../plugins/center.js'
export default {
    name: 'FriendCircle',
    props:{
        friendCircle:Object,
        isFriendCircle:Boolean
    },
    data: function() {
        return {

        }
    },
    filters:{
        formatDate(time){
            return dayjs(time).format('YYYY-MM-DD HH:mm')
        }
    },
    methods: {
        showMore(){
          this.$refs['download'].open()
        },
        openDownloadCode(){
          this.$refs['download'].open()
          _czc.push(["_trackEvent",'桌面官网','下载','大v主页点击更多']);
        },
    },
    mounted () {
        // 触发文章显示组件的方法
        center.$emit('contentOne')
    },
    components:{
      content1Com
    }
}
</script>

<style src="./FriendCircle.less" lang="less" scoped></style>
