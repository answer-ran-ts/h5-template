const Mock = require('mockjs')
const getRegExpUrl = function (relativeUrl) {
  return RegExp(relativeUrl + '.*')
}

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '10'
})

Mock.mock(getRegExpUrl('/loginByUserName'), 'post', () => {
  return {
    status: 0,
    msg: '操作成功',
    data: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcIjFcIixcIm5hbWVcIjpcIua1i-ivlei0puWPtzFcIixcInVzZXJOYW1lXCI6XCJhZG1pblwiLFwibW9iaWxlXCI6XCIxMzIwMDAwMDAwMDBcIixcImJpbGxOdW1cIjpudWxsLFwic291cmNlXCI6XCJzYW50aVwiLFwiY3JlYXRlVGltZVwiOjE2NDU1MTE3MjUwMDAsXCJ1cGRhdGVUaW1lXCI6MTY0NTUxMTcyODAwMCxcInN0YXR1c1wiOlwiMVwiLFwiY29tcGFueU5hbWVcIjpcIua1i-ivleS8geS4mlwiLFwicGVybWlzc2lvbnNcIjpudWxsfSIsImlzcyI6Imxlb3BhcmQiLCJqdGkiOiIxIiwiaWF0IjoxNjQ1NzgzMzYxLCJleHAiOjE2NDU4MTIxNjF9.UczqGSDVIIUr2pfXxRYSqnyrYg8v8_z5J8jT3wdHVC3Nd_u8xuT6pC_i7hcYiea27GBggpF72WBNslJje5WS3A'
  }
})

Mock.mock(getRegExpUrl('/logout'), 'post', () => {
  return {
    status: 0,
    msg: '操作成功',
    data: null
  }
})

Mock.mock(getRegExpUrl('/userInfo'), 'post', () => {
  return {
    status: 0,
    msg: '操作成功',
    data: {
      customId: '@id',
      roles:['admin'],
      customName: '@cword(2,4)',
      companyName: '@cword(2,8)',
    }
  }
})
