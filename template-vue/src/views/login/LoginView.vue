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
    <div class="login-box">
      <div class="login-title">
        <h1>后台管理系统</h1>
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
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    color: #303133;
    margin: 0 0 15px 0;
    background: linear-gradient(45deg, #409EFF, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
    box-shadow: 0 0 0 1px #409EFF;
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
  background: linear-gradient(45deg, #409EFF, #764ba2);
  border: none;
  transition: all 0.3s;
  
  &:hover {
    background: linear-gradient(45deg, #409EFF, #6b4494);
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
  }
}

.login-tips {
  color: #909399;
  font-size: 13px;
  text-align: center;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid #409EFF;
  
  p {
    margin: 5px 0;
  }
}
</style> 