<template>
  <div class="login-wrap">
      <el-form  class="login-form"
      :label-position="labelPosition" 
      label-width="80px" 
      :model="Users">
  <el-form-item label="用户名">
    <el-input v-model="Users.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="Users.password"></el-input>
  </el-form-item>

     <el-button 
     class="login-btn"
      type="primary" 
      @click="handleLogin"
      >登录按钮</el-button>
 
    </el-form>
   </div>
</template>

<script>
export default {
  data() {
      return {
        labelPosition: 'top',
        Users: {
          name: '',
          password: ''
        }
      };
    },
    methods:{
        handleLogin(){
         this.$http.post('userinfoes/GetUserInfo',this.Users ).then(res=>{
             console.log(res);
            
             ////跳转到首页
             ////2.提示成功
             ///不成功
             ///1.提示信息
            //aa
            
             
          
             if(res.status==200) 
             {

               var t =res.data.entity
                   console.log(res.data);
                 if(!t)
                 {
                     this.$message.warning('登录失败');
                 }
                 localStorage.setItem('token',t.token);
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