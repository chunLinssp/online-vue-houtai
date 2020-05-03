import request from '@/request'

export function menuList() {
    return request({
        url: '/system/menu',
        method:'get'
    })
}

export function getMenuById(data) {
    console.log(data);
    return request({
        url: '/system/menu',
        method:'post',
        data:data
    })
}

export function menuEdit(data) {
    return request({
        url: '/system/menu/edit',
        method:'post',
        data
    })
}

export function menuDelete(data) {
    return request({
        url: '/system/menu/delete',
        method:'post',
        data
    })
}

export function menuInsert() {
    return request({
        url: '/system/menu/insert',
        method:'post'
    })
}