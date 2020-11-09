<template>
     <div>
         <button @click="login">login页面</button>
         <button @click="Vuex">Vuex页面</button>
     </div>
</template>

<script>
export default {
    methods:{
        login(){
         this.$router.push({name:'login'});
        },
        Vuex(){
         this.$router.push({name:'vuexhome'});
        }
    }
}
</script>

<style>

</style>