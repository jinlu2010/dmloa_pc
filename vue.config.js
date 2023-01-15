module.exports = {
    devServer: {
        proxy: {
            '/api': {// 使用"/api"来代替"http://f.apiplus.c"
                target: 'http://127.0.0.1:8001/', // 源地址
				//target: 'http://47.100.125.167:8082/', // 源地址
                changeOrigin: true, // 改变源
                pathRewrite: {
                    '^/api': '' // 路径重写
                }
            }
        }
    }
}
