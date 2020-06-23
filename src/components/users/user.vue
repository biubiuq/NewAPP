<template>
 <div>
     
 <el-card class="box">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  
</el-breadcrumb>
  <el-row class="SearRow">
      <el-col>
           <el-input placeholder="请输入内容" v-model="query" 
           class="inputSearch">
 
           <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
        <el-button 
     class="login-btn"
      type="primary" 
     
     > 添加用户</el-button>
      </el-col>
      <!--表格数据--->
 <el-table
    :data="userList"
    height="250"
    border
    style="width: 100%">
     <el-table-column type="index"
      prop="date"
      label="#"
      width="60">
    </el-table-column>
    <el-table-column
      prop="Pwd"
      label="密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
     <el-table-column
      prop="Create_Date"
      label="创建时间">
    </el-table-column>
        <el-table-column
      prop="token"
      label="用户状态">
    </el-table-column>
     
         <el-table-column
      prop="address"
      label="操作">
    </el-table-column>
  </el-table>
     
  </el-row>
  </el-card>
 </div>
 
</template>

<script>
export default {
    data(){
        return{
            query:"",
            pagenum:1,
            pageSize:2,
            tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        userList:[]
        }
           
        
    },
    created(){
        this.getUserList();
    },
    ////api/{controller}/{action}/{id}
    methods:{
      
        getUserList(){
          /////需要登录之外的请求需要验证请求头
          // const token =localStorage.getItem('token');
          // this.$http.defaults.headers.common['Authorization']
          // =token;
           this.$http.get(`userInfo/GetUsers`).then(res=>{
               if(res.status=='200')
               {
                   this.userList=res.data.data;
                   this.$message.success('成功刷新列表')
               }
               else
               {
                   this.$message.success('数据获取失败')
               }
           })
        }
    }

}
</script>
 
<style>
.SearRow{
    margin-top: 20px;
}
  .box{
      width: 100%;
  }
 .inputSearch{
      width: 300px;
  }
</style>