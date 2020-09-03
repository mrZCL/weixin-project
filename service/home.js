import request from './network.js';

export function getMultiData(){
  return request({
    url: '/api/x6/home/multidata'
  })
}

export function getGoodsData(type, page) {
  return request({
    url: '/api/x6/home/data',
    data: {
      type,
      page
    }
  })
}