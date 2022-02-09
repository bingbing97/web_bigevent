$(function () {
    getUserInfo()
    var layer = layui.layer;
    // 点击按钮，实现退出功能
    $('#login_out').on('click', function () {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清空本地存储token
            localStorage.removeItem('token')
            // 重新回到登录页面
            location.href = '/大事件项目/login.html'
            // 关闭confirm询问框
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        // 请求头配置对象
        // headers: {
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function (res) {
            if (res.status !== 0) {
               return layui.layer.msg('获取用户头像失败！')
            } else {
                // 渲染头像，昵称
                renderAvater(res.data)
           }
        },
        // 不管请求成功还是失败，都会执行complete函数
        // complete: function (res) {
        //     // console.log(res);
        //     // 在complete函数中，可以使用responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //     //   强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转回login页面
        //         location.href='/大事件项目/login.html'
        //   }
        // }
    });
}

function renderAvater(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
       
    }
    
}