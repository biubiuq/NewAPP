<template>
  <div class="login-wrap">
      <el-form  ref="loginformref" class="login-form"
      :label-position="labelPosition" 
      label-width="80px" 
      :model="Users">
  <el-form-item label="用户名" prop="userName">
    <el-input v-model="Users.userName"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="passWord">
    <el-input type="password" v-model="Users.passWord"></el-input>
  </el-form-item>

     <el-button 
     class="login-btn"
      type="primary" 
      @click="handleLogin"
      >登录按钮</el-button>
    <el-button 
  
    
      @click="reset()"
      >重置</el-button>
    </el-form>
    
   </div>
</template>

<script>
export default {
  data() {
      return {
        labelPosition: 'top',
        Users: {
          userName: '',
          passWord: ''
        }
      };
    },
    methods:{
       reset(){
          
             this.$refs.loginformref.resetFields();
             console.log( this.$refs.loginformref.resetFields);
      },
        handleLogin(){
         this.$http.post('Account',this.Users).then(res=>{
        
             if(res.status==200) 
             {
               var t =res.data;
                 if(!t)
                 {
                     this.$message.warning('登录失败');
                 }
                this.$store.commit('setToken',t);
                this.$message.success('登录成功');
                this.$router.push({name:'home'});
             }
             else
             {
                  this.$message.warning('登录失败');
                 
             }
         })
        }
    }
}
</script>
  
<style>
 .login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;

   }
   .login-wrap .login-form{
       width: 400px;
       background-color: aliceblue;
       border-radius: 5px;
       padding: 30px;
   }
   .login-wrap .login-btn{
       width: 100%;
   }
</style>