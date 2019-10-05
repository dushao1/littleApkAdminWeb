<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 轮播管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="handle-box">
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <div class="container">
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                 <el-table-column prop="id" label="id" width="100">
                </el-table-column>
                <el-table-column prop="bannerTitle" label="标题" width="150">
                </el-table-column>
               <el-table-column prop="bannerUrl" label="图片" min-width="70px" >
                    <!-- 图片的显示 -->
                    <template   slot-scope="scope">            
                         <img :src="scope.row.bannerUrl"  min-width="70" height="70px" />
                    </template>         
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
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                 <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="editCropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setEditImage"/>
                        </div>
                    </div>
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

                 <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="addCropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setAddImage"/>
                        </div>
                    </div>
                 </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加裁剪图片" :visible.sync="addImgVisible" width="30%">
            <vue-cropper ref='addCropper' :src="addCropImg" :ready="addCropImage" :zoom="addCropImage" :cropmove="addCropImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addImgVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑裁剪图片" :visible.sync="imgVisible" width="30%">
            <vue-cropper ref='editCropper' :src="editCropImg" :ready="editCropImage" :zoom="editCropImage" :cropmove="editCropImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="imgVisible = false">确 定</el-button>
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
 import {_public} from '../common/utils.js'
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
                totalCount:0,
                editVisible: false,
                delVisible: false,
                addVisible: false,
                imgVisible: false,
                addImgVisible: false,
                addCropImg:'',
                editCropImg:'',
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
            setEditImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgVisible = true;
                    this.editCropImg = event.target.result;
                    this.$refs.editCropper && this.$refs.editCropper.replace(event.target.result);
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
                    this.addCropImg = event.target.result;
                    this.$refs.addCropper && this.$refs.addCropper.replace(event.target.result);
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
            addCropImage () {
                this.addCropImg = this.$refs.addCropper.getCroppedCanvas().toDataURL();
            },
            editCropImage () {
                this.editCropImg = this.$refs.editCropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            cancelAdd(){
                this.addImgVisible = false;
                this.addCropImg = this.defaultSrc;
            },
            cancelEdit(){
                this.imgVisible = false;
                this.editCropImg = this.defaultSrc;
            },
            // 分页导航;
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                var _this = this
                this.$axios.get(this.$apiPath.basePath + this.$apiPath.getBanner+"?isAdmin=1&page="+ this.cur_page +"&content=" + this.select_word)
                .then(function (res) {
                    console.log(res.data.data);
                    _this.tableData = res.data.data.list;
                    _this.totalCount = res.data.data.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            search() {
                this.getData();
            },
            handleEdit(index, row) {
                console.log("角标"+index)
                this.idx = index;
                const item = this.tableData[index];
                if(item.bannerUrl){
                    this.editCropImg = item.bannerUrl;
                } else {
                    this.editCropImg = require('../../assets/img/img.jpg');
                }
                console.log(this.defaultSrc);
                this.form = {
                    id: item.id,
                    title: item.bannerTitle,
                    bannerUrl: item.bannerUrl,
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
                 this.form = {
                    sId: '',
                    title: '',
                    titleDetail: '',
                    firstImg: require('../../assets/img/img.jpg'),
                    detailImg: '',
                    endTime: '',
                    startTime: '',
                    surplusCount: '',
                    totalCount: '',
                    status: '',
                    startDate:'',
                    endDate:''
                }
                this.addCropImg = require('../../assets/img/img.jpg');
            },
            // 保存编辑
            saveEdit(e) {
                // this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                const item = this.form;
                const tableItem = this.tableData[this.idx];
                let param = new FormData(); //创建form对象
                 if(this.editCropImg != null && this.editCropImg != ''&& !this.editCropImg.startsWith("http")){
                    let tempDetailFile = this.convertBase64UrlToBlob(this.editCropImg);
                    param.append('file', tempDetailFile);//通过append向form对象添加数据 
                    param.append('bannerName', "1."+this.editCropImg.split(';')[0].split('/')[1]);
                }
                // param.append('file',this.fileList[0]);//通过append向form对象添加数据 
                param.append("bannerTitle", item.title);
                param.append("id", tableItem.id);
                //param.append('chunk','0');//添加form表单中其他数据
                //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
               
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.updateBanner,param,config)
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
                if(this.addCropImg != null && this.addCropImg != ''&& !this.addCropImg.startsWith("http")){
                    let tempDetailFile = this.convertBase64UrlToBlob(this.addCropImg);
                    param.append('file', tempDetailFile);//通过append向form对象添加数据 
                    param.append('bannerName', "1."+this.addCropImg.split(';')[0].split('/')[1]);
                }
                // param.append('file',this.fileList[0]);//通过append向form对象添加数据 
                param.append("title", item.title);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
               
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.addBanner,param,config)
                    .then(function (res) {
                        message.success('添加成功');
                        that.getData();
                        that.addVisible = false;
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
                    state: -1,
                    id: tableItem.id
                 }
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                   let config = {
                    headers:{'Content-Type': 'application/json'}
                };
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.deleteBanner,data,config)
                    .then(function (res) {
                        message.success('删除成功');
                        that.getData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            convertBase64UrlToBlob(urlData) {
                let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
                //处理异常,将ascii码小于0的转换为大于0
                let ab = new ArrayBuffer(bytes.length);
                let ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], { type: 'image/jpeg' });
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
