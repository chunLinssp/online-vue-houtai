<template>
  <div>
       <table id="Examtable" >
        </table>
  </div>
</template>

<script>
import {userView} from '@/api/SysUser'

export default {
  data () {
    return {
      flag:''
    };
  },
  methods:{
      test: function(){
        alert('11');
      },
    createPage(){
   function headerStyle(column) {
    alert(column);
    return {
      userId:{
        css:{
          background : 'yellow'
        }
      }
    }[column.field]
  }

  $('#Examtable').bootstrapTable({
        url: 'http://localhost:8181/system/user',
        method: 'GET',
        uniqueId: 'id',                        // 绑定ID，不显示
        striped: false,                         //是否显示行间隔色
        cache: false,                          //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        sortable: true,                        //是否启用排序
        sortOrder: "asc",                      //排序方式
        sidePagination: "server",              //分页方式：client客户端分页，server服务端分页（*）
        undefinedText: '--',
        // singleSelect: true,                  // 单选checkbox，默认为复选
        showRefresh   : true,                  // 显示刷新按钮
        showColumns   : true,                  // 选择显示的列
        toolbar: '#item_info_toolbar',         // 搜索框位置
        strictSearch: true,
        theadClasses:'thead-dark',
        clickToSelect: true,                   // 点击选中行
        pagination: true,                      //是否显示分页
        pageNumber:1,                          //初始化加载第一页，默认第一页,并记录
        classes: "table table-bordered table-striped table-sm table-dark",
        pageSize:5,//每页显示的数量
        pageList: [5, 10, 20, 50, 100],//设置每页显示的数量
        paginationPreText:"上一页",
        paginationNextText:"下一页",
        paginationLoop:false,
        //showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        //cardView: false,                    //是否显示详细视图
        //detailView: false,                  //是否显示父子表
        //showPaginationSwitch: true,
        //得到查询的参数
        queryParams : function (params) {
          //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
          var temp = {
            pageSize: params.limit,                         //页面大小
            pageNumber: (params.offset / params.limit) + 1,   //页码
            sort: params.sort,      //排序列名
            sortOrder: params.order //排位命令（desc，asc）
          };
          return temp;
        },
        columns: [
          {
            checkbox: true
          },{
            field: 'userId',
            title:'用户编号',
            sortable: true
          },{
            field: 'userName',
            title:'用户名',
            sortable: true
          },{
            field: 'sex',
            title:'性别',
            sortable: true,
            formatter:userSexView
          },{
            field: 'phonenumber',
            title:'联系电话',
            sortable: true
          },{
            field: 'userType',
            title:'用户类型',
            sortable: true,
            formatter:userTypeView
          },{
            field: 'status',
            title:'用户状态',
            sortable: true,
            formatter: userStatusView
          },{
              field: 'operate',
              title:'操作',
              formatter: operateFormatter,
          }
        ],
        onLoadSuccess: function () {
          // alert('表格加载成功！');
        },
        onLoadError: function () {
          showTips("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
          var id = row.ID;
          //EditViewById(id, 'view');
        },
        rowStyle: function (row, index) { //设置行的特殊样式
          //这里有5个取值颜色['active', 'success', 'info', 'warning', 'danger'];
          var strclass = "";
          if (index == 1) {
            strclass = "warning";
            console.log(row);
          }
          return { classes: strclass }
        }
      });

      function getSelectValue(){
        var a = $table.bootstrapTable('getSelections');//获取选中行的数据
        if(a.length > 0){
          console.log(a);
        }
      }

      function userTypeView(value,row,index) {
        var type = '';
        if(value === '00') {
          type = '<span class="label label-success">管理员</span>';
        } else {
          type = '<span class="label label-primary">网站用户</span>';
        }
      }

      function userSexView(value,row,index) {
        var sex = '';
        if(value === '1') {
          sex = '<span class="label label-info">男</span>';
        }else {
          sex = '<span class="label label-info">女</span>';
        }
        return sex;
      }

      function userStatusView(value,row,index){
        // console.log(value+","+row+","+index);
        if(value === 0) {
          alert('11');
        }else {
          var status = '<div class="btn-group">'+
                  '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                   '正常 <span class="caret"></span>'+
                 '</button>'+
                  '<ul class="dropdown-menu">'+
                   '<li><a href="#" v-on:click="test()">关闭</a></li>'+
                  '</ul>'+
                '</div>';
          return status;
          }
      }
     
      function operateFormatter (value, row, index) {
        var result = '<button class="btn  btn-action" title="激活USBKEY认证" onclick="test()">'+
        '<i class="glyphicon glyphicon-pencil"></i></button>';
        return result;
      }
    }
  },
  created(){
    
  },
  activated(){
    alert('22');
  },
  mounted(){
    this.createPage();
  }
    
}

</script>
<style>
</style>