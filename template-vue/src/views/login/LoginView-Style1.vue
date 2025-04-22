<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// 登录加载状态
const loading = ref(false)

// 表单引用
const loginFormRef = ref<FormInstance>()

// 登录表单
const loginForm = reactive({
  userAccount: '',
  userPassword: ''
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
  ]
})

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.login(loginForm.userAccount, loginForm.userPassword)
      } finally {
        loading.value = false
      }
    }
  })
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <div class="login-info">
          <h2>欢迎回来</h2>
          <p>登录以继续访问管理系统</p>
        </div>
      </div>
      <div class="login-right">
        <div class="login-form-container">
          <div class="login-header">
            <h1>用户登录</h1>
            <p>Spring Boot + Vue3 + Element Plus</p>
          </div>
          
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            label-position="top"
            class="login-form"
          >
            <el-form-item label="账号" prop="userAccount">
              <el-input
                v-model="loginForm.userAccount"
                prefix-icon="ep:user"
                placeholder="请输入账号"
              />
            </el-form-item>
            
            <el-form-item label="密码" prop="userPassword">
              <el-input
                v-model="loginForm.userPassword"
                prefix-icon="ep:lock"
                type="password"
                placeholder="请输入密码"
                show-password
                @keyup.enter="submitForm(loginFormRef)"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button
                type="primary"
                :loading="loading"
                class="login-button"
                @click="submitForm(loginFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
            
            <div class="login-options">
              <div class="register-link">
                <span>没有账号？</span>
                <el-button type="text" @click="goToRegister">立即注册</el-button>
              </div>
              
              <div class="login-tips">
                <p>演示账号: admin</p>
                <p>演示密码: 123456</p>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-content {
  width: 900px;
  height: 600px;
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #3498db, #8e44ad);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: white;
}

.login-info {
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

.login-right {
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-container {
  width: 85%;
  max-width: 360px;
}

.login-header {
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

.login-button {
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

.login-options {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.register-link {
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

.login-tips {
  color: #909399;
  font-size: 13px;
  text-align: center;
  background-color: rgba(52, 152, 219, 0.1);
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid #3498db;
  
  p {
    margin: 5px 0;
  }
}
</style> 