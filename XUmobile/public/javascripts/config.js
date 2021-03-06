seajs.config({
    // 配置插件
    plugins: ['shim'],
    paths: {
        'lib': '/javascripts/lib'
    },
    // 配置别名
    alias: {
        // 配置 jquery 的 shim 配置，这样我们就可以通过 require('jquery') 来获取 jQuery
        'jquery': {
            src: 'lib/jquery.js',
            exports: 'jQuery'
        }
    }
});