
import  store from '@/store'
import router from '@/router'
  import axios from 'axios'
///插件模板
 const MyhttpSever={};
 MyhttpSever.install=(Vue)=>{

      axios.defaults.baseURL="http://localhost:5000/api/";
      axios.interceptors.request.use(function (config) {
     
         
        if(config.url!="Account")
        {
           var token =store.state.token;
         
          if(!token)
          {
         
            router.push({name:'login'});
          }
          else
          {
            config.headers.common['Authorization']="Bearer  "+token;
          }
        }
      //  console.log(config)

        // 在发送请求之前做些什么
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });
      axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });
     
       Vue.prototype.$http=axios
        
    

 }
 export default  MyhttpSever
  
    
  