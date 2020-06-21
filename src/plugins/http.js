

  import axios from 'axios'
///插件模板
 const MyhttpSever={};
 MyhttpSever.install=(Vue)=>{

      axios.defaults.baseURL="https://localhost:44367/";

     
       Vue.prototype.$http=axios
        
    

 }
 export default  MyhttpSever
  
    
  