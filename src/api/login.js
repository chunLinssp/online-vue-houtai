import request from '@/request'

export function login(loginName,password,verificationCode,token) {
    console.log('verificationCode:' + verificationCode);
    const data = {
        loginName,
        password,
        params:{
            verificationCode
        }
    }
    return request({
        url: '/admin/login',
        method:'post',
        headers:{
            'access-token':token
        },
        data
    })
}

export function getVeriCode() {
    return request({
        url: '/api/code',
        method:'get',
        responseType:'blob'
    })
}


