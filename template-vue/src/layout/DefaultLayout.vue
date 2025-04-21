<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import menus from "@/menu";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 侧边栏是否折叠
const isCollapse = ref(false)

// 当前选中的菜单项
const activeMenu = computed(() => {
  const { path } = route
  return path
})



// 退出登录
const handleLogout = () => {
  userStore.logout()
}

// 检查用户信息
const checkUserInfo = async () => {
  if (userStore.isLoggedIn && !userStore.userName) {
    // 如果已登录但没有用户名，说明需要获取用户信息
    await userStore.fetchCurrentUser()
  }
}

// 当路由变化时检查用户信息
watch(() => route.path, checkUserInfo, { immediate: true })
</script>

<template>
  <div class="layout-wrapper">
    <el-container class="layout-container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar">
        <div class="logo-container">
          <div class="logo-content">
            <el-icon class="logo-icon"><i-ep-monitor /></el-icon>
            <h1 v-if="!isCollapse" class="logo-text">后台管理系统</h1>
          </div>
        </div>
        
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical"
            :collapse="isCollapse"
            :router="true"
            unique-opened
            background-color="transparent"
            text-color="rgba(255, 255, 255, 0.8)"
            active-text-color="#ffffff"
          >
            <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
              <el-icon>
                <i-ep-house v-if="item.icon === 'ep:house'" />
                <i-ep-user v-if="item.icon === 'ep:user'" />
                <i-ep-key v-if="item.icon === 'ep:key'" />
                <i-ep-user-filled v-if="item.icon === 'ep:user-filled'" />
              </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      
      <el-container class="main-container">
        <!-- 顶部导航 -->
        <el-header class="header">
          <div class="header-left">
            <el-button class="toggle-btn" type="text" @click="isCollapse = !isCollapse">
              <el-icon><i-ep-fold v-if="!isCollapse" /><i-ep-expand v-else /></el-icon>
            </el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="route.meta.title">{{ route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <div class="header-right">
            <el-dropdown trigger="click">
              <div class="avatar-container">
                <el-avatar :size="36" :src="userStore.avatar" class="user-avatar">
                  {{ userStore.userName ? userStore.userName.substring(0, 1).toUpperCase() : userStore.account.substring(0, 1).toUpperCase() }}
                </el-avatar>
                <span class="user-name">{{ userStore.userName || userStore.account }}</span>
                <el-icon class="dropdown-icon"><i-ep-arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="router.push('/profile')">
                    <el-icon><i-ep-user /></el-icon>个人资料
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><i-ep-switch-button /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <!-- 主内容区 -->
        <el-main class="main-content">
          <div class="content-container">
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f7fa;
}

.layout-container {
  height: 100%;
}

.sidebar {
  background: linear-gradient(to bottom, #304156, #1f2d3d);
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  z-index: 10;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);
  overflow: hidden;
}

.logo-container {
  height: 64px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15%;
    width: 70%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
}

.logo-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  font-size: 24px;
  color: #409EFF;
  margin-right: 8px;
}

.logo-text {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  background: linear-gradient(45deg, #409EFF, #53a8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.el-menu) {
  border-right: none;
  padding: 16px 0;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
  margin: 4px 16px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  
  &.is-active {
    background: linear-gradient(90deg, #409EFF, rgba(64, 158, 255, 0.7)) !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 24px;
      width: 3px;
      background-color: #fff;
      border-radius: 0 3px 3px 0;
    }
  }
}

.main-container {
  position: relative;
  overflow: hidden;
}

.header {
  height: 64px !important;
  line-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 9;
  padding: 0 20px;
}

.toggle-btn {
  margin-right: 16px;
  font-size: 18px;
  cursor: pointer;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #606266;
  
  &:hover {
    background-color: #f2f6fc;
  }
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.avatar-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  height: 50px;
  border-radius: 4px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f2f6fc;
  }
}

.user-avatar {
  background: linear-gradient(45deg, #409EFF, #53a8ff);
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4);
  border: 2px solid #fff;
}

.user-name {
  margin: 0 12px;
  font-size: 14px;
  color: #606266;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-icon {
  font-size: 12px;
  color: #909399;
}

.main-content {
  padding: 16px;
  overflow-y: auto;
  position: relative;
  background-color: #f5f7fa;
}

.content-container {
  background-color: #fff;
  border-radius: 8px;
  min-height: calc(100vh - 96px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
}

// 页面切换动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.25s ease;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// 响应式
@media (max-width: 992px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
    transform: translateX(0);
    transition: transform 0.3s ease;
    
    &.is-collapsed {
      transform: translateX(-100%);
    }
  }
  
  .main-container {
    margin-left: 0 !important;
  }
}
</style> 