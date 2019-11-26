import { login, logout } from '@/api/login'
import store from '@/store'
// import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    enums: {},
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ENUMS: (state, enums) => {
      state.enums = enums
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const userDetail = response.user
          const permission = response.permission
          console.log('------------------------------------------------')
          console.log(userDetail)
          commit('SET_INFO', userDetail)
          commit('SET_ENUMS', response.enums)
          commit('SET_PERMISSIONS', permission)
          // if (permission && permission.length > 0) {
          //   console.log(permission)
          // }
          // 登录
          // console.log(response)
          // Vue.ls.set(ACCESS_TOKEN, '1234', 7 * 24 * 60 * 60 * 1000)
          // commit('SET_TOKEN', result.token)
          // console.log(result)
          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })
          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          //   commit('SET_INFO', result)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }
          //
          // commit('SET_NAME', { name: result.name, welcome: welcome() })
          // commit('SET_AVATAR', result.avatar)
          //
          // resolve(response)
          resolve(userDetail)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('get info console log')
        console.log(store.getters.info)
        resolve(store.getters.info)
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_ENUMS', '')
          commit('SET_PERMISSIONS', [])
        })
      })
    }

  }
}

export default user
