<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-button type="primary" icon="edit" class="handle-del mr10" @click="updateAll">批量修改</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="export" class="handle-del mr10" @click="exportSelect">导出</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>

                <el-table-column prop="createTime" label="创建日期" sortable width="200" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column prop="sessionKey" label="sessionKey" width="210">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号"  sortable>
                </el-table-column>
                 <el-table-column prop="address" label="地址"  sortable>
                </el-table-column>
                 <el-table-column prop="limitDays" label="限制天数" >
                </el-table-column>
                <el-table-column prop="limitTime" label="限制开始时间" :formatter="limitFormatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="showEdit(scope.$index, scope.row)">编辑</el-button>
                        <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <!-- <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
                <el-form-item label="天数">
                    <el-input v-model="limitDays"></el-input>
                </el-form-item>
                <!-- <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item> -->

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 批量修改 -->
         <el-dialog title="批量编辑" :visible.sync="editMultipleVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="天数">
                    <el-input v-model="limitDays"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editMultipleVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMultipleEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import {_public} from '../common/utils.js'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                editMultipleVisible:false,
                select_word: '',
                del_list: [],
                totalCount:0,
                is_search: false,
                editVisible: false,
                delVisible: false,
                totalPage:1,
                limitDays:'',
                openId:'',
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            // data() {
            //     return this.tableData.filter((d) => {
            //         let is_del = false;
            //         for (let i = 0; i < this.del_list.length; i++) {
            //             if (d.name === this.del_list[i].name) {
            //                 is_del = true;
            //                 break;
            //             }
            //         }
            //         if (!is_del) {
            //             if (d.address.indexOf(this.select_cate) > -1 &&
            //                 (d.name.indexOf(this.select_word) > -1 ||
            //                     d.address.indexOf(this.select_word) > -1)
            //             ) {
            //                 return d;
            //             }
            //         }
            //     })
            // }
        },
        methods: {
            updateAll(){
                const length = this.multipleSelection.length;
                if(length == 0){
                    this.$message.error('请选择后再操作');
                } else {
                    this.editMultipleVisible = true;
                }
            },
            saveMultipleEdit(){
                const length = this.multipleSelection.length;
                this.del_list = this.del_list.concat(this.multipleSelection);
                var data = []
                for (let i = 0; i < length; i++) {
                    data.push({
                        openId:this.multipleSelection[i].openId,
                        limitDays:this.limitDays
                    })
                }
                this.multipleSelection = [];
                var that = this;
                this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateUser,data)
                    .then(function (res) {
                        that.openId  = '';
                        that.editMultipleVisible = false;
                        that.$message.success('修改成功');
                        that.getData();
                    })
                    .catch(function (error) {
                        that.openId  = '';
                        that.editMultipleVisible = false;
                        console.log(error);
                    });
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                // this.$axios.post(this.url, {
                    
                // }).then((res) => {
                //     this.tableData = res.data.list;
                // })
                this.$axios.get(this.$apiPath.basePath + this.$apiPath.allUsers + "?page="+this.cur_page+"&mobile="+this.select_word, {}).then((res) =>{
                    if(res.data.status == 200){
                        this.tableData = res.data.data.list;
                        this.totalCount = res.data.data.totalCount;
                    }
                })
            },
            search() {
                this.getData();
            },
            dateFormatter(row, column) {
                return  _public.formatDate(row.createTime, 'yyyy-MM-dd hh:mm:ss');
            },
            limitFormatter(row,column){
                if(row.limitTime != null){
                    return _public.formatDate(row.limitTime, 'yyyy-MM-dd hh:mm:ss')
                } else {
                    return "-";
                }
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
               this.openId  = '';
                this.editVisible = false;
            },
            showEdit(index, row){
                this.openId  = row.openId;
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                 var data = [
                    {
                        openId:this.openId,
                        limitDays:this.limitDays
                    }
                 ]
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateUser,data)
                    .then(function (res) {
                        that.openId  = '';
                        that.editVisible = false;
                        that.$message.success('修改成功');
                        that.getData();
                    })
                    .catch(function (error) {
                        that.openId  = '';
                        that.editVisible = false;
                        console.log(error);
                    });
            },
            // 确定删除
            deleteRow(){
            },
            exportSelect() {
                const length = this.multipleSelection.length;
                var that = this;
                if (length == 0) {
                    this.$message.error("请选定后导出");
                } else {
                    let data = this.multipleSelection;
                    this.$axios
                        .post(
                        this.$apiPath.basePath +
                            this.$apiPath.getUserExportUrl , data
                        )
                        .then(function(res) {
                            console.log(JSON.stringify(res.data));
                            window.open(res.data.data);
                        })
                }
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
