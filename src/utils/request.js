import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // #transformRequest 允许在向服务器发送前，修改传递参数
  // #这里通过Qs.stringify转换为表单查询参数
  // transformRequest: [data => {
  // 	return Qs.stringify(data)
  // }],
  // 设置允许跨域
  withCredentials: true,
  timeout: 80000 // 超时时间设置
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const responseData = response.data
  if (typeof responseData.code !== 'undefined') {
    if (responseData.code === 0) {
      console.log(responseData.data)
      return responseData.data
    } else {
      notification.error({
        message: responseData.code,
        description: responseData.msg
      })
      return Promise.reject(responseData)
    }
  } else {
    return responseData
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
