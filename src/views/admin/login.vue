<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-main">
        <el-card shadow="always">
          <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="userForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="passwordword" v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode" class="veri-style">
            <el-input placeholder="验证码" type="verificationCode" v-model="userForm.verificationCode" autocomplete="off">
            </el-input>
            <img class="verify" @click.prevent="refresh" ref="codeImg" title="更换验证码" />
          </el-form-item>
          <el-form-item>
            <el-button class="loginBtn" type="primary" @click="submitForm('userForm')">登录</el-button>
          </el-form-item>
        </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {getVeriCode} from '@/api/login'

export default {
  data() {
      var validatepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
              callback();
            }
      };
      var validateAccount = (rule,value,callback) => {
        if(value === '') {
          callback(new Error('请输入账号'));
        } else {
              callback();
            }
      };
       var verificationCode = (rule,value,callback) => {
        if(value === '') {
          callback(new Error('请输入验证码'));
        } else {
              callback();
            }
      }
      return {
        url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        userForm: {
          password: '',
          account:'',
          verificationCode:'',
          token: ''
        },
        rules: {
          password: [
            { validator: validatepassword, trigger: 'blur' }
          ],
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          verificationCode:[
            { validator: verificationCode, trigger: 'blur' }
          ] 
        }
      };
    },
    created() {
     this.getCodeMethod();
    },
    methods: {
      getCodeMethod() {
          let that = this;
          getVeriCode().then(res=>{
          var img = that.$refs.codeImg;
          let url = window.URL.createObjectURL(res.data);
          img.src = url;
          // //取得后台通过响应头返回的sessionId的值
          that.userForm.token = res.headers['access-token'];
        }).catch(error =>{
          that.$message({
            message:'连接超时',
            type:'error',
            showClose:true
          })
        })
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$store.dispatch('login',that.userForm).then(res =>{
              that.$router.push('/');
              alert('ok');
              console.log(that.$store.state.account)
            }).catch(error =>{
              that.$message({
                message:error,
                type:'error',
                showClose:true
              })
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      refresh() {
        this.getCodeMethod();
      }
    }
  }
</script>
<style>
.login-container{
  width:100%;
  height: 400px;
  position: absolute;
  top:30%;
}

.login-wrapper{
  width:800px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.login-main{
  width:500px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.loginBtn{
  width:100%;
  float: right;
}
 
.verify{
  cursor: pointer;
  position: absolute;
  left: 140%;
  top:-18%;
}

.veri-style{
  width:50%;
}

</style>