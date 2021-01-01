export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/pcovid.ico' }
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
    { src: '@/plugins/apexchart.js', ssr: false },
    '~/plugins/dateFormatter',
    { src: '~/plugins/formatnumber.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-svg-loader'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */

  manifest: {
    name: "Pantau Covid-19",
    lang: 'idn',
    // 'display':'standalone',
    title: 'Pantau Covid-19',
    'og:title': 'Pantau Covid-19',
    description: 'Pantau Covid-19 lite',
    'og:description': 'test',
    theme_color: '#007f00',
    background_color: '#007f00',
    // start_url: `${dir}/`,
    short_name: "pantau covid-19"
  },
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
