<template>
  <div class="header">
    <div class="header-logo">
        <img src="@/assets/logo.png" />
    </div>
    <div class="header-center">

    </div>
    <div class="header-info">
        <el-dropdown class="downComponent">
            <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template v-if="account != ''">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <a href="javascript:;" @click="Tologout">注销
                      </a></el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

   
  </div>
</template>

<script>
import {getUserMessage} from '@/request/token'
export default {
  data() {
    return {
    };
  },
  created() {
    console.log('--------------------------');
    console.log(JSON.parse(getUserMessage()).name);
    
  },
  computed:{
      account:function(){
        return JSON.parse(getUserMessage()).account;
      }
  },
  methods:{
    Tologout() {
      let that = this;
      this.$store.dispatch('logout').then(() =>{
        that.$router.push('/admin/login');
      })
    }
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
    float: right;
}

.downComponent{
  margin-top:25px;
}






</style>