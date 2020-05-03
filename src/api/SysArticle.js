import request from '@/request'

export function ArticleList(page) {
    return request({
        url: '/system/article',
        method:'get',
        params:page
    })
}

export function ArticleById(data) {
    return request({
        url: '/system/article',
        method:'post',
        data
    })
}


export function updateArticle(data) {
    return request({
        url: '/system/updateArticle',
        method:'post',
        data
    })
}