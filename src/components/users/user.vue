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
    
      </el-col>
       </el-row>
       <el-row>
  <el-button>导入数据</el-button>
  <el-button type="primary">导出数据</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
      <el-button 
     class="login-btn"
      type="primary" 
      @click="ShowDialog"
     > 添加用户</el-button>
</el-row>
      <!--表格数据--->
 <el-table
    @row-dblclick="dbclickShowEditUser"
    :data="userList"
    height="400"
    border
    style="width: 100%;">
     <el-table-column type="index"
      prop="date"
      label="#"
      width="60">
    </el-table-column>
        <el-table-column
      prop="userName"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="passWord"
      label="密码"
      width="100">
    </el-table-column>
     <el-table-column
      prop="createDate"
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
       @change="changerStatus"
     inactive-color="#ff4949">
       </el-switch>
     </template>
         </el-table-column>
        <el-table-column
      prop="createUser"
      label="创建人">
    </el-table-column>
     
         <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="scope">
     <el-row :gutter="30">
  <el-col :span="3"><el-button size='mini' type="success" @click="ShowRoleConfirm(scope.row)" icon="el-icon-check" circle></el-button>
 </el-col>
  <el-col :span="3">   <el-button plan type="danger"  size='mini' @click="ShowDeleteUserMsg(scope.row.id)"  icon="el-icon-delete" circle></el-button>
 </el-col>
  <el-col :span="3">   <el-button  type="primary" icon="el-icon-edit" size='mini' @click="ShowEditUser(scope.row)" circle></el-button>
 </el-col>
  <el-col :span="13">     <el-select  size='mini' v-model="value" placeholder="跳转页面">
    <el-option
      v-for="item in linklist"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 </el-col>
</el-row>
 
      
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
      <el-input v-model="form.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密 码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="状态" label-width="100px">
        <el-select v-model="form.statusType" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.codeName"
      :value="item.codeType">
    </el-option>
  </el-select>
    </el-form-item>
      <el-form-item label="创建人" label-width="100px">
      <el-input v-model="form.createUser" autocomplete="off"></el-input>
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
      <el-input v-model="form.userName" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密 码" label-width="100px">
      <el-input v-model="form.passWord" autocomplete="off"></el-input>
    </el-form-item>
    
        <el-form-item label="状态" label-width="100px">
   
  <el-select v-model="form.statusType" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.codeName"
      :value="item.codeType">
    </el-option>
  </el-select>

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
      <el-select v-model="selectRole" multiple placeholder="请选择"  >
    
        <el-option :label="item.name" :value="item.id"
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
        options:[{
          codeType:"1",
          codeName:"参数1"
        },{
             codeType:"2",
          codeName:'参数2'
        }],
        ////对话框
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        dialogFormVisibleRole:false,
        form:'',
        Role:'',
        selectRole:[],
        SelectName:'',
        SelectValue:"1",
        selectRoleId:'',
        StatusType:'',
        linklist: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
        }
    },
    ///钩子函数在创建的时候加载此方法
    created(){
       this.$message.success("被创建了");
     
        this.getUserList();
       this.addType();
    },
    
    ////api/{controller}/{action}/{id}
    methods:{
       addType(){
         this.$http.get('BaseType/D1').then(res=>{
           console.log('对象basetype')
           console.log(res);
                this.options=res.data;

         });

       },
       addUser(){
          const res = this.$http.post('User',this.form).then(res=>{
         this.dialogFormVisibleAdd=false;
          console.log(res);
            this.getUserList();
          });
             this.form={};

        
       },
       ShowRoleConfirm(row){
        this.selectRole=[];
         
         this.SelectName=row.userName;//http://localhost:5000/api/Roles/GetRole
         this.selectRoleId=row.id;
          this.$http.get('Role').then(res=>{
              
           this.Role =  res.data;     
           console.log("返回过来的角色");
           console.log(res.data); 
           this.$http.get(`RoleUser?id=${row.id}`).then(res=>{
               console.log("这是返回过来的结果")
                var date =res.data;
                console.log(res);
                if(date)
                {
                 this.selectRole=date.roleId.split(',');
                }else
                {
                 
                }
                  this.dialogFormVisibleRole=true;
          });
          });
            
      
          

       },
       EditRole()
       {
      
         this.$http.post('RoleUser',{
           RoleId:this.selectRole.join(','),
           UserId:this.selectRoleId
         })
           this.dialogFormVisibleRole=false;
          

       },
       dbclickShowEditUser(row)
       {
         console.log(row);
         this.form=row;
        this.dialogFormVisibleEdit=true;
       },
       ShowEditUser(user)
       {
        /// this.form=user;
        console.log(user);
        this.dialogFormVisibleEdit=true;
       },
       EditUser()
       {
          this.$http.put('User',this.form).then(res=>{
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
           this.$http.delete(`User/${ids}`).then
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
             this.form={};
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

      changerStatus(){
        this.$message.success("值发送了变化")
      },
        getUserList(){
          /////需要登录之外的请求需要验证请求头
      
          // this.$http.defaults.headers.common['Authorization']=token;
          
           this.$http.get(`User`,{params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    userName:this.query
                    

           }}).then(res=>{
             console.log(res);
               if(res.status==200)
               {
                   this.userList=res.data.list;
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
      height: 80%;
  }
 .inputSearch{
      width: 300px;
  }
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .linkc{
    height: 50%;
     width: 50%;
     display:block;
  }
</style>