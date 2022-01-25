
export default {
  ssr: true,/*false,
  target: 'static',
  
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | AquPEX Legends',
    title: 'AquPEX Legends',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'content-language', content:'ja' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: `【非公式】湊あくあ APEX ソロマスターチャレンジ応援サイト` },
        { hid: 'keywords', name: 'keywords', content: '湊あくあ,APEX,ソロマスターチャレンジ' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'AquPEX Legends' },
        { hid: 'og:card', property: 'og:type', content: 'summary_large_image' },
        { hid: 'og:image', property: 'og:image', content: 'https://apex.akukin.jp/ogp_top.png' },
        { hid: 'og:url', property: 'og:url', content: 'https://apex.akukin.jp/' },
        { hid: 'og:title', property: 'og:title', content: `AquPEX Legends` },
        { hid: 'og:description', property: 'og:description', content: '【非公式】湊あくあ APEX ソロマスターチャレンジ応援サイト' },
        { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ],
    script: [
      { src: 'https://www.youtube.com/iframe_api' },
    ]

  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/utils'
//      '@/plugins/OrbitControls'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'GTM-N9FH8KW',
    pageTracking: true,
    pageViewEventName: 'nuxtRoute',
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    analyze: false,
    hardSource: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
