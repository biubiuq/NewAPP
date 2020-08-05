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
           <el-input @clear='getUserList'  clearable  placeholder="请输入内容" v-model="query" 
           class="inputSearch">
 
           <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
        <el-button 
     class="login-btn"
      type="primary" 
      @click="ShowDialog"
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
     label="用户状态"
     ><template slot-scope="scope">
       <el-switch
      v-model="scope.row.Status"
      active-color="#13ce66"
     inactive-color="#ff4949">
       </el-switch>
     </template>
         </el-table-column>
        <el-table-column
      prop="token"
      label="token">
    </el-table-column>
     
         <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="">
  <el-button size='mini' type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
     <!--分页--->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--4.分页--->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密 码" label-width="100px">
      <el-input v-model="form.Pwd" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="token" label-width="100px">
      <el-input v-model="form.token" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.Status" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
  </el-row>
  </el-card>
  
 </div>
 
</template>

<script>
export default {
    data(){
        return{
            query:"",
            pageNum:1,
            pageSize:2,
            value:true,
            total:20,
            tableData: [{
          date: '2016-05-03',
          name: '王小虎aaaaaaaaaa',
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
        userList:[],
        ////对话框
        dialogFormVisibleAdd:false,
        form:{
         name:'',
         Pwd:'',
         token:'',
         Status:''
        }
        }
      
           
        
    },
    created(){
        this.getUserList();
    },
    ////api/{controller}/{action}/{id}
    methods:{
       addUser(){
          const res = this.$http.post('userInfo/AddUser',this.form);
          console.log(res);
       },
        ShowDialog()
        {
             this.dialogFormVisibleAdd=true;
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.getUserList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum=val;
           this.getUserList();
      },
        getUserList(){
          /////需要登录之外的请求需要验证请求头
           const token =localStorage.getItem('token');
          // this.$http.defaults.headers.common['Authorization']=token;
          
           this.$http.get(`userInfo/GetUsers`,{params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize

           }}).then(res=>{
               if(res.status=='200')
               {
                   this.userList=res.data.data;
                   this.total=res.data.total;
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