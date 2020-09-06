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
    height="500"
    border
    style="width: 100%">
     <el-table-column type="index"
      prop="date"
      label="#"
      width="60">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="100">
    </el-table-column>
       <el-table-column
      prop="address"
      label="地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
     <el-table-column
      prop="create_Date"
      label="创建时间">
    </el-table-column>
     <el-table-column 
     label="用户状态"
     ><template slot-scope="scope">
       <el-switch
      v-model="scope.row.status"
      active-color="#13ce66"
       active-value="0"
       inactive-value="1"
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
      <template slot-scope="scope">
  <el-button size='mini' type="success" @click="ShowRoleConfirm(scope.row)" icon="el-icon-check" circle></el-button>
  <el-button plan type="danger"  size='mini' @click="ShowDeleteUserMsg(scope.row.id)"  icon="el-icon-delete" circle></el-button>
  <el-button  type="primary" icon="el-icon-edit" size='mini' @click="ShowEditUser(scope.row)" circle></el-button>
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
    <!--新增用户对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密 码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="token" label-width="100px">
      <el-input v-model="form.token" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="状态" label-width="100px">
      <el-input v-model="form.status" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="地址" label-width="100px">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd=false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
 <!--编辑用户对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名"  label-width="100px">
      <el-input v-model="form.name" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密 码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="token" label-width="100px">
      <el-input v-model="form.token" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="状态" label-width="100px">
      <el-input v-model="form.status" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="地址" label-width="100px">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit=false">取 消</el-button>
    <el-button type="primary" @click="EditUser">确 定</el-button>
  </div>
</el-dialog>
<!--权限分配对话框-->
<el-dialog title="权限分配" :visible.sync="dialogFormVisibleRole">
  <el-form >
    <el-form-item label="名称" label-width="100px">
           {{SelectName}}
    </el-form-item>
    <el-form-item label="角色名称" label-width="100px">
      <el-select v-model="SelectValue" >
        <el-option label="请选择" value="1"></el-option>
        <el-option :label="item.name" :value="item.role_Id"
        v-for="(item, index) in Role" :key="index"  
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="EditRole()">确 定</el-button>
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
            pageSize:8,
            value:true,
            total:20,
         
        userList:[],
        ////对话框
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        dialogFormVisibleRole:false,
        form:{
          Id:'',
         name:'',
         password:'',
         token:'',
         status:''
        },
        Role:'',
        SelectName:'',
        SelectValue:"1",
        selectRoleId:''
        }
      
           
        
    },
    ///钩子函数在创建的时候加载此方法
    created(){
        this.getUserList();
    },
    ////api/{controller}/{action}/{id}
    methods:{
       addUser(){
          const res = this.$http.post('userInfoes/PostUserInfo',this.form).then(res=>{
         this.dialogFormVisibleAdd=false;
          console.log(res);
            this.getUserList();
          });
             this.form={};
        
       },
       ShowRoleConfirm(row){
         this.SelectValue='1';

           console.log(row);
         this.SelectName=row.name;//http://localhost:5000/api/Roles/GetRole
         this.selectRoleId=row.id;
          this.dialogFormVisibleRole=true;
          this.$http.get('Roles/GetRole').then(res=>{
           this.Role =  res.data;      
          });
          
           this.$http.get(`RoleUser/GetRoleUser?id=${row.id}`).then(res=>{
               console.log("这是返回过来的结果")
                var date =res.data.entity
                console.log(res);
                if(date)
                {
                 this.SelectValue=date.role_Id;
                }else
                {
            
                }
          });
       },
       EditRole()
       {
         this.$http.post('RoleUser/PostRole_User',{
           role_Id:this.SelectValue,
           User_Id:this.selectRoleId
         })
           this.dialogFormVisibleRole=false;
          

       },
       ShowEditUser(user)
       {
         this.form=user;
        this.dialogFormVisibleEdit=true;
       },
       EditUser()
       {
          this.$http.put('userInfoes/PutUserInfo',this.form).then(res=>{
         this.dialogFormVisibleEdit=false;
          console.log(res);
            this.getUserList();
          });
          this.form={};
       },
       ShowDeleteUserMsg(ids)
       {
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.delete(`userInfoes/DeleteUserInfo/${ids}`).then
          (res=> {
             this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList();
          });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
      
          // this.$http.defaults.headers.common['Authorization']=token;
          
           this.$http.get(`UserInfoes/GetUsers`,{params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    userinfo:{
                      NAME:this.query
                    }

           }}).then(res=>{
             console.log(res);
               if(res.status==200)
               {/////////aaaaaaaaaaaaaaaaaaaaaaaaaaaa为什么没有提交到远程分页
                   this.userList=res.data.entity;
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