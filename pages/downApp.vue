<template>
  <div>
    <div class="banner">
      <div class="center">
        <h3>大牛市APP</h3>
        <h5>股&nbsp;·&nbsp;票&nbsp;·&nbsp;高&nbsp;·&nbsp;手&nbsp;·&nbsp;交&nbsp;·&nbsp;易&nbsp;·&nbsp;牛&nbsp;·&nbsp;人</h5>
        <div class="downimg">
          <img src="../static/img/2wm.png" class="img02" /> <br>
          <p>扫码下载APP</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-one">
        <img src="../static/img/down_bg1.png" />
        <div style="position: absolute;left: 50%;top: 30%;margin: 1em 0 0 18em;">
          <p>热门选股</p>
          <h4>多模块拆解 · 专家级研究成果</h4>
        </div>
      </div>
      <div class="content-one">
        <img src="../static/img/down_bg2.png" />
        <div style="position: absolute;left: 50%;top: 30%;margin: 2em 0px 0px -33em;">
          <p>财经资讯</p>
          <h4>直播资讯视频·掌握第一手财经行情</h4>
        </div>
      </div>
      <div class="content-one">
        <img src="../static/img/down_bg3.png" />
        <div style="position: absolute;left: 50%;top: 30%;margin: 1em 0px 0px 18em;">
          <p>牛市战友圈</p>
          <h4>金V大神入驻 · 属于探索者的交流平台</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import center from '../plugins/center.js'
  export default{
      data () {
          return{

          }
      },
      components:{

      },
      mounted () {
        center.$emit('tabChange',3)
      }
  }

</script>

<style scoped>
  .banner {
    width: 100%;
    height: 680px;
    position: relative;
    background: url('../static/img/bg_app.png');
    background-size: 100% 100%;
  }
  .center{
    width: 334px;
    margin: 0 auto;
    padding-top: 133px;
  }
  .center h3{
    font-size: 32px;
    color: #ffffff;
    text-align: center;
  }
  .center h5{
    font-size: 16px;
    color: #fff;
    margin-top: 44px;
    text-align: center;
  }
  .center .downimg{
    margin-top: 103px;
    text-align: center;
  }
  .center .downimg img{
    width: 180px;
    height: 180px;
  }
  .center .downimg p{
    width: 100%;
    height: 36px;
    line-height: 36px;
    border: 1px solid #fff;
    font-size: 12px;
    color: #fff;
    margin-top: 75px;
  }
  .content {
    width: 100%;
    overflow: hidden;
    min-width: 1200px;
  }

  .content .content-one {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .content .content-one img {
    width: 100%;
    /*height: 14rem;*/
  }

  .content .content-one p {
    font-family: MicrosoftYaHei-Bold;
    font-size: 50px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 3px;
    color: #333333;
  }

  .content .content-one h4 {
    font-family: MicrosoftYaHeiLight;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #333333;
  }
</style>
