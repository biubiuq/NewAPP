
import axios from 'axios'
const instancel= axios.create({
    baseURL:'http://localhost:5000/',
    timeout:5000
})
 instancel({
     url:'api/axios/gettest',

 }).then(res=>{
     console.log(res);
 })
