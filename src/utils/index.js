
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好'
}

// 递归筛选最后一个嵌套对象
export function filterLastChildren (arr) {
  for (const item of arr) {
    if (!item.children) return item
    if (item.children && item.children.length) {
      const _item = this.filterLastChildren(item.children)
      if (_item) return _item
    }
  }
}

// 将File（Blob）对象转变为一个dataURL字符串， 即base64格式
export const fileToDataURL = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })

// 将dataURL字符串转变为image对象，即base64转img对象
export const dataURLToImage = (dataURL) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = dataURL
  })

export const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(',')
  // 注意base64的最后面中括号和引号是不转译的
  var _arr = arr[1].substring(0, arr[1].length - 2)
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(_arr)
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */

export function randomWord () {
  var str = ''
  var range = 10
  var arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  // 随机产生
  // range = Math.round(Math.random() * 4) + 5;
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}
