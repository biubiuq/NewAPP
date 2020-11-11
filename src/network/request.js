
import axios from 'axios'
// export function request(config,success,failure){
//     const instance =
//     axios.create({
//         baseURL:"http://localhost:5000/",
//         timeout:5000
//     });
//     instance(config)
//     .then(success)
//     .catch(failure)
// }
export function request(config){
    return new Promise((resolve,reject)=>{
        const instance =
        axios.create({
            baseURL:"http://localhost:5000/",
                     timeout:5000
                 });
        instance(config)
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err)
        })
    })
}