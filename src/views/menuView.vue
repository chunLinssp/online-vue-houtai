<template>
  <div>
    <table id="menuTable"></table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted(){
      this.createPage();
  },
  methods:{
    createPage(){
    $('#menuTable').bootstrapTable({
        url: 'http://localhost:8181/system/menu',
        method: 'GET',
        uniqueId: 'menuId',                        // 绑定ID，不显示
        striped: false,                         //是否显示行间隔色
        cache: false,                          //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        sortable: true,                        //是否启用排序
        sortOrder: "asc",                      //排序方式
        sidePagination: "server",              //分页方式：client客户端分页，server服务端分页（*）
        undefinedText: '--',
        // singleSelect: true,                  // 单选checkbox，默认为复选
        showRefresh   : true,                  // 显示刷新按钮
        showColumns   : true,                  // 选择显示的列
        treeShowField: 'menuName',
        parentIdField: 'menuId',
        toolbar: '#item_info_toolbar',         // 搜索框位置
        strictSearch: true,
        clickToSelect: true,                   // 点击选中行
        pagination: true,                      //是否显示分页
        pageNumber:1,                          //初始化加载第一页，默认第一页,并记录
        pageSize:150,//每页显示的数量
        pageList: [5, 10, 20, 50, 100],//设置每页显示的数量
        paginationPreText:"上一页",
        paginationNextText:"下一页",
        paginationLoop:false,
        // onPostBody: function() {
        // var columns = $table.bootstrapTable('getOptions').columns
        //     if (columns && columns[0][1].visible) {
        //     $table.treegrid({
        //         treeColumn: 1,
        //         onChange: function() {
        //           $table.bootstrapTable('resetWidth');
        //         }
        //     })
        //     }
        //  },
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
          } ,{ 
            field: 'menuName',
            title:'菜单名称',
            sortable: true
          },{
            field: 'url',
            title:'请求地址',
            sortable: true
          },{
            field: 'menuType',
            title:'菜单分类',
            sortable: true,
            formatter:typeView
          },
          {
            field: 'perms',
            title:'菜单权限定名',
            sortable: true
          },{
              field: 'operate',
              title:'操作',
              formatter: operateFormatter,
          }
        ],
        onLoadSuccess: function (data) {
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
          if (index == 0) {
            strclass = "active";
            console.log(row);
          }
          return { classes: strclass }
        },
        headerStyle: function(column) {
            return{
                menuName:{css:{background:'yellow'}}
            }[column.field]
        }
      });

      function getSelectValue(){
        var a = $table.bootstrapTable('getSelections');//获取选中行的数据
        if(a.length > 0){
          console.log(a);
        }
      }

      function typeView(value,row,index) {
        var type = '';
        if(value === 'M') {
          type = '<span class="label label-success">目录</span>';
        } else if(value === 'C'){
          type = '<span class="label label-primary">菜单</span>';
        } else if(value === 'F') {
          type = '<span class="label label-primary">操作</span>';
        }
        return type;
      }
     
      function operateFormatter (value, row, index) {
        var result = '<button class="btn  btn-action" title="激活USBKEY认证" onclick="test()">'+
        '<i class="glyphicon glyphicon-pencil"></i></button>';
        return result;
      }

     
    }
  }
}

</script>
<style >
</style>