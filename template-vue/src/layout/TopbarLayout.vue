<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import menus from "@/menu";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 当前选中的菜单项
const activeMenu = computed(() => {
  const { path } = route
  return path
})


// 移动端菜单展开状态
const mobileMenuOpen = ref(false)

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

// 关闭移动端菜单
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <div class="topbar-layout">
    <!-- 顶部导航栏 -->
    <header class="top-header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo">
          <el-icon class="logo-icon"><i-ep-element-plus /></el-icon>
          <h1 class="logo-text">管理平台</h1>
        </div>
        
        <!-- 主导航菜单 (桌面端) -->
        <nav class="main-nav desktop-nav">
          <ul class="nav-list">
            <li v-for="item in menus" 
                :key="item.path" 
                class="nav-item"
                :class="{ 'active': activeMenu === item.path }"
            >
              <router-link :to="item.path" class="nav-link">
                <el-icon class="nav-icon">
                  <i-ep-house v-if="item.icon === 'ep:house'" />
                  <i-ep-user v-if="item.icon === 'ep:user'" />
                  <i-ep-key v-if="item.icon === 'ep:key'" />
                  <i-ep-user-filled v-if="item.icon === 'ep:user-filled'" />
                </el-icon>
                <span>{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
        
        <!-- 用户信息区域 -->
        <div class="user-actions">
          <el-dropdown trigger="click">
            <div class="user-info">
              <el-avatar :size="32" :src="userStore.avatar" class="user-avatar">
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
          
          <!-- 移动端菜单按钮 -->
          <el-button 
            class="mobile-menu-btn" 
            type="text" 
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <el-icon>
              <i-ep-menu v-if="!mobileMenuOpen" />
              <i-ep-close v-else />
            </el-icon>
          </el-button>
        </div>
      </div>
    </header>
    
    <!-- 移动端菜单 -->
    <div 
      class="mobile-menu" 
      :class="{ 'open': mobileMenuOpen }"
      v-if="mobileMenuOpen"
    >
      <el-menu
        :default-active="activeMenu"
        :router="true"
        class="mobile-nav-menu"
      >
        <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
          <el-icon>
            <i-ep-house v-if="item.icon === 'ep:house'" />
            <i-ep-user v-if="item.icon === 'ep:user'" />
            <i-ep-key v-if="item.icon === 'ep:key'" />
            <i-ep-user-filled v-if="item.icon === 'ep:user-filled'" />
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <!-- 内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="route.meta.title">{{ route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      
      <!-- 页面内容 -->
      <div class="page-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>© {{ new Date().getFullYear() }} 管理平台 | 基于 Vue 3 + Element Plus</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.topbar-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.top-header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  
  .logo-icon {
    font-size: 24px;
    color: #409EFF;
  }
  
  .logo-text {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 0 8px;
    color: #303133;
  }
}

.main-nav {
  display: flex;
  height: 100%;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.nav-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  
  &.active {
    .nav-link {
      color: #409EFF;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 16px;
      right: 16px;
      height: 3px;
      background-color: #409EFF;
      border-radius: 3px 3px 0 0;
    }
  }
}

.nav-link {
  display: flex;
  align-items: center;
  color: #606266;
  font-weight: 500;
  transition: color 0.3s;
  
  &:hover {
    color: #409EFF;
  }
  
  .nav-icon {
    margin-right: 4px;
  }
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  .user-avatar {
    background-color: #409EFF;
    color: #ffffff;
    font-weight: 600;
  }
  
  .user-name {
    margin: 0 8px;
    font-size: 14px;
    color: #333333;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .dropdown-icon {
    font-size: 12px;
    color: #909399;
  }
}

.mobile-menu-btn {
  display: none;
  font-size: 20px;
  margin-left: 16px;
}

.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: none;
  
  .mobile-nav-menu {
    background-color: #ffffff;
    width: 80%;
    max-width: 300px;
    height: calc(100% - 64px);
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  }
}

.main-content {
  flex: 1;
  margin-top: 64px;
  padding: 24px;
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.breadcrumb-container {
  margin-bottom: 16px;
  padding: 12px 16px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.page-container {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 24px;
  min-height: 500px;
}

.footer {
  background-color: #ffffff;
  border-top: 1px solid #ebeef5;
  padding: 16px 24px;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-menu {
    display: block;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.open {
      transform: translateX(0);
    }
  }
  
  .user-info {
    .user-name {
      display: none;
    }
  }
  
  .main-content {
    padding: 16px;
  }
  
  .page-container {
    padding: 16px;
  }
}
</style> 