<template>
<!--这是一个全局组件-->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  
</el-breadcrumb>
</template>

<script>
export default {
   data(){
       return{
      
       }
   },
   ///字符串数组，props值的用法和data的用法和data一样
   ///值来源属性给它传递的值
   props:['level1','level2']
}
</script>

<style>

</style>