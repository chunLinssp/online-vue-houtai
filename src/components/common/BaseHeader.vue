<template>
  <div class="header">
    <div class="header-logo">
        <img src="@/assets/logo.png" />
    </div>
    <div class="header-center">

    </div>
    <div class="header-info">
        <el-dropdown>
            <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

   
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
 
};
</script>
<style>

*{
    margin:0;
    padding: 0;
}

.header{
    width: 100%;
    height: 70px;
    background-color: burlywood;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
font-size: 12px;
}
.header-logo{
    width:120px;
    height: 100%;
    background-color: seagreen;
    float: left;
}

.header-logo img{
    width:100%;
    height: 100%;
}

.header-center{
    width:calc(100% - 320px);
    height: 100%;
    background-color: snow;
    float: left;
}


.header-info{
    width: 200px;
    height: 100%;
    background-color: slateblue;
    float: right;
}







</style>