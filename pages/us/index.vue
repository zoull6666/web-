<template>
  <div class="page" id="us">
    <img src="../../static/img/aboutUs/banner_about.png">
    <ul>
      <li style="margin-left: 41%;border-right: 1px solid #ccc" :class="{ active: 1 == navIndex ? true : false }"
          @click="tabAct(1)">公司介绍</li>
      <li :class="{ active: 2 == navIndex ? true : false }" @click="tabAct(2)">联系我们</li>
    </ul>
    <div class="Company-introduction" v-if="1 == tabIndex">
      <div class="Introduction">
        <h3>公司简介</h3>
        <i></i>
        <div class="Introduction-content">
          <div class="Introduction-content-l">
            <h4>欢迎来到将军财富~</h4>
            <p>将军财富起源于2016年3月，前身是正军投资，于2018年7月战略升级为将军财富。由创始人兼CEO黄胜军先生投资创办，是目前中国领先的，专门为国内普通股民提供证券期货投资综合服务的专业门户之一。目前已联合多家财经媒体，金融软件技术公司，证券公司，期货公司开展战略合作！将军财富集团主要提供：热门财经新闻发布，证券与期货投研报告，证券期货开户经纪，投资咨询，金融资产管理，AI智能量化交易软件，证券期货私募基金等多元服务。集团现已上线运营的有PC官网<a href="http://www.jiangjuncj.com" target="_blank"> www.jiangjuncj.com</a>、安卓IOS移动端APP（大牛市）凭借在证券服务领域内多年的运作经验，雄厚的人才、技术储备等多方面优势，为投资者提供最专业、最权威、最及时的证券及期货交易解决方案。集团也希望借此为中国证券和期货产业发展做出贡献！</p>
          </div>
          <div class="Introduction-content-r">
            <img src="../../static/img/aboutUs/aboutUs2.png" />
          </div>
        </div>
      </div>
      <div class="banner">
        <img src="../../static/img/aboutUs/aboutUs3.jpg" />
        <h3>公司价值观&企业文化</h3>
        <i></i>
        <div class="banner-b">
          <h4>◆ 企业发展理念：创造、创意、创新</h4>
          <h4>◆ 企业服务理念：务实高效，诚信双赢</h4>
          <h4>◆ 企业管理理念：规范严谨，砥砺前行</h4>
          <h4>◆ 企业核心价值观：为公司使命奋斗的战士，做客户资产保值的将军。</h4>
          <!--<h4>◆ 企业使命：让天下没有难炒的股票</h4>-->
        </div>
      </div>
      <div class="development">
        <h3>发展历程</h3>
        <i></i>
        <img src="../../static/img/aboutUs/fazhanlicheng.png" />
      </div>
    </div>
    <div class="Contact-us" v-if="2 == tabIndex">
      <div class="map">
        <no-ssr>
          <el-amap vid="amap" class="amap-demo bm-view" :center="center" :zoom="zoom">
            <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :label="marker.label"  :vid="index"></el-amap-marker>
          </el-amap>
        </no-ssr>
        <div class="mask">
          <p>工作日：09:00-18:00</p>
          <p>联系电话：020-31605179</p>
          <p>广州市天河区中山大道中1037号鸿德广场601</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import center from '../../plugins/center.js'
  export default {
    data() {
      let content = '广州将军信息技术有限公司'
      return {
        tabIndex: 1,
        center:[
          113.4198300000,
          23.1177500000
        ],
        markers: [
          {
            position: [113.4198300000, 23.1177500000],
            events: {
              dragend: (e) => {
                console.log('---event---: dragend')
                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
              }
            },
            visible: true,
            draggable: false,
            template: '<span>1</span>',
            label:{
              content,
              offset: [-60, -30]
            },
          }
        ],
        zoom: 17,
        loaded: false,
        navIndex: 1,
        index: 3,
      }
    },
   components: {

   },
    methods: {
      tabAct(index) {
        this.tabIndex = index
        this.navIndex = index
      },
    },
    mounted () {
      center.$emit('tabChange',4)
    }
  }

</script>

<style scoped>
  #us {
    padding-top: 60px;
    background: #fff;
  }

  img {
    width: 100%;
    /*height: 10rem;*/
  }

  .page ul {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .page ul li {
    font-size: 14px;
    color: #333;
    float: left;
    padding: 0 25px;
    margin-top: 50px;
    height: 16px;
    cursor: pointer;
  }

  .page ul li.active {
    color: #eb4242;
  }

  .Introduction {
    width: 1200px;
    margin: 70px auto;
    overflow: hidden;
    text-align: center;
  }

  .Introduction h3 {
    font-size: 30px;
    color: #333;
    /*margin-top: 1.4rem;*/
  }

  .Introduction i {
    width: 90px;
    height: 1px;
    background: #333;
    display: inline-block;
    margin-top: 50px;
  }

  .Introduction .Introduction-content {
    width: 1200px;
    overflow: hidden;
    margin-top: 50px;
  }

  .Introduction .Introduction-content .Introduction-content-l {
    width: 540px;
    height: 300px;
    float: left;
  }

  .Introduction-content .Introduction-content-l h4 {
    font-size: 24px;
    color: #333;
    text-align: left;
  }

  .Introduction-content .Introduction-content-l p {
    font-size: 15px;
    color: #333;
    margin-top: 15px;
    width: 100%;
    line-height: 23px;
    text-align: left;
    /*font-family: MicrosoftYaHei;*/
    letter-spacing: 2px;
  }

  .Introduction-content .Introduction-content-r {
    width: 540px;
    height: 300px;
    float: right;
  }

  .Introduction-content .Introduction-content-r img {
    width: 100%;
    height: 100%;
  }

  .banner {
    width: 100%;
    height: 446px;
    position: relative;
    text-align: center;
  }

  .banner img {
    width: 100%;
    height: 100%;
  }

  .banner h3 {
    position: absolute;
    left: 50%;
    top: 17%;
    font-size: 30px;
    color: #fff;
    display: inline-block;
    margin: -1em 0 0 -4.5em;
  }

  .banner i {
    width: 90px;
    height: 2px;
    background: #fff;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 40%;
    margin: -1em 0 0 -2.8em;
  }

  .banner .banner-b {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -1em 0 0 -17.3em;
  }

  .banner .banner-b h4 {
    font-size: 18px;
    color: #fff;
    margin-top: 10px;
  }

  .development {
    width: 100%;
    padding-bottom: 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .development h3 {
    font-size: 36px;
    color: #333;
    margin-top: 36px;
  }

  .development i {
    width: 36px;
    height: 2px;
    background: #333;
    display: inline-block;
    margin-top: 30px;
  }

  .development img {
    width: 100%;
    margin-top: 125px;
  }

  .development span {
    font-size: 16px;
    position: absolute;
    width: 250px;
    display: block;
  }

  .development p {
    font-size: 24px;
    position: absolute;
  }

  .map {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .bm-view {
    width: 1200px;
    height: 680px;
    margin: 80px auto;
  }

  .mask {
    width: 270px;
    height: 230px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 30%;
    top: 15%;
  }

  .mask p {
    width: 80%;
    font-size: 16px;
    color: #fff;
    margin-top: 25px;
    margin-left: 20px;
    text-align: left;
  }

</style>
