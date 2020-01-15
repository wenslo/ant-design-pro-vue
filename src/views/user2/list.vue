<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户姓名">
              <a-input v-model="queryParam.username" placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="启用状态">
              <a-select v-model="queryParam.enabled" placeholder="请选择" default-value="true">
                <a-select-option value="false">禁用</a-select-option>
                <a-select-option value="true">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
    >
      <a slot="enabled" v-if="enabled" slot-scope="enabled" href="javascript:;">启用</a>
      <a slot="enabled" v-else href="javascript:;" style="color: red">禁用</a>

      <span slot="action" slot-scope="text, user">
        <template>
          <a @click="handleEdit(user)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleRemove(user)">删除</a>
        </template>
      </span>
    </s-table>

    <a-modal
      title="操作"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :from="(form)=>{this.form = form}">
        <a-input v-model="mdl.id" type="hidden"></a-input>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户名"
          hasFeedback
          validateStatus="success"
        >
          <a-input placeholder="起一个名字" v-model="mdl.username" id="username"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昵称"
          hasFeedback
          validateStatus="success"
        >
          <a-input placeholder="起一个昵称" v-model="mdl.nickname" id="nickname"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="启用状态"
        >
          <a-select v-model="mdl.enabled">
            <a-select-option value="true">启用</a-select-option>
            <a-select-option value="false">禁用</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-modal>

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
      form: null,
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      mdl: {},
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '昵称',
          dataIndex: 'nickname'
        },
        {
          title: '启用状态',
          dataIndex: 'enabled',
          scopedSlots: { customRender: 'enabled' }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam))
          .then(res => {
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
    },
    handleEdit (user) {
      this.mdl = Object.assign({}, user)
      this.visible = true
    },
    handleRemove (user) {
      console.log('enter into handle remove', user)
    },
    handleOk (user) {
      console.log('enter into handle ok', user)
    },
    handleCancel () {
      this.visible = false
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
