/*
 * @Description:
 * @Date: 2022-06-14 10:14:34
 * @LastEditors: ranqi
 * @LastEditTime: 2022-10-31 17:34:33
 */
import request from '@/utils/request'
import qs from 'qs'

const api = {
  saveLog: '/tracking/save' // 数据埋点
}

// postJson
export function getTradeList (parameter) {
  return request({
    url: api.saveLog,
    method: 'post',
    data: qs.stringify(parameter)
  })
}