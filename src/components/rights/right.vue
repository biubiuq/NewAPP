<template>
  <el-card separator-class="el-icon-arrow-right">

  <my-Bread  level1='权限管理' level2='权限列表2'></my-Bread>
   <template>
  <el-table
    :data="dataList"
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
    </el-table-column>
  </el-table>
</template>
  </el-card>
</template>

<script>
export default {
     created(){
       //  this.getRightlist()
     },
     data(){
        return{
             dataList:{}
        }
     },
     methods:{
          getRightlist(){
               this.$http.get('Permissons/GetPermisson',this.Users ).then(res=>{
                   //  this.dataList= res.data
                      console.log(res);

               })
               
         }
     }
}
</script>

<style>

</style>