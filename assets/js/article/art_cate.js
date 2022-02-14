$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        });
    }
    var indexAdd = null;
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function () { 
        // 返回值是一个索引号，通过索引号关闭弹窗
        indexAdd=layer.open({
            // 页面层，默认是0信息框
            type: 1,
            // 设置宽高
            area:["500px","250px"],
            title: '添加文章分类',
            content:$('#dialog-add').html()
        })
    })

    // form-add为动态生成，页面还没有这个元素，没办法直接绑定
    // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit','#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList();
                layer.msg(res.message)
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
                // $('#form-add')[0].reset(); 重置表单内容
            }
       })
    })
    // 通过代理的形式，为btn-edit按钮绑定事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit=layer.open({
            // 页面层，默认是0信息框
            type: 1,
            // 设置宽高
            area:["500px","250px"],
            title: '修改文章分类',
            content:$('#dialog-edit').html()
        })


        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            // method 和 type 两种方法都可以
            method: 'get',
            url: '/my/article/cates/'+id,
            success: function (res) {
                 form.val('form-edit',res.data)
            },

        })
        
    })
    // 通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类成功！')
                layer.close(indexEdit)
                initArtCateList();
            }
        })
    })
    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
            
           
          });
    })
})