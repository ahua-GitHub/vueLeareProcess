module.exports = {
    // devServer:{
    //     proxy:'http://localhost:5000'
    // },
    lintOnSave:false,//关闭语法检查
    devServer:{
        proxy:{
            'api1':{//匹配所有以'api1'开头的路径
                target:'http://localhost:5000', //代理目标的基础路径
                ws:true,
                changeOrigin:true, //true:服务器收到的请求头中的host为：主机名:目标端口号(localhost:5000) false:localhost:8080
                pathRewrite:{
                       '^/api1':''//将'api1'替换成空，不然代理服务器会使用'http://主机名:目标端口号/api1/资源路径'请求资源(http://localhost:api1/5000/sourse)                }
                }
            },
            // 'api2':{//匹配所有以'api2'开头的路径

            //     target:'http://localhost:5001',
            //     changeOrigin:true, 
            //     pathRewrite:{
            //         '^/api2':''  
            //     }

            // },
        }
    }
}