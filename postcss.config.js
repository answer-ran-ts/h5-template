module.exports = {

    publicPath: './',
    assetsDir: './',
    lintOnSave: false, //关闭eslint语法检测
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },
}