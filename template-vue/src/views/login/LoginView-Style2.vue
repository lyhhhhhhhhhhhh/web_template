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
    <div class="login-background">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
    
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">
          <el-icon><ep:monitor /></el-icon>
        </div>
        <h1>后台管理系统</h1>
        <p>Spring Boot + Vue3 + Element Plus</p>
      </div>
      
      <div class="login-form-wrap">
        <h2>登录账号</h2>
        
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
        </el-form>
        
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
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background-color: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  top: -100px;
  left: -100px;
  opacity: 0.3;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  bottom: -50px;
  right: -50px;
  opacity: 0.4;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #8b5cf6, #4338ca);
  bottom: 20%;
  left: 25%;
  opacity: 0.2;
}

.login-card {
  position: relative;
  z-index: 1;
  width: 450px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background-color: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-header {
  text-align: center;
  padding: 40px 20px 20px;
  
  .logo-icon {
    margin: 0 auto 16px;
    font-size: 2.5rem;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.3);
  }
  
  h1 {
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 8px;
    background: linear-gradient(to right, #60a5fa, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    margin: 0;
  }
}

.login-form-wrap {
  padding: 20px 40px 40px;
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px;
    color: #fff;
    text-align: center;
  }
}

:deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 14px;
  padding-bottom: 8px;
}

:deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  padding: 4px 12px;
  
  &.is-focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

:deep(.el-input__inner) {
  color: #fff;
  height: 42px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}

:deep(.el-input__icon) {
  color: rgba(255, 255, 255, 0.5);
}

.login-button {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  margin-top: 10px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border: none;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 20px -3px rgba(59, 130, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.login-options {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.register-link {
  text-align: center;
  
  span {
    color: rgba(255, 255, 255, 0.6);
  }
  
  :deep(.el-button) {
    color: #60a5fa;
    font-weight: 500;
    transition: all 0.2s;
    padding: 0 4px;
    
    &:hover {
      color: #93c5fd;
      text-decoration: underline;
    }
  }
}

.login-tips {
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  
  p {
    margin: 4px 0;
    display: flex;
    align-items: center;
    
    &:before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #60a5fa;
      margin-right: 8px;
    }
  }
}
</style> 