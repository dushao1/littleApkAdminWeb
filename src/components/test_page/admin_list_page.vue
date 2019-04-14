<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                 <el-table-column prop="sId" label="管理员ID" width="150">
                </el-table-column>
                <el-table-column prop="title" label="管理员账号" width="150">
                </el-table-column>
                 <el-table-column prop="titleDetail" label="管理员电话" width="150">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="店铺名">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="店铺描述">
                    <el-input v-model="form.titleDetail"></el-input>
                </el-form-item>
                <el-form-item label="剩余红包数">
                    <el-input v-model="form.surplusCount"></el-input>
                </el-form-item>
                 <el-form-item label="红包总数">
                    <el-input v-model="form.totalCount"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                del_list: [],
                editVisible: false,
                delVisible: false,
                form: {
                    sId: '',
                    title: '',
                    titleDetail: '',
                    firstImg: '',
                    detailImg: '',
                    endTime: '',
                    startTime: '',
                    surplusCount: '',
                    totalCount: '',
                    status: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                 return this.tableData;
            }
        },
        methods: {
            // 分页导航;
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                var _this = this
                this.$axios.post(this.$apiPath.basePath + this.$apiPath.allStore)
                .then(function (res) {
                    console.log(res.data.data);
                    _this.tableData = res.data.data
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            search() {
                this.is_search = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                console.log(item.sId)
                this.form = {
                    sId: item.sId,
                    title: item.title,
                    titleDetail: item.titleDetail,
                    firstImg: item.firstImg,
                    detailImg: item.detailImg,
                    endTime: item.endTime,
                    startTime: item.startTime,
                    surplusCount: item.surplusCount,
                    totalCount: item.totalCount,
                    status: item.status
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                // this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                const item = this.form;
                const tableItem = this.tableData[this.id];
                var data = {
                    title: item.title,
                    titleDetail: item.titleDetail,
                    surplusCount: item.surplusCount,
                    totalCount: item.totalCount,
                    sId: tableItem.sId
                 }
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateStore,querystring.stringify(data))
                    .then(function (res) {
                        message.success('修改成功');
                        that.getData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 确定删除
            deleteRow(){
                this.delVisible = false;
                const tableItem = this.tableData[this.idx];
                var data = {
                    status: -1,
                    sId: tableItem.sId
                 }
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateStore,querystring.stringify(data))
                    .then(function (res) {
                        message.success('删除成功');
                        that.getData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
