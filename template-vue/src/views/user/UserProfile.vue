<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'
import {getCurrentUserUsingGet, updateUserUsingPut} from "@/api/yonghujiekou.ts";

const userStore = useUserStore()
const loading = ref(false)

// 表单引用
const formRef = ref<FormInstance>()

// 个人资料表单
const form = reactive({
  id: userStore.id,
  userName: userStore.userName,
  userProfile: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  oldPassword: [
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        if (form.newPassword && value !== form.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 保存个人资料
const saveProfile = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 构建更新对象
        const updateData: any = {
          id: form.id,
          userName: form.userName,
          userProfile: form.userProfile
        }
        
        // 如果输入了密码，添加密码字段
        if (form.oldPassword && form.newPassword) {
          updateData.userPassword = form.oldPassword
          updateData.newPassword = form.newPassword
        }
        
        const res = await updateUserUsingPut(updateData)
        
        if (res.code === 0) {
          ElMessage.success('保存成功')
          // 刷新用户信息
          userStore.fetchCurrentUser()
          // 清空密码字段
          form.oldPassword = ''
          form.newPassword = ''
          form.confirmPassword = ''
        } else {
          ElMessage.error(res.message || '保存失败')
        }
      } catch (error) {
        console.error('保存失败', error)
        ElMessage.error('保存失败')
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取用户详细信息
const getUserInfo = async () => {
  try {
    const res = await getCurrentUserUsingGet()
    if (res.code === 0 && res.data) {
      form.userName = res.data.userName || ''
      form.userProfile = res.data.userProfile || ''
    }
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="page-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人资料</span>
        </div>
      </template>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        
        <el-form-item label="账号">
          <el-input v-model="userStore.account" disabled />
        </el-form-item>
        
        <el-form-item label="角色">
          <el-tag
            :type="userStore.userRole === 'admin' ? 'danger' : userStore.userRole === 'user' ? 'primary' : 'info'"
          >
            {{ userStore.userRole === 'admin' ? '管理员' : userStore.userRole === 'user' ? '普通用户' : '被封禁' }}
          </el-tag>
        </el-form-item>
        
        <el-form-item label="个人简介" prop="userProfile">
          <el-input
            v-model="form.userProfile"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
          />
        </el-form-item>
        
        <el-divider>修改密码（选填）</el-divider>
        
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="form.oldPassword"
            type="password"
            show-password
            placeholder="请输入原密码"
          />
        </el-form-item>
        
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            type="password"
            show-password
            placeholder="请输入新密码"
          />
        </el-form-item>
        
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            show-password
            placeholder="请确认新密码"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            @click="saveProfile(formRef)"
            :loading="loading"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.profile-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 