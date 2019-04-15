<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                 <el-table-column prop="sId" label="id" width="100">
                </el-table-column>
                <el-table-column prop="title" label="标题" width="150">
                </el-table-column>
               <el-table-column prop="firstImg" label="首图" min-width="70px" >
                    <!-- 图片的显示 -->
                    <template   slot-scope="scope">            
                         <img :src="scope.row.firstImg"  min-width="70" height="70px" />
                    </template>         
                </el-table-column> 
                 <el-table-column prop="titleDetail" label="描述" width="850">
                </el-table-column>
                <el-table-column prop="surplusCount" label="剩余红包数" width="120">
                </el-table-column>
                <el-table-column prop="totalCount" label="红包总数">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" style="text-align:left">
                <el-button type="primary" icon="add" class="handle-del mr10" @click="addStore()">添加</el-button>
            </div>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <el-input rows="7" type="textarea" v-model="form.titleDetail" ></el-input>
                </el-form-item>

                 <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="cropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setImage"/>
                        </div>
                    </div>
                 </el-form-item>

                 <el-form-item label="开始时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.startTime" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="剩余红包数" label-width="8%" style="text-align:left">
                    <el-input v-model="form.surplusCount" ></el-input>
                </el-form-item>
                 <el-form-item label="红包总数" label-width="8%" style="text-align:left">
                    <el-input v-model="form.totalCount"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加弹出框 -->
         <el-dialog title="添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <el-input rows="7" type="textarea" v-model="form.titleDetail" ></el-input>
                </el-form-item>

                 <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="cropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setAddImage"/>
                        </div>
                    </div>
                 </el-form-item>

                 <el-form-item label="开始时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.startTime" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="剩余红包数" label-width="8%" style="text-align:left">
                    <el-input v-model="form.surplusCount" ></el-input>
                </el-form-item>
                 <el-form-item label="红包总数" label-width="8%" style="text-align:left">
                    <el-input v-model="form.totalCount"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="裁剪图片" :visible.sync="addImgVisible" width="30%">
            <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addImgVisible = false">确 定</el-button>
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
 import VueCropper  from 'vue-cropperjs';
 import {dateFormat} from '../common/date.js'
    export default {
        name: 'baseTable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                fileList:[],
                editVisible: false,
                delVisible: false,
                addVisible: false,
                imgVisible: false,
                addImgVisible: false,
                cropImg: '',
                imgSrc: '',
                defaultSrc: require('../../assets/img/img.jpg'),
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
                    status: '',
                    startDate:'',
                    endDate:''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
            this.cropImg = this.defaultSrc;
        },
        computed: {
            data() {
                 return this.tableData;
            }
        },
        components:{
            VueCropper
        },
        methods: {
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[0] = file;
            },
            setAddImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.addImgVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[0] = file;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            cancelAdd(){
                this.addImgVisible = false;
                this.cropImg = this.defaultSrc;
            },
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
                console.log("角标"+index)
                this.idx = index;
                const item = this.tableData[index];
                if(item.firstImg){
                    this.cropImg = item.firstImg;
                } else {
                    this.cropImg = require('../../assets/img/img.jpg');
                }
                console.log(this.defaultSrc);
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
            addStore(){
                this.addVisible = true;
            },
            // 保存编辑
            saveEdit(e) {
                // this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                const item = this.form;
                const tableItem = this.tableData[this.idx];
                let param = new FormData(); //创建form对象
                param.append('file',this.fileList[0]);//通过append向form对象添加数据 
                param.append("title", item.title);
                param.append("titleDetail", item.titleDetail);
                param.append("surplusCount", item.surplusCount);
                param.append("totalCount", item.totalCount);
                param.append("sId", tableItem.sId);
                param.append("startDate", dateFormat.FormData(tableItem.startDate, 'yyyy-MM-dd HH:mm:ss'));
                param.append("endDate", tableItem.endDate + " " +tableItem.endTime);
                //param.append('chunk','0');//添加form表单中其他数据
                //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
               
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateStore,param,config)
                    .then(function (res) {
                        message.success('修改成功');
                        that.getData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            saveAdd(e) {
                // this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                const item = this.form;
                const tableItem = this.tableData[this.idx];
                let param = new FormData(); //创建form对象
                param.append('file',this.fileList[0]);//通过append向form对象添加数据 
                param.append("title", item.title);
                param.append("titleDetail", item.titleDetail);
                param.append("surplusCount", item.surplusCount);
                param.append("totalCount", item.totalCount);
                param.append("startDate", item.startDate.getYear() + "-" + item.startDate.getMonth() +"-"+ item.startDate.getDay() + " " + (item.startDate.getHours +1)+":" + item.startDate.getMinutes+":" +item.startDate.getSeconds);
                param.append("endDate", item.endDate + " " +item.endTime);
                //param.append('chunk','0');//添加form表单中其他数据
                //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
               
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.addStore,param,config)
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

    .area {
        height: 100px;
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

    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
