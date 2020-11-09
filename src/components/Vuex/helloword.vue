<template>
   <div>
      这是数字  {{count}}
      <!--如果不希望使用父传子的方式 ，要使用vuex也可以达到相同的效果-->
   </div>
</template>

<script>
export default {
     name:'helloword',
     props:{
         count:Number
     }
}
</script>

<style>

</style>