/*
 * @Description:
 * @Date: 2022-06-09 15:07:49
 * @LastEditors: ranqi
 * @LastEditTime: 2022-09-15 15:51:53
 */
import request from '@/utils/request'

const api = {
  Login: '/loginByUserName',
  CreatePicture: '/vcodePicture/output', // 图片验证码生成
  UserInfo: '/userInfo',
  Logout: '/logout',
}
/* 生成图片验证码 */
export function getPicture (parameter) {
  return request({
    url: api.CreatePicture,
    method: 'get',
    responseType: 'arraybuffer',
    params: parameter
  })
}
/* 登录 */
export function login (parameter) {
  return request({
    url: api.Login,
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
/* 获取用户信息 */
export function getInfo () {
  return request({
    url: api.UserInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/* 退出登录 */
export function logout () {
  return request({
    url: api.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
