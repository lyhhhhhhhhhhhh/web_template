<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { userRegisterUsingPost } from '@/api/yonghujiekou'

const router = useRouter()

// 注册加载状态
const loading = ref(false)

// 表单引用
const registerFormRef = ref<FormInstance>()

// 注册表单
const registerForm = reactive({
  userAccount: '',
  userName: '',
  userPassword: '',
  checkPassword: ''
})

// 表单验证规则
const rules = reactive<FormRules>({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
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
        if (value !== registerForm.userPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await userRegisterUsingPost(registerForm)
        if (response.code === 0) {
          ElMessage.success('注册成功，请登录')
          router.push('/login')
        } else {
          ElMessage.error(response.message || '注册失败')
        }
      } catch (error: any) {
        ElMessage.error(error.message || '注册失败，请检查网络连接')
      } finally {
        loading.value = false
      }
    }
  })
}

// 返回登录页
const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-container">
    <div class="register-content">
      <div class="register-left">
        <div class="register-info">
          <h2>创建账号</h2>
          <p>加入我们的管理系统</p>
        </div>
      </div>
      <div class="register-right">
        <div class="register-form-container">
          <div class="register-header">
            <h1>用户注册</h1>
            <p>Spring Boot + Vue3 + Element Plus</p>
          </div>
          
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="rules"
            label-position="top"
            class="register-form"
          >
            <el-form-item label="账号" prop="userAccount">
              <el-input
                v-model="registerForm.userAccount"
                prefix-icon="ep:user"
                placeholder="请输入账号（3-20个字符）"
              />
            </el-form-item>
            
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="registerForm.userName"
                prefix-icon="ep:user-filled"
                placeholder="请输入用户名（2-20个字符）"
              />
            </el-form-item>
            
            <el-form-item label="密码" prop="userPassword">
              <el-input
                v-model="registerForm.userPassword"
                prefix-icon="ep:lock"
                type="password"
                placeholder="请输入密码（6-20个字符）"
                show-password
              />
            </el-form-item>
            
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input
                v-model="registerForm.checkPassword"
                prefix-icon="ep:lock"
                type="password"
                placeholder="请再次输入密码"
                show-password
                @keyup.enter="submitForm(registerFormRef)"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button
                type="primary"
                :loading="loading"
                class="register-button"
                @click="submitForm(registerFormRef)"
              >
                注册
              </el-button>
            </el-form-item>
            
            <div class="login-link">
              <span>已有账号？</span>
              <el-button type="text" @click="goToLogin">立即登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-container {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-content {
  width: 900px;
  height: 600px;
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.register-left {
  flex: 1;
  background: linear-gradient(135deg, #3498db, #8e44ad);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: white;
}

.register-info {
  text-align: center;
  
  h2 {
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  p {
    font-size: 18px;
    opacity: 0.9;
  }
}

.register-right {
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-form-container {
  width: 85%;
  max-width: 360px;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    color: #303133;
    margin: 0 0 10px 0;
    font-weight: 600;
  }
  
  p {
    font-size: 14px;
    color: #606266;
    margin: 0;
  }
}

:deep(.el-form-item__label) {
  font-weight: 500;
  padding-bottom: 5px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 0 15px;
  transition: all 0.3s;
  
  &:hover, &.is-focus {
    box-shadow: 0 0 0 1px #3498db;
  }
}

:deep(.el-input__inner) {
  height: 45px;
}

.register-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 10px;
  background: #3498db;
  border: none;
  transition: all 0.3s;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.login-link {
  margin-top: 20px;
  text-align: center;
  
  span {
    color: #606266;
    margin-right: 5px;
  }
  
  :deep(.el-button) {
    padding: 0;
    font-weight: 500;
    color: #3498db;
  }
}
</style> 