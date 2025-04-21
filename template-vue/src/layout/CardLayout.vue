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

// 侧边菜单状态
const drawerVisible = ref(false)

// 主题配色
const isDarkMode = ref(false)

// 退出登录
const handleLogout = () => {
  userStore.logout()
}

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
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

// 关闭侧边菜单
watch(() => route.path, () => {
  drawerVisible.value = false
})
</script>

<template>
  <div class="card-layout" :class="{ 'dark-theme': isDarkMode }">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <el-button 
          class="menu-btn" 
          circle 
          @click="drawerVisible = true"
        >
          <el-icon><i-ep-menu /></el-icon>
        </el-button>
        
        <div class="brand">
          <el-icon class="brand-icon"><i-ep-sunrise /></el-icon>
          <span class="brand-name">卡片式布局</span>
        </div>
      </div>
      
      <div class="header-right">
        <el-button 
          class="theme-btn" 
          circle 
          @click="toggleTheme"
        >
          <el-icon><i-ep-moon v-if="!isDarkMode" /><i-ep-sunny v-else /></el-icon>
        </el-button>
        
        <el-dropdown trigger="click">
          <div class="user-profile">
            <el-avatar :size="36" :src="userStore.avatar" class="user-avatar">
              {{ userStore.userName ? userStore.userName.substring(0, 1).toUpperCase() : userStore.account.substring(0, 1).toUpperCase() }}
            </el-avatar>
          </div>
          
          <template #dropdown>
            <el-dropdown-menu>
              <div class="user-info-panel">
                <el-avatar :size="60" :src="userStore.avatar" class="user-avatar-large">
                  {{ userStore.userName ? userStore.userName.substring(0, 1).toUpperCase() : userStore.account.substring(0, 1).toUpperCase() }}
                </el-avatar>
                <div class="user-detail">
                  <h3 class="user-name">{{ userStore.userName || userStore.account }}</h3>
                  <p class="user-role">{{ userStore.userRole === 'admin' ? '管理员' : '用户' }}</p>
                </div>
              </div>
              
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
    </header>
    
    <!-- 侧边菜单抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="导航菜单"
      direction="ltr"
      size="280px"
      :with-header="true"
    >
      <div class="app-menu">
        <div class="menu-group">
          <div class="menu-title">主要菜单</div>
          
          <router-link 
            v-for="item in menus" 
            :key="item.path" 
            :to="item.path"
            class="menu-item"
            :class="{ 'active': activeMenu === item.path }"
            :style="{ '--hover-color': item.color }"
          >
            <div class="menu-item-icon" :style="{ backgroundColor: item.color }">
              <el-icon>
                <i-ep-house v-if="item.icon === 'ep:house'" />
                <i-ep-user v-if="item.icon === 'ep:user'" />
                <i-ep-key v-if="item.icon === 'ep:key'" />
                <i-ep-user-filled v-if="item.icon === 'ep:user-filled'" />
              </el-icon>
            </div>
            <span class="menu-item-title">{{ item.title }}</span>
            <el-icon class="menu-item-arrow"><i-ep-arrow-right /></el-icon>
          </router-link>
        </div>
        
        <div class="menu-footer">
          <div class="app-info">
            <p>版本 v1.0.0</p>
            <p>© {{ new Date().getFullYear() }} 卡片式管理系统</p>
          </div>
        </div>
      </div>
    </el-drawer>
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="page-header">
        <el-card class="breadcrumb-card">
          <div class="breadcrumb-content">
            <div class="breadcrumb-title">
              <h2>{{ route.meta.title || '首页' }}</h2>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="route.meta.title">{{ route.meta.title }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            
            <div class="quick-actions">
              <el-button type="primary" plain>
                <el-icon><i-ep-refresh /></el-icon>
                刷新
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
      
      <!-- 页面内容区 -->
      <div class="page-container">
        <el-card class="content-card">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-card>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.card-layout {
  min-height: 100vh;
  background-color: #f0f2f5;
  transition: background-color 0.3s;
  
  &.dark-theme {
    background-color: #1f1f1f;
    color: #e0e0e0;
    
    .app-header {
      background-color: #252525;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      
      .brand-name {
        color: #ffffff;
      }
    }
    
    .content-card {
      background-color: #252525;
      
      :deep(.el-card__body) {
        color: #e0e0e0;
      }
    }
    
    .breadcrumb-card {
      background-color: #252525;
      
      h2 {
        color: #ffffff;
      }
    }
  }
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 999;
  transition: background-color 0.3s;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.menu-btn, .theme-btn {
  font-size: 18px;
}

.brand {
  display: flex;
  align-items: center;
  margin-left: 16px;
  
  .brand-icon {
    font-size: 24px;
    color: #409EFF;
  }
  
  .brand-name {
    font-size: 18px;
    font-weight: 600;
    margin-left: 8px;
    color: #303133;
  }
}

.user-profile {
  margin-left: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  .user-avatar {
    background: linear-gradient(135deg, #409EFF, #36D1DC);
    color: #ffffff;
    font-weight: 600;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.05);
    }
  }
}

.user-info-panel {
  padding: 16px;
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px 4px 0 0;
  
  .user-avatar-large {
    margin-bottom: 12px;
    background: linear-gradient(135deg, #409EFF, #36D1DC);
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .user-detail {
    text-align: center;
    
    .user-name {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
    
    .user-role {
      margin: 0;
      font-size: 12px;
      color: #909399;
    }
  }
}

.main-content {
  padding: 84px 24px 24px 24px;
  transition: padding 0.3s;
}

.page-header {
  margin-bottom: 24px;
}

.breadcrumb-card {
  border-radius: 8px;
  
  :deep(.el-card__body) {
    padding: 16px 24px;
  }
}

.breadcrumb-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb-title {
  h2 {
    margin: 0 0 8px 0;
    font-weight: 600;
    color: #303133;
    font-size: 18px;
  }
}

.content-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s, box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
  
  :deep(.el-card__body) {
    padding: 24px;
  }
}

.app-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-group {
  flex: 1;
  padding: 16px 0;
}

.menu-title {
  padding: 0 20px;
  margin-bottom: 16px;
  color: #909399;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #606266;
  border-left: 3px solid transparent;
  position: relative;
  transition: all 0.3s;
  margin-bottom: 8px;
  
  &:hover {
    background-color: rgba(var(--hover-color, #409EFF), 0.1);
    color: var(--hover-color, #409EFF);
  }
  
  &.active {
    background-color: rgba(var(--hover-color, #409EFF), 0.1);
    color: var(--hover-color, #409EFF);
    border-left-color: var(--hover-color, #409EFF);
    
    .menu-item-icon {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    .menu-item-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.menu-item-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
  color: #ffffff;
  
  .el-icon {
    font-size: 18px;
  }
}

.menu-item-title {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.menu-item-arrow {
  font-size: 14px;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.menu-footer {
  padding: 16px 20px;
  border-top: 1px solid #ebeef5;
}

.app-info {
  text-align: center;
  font-size: 12px;
  color: #909399;
  
  p {
    margin: 4px 0;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  
  .brand-name {
    display: none;
  }
  
  .main-content {
    padding: 80px 16px 16px 16px;
  }
  
  .breadcrumb-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .quick-actions {
    margin-top: 12px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  
  .content-card {
    :deep(.el-card__body) {
      padding: 16px;
    }
  }
}
</style> 