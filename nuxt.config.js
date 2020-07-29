const pkg = require('./package')

module.exports = {
  mode: 'universal',
  router: {
    mode: 'history'
  },

  /*
   ** Headers of the page
    */
  head: {
    title: "大牛市：股票高手、交易牛人",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: "referrer",
        content: "no-referrer"
      },
      {
        hid: 'description',
        name: 'description',
        content: "广州将军信息技术有限公司是一家依托金融投顾，投资者教育与信息传播的创新型科技企业。专业致力于提升投资者素质，互联网传媒的体验与新闻效率，公司遵循“创造、创意、创新”的发展理念，紧跟互联网发展潮流，践行金融科技平台的信息化运营和互联网金融项目的创意研发。 目前公司凭借着多年的市场沉淀与良好口碑，在广州金融投顾服务领域已经站稳脚跟，未来公司必将多元化发展，以线下带动线上，线上反哺线下，形成扎根于互联网的完整金融生态链。"
      },
      {
        name: "keywords",
        content: "证券、股票、炒股、将军、将军财富、将军财经、财经、金融、行情、市场、社区"
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'swiper/dist/css/swiper.css',
    {
      src: 'assets/less/index.less',
      lang: 'less'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
    src: "~/plugins/vueSwiper.js",
    ssr: false
    },
    {
      src: "~/plugins/globalComponent.js",
      ssr: false
    },
    {
      src: "~/plugins/vue-map.js",
      ssr: true
    },
    {
      src: "~/plugins/photoPreview.js",
      ssr: false
    },
    {
      src: "~/plugins/Code.js",
      ssr: false
    },
    {
      src: "~/plugins/statistical.js",
      ssr: false
    },
    {
      src: "~/plugins/yingru.js",
      ssr: false
    },
    {
      src: "~/plugins/request.js",
      ssr: false
    },
    {
      src: "~/plugins/center.js",
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    productionSourceMap: false,
    extend(config, ctx) {

    }
  }
}
