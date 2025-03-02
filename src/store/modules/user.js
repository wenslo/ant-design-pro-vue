import { login, logout } from '@/api/login'
import store from '@/store'
// import store from '@/store'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    enums: {},
    permissions: [],
    generated: false
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
    },
    SET_GENERATED: (state, generated) => {
      state.generated = generated
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const userDetail = response.user
          const permissions = response.permissions
          commit('SET_INFO', userDetail)
          commit('SET_ENUMS', response.enums)
          commit('SET_NAME', { name: userDetail.nickname, welcome: welcome() })
          permissions.map(per => {
            if (per.actions != null && per.actions.length > 0) {
              per.actionList = per.actions.map(action => {
                return action.action
              })
            }
          })
          commit('SET_PERMISSIONS', permissions)
          // commit('SET_AVATAR', userDetail.avatar)
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
        /*        const userInfo = {
          'id': '4291d7da9005377ec9aec4a71ea837f',
          'name': '天野远子',
          'username': 'admin',
          'password': '',
          'avatar': '/avatar2.jpg',
          'status': 1,
          'telephone': '',
          'lastLoginIp': '27.154.74.117',
          'lastLoginTime': 1534837621348,
          'creatorId': 'admin',
          'createTime': 1497160610259,
          'merchantCode': 'TLif2btpzg079h15bk',
          'deleted': 0,
          'roleId': 'admin',
          'role': {}
        }
        // role
        const roleObj = {
          'id': 'admin',
          'name': '管理员',
          'describe': '拥有所有权限',
          'status': 1,
          'creatorId': 'system',
          'createTime': 1497160610259,
          'deleted': 0,
          'permissions': [{
            'roleId': 'admin',
            'permissionId': 'dashboard',
            'permissionName': '仪表盘',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'exception',
            'permissionName': '异常页面权限',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'result',
            'permissionName': '结果权限',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'profile',
            'permissionName': '详细页权限',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'table',
            'permissionName': '表格权限',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'import',
              'describe': '导入',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'form',
            'permissionName': '表单权限',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'order',
            'permissionName': '订单管理',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'permission',
            'permissionName': '权限管理',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'role',
            'permissionName': '角色管理',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'table',
            'permissionName': '桌子管理',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }, {
            'roleId': 'admin',
            'permissionId': 'user',
            'permissionName': '用户管理',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'import',
              'describe': '导入',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }, {
              'action': 'export',
              'describe': '导出',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }]
        }

        roleObj.permissions.push({
          'roleId': 'admin',
          'permissionId': 'support',
          'permissionName': '超级模块',
          'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
          'actionEntitySet': [{
            'action': 'add',
            'describe': '新增',
            'defaultCheck': false
          }, {
            'action': 'import',
            'describe': '导入',
            'defaultCheck': false
          }, {
            'action': 'get',
            'describe': '详情',
            'defaultCheck': false
          }, {
            'action': 'update',
            'describe': '修改',
            'defaultCheck': false
          }, {
            'action': 'delete',
            'describe': '删除',
            'defaultCheck': false
          }, {
            'action': 'export',
            'describe': '导出',
            'defaultCheck': false
          }],
          'actionList': null,
          'dataAccess': null
        })

        userInfo.role = roleObj
        if (userInfo.role && userInfo.role.permissions.length > 0) {
          const role = userInfo.role
          role.permissions = userInfo.role.permissions
          role.permissions.map(per => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              const action = per.actionEntitySet.map(action => { return action.action })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          commit('SET_ROLES', userInfo.role)
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }
        console.log((JSON.stringify(userInfo))) */
        commit('SET_GENERATED', true)
        resolve(store.getters.userInfo)
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
          // commit('SET_ROLES', [])
          commit('SET_ENUMS', '')
          commit('SET_PERMISSIONS', [])
          commit('SET_INFO', [])
          commit('SET_GENERATED', '')
        })
      })
    }

  }
}

export default user
