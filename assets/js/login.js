$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () { 
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登陆的链接
    $('#link_login').on('click', function () { 
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 获取layui中的form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 通过verify函数()自定义了密码的校验规则
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repass: function (val) { 
            var pass = $(".reg-box [name=password]").val();
            if (pass !== val) {
                return '两次输入的密码不一致';
            }
         }
    })

    // 监听注册表单的提交事件
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: {
                username:$('#reg_form [name=username]').val(),
                password:$('#reg_form [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                    $('#link_login').click();
                }
                
            }
        });
    })
    // 监听登录表单的注册事件
    $('#login_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 快速获取表单数据
            data: $(this).serialize(), 
            success: function (res) {
                if (res.status !== 0) {
                  return  layer.msg('登录失败')
                } else {
                    layer.msg(res.message);
                    // 将登录成功得到的token字符串，保存到localStorage中
                    localStorage.setItem('token',res.token)
                    // 跳转到后台主页
                    location.href = "/大事件项目/index.html";
                }
            }
        })
    })
  })