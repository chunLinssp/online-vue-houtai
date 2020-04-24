import request from '@/request'
import {getToken} from '@/request/token'

export function loadIndex() {
    return request({
        url:'/admin/index',
        method:'get' 
    })
}

export function userView(params) {
    return request({
        url:'/system/user',
        method:'get',
        params
    })
}


