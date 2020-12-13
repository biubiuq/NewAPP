import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)
//2 c创建对象
 const store =new Vuex.Store({

     state:{
         token:''
     },
     mutations:{
        setToken(state, n) {
            state.token= n
          }
     },
     actions:{},
     modules:{}

 });
 export default store;