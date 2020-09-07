<template>
  <el-card>
      <my-Bread
       level1="权限管理"
       level2="角色列表"
      ></my-Bread>
      <el-row class="AddRole">
          <el-col>
  <el-button type="info" round>添加角色</el-button>
          </el-col>
      </el-row>
          <!--表格数据--->
 <el-table
    :data="tableData"
  
    
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="详细描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
     <el-table-column type="index" 
      prop="date"
      label="#"
      width="60">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="100">
    </el-table-column>
       <el-table-column
      prop="desc"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="role_Id"
      label="主键Id"
      width="180">
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
  </el-card>
</template>

<script>
export default {
    created(){
         this.getRightlist()
     },
   data() {
      return {
        tableData: []
      
      }
    },
     methods:{
          getRightlist(){
               this.$http.get('Roles/GetRole' ).then(res=>{
                     this.tableData= res.data
                      console.log(this.tableData);
                      console.log('这是返回的值')
                       console.log(res.data);

               })
               
         }
     }
}
</script>

<style>
.AddRole{
    margin-top: 20px;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>