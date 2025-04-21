import {useUserStore} from "@/stores/user.ts";

const userStore = useUserStore()

// 可访问的路由
const menus = computed(() => {
    return [
        {
            path: '/',
            title: '首页',
            icon: 'ep:house',
        },
        {
            path: '/user',
            title: '用户管理',
            icon: 'ep:user',
            permission: 'admin-user-select',
        },
        {
            path: '/profile',
            title: '个人资料',
            icon: 'ep:user-filled',
        },
    ].filter(item => {
        // 过滤掉没有权限的菜单
        if (item.permission) {
            return userStore.hasPermission(item.permission)
        }
        return true
    })
})

export default menus