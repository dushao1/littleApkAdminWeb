<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 语料列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="createTime" label="日期" sortable width="180" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120">
                </el-table-column>
                <el-table-column prop="voiceContent" label="内容" >
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-add" v-if="tableData[scope.$index].filePath != null && tableData[scope.$index].filePath != ''" class="green" @click="playVideo(scope.$index, scope.row)">播放音频</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-send" @click="sendText(scope.$index, scope.row)">推送</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="text" icon="el-icon-list" class="red" @click="handleList(scope.$index, scope.row)">详情</el-button>
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
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="消息内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 回复列表 -->
        <el-dialog title="回复" :visible.sync="listVisible"  center>
            <el-table :data="listDate" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="createTime" label="日期" sortable width="180" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column prop="creator" label="服务商名称" width="120">
                </el-table-column>
                <el-table-column prop="content" label="内容" >
                </el-table-column>
                <!-- <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-add" class="green" @click="handleDelete(scope.$index, scope.row)">播放音频</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-button type="primary" @click="addBack">添加</el-button>
        </el-dialog>
          <el-dialog title="添加" :visible.sync="addVisible" width="30%">
                <el-form  label-width="60px">
                    <el-form-item label="内容">
                    <el-input v-model="addContent" style="width: 100%;">></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addOne">确 定</el-button>
                </span>
            </el-dialog>
        <!-- 回复内容 -->
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
import {_public} from '../common/utils.js'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                listDate:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                totalCount:0,
                is_search: false,
                editVisible: false,
                delVisible: false,
                listVisible: false,
                addVisible: false,
                addContent:'',
                form: {
                    content: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                // return this.tableData.filter((d) => {
                //     // let is_del = false;
                //     // for (let i = 0; i < this.del_list.length; i++) {
                //     //     if (d.name === this.del_list[i].name) {
                //     //         is_del = true;
                //     //         break;
                //     //     }
                //     // }
                //     // if (!is_del) {
                //     //     if (d.address.indexOf(this.select_cate) > -1 &&
                //     //         (d.name.indexOf(this.select_word) > -1 ||
                //     //             d.address.indexOf(this.select_word) > -1)
                //     //     ) {
                //     //         return d;
                //     //     }
                //     // }
                // })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                var _this = this;
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                this.$axios.get(this.$apiPath.basePath + this.$apiPath.messageRecordList+"?page="+this.cur_page+"&content="+this.select_word, {
                    page: this.cur_page
                }).then((res) => {
                    if(res.data.status == 200){
                        this.totalCount = res.data.data.totalCount;
                        this.tableData = res.data.data.list;
                    }
                // console.log(JSON.stringify( res.data.data.list))

                })
                console.log(JSON.stringify(this.tableData))
            },
            playVideo(index,row){
                  this.audio = new Audio();
                  this.audio.src =row.filePath
                  this.audio.play();
                  var self = this;
                  this.audio.onended = function () {
                    self.$message.success('第'+(index+1)+'条消息，播放完毕');
                  }
            },
            addOne(){

                this.$axios.post(this.$apiPath.basePath + this.$apiPath.addBack,{
                    content:this.addContent,
                    adminId:JSON.parse(localStorage.getItem("admin_info")).id,
                    messageId:this.idx
                }).then(res =>{
                    if(res.data.status == 200){
                        this.$message.success(`添加成功`);
                        this.addVisible=false;
                        this.addContent='';
                        this.listVisible=false;
                        this.getData();

                    }
                })
            },
            search() {
                 this.$axios.get(this.$apiPath.basePath + this.$apiPath.messageRecordList+"?page="+this.cur_page+"&content="+this.select_word, {
                    page: this.cur_page
                }).then((res) => {
                    if(res.data.status == 200){
                        this.totalCount = res.data.data.totalCount;
                        this.tableData = res.data.data.list;
                    }
                });
            },
            formatter(row, column) {
                return row.address;
            },
            dateFormatter(row, column){
                return _public.formatDate(row.createTime, 'yyyy-MM-dd hh:mm:ss');
            },
            addBack(){
                this.addVisible = true;
                this.addContent = '';
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                console.log("index" + this.idx);
                const item = this.tableData[index];
                this.form.content= item.voiceContent,
                
                this.editVisible = true;
            },
            sendText(index, row) {
                console.log(this.tableData[index])
                this.$axios.post(this.$apiPath.basePath + this.$apiPath.sendText,{
                    id:this.tableData[index].id,
                    updator:JSON.parse(localStorage.getItem("admin_info")).id
                }).then(res =>{
                    if(res.data.status == 200){
                        this.$message.success(this.tableData[index].voiceContent+`推送成功`);
                        this.getData();

                    }
                })
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            handleList(index, row) {
                this.listDate = this.tableData[index].backList;
                this.listVisible = true;
                this.idx =  this.tableData[index].id;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateMessageInfo,{
                    voiceContent:this.form.content,
                    id:this.tableData[this.idx].id,
                    updator:JSON.parse(localStorage.getItem("admin_info")).id
                }).then(res =>{
                    if(res.data.status == 200){
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                        this.getData();

                    }
                })
            },
            // 确定删除
            deleteRow(){
                this.$axios.post(this.$apiPath.basePath + this.$apiPath.deleteMessage,{
                    id:this.tableData[this.idx].id,
                    updator:JSON.parse(localStorage.getItem("admin_info")).id
                }).then(res =>{
                    if(res.data.status == 200){
                        this.tableData.splice(this.idx, 1);
                        this.$message.success('删除成功');
                        this.delVisible = false;
                    }
                })
              
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
    .green{
        color: #35e711;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
