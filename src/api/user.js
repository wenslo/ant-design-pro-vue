import { axios } from '@/utils/request'

const api = {
  userList: '/user/queryByPage'
}

export default api

export function getUserList (parameter) {
  return axios.post(api.userList, parameter)
}
