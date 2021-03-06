import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/userRole',
                    component: resolve => require(['../components/page/UserRole.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/users',
                    component: resolve => require(['../components/page/Users.vue'], resolve),
                    meta: { title: '员工管理' }
                },
                {
                    path: '/contents',
                    component: resolve => require(['../components/page/store_list_page.vue'], resolve),
                    meta: { title: '内容管理' }
                },
                {
                    path: '/packRecordList',
                    component: resolve => require(['../components/page/packRecordList.vue'], resolve),
                    meta: { title: '红包列表' }
                },
                {
                    path: '/banners',
                    component: resolve => require(['../components/page/banners.vue'], resolve),
                    meta: { title: '轮播管理' }
                },
                {
                    path: '/noCheck',
                    component: resolve => require(['../components/page/NoCheck.vue'], resolve),
                    meta: { title: '免审核列表' }
                },
                {
                    path: '/corpus',
                    component: resolve => require(['../components/page/Corpus.vue'], resolve),
                    meta: { title: '语料列表' }
                },
                {
                    path: '/simplePackRecordList',
                    component: resolve => require(['../components/page/simplePackRecordList.vue'], resolve),
                    meta: { title: '奖品列表' }
                },
                
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/store_list_page.vue'], resolve),
                    meta: { title: '广告' }
                },
                {
                    path: '/admin',
                    component: resolve => require(['../components/page/admin.vue'], resolve),
                    meta: { title: "服务商" }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
