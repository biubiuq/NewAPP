<template>
 
  <el-container class="container">
  <el-header  class="header">Header
    <el-row>
     <el-col :span="4">大家好我是图片</el-col>
     <el-col :span="18" > <h3 class="middle">后台管理系统</h3> </el-col>
     <el-col :span="2" > <a href="#" @click="loginout" class="loginout">退出</a>  </el-col>
    </el-row>

  </el-header>
  <el-container>
    <el-aside  class="aside" width="200px">
 <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :unique-opened='true'
      :router="true"
  
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item  class="el-icon-star-off"
            index="users">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="rights">权限列表</el-menu-item>
        </el-menu-item-group>
           <el-menu-item-group>
          <el-menu-item index="role">角色列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
         <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    </el-aside>
    <el-main>
      <el-tabs v-model="editableTabsValue" type="card" @tab-click="handleClick" >
  <el-tab-pane 
    :key="item.name"
    v-for="(item) in editableTabs"
    :label="item.title"
    :name="item.name"
  >
  
  </el-tab-pane>
</el-tabs>


    <router-view/>
    </el-main>
  </el-container>
   </el-container>
  
</template>

<script>
export default {
  ///钩子函数 ，在页面还未加载的时候执行此方法
   beforeCreate()
   {
     const token= this.$store.state.token;
     console.log(token);
    if(!token)
    {
      console.log('跳转了')
      this.$router.push({name:'login'});
    }
   },
     data() {
      return {
        editableTabsValue: '3',
        editableTabs: [{
          title: '用户列表',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
     },
   methods:{
     loginout(){
        localStorage.removeItem('token');
       this.$message.success('退出成功');
          this.$router.push({name:'login'});
     },
    handleClick(tab, event) {
           this.$router.push({name:'users'});
      }
     
   }
}
</script>

<style>
    .container{
      height: 100%;
    }
   .header{
     background-color: #b3c0d1;
   }
   .aside{
     background-color: #d3dce6;
   }
   .main{
       height: 100%;
   }
     .middle{
         margin-top: 3px;
         text-align: center;
     }
     .loginout{
          text-align: 60px;
         text-decoration: none;
     }
</style>