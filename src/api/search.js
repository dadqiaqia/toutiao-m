import request from '@/utils/request'

// 获取搜索建议（自动补全，接口有问题 只能搜索一个关键字）
export const getSearchjianyi = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }

  })
}

export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
