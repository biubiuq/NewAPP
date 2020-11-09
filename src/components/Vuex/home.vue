<template>
     <div>
         <h1>{{message}}</h1>
         <button @click="count++">++</button>
         <button @click="count--">--</button>
         {{count}}
         <helloword :count="count"></helloword>
     </div>
</template>

<script>
 import helloword from './helloword.vue'
export default {
     data(){
         return{
             message:'我是vue组件',
             count:0
         }
     },
     components:{
         helloword
     }
}
</script>

<style>

</style>