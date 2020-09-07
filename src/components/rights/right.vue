<template>
  <el-card separator-class="el-icon-arrow-right">

  <my-Bread  level1='权限管理' level2='权限列表'></my-Bread>
   
  <el-table class="datatable"
    :data="tableData"
    height="400px"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限名称"
      width="180">
    </el-table-column>
     <el-table-column
      prop="permisson_Id"
      label="资源Id">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类别">
      <template
        slot-scope="scope"
      >
      <span v-if="scope.row.type==1">一级</span>
      <span v-if="scope.row.type==''"></span>

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
               this.$http.get('Permissons/GetPermisson' ).then(res=>{
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
  .datatable{
      margin-top: 20px;
   }
</style>