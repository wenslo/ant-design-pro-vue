import { axios } from '@/utils/request'

const api = {
  userList: '/user/queryByPage'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.userList,
    method: 'post',
    params: {
      'pageable': {
        page: 0,
        size: 10
      }
    }
  })
}
