import { axios } from '@/utils/request'

const api = {
  userList: '/user/queryByPage',
  userUpdate: '/user/save'
}

export default api

export function getUserList (parameter) {
  return axios.post(api.userList, parameter)
}

export function updateUser (user) {
  return axios.post(api.userUpdate, user)
}
