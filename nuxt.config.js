const pkg = require('./package')

//expressJS
const bodyParser = require('body-parser');


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:"https://fonts.googleapis.com/css?family=Open+Sans"}
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
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  axios:{
    baseURL:process.env.BASE_URL || 'https://nuxt-blog-2affd.firebaseio.com',
    credentials:false
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
    
  },
  env:{
    // baseUrl:
    fbAPIKey:'AIzaSyCV4OescSEJzoOzOLjDQGjO1V3kOmucE7k' 
  },
  transition:{
    name:'fade',
    mode:'out-in'
  },

  //nodejs SERVER
  serverMiddleware:[
    bodyParser.json(),
    '~/api'
  ]
}
