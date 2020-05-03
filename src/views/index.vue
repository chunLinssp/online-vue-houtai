<template>
  <el-container class="Mycontainer">
    <el-aside class="myAside" width="240px">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu :index="'\''+index + '\''" v-for="(item,index) in menuMap" :key="index">
        <template slot="title"><i class="el-icon-message"></i>{{ item.mainMenu }}</template>
        <el-menu-item-group v-for="(it,order) in item.children" :key="order">
          <el-menu-item @click="tableView(it.childrenMenu,it.url)">{{it.childrenMenu}} {{ it.url }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
        <div class="bread-record">
            <el-breadcrumb separator="/" ref="breadRecord">
                <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    
       <el-card shadow="always" class="view-card">
        <transition name="slide-fade">
            <router-view />
        </transition>
       </el-card>
     
    </el-main>
</el-container>
</template>

<script>
import {loadIndex} from '@/api/SysUser'

export default {
  data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        screenHeight:100,
        menuMap:[{
           mainMenu:'',
           children:[
            {
              childrenMenu:'',
              url:''
            }
          ]
        }]
      }
  },
  created() {
    let that = this;
    loadIndex().then(data =>{
      console.log(data);
      that.menuMap = [];
      for(var i=0;i<data.data.length;i++) {
        var menu = {mainMenu:'',children:[]};
        var temp = data.data[i];
        menu.mainMenu = temp.menuName;
        var ch = temp.children;
        for(var j =0;j<ch.length;j++) {
          var chMenu = {childrenMenu:'',url:''};
          chMenu.childrenMenu = ch[j].menuName;
          chMenu.url = ch[j].url;
          menu.children.push(chMenu);
        }
        if(menu.mainMenu !== '') {
          that.menuMap.push(menu);
        }
      }
      console.log(that.menuMap);      
    })
  },
  methods:{
    tableView(name,url) {
      /** 面包屑添加 **/
      // this.$refs.breadRecord.innerHTML = "11";
      // console.log(this.$refs);

      /** 页面跳转 **/
      this.$router.push({path : url});


    }
  }
 

}

</script>
<style>

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .24s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .myAside{
      background-color: #99CCFF;
  }

  .myAside ul{
      background-color: #99CCFF;
      border-left: 2px solid #fff;
      border-right: 0px solid #ffffff;
  }
  .myAside ul li div{
      color: black;
  }
  .myAside ul li{
      color: black;
  }
  .bread-record{

  }
  .bread-record{
      width: 100%;
      height: 60px;
  }
  .view-card{
    width: 100%;
    height: 80%;
    overflow:auto
  }
   
.el-menu-item.is-active {
    color: black;
}



@media screen and (max-height:1200px){
    .Mycontainer{ height:777px; }
}
@media screen and (max-height: 800px) {
    .Mycontainer{ height: 590px;}
}
</style>