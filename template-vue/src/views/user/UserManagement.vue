<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {addUserUsingPost, deleteUserUsingDelete, listUserUsingGet, updateUserUsingPut} from "@/api/yonghujiekou.ts";

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 查询参数
const queryParams = reactive({
  current: 1,
  pageSize: 10,
  userName: '',
  userAccount: '',
  userRole: ''
})

// 用户表单
const userFormVisible = ref(false)
const userFormTitle = ref('')
const userFormLoading = ref(false)
const userFormRef = ref<FormInstance>()
const userForm = reactive({
  id: undefined,
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  userName: '',
  userRole: 'user',
})

// 表单验证规则
const rules = reactive<FormRules>({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  checkPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== userForm.userPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  userRole: [
    { required: true, message: '请选择用户角色', trigger: 'change' }
  ]
})

// 角色选项
const roleOptions = [
  { value: 'admin', label: '管理员' },
  { value: 'user', label: '普通用户' },
  { value: 'ban', label: '被封禁用户' }
]

// 获取用户列表
const getList = async () => {
  loading.value = true
  try {
    const res = await listUserUsingGet({
      ...queryParams
    })
    if (res.code === 0 && res.data) {
      tableData.value = res.data.records || []
      total.value = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取用户列表失败')
    }
  } catch (error) {
    console.error('获取用户列表失败', error)
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 重置查询参数
const resetQuery = () => {
  Object.assign(queryParams, {
    current: 1,
    pageSize: 10,
    userName: '',
    userAccount: '',
    userRole: ''
  })
  getList()
}

// 处理查询
const handleQuery = () => {
  queryParams.current = 1
  getList()
}

// 处理分页
const handleSizeChange = (pageSize: number) => {
  queryParams.pageSize = pageSize
  getList()
}

const handleCurrentChange = (current: number) => {
  queryParams.current = current
  getList()
}

// 添加用户
const handleAdd = () => {
  userFormTitle.value = '添加用户'
  Object.assign(userForm, {
    id: undefined,
    userAccount: '',
    userPassword: '',
    checkPassword: '',
    userName: '',
    userRole: 'user',
  })
  userFormVisible.value = true
}

// 提交表单
const submitForm = async () => {
  if (!userFormRef.value) return
  
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      userFormLoading.value = true
      try {
        if (userForm.id) {
          // 更新用户
          const res = await updateUserUsingPut({
            id: userForm.id,
            userAccount: userForm.userAccount,
            userName: userForm.userName,
            userRole: userForm.userRole
          })
          
          if (res.code === 0) {
            ElMessage.success('修改成功')
            userFormVisible.value = false
            getList()
          } else {
            ElMessage.error(res.message || '修改失败')
          }
        } else {
          // 添加用户
          const res = await addUserUsingPost({
            userAccount: userForm.userAccount,
            userPassword: userForm.userPassword,
            checkPassword: userForm.checkPassword,
            userName: userForm.userName
          })
          
          if (res.code === 0) {
            ElMessage.success('添加成功')
            userFormVisible.value = false
            getList()
          } else {
            ElMessage.error(res.message || '添加失败')
          }
        }
      } catch (error) {
        console.error('操作失败', error)
        ElMessage.error('操作失败')
      } finally {
        userFormLoading.value = false
      }
    }
  })
}

// 编辑用户
const handleEdit = (row: any) => {
  userFormTitle.value = '编辑用户'
  Object.assign(userForm, {
    id: row.id,
    userAccount: row.userAccount,
    userPassword: '',
    checkPassword: '',
    userName: row.userName,
    userRole: row.userRole
  })
  userFormVisible.value = true
}

// 删除用户
const handleDelete = (id: number) => {
  ElMessageBox.confirm('确认删除该用户?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const res = await deleteUserUsingDelete({
        id
      })
      
      if (res.code === 0) {
        ElMessage.success('删除成功')
        getList()
      } else {
        ElMessage.error(res.message || '删除失败')
      }
    } catch (error) {
      console.error('删除失败', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="page-container">
    <!-- 搜索区域 -->
    <el-card>
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="账号" prop="userAccount">
          <el-input
            v-model="queryParams.userAccount"
            placeholder="请输入账号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="角色" prop="userRole">
          <el-select v-model="queryParams.userRole" placeholder="请选择角色" clearable>
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card style="margin-top: 20px">
      <div class="table-operations">
        <el-button type="primary" @click="handleAdd">添加用户</el-button>
      </div>
      
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="userAccount" label="账号" width="120" />
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="userRole" label="角色" width="120">
          <template #default="{ row }">
            <el-tag
              :type="row.userRole === 'admin' ? 'danger' : row.userRole === 'user' ? 'primary' : 'info'"
            >
              {{ row.userRole === 'admin' ? '管理员' : row.userRole === 'user' ? '普通用户' : '被封禁' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              text
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              text
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.current"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 用户表单 -->
    <el-dialog
      v-model="userFormVisible"
      :title="userFormTitle"
      width="500px"
      append-to-body
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="userForm.userAccount" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="userPassword" v-if="!userForm.id">
          <el-input
            v-model="userForm.userPassword"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" v-if="!userForm.id">
          <el-input
            v-model="userForm.checkPassword"
            type="password"
            placeholder="请确认密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色" prop="userRole">
          <el-select v-model="userForm.userRole" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="userFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="userFormLoading">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}
</style> 