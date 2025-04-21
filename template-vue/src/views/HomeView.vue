<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <span>欢迎使用后台管理系统</span>
        </div>
      </template>
      
      <div class="welcome-content">
        <h2>你好, {{ userStore.userName || userStore.account }}</h2>
        <p>当前角色: {{ userStore.userRole }}</p>
        
        <div class="feature-list">
          <h3>系统功能</h3>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户管理">
              <el-tag type="primary">添加用户</el-tag>
              <el-tag type="success">修改用户</el-tag>
              <el-tag type="warning">删除用户</el-tag>
              <el-tag type="info">查询用户</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="权限管理">
              <el-tag type="primary">角色管理</el-tag>
              <el-tag type="success">权限配置</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-content {
  padding: 20px 0;
}

.feature-list {
  margin-top: 30px;
}
</style> 