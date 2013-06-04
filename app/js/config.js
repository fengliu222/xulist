seajs.config({
  // 配置插件
  plugins: ['shim'],
  base: 'http://127.0.0.1/',

  // 配置别名
  alias: {
    // 配置 jquery 的 shim 配置，这样我们就可以通过 require('jquery') 来获取 jQuery
    'jquery': {
      src: 'js/lib/jquery.js',
      exports: 'jQuery'
    },
    'backbone':{
      src: 'js/lib/backbone-min.js',
      exports: 'Backbone'
    },
    '_':{
      src: 'js/lib/underscore-min.js',
      exports: '_'
    },
    'Store':{
      src: 'js/lib/backbone.localStorage-min.js',
      exports: 'Store'
    }
  }
});