<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item v-model="queryParam.username" label="用户姓名">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="启用状态">
              <a-select v-model="queryParam.enabled" placeholder="请选择" default-value="0">
                <a-select-option value="0">未启用</a-select-option>
                <a-select-option value="1">已启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="loadData(queryParam)" type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      size="default"
      :columns="columns"
      :data="loadData"
    >
      <a slot="enabled" v-if="enabled" slot-scope="enabled" href="javascript:;">启用</a>
      <a slot="enabled" v-else href="javascript:;">禁用</a>
    </s-table>

  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getUserList } from '@/api/user'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      queryParam: {},
      // 表头
      columns: [
        {
          title: '唯一识别码',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname'
        },
        {
          title: '启用状态',
          dataIndex: 'enabled',
          key: 'enabled',
          scopedSlots: { customRender: 'enabled' }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: queryParam => {
        return getUserList(queryParam)
          .then(res => {
            console.log('getUserList', res)
            return res
          })
      }
    }
  },
  created () {
  },
  methods: {
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
        'selectedRows': function (selectedRows) {
          this.needTotalList = this.needTotalList.map(item => {
            return {
              ...item,
              total: selectedRows.reduce( (sum, val) => {
                return sum + val[item.dataIndex]
              }, 0)
            }
          })
        }
        */
  }
}
</script>
