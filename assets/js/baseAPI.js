// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用$.ajaxPrefilter()这个函数
// 在这个函数中,可以拿到我们给ajax提供的配置对象
// 在每个请求发送之前且被 $.ajax() 处理之前，处理自定义 Ajax 选项或修改已存在选项
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007'+options.url;
    // console.log(options.url);
     // 统一为有权限的接口设置headers请求头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
   
    //全局统一挂载complete函数
    //  不管请求成功还是失败，都会执行complete函数
    options.complete=function (res) {
            // console.log(res);
            // 在complete函数中，可以使用responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            //   强制清空token
                localStorage.removeItem('token');
                // 强制跳转回login页面
                location.href='/大事件项目/login.html'
          }
        }
})