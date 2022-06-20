import axios from 'axios'
// 先在终端安装axios包 再导入  创建axios实例，配置默认地址为接口主地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
export default request
