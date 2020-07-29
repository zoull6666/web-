<template>
  <footer>
    <div class="foot_main">
      <div class="qr_box">
        <div class="qr_box_item"></div>
        <!--<div class="qr_box_item"></div>-->
      </div>
      <div class="foot_nav">
        <div @click='$router.push({name: "index"})' class="foot_nav_item">首页</div>
        <div  @click='$router.push({name: "downApp"})' class="foot_nav_item">下载</div>
        <div class="foot_nav_item"><router-link :to="'/agreement/'" target="_blank">服务协议</router-link></div>
        <!--<router-link :to="/agreement/" target="_blank"><div class="foot_nav_item">服务协议</div></router-link>-->
        <div  @click='$router.push({name: "us"})' class="foot_nav_item">关于我们</div>
      </div>
      <div class="tel">联系电话：020-31605179</div>
      <div class="describe">大牛市上的所有内容均来自市场公开信息，仅供参考研究，不构成操作建议。不可视为购买或出售证券、期货或其他投资产品的建议。所有信息及数据仅供投资者参考，所有历史数据均不可视为对未来走势的判断依据。投资者应仔细了解相关金融产品，明确其风险因素及自身的风险承受能力，或咨询专业投资顾问的建议。投资有风险，入市须谨慎。</div>
    </div>
    <div class="bottom"><p>© 2018 广州将军信息技术有限公司All Rights Reserved <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备18062024号-1</a></p> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602007099" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;float: left;margin-top: 10px"><img src="../static/img/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">粤公网安备 44010602007099号</p></a>
    </div>
    <!--<div style="width:300px;margin:0 auto; padding:20px 0;">-->
      <!--<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602007099" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../static/img/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">粤公网安备 44010602007099号</p></a>-->
    <!--</div>-->
  </footer>
</template>

<script>
  export default {}

</script>


<style lang="less" scoped>
  @import "../assets/less/currency";

  footer {
    .w100();
    height: 364px;
    background-color: #596e8b;
    position: relative;
    min-width: 1200px;


    .foot_main {
      padding-top: 66px;
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      background-color: #596e8b;

      .foot_nav {
        margin-bottom: 50px;

        .foot_nav_item {
          cursor: pointer;
          float: left;
          font-size: 12px;
          padding: 0 25px;
          //   background: #234234;
          border-right: 1px solid #ffffff;
          color: #fff;
          a{
            color: #fff;
          }
          &:nth-child(1) {
            padding-left: 0;
          }

          &:last-child {
            padding-right: 0;
            border: none;
          }
        }
      }

      .tel {
        font-size: 24px;
        color: #ffffff;
        padding-left: 40px;
        position: relative;
        padding-bottom: 70px;

        &:before {
          content: '';
          display: block;
          position: absolute;
          width: 28px;
          height: 28px;
          background-color: #00214d;
          border-radius: 100px;
          background-image: url(../static/img/ic_phone.png);
          background-size: 15px 15px;
          background-repeat: no-repeat;
          background-position: center;
          left: 0;
        }
      }

      .describe {
        font-size: 12px;
        color: #ffffff;
      }

      .qr_box {
        float: right;

        .qr_box_item {
          float: left;
          width: 90px;
          height: 90px;
          background-image: url(../static/img/xzapp.png);
          background-size: cover;
          background-position: center;
          margin-left: 90px;
          position: relative;

          &:nth-child(2) {
            background-image: url(../static/img/gzh.jpg);
          }

          &::before {
            .w100();
            content: '扫码下载APP';
            display: block;
            font-size: 12px;
            color: #ffffff;
            position: absolute;
            bottom: -40px;
            text-align: center;
          }

          &:nth-child(2)::before {
            content: '关注将军服务号';
            bottom: -40px;
          }
        }


      }
    }

    .bottom {
      height: 40px;
      .w100();
      background-color: #00214d;
      position: absolute;
      bottom: 0;
      line-height: 20px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      min-width: 1200px;
      p{
        float: left;
        margin-left: 35%;
        margin-top: 12px;
        margin-right: 10px;
      }
      a{
        color: #fff;
      }
    }
  }

</style>
