import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/request/token'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 50000
})
export default service
//request拦截器
service.interceptors.request.use(config => {
    if(store.state.token) {
        config.headers['Oauth-token'] = getToken();
    }
    return config;
},error => {
    Promise.reject(error)
})

//reponse拦截器
service.interceptors.response.use(response=>{
    if(response.headers['session_time_out'] == 'timeout') {
        store.dispatch('fedLogOut');
    }
    
    const res = response.data;
    // console.log(response.headers['content-type']);
    var headersType = response.headers['content-type'];
    if(headersType === 'image/jpeg') {
        return response;
    }else {
        if(res.code !== 200) {
            //错误处理
        }else {
            return response.data;
        }
    }
    
  

})







