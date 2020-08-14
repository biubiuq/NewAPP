

  import axios from 'axios'
///插件模板
 const MyhttpSever={};
 MyhttpSever.install=(Vue)=>{

      axios.defaults.baseURL="http://localhost:5000/api/";

     
       Vue.prototype.$http=axios
        
    

 }
 export default  MyhttpSever
  
    
  