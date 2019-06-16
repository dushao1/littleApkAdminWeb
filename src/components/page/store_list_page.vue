<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 内容列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="handle-box">
            <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
            <el-option key="1" label="广东省" value="广东省"></el-option>
            <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select> -->
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
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
               <el-table-column prop="detailImg" label="详情图" min-width="70px" >
                    <!-- 图片的显示 -->
                    <template   slot-scope="scope">            
                         <img :src="scope.row.detailImg"  min-width="70" height="70px" />
                    </template>         
                </el-table-column> 
                 <!-- <el-table-column prop="titleDetail" label="描述" width="850">
                </el-table-column> -->
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
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%"  :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <!-- <el-input rows="7" type="textarea" v-model="form.titleDetail" ></el-input> -->
                     <quill-editor ref="editEditor" v-model="form.titleDetail" id="editEditorId"></quill-editor>
                </el-form-item>

                 <el-form-item label="首图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="cropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setImage"/>
                        </div>
                    </div>
                 </el-form-item>
                <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="cropDetailImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setIndexDetailImage"/>
                        </div>
                    </div>
                 </el-form-item>

                 <el-form-item label="开始时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.startDate" style="width: 100%;" value-format="timestamp"></el-date-picker>
                    </el-col>
                    <!-- <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.startTime" style="width: 100%;"></el-time-picker>
                    </el-col> -->
                </el-form-item>
                <el-form-item label="结束时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endDate" style="width: 100%;" value-format="timestamp"></el-date-picker>
                    </el-col>
                    <!-- <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
                    </el-col> -->
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
         <el-dialog title="添加" :visible.sync="addVisible" width="50%"  :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <!-- <el-input rows="7" type="textarea" v-model="form.titleDetail" ></el-input> -->
                    <quill-editor ref="addEditor" v-model="form.addTitleDetail" id="addEditorId"></quill-editor>
                </el-form-item>

                 <el-form-item label="首图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="addIndexImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setAddImage"/>
                        </div>
                    </div>
                 </el-form-item>
                 <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="addDetailImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setDetailImage"/>
                        </div>
                    </div>
                 </el-form-item>

                 <el-form-item label="开始时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
                    </el-col>
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

        <el-dialog title="添加裁剪首图片" :visible.sync="addImgVisible" width="30%">
            <vue-cropper ref='cropper' :src="addIndexImg" :ready="addIndexImgM" :zoom="addIndexImgM" :cropmove="addIndexImgM" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addImgVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-dialog title="添加裁剪详情图片" :visible.sync="addDetailImgVisible" width="30%">
            <vue-cropper ref='addIndexCropper' :src="addDetailImg" :ready="addDetailImage" :zoom="addDetailImage" :cropmove="addDetailImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDetailAdd">取 消</el-button>
                <el-button type="primary" @click="addDetailImgVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑裁剪首图片" :visible.sync="imgVisible" width="30%">
            <vue-cropper ref='editcropper' :src="cropImg" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="imgVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑裁剪详情图片" :visible.sync="imgDetailVisible" width="30%">
            <vue-cropper ref='addCropper' :src="cropDetailImg" :ready="cropDetailImage" :zoom="cropDetailImage" :cropmove="cropDetailImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDetailEdit">取 消</el-button>
                <el-button type="primary" @click="imgDetailVisible = false">确 定</el-button>
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
  import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
 import {_public} from '../common/utils.js';
import { quillEditor } from 'vue-quill-editor';
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
                addDetailImgVisible:false,
                imgDetailVisible:false,
                cropImg: '',
                cropDetailImg:'',
                imgSrc: '',
                imgIndexSrc:'',
                imgDetailSrc:'',
                addIndexImg:'',
                addDetailImg:'',
                
                defaultSrc: require('../../assets/img/img.jpg'),
                form: {
                    sId: '',
                    title: '',
                    titleDetail: '',
                    addTitleDetail:'',
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
            this.cropDetailImg = this.defaultSrc;
        },
        computed: {
            data() {
                return this.tableData;
            }
        },
        components:{
            VueCropper,
            quillEditor
            
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
                    this.cropImg = event.target.result;
                    this.$refs.editcropper && this.$refs.editcropper.replace(event.target.result);
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
                    this.addIndexImg = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[0] = file;
            },
            setDetailImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.addDetailImgVisible = true;
                    this.addDetailImg = event.target.result;
                    this.$refs.addIndexCropper && this.$refs.addIndexCropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[1] = file;
            },
            setIndexDetailImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgDetailVisible = true;
                    this.cropDetailImg= event.target.result;
                    this.$refs.addCropper && this.$refs.addCropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[1] = file;
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
                this.cropImg = this.$refs.editcropper.getCroppedCanvas().toDataURL();
            },
            addIndexImgM () {
                this.addIndexImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cropDetailImage () {
                this.cropDetailImg = this.$refs.addCropper.getCroppedCanvas().toDataURL();
            },
            addDetailImage () {
                this.addDetailImg = this.$refs.addIndexCropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
                this.cropDetailImg = this.defaultSrc;
            },
            cancelAdd(){
                this.addImgVisible = false;
                this.cropDetailImg = this.defaultSrc;
            },
            cancelEdit(){
                this.imgVisible = false;
                this.cropDetailImg = this.defaultSrc;
            },
            cancelDetailAdd(){
                this.addDetailImgVisible = false;
                this.cropDetailImg = this.defaultSrc;
            },
            cancelDetailEdit(){
                this.imgDetailVisible = false;
                this.cropDetailImg = this.defaultSrc;
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
                this.$axios.post(this.$apiPath.basePath + this.$apiPath.allStore+"?isAdmin=1&page="+ this.cur_page +"&content=" + this.select_word)
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
                console.log("1234565"+JSON.stringify(item))
                if(item.firstImg){
                    this.cropImg = item.firstImg;
                } else {
                    this.cropImg = require('../../assets/img/img.jpg');
                }
                if(item.detailImg){
                    this.cropDetailImg = item.detailImg;
                } else {
                    this.cropDetailImg = require('../../assets/img/img.jpg');
                }
                console.log('123'+item.detailImg);
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
                    status: item.status,
                    startDate:item.startTime,
                    endDate:item.endTime,
                    cropDetailImg:item.detailImg
                }
                // this.$refs.quillEdiotr.quill.enable(true);
                // this.$refs.quillEdiotr.quill.blur();
                console.log('handleForm'+JSON.stringify(this.form))
                this.editVisible = true;
                var that = this;
                this.$nextTick(function() {
                    that.$refs.editEditor.quill.enable(true);
                    that.$refs.editEditor.quill.blur();
                });
                
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addStore(){
                // this.$refs.quillEdiotr.quill.enable(true);
                // this.$refs.quillEdiotr.quill.blur();
                this.addVisible = true;
                 this.form = {
                    sId: '',
                    title: '',
                    titleDetail: '',
                    addTitleDetail:'',
                    addDetail:'',
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
                this.addIndexImg = require('../../assets/img/img.jpg');
                this.addDetailImg = require('../../assets/img/img.jpg');
                
                var that = this;
                this.$nextTick(function() {
                    that.$refs.addEditor.quill.enable(true);
                    that.$refs.addEditor.quill.blur();
                });

            },
            // 保存编辑
            saveEdit(e) {
                // this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                var item = this.form;
                const tableItem = this.tableData[this.idx];
                let param = new FormData(); //创建form对象
                console.log('saveEdit:' + JSON.stringify(item));
                param.append('file',this.fileList[0]);//通过append向form对象添加数据 
                param.append('detailFile', this.fileList[1]);
                param.append("title", item.title);
                param.append("titleDetail", item.titleDetail);
                param.append("surplusCount", item.surplusCount);
                param.append("totalCount", item.totalCount);
                param.append("sId", tableItem.sId);
                param.append("startDate", _public.formatDate(item.startDate, 'yyyy-MM-dd hh:mm:ss'));
                param.append("endDate", _public.formatDate(item.endDate, 'yyyy-MM-dd hh:mm:ss'));
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
                console.log("123456" + JSON.stringify(item));
                param.append('file',this.fileList[0]);//通过append向form对象添加数据 
                param.append('detailFile',this.fileList[1]);//通过append向form对象添加数据 
                param.append("title", item.title);
                param.append("titleDetail", item.addTitleDetail);
                param.append("surplusCount", item.totalCount);
                param.append("totalCount", item.totalCount);
                param.append("startDate", _public.formatDate(item.startDate.getTime(), 'yyyy-MM-dd hh:mm:ss'));
                param.append("endDate", _public.formatDate(item.endDate.getTime(), 'yyyy-MM-dd hh:mm:ss'));
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
               
                 var querystring = this.$Qs;
                 var message = this.$message;
                 var that = this;
                 this.$axios.post(this.$apiPath.basePath + this.$apiPath.addStore,param,config)
                    .then(function (res) {
                        message.success('添加成功');
                        that.getData();
                        this.addVisible = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.addVisible = false;
                this.getData();
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
            },
             onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            },
             handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    this.$refs.addEditor.quill.enable(false);
                    this.$refs.editEditor.quill.enable(false);
                })
                .catch(_ => {});
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
