<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            var _this = this;
            var routs = [];
            var result = JSON.parse(localStorage.getItem('menus'));
            for(let item of result){
                let tempRout={
                    icon:   item.icon,
                    index: item.privlageMenus,
                    title: item.menuName 
                };
                routs.push(tempRout);
            }
            let tempResult = {
                collapse: false,
                items: routs
            };
            return tempResult;

            // return {
            //     collapse: false,
            //     items: [
            //          {
            //             icon: 'el-icon-lx-home',
            //             index: 'dashboard',
            //             title: '系统首页'
            //         },
            //         {
            //             icon: 'el-icon-rank',
            //             index: 'userRole',
            //             title: '角色管理'
            //         },
            //         // {
            //         //     icon: 'el-icon-rank',
            //         //     index: 'roleMenu',
            //         //     title: '菜单管理'
            //         // },
            //         // {
            //         //     icon: 'el-icon-rank',
            //         //     index: 'admin',
            //         //     title: '服务商管理'
            //         // },
            //         {
            //             icon: 'el-icon-lx-emoji',
            //             index: 'users',
            //             title: '微信用户管理'
            //         },
            //         {
            //             icon: 'el-icon-lx-cascades',
            //             index: 'contents',
            //             title: '内容管理'
            //         },
            //         {
            //             icon: 'el-icon-lx-cascades',
            //             index: 'packRecordList',
            //             title: '红包列表'
            //         },
            //         {
            //             icon: 'el-icon-lx-cascades',
            //             index: 'banners',
            //             title: '跑马灯管理'
            //         },

            //         // {
            //         //     icon: 'el-icon-lx-home',
            //         //     index: 'noCheck',
            //         //     title: '免审核列表'
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-copy',
            //         //     index: 'corpus',
            //         //     title: '语料列表'
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-cascades',
            //         //     index: 'table',
            //         //     title: '基础表格'
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-copy',
            //         //     index: 'tabs',
            //         //     title: 'tab选项卡'
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-calendar',
            //         //     index: '3',
            //         //     title: '表单相关',
            //         //     subs: [
            //         //         {
            //         //             index: 'form',
            //         //             title: '基本表单'
            //         //         },
            //         //         {
            //         //             index: '3-2',
            //         //             title: '三级菜单',
            //         //             subs: [
            //         //                 {
            //         //                     index: 'editor',
            //         //                     title: '富文本编辑器'
            //         //                 },
            //         //                 {
            //         //                     index: 'markdown',
            //         //                     title: 'markdown编辑器'
            //         //                 },
            //         //             ]
            //         //         },
            //         //         {
            //         //             index: 'upload',
            //         //             title: '文件上传'
            //         //         }
            //         //     ]
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-emoji',
            //         //     index: 'icon',
            //         //     title: '自定义图标'
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-favor',
            //         //     index: 'charts',
            //         //     title: 'schart图表'
            //         // },
            //         // {
            //         //     icon: 'el-icon-rank',
            //         //     index: '6',
            //         //     title: '拖拽组件',
            //         //     subs: [
            //         //         {
            //         //             index: 'drag',
            //         //             title: '拖拽列表',
            //         //         },
            //         //         {
            //         //             index: 'dialog',
            //         //             title: '拖拽弹框',
            //         //         }
            //         //     ]
            //         // },
            //         // {
            //         //     icon: 'el-icon-lx-warn',
            //         //     index: '7',
            //         //     title: '错误处理',
            //         //     subs: [
            //         //         {
            //         //             index: 'permission',
            //         //             title: '权限测试'
            //         //         },
            //         //         {
            //         //             index: '404',
            //         //             title: '404页面'
            //         //         }
            //         //     ]
            //         // }
            //     ]
            // }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods:{
             async getPri(){
                let adminInfoStr = localStorage.getItem("admin_info");
                let adminInfo = JSON.parse(adminInfoStr);
                var _this = this;
                var priResult = await _this.$axios.get(_this.$apiPath.basePath + _this.$apiPath.getRoleList+"?adminId="+adminInfo.id)
                return priResult;
            }

        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
