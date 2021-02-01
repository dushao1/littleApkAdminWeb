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
                        <el-button v-if="roleId == 1" type="text" icon="el-icon-delete" class="red"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
         <!-- 添加弹出框 -->
         <el-dialog title="添加" :visible.sync="addVisible" width="50%"  :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <!-- <el-input rows="7" type="textarea" v-model="form.titleDetail" ></el-input> -->
                    <quill-editor ref="addEditor" v-model="form.addTitleDetail" id="addEditorId" :options="quillOption"></quill-editor>
                </el-form-item>

                 <el-form-item label="首图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="addIndexImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setAddIndexImage"/>
                        </div>
                    </div>
                 </el-form-item>
                 <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="addDetailImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setAddDetailImage"/>
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
                <el-form-item v-if="roleId == 1" label="置顶截止" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.firstEndTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                 <el-form-item label="红包总数" label-width="8%" style="text-align:left">
                    <el-input v-model="form.totalCount"></el-input>
                </el-form-item>
                <el-form-item label="获取概率" label-width="8%" style="text-align:left">
                    <el-input v-model="form.getPercent" placeholder="请输入>=0 且小于1的小数,例:5% 应输入0.05 "></el-input>
                </el-form-item>
                <el-form-item v-model="form.allShowState" label-width="12%" label="是否全域展示">
                    <template slot-scope="scope">
                        <el-switch
                            active-text="是"
                            inactive-text="否"
                            active-color="#5B7BFA"
                            inactive-color="#dadde5"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="form.allShowState"
                        >
                        </el-switch>
                    </template>
                </el-form-item>
                <el-form-item label="音频文件:" label-width="8%" style="text-align:left">
                    <el-upload
                        class="upload-demo"
                        :action="uploadActionUrl"
                        :http-request="customUpload"
                        :on-success="voiceUploadSuccess"
                        :on-error="voiceUploadFile"
                        :limit=1
                        :multiple=false
                        accept="mp3"
                        :on-exceed="onExceed"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :on-progress="onprogress"
                        :on-change="onAddChange"
                        :file-list="voiceList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text"><em>点击上传</em></div>
                        <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过20Mb</div>
                    </el-upload>  
                    
                </el-form-item>
                <iframe id="mapPage" width="100%" height="800px" frameborder=0
                    src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GQGBZ-PW3KK-LIHJC-AB3JY-SESOE-E2BEZ&referer=yjscTencent">
                </iframe>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%"  :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题" style="text-align:left">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <!-- <el-input rows="7" type="textarea" v-model="form.titleDetail" ></el-input> -->
                     <quill-editor ref="editEditor" v-model="form.titleDetail" id="editEditorId"  :options="quillOption"></quill-editor>
                </el-form-item>

                 <el-form-item label="首图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="cropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setEditIndexImage"/>
                        </div>
                    </div>
                 </el-form-item>
                <el-form-item label="详情图" label-width="7%" style="text-align:left">
                     <div class="crop-demo">
                        <img :src="cropDetailImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input  class="crop-input" type="file" name="file" accept="image/*" @change="setEditDetailImage"/>
                        </div>
                    </div>
                 </el-form-item>

                 <el-form-item label="开始时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.startDate" style="width: 100%;" value-format="timestamp"></el-date-picker>
                    </el-col>

                </el-form-item>
                <el-form-item label="结束时间" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endDate" style="width: 100%;" value-format="timestamp"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item v-if="roleId == 1" label="置顶截止" label-width="8%" style="text-align:left">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.firstEndTime" style="width: 100%;" value-format="timestamp"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="剩余红包" label-width="8%" style="text-align:left">
                    <el-input v-model="form.surplusCount" ></el-input>
                </el-form-item>
                 <el-form-item label="红包总数" label-width="8%" style="text-align:left">
                    <el-input v-model="form.totalCount"></el-input>
                </el-form-item>
                <el-form-item label="获取概率" label-width="8%" style="text-align:left">
                    <el-input v-model="form.getPercent" placeholder="请输入>=0 且小于1的小数,例:5% 应输入0.05 "></el-input>
                </el-form-item>
                <el-form-item v-model="form.allShowState" label-width="8%" label="是否全域展示">
                    <template >
                    <el-switch
                        active-text ="是"
                        inactive-text = "否"
                        active-color="#5B7BFA"
                        inactive-color="#dadde5"
                        :active-value="1"
                        :inactive-value="0"
                        v-model="form.allShowState"              
                    >
                    </el-switch>
                    </template>
                </el-form-item>
                <el-form-item label="音频文件:" label-width="8%" style="text-align:left">
                    <el-upload
                        class="upload-demo"
                        :action="uploadActionUrl"
                        :http-request="customUpload"
                        :on-success="voiceUploadSuccess"
                        :on-error="voiceUploadFile"
                        :limit=1
                        :multiple=false
                        accept="mp3"
                        :on-exceed="onExceed"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :on-progress="onprogress"
                        :on-change="onAddChange"
                        :file-list="voiceList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text"><em>点击上传</em></div>
                        <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过20Mb</div>
                    </el-upload>  
                    
                </el-form-item>
            </el-form>
             <iframe id="editPage" width="100%" height="800px" frameborder=0
                src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GQGBZ-PW3KK-LIHJC-AB3JY-SESOE-E2BEZ&referer=yjscTencent">
            </iframe>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
       

        <el-dialog title="添加裁剪首图片" :visible.sync="addImgVisible" width="30%">
            <vue-cropper ref='addIndexCropper' :src="addIndexImg" :ready="addIndexImgM" :zoom="addIndexImgM" :cropmove="addIndexImgM" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addImgVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-dialog title="添加裁剪详情图片" :visible.sync="addDetailImgVisible" width="30%">
            <vue-cropper ref='addDetailCropper' :src="addDetailImg" :ready="addDetailImage" :zoom="addDetailImage" :cropmove="addDetailImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDetailAdd">取 消</el-button>
                <el-button type="primary" @click="addDetailImgVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑裁剪首图片" :visible.sync="imgVisible" width="30%">
            <vue-cropper ref='editIndexCropper' :src="cropImg" :ready="editIndexImage" :zoom="editIndexImage" :cropmove="editIndexImage" style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="imgVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑裁剪详情图片" :visible.sync="imgDetailVisible" width="30%">
            <vue-cropper ref='editDetailCropper' :src="cropDetailImg" :ready="editDetailImage" :zoom="editDetailImage" :cropmove="editDetailImage" style="width:100%;height:300px;"></vue-cropper>
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
    import quillConfig from '../common/quill-config.js';
    import {_public} from '../common/utils.js';

    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'baseTable',
        data() {
            return {
                url: './vuetable.json',
                quillOption: quillConfig,
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                fileList:[],
                voiceList:[],
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
                uploadActionUrl:'',
                voiceUploadingState: false,
                processLength:0,
                roleId:0,
                lat:0,
                lon:0,
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
                    voiceUrl:'',
                    surplusCount: '',
                    totalCount: '',
                    status: '',
                    startDate:'',
                    endDate:'',
                    firstEndTime:'',
                    allShowState:0,
                    getPercent:0
                },
                idx: -1
            }
        },
        created() {
            this.getData();
            // this.cropImg = this.defaultSrc;
            // this.cropDetailImg = this.defaultSrc;
            var that = this;
            window.addEventListener('message', function(event) {
                // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
                var loc = event.data;
                if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                console.log('location', loc);
                that.lon = loc.latlng.lng;
                that.lat = loc.latlng.lat;
                }
            }, false);
            if(JSON.parse(localStorage.getItem('admin_info')).role.id == 1){
                that.roleId = 1;
            }
            this.uploadActionUrl =this.$apiPath.basePath + this.$apiPath.addVoice
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
            // message(event){
            //    // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            //     var loc = event.data;
            //     if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            //     console.log('location', loc);
            //     }
            // },
            change(data,b,index){

                alert(JSON.stringify(data) + "");
            },
            setAddIndexImage(e){
                const file = e.target.files[0];
                console.log("type： " + file.type)
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.addImgVisible = true;
                    this.addIndexImg = event.target.result;
                    this.$refs.addIndexCropper && this.$refs.addIndexCropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[0] = file.name;
            },
            setAddDetailImage(e){
                const file = e.target.files[0];
                console.log("type： " + file.type)
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.addDetailImgVisible = true;
                    this.addDetailImg = event.target.result;
                    this.$refs.addDetailCropper && this.$refs.addDetailCropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[1] = file.name;
            },
            setEditIndexImage(e){
                const file = e.target.files[0];
                console.log("type： " + file.type)
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgVisible = true;
                    this.cropImg = event.target.result;
                    this.$refs.editIndexCropper && this.$refs.editIndexCropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.fileList[0] = file;
            },
            setEditDetailImage(e){
                const file = e.target.files[0];
                console.log("type： " + file.type)
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgDetailVisible = true;
                    this.cropDetailImg= event.target.result;
                    this.$refs.editDetailCropper && this.$refs.editDetailCropper.replace(event.target.result);
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
            addIndexImgM () {
                this.addIndexImg = this.$refs.addIndexCropper.getCroppedCanvas().toDataURL();
            },
            addDetailImage () {
                this.addDetailImg = this.$refs.addDetailCropper.getCroppedCanvas().toDataURL();
            },
            editIndexImage () {
                this.cropImg = this.$refs.editIndexCropper.getCroppedCanvas().toDataURL();
            },
            editDetailImage () {
                this.cropDetailImg = this.$refs.editDetailCropper.getCroppedCanvas().toDataURL();
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
                this.idx = index;
                const item = this.tableData[index];
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
                if(item.voiceUrl != null && item.voiceUrl != ''){
                    this.voiceList.push({
                        "url": item.voiceUrl,
                        "name":item.voiceUrl,
                        "id": item.id
                    })
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
                    cropDetailImg:item.detailImg,
                    firstEndTime:item.firstEndTime,
                    allShowState:item.allShowState,
                    getPercent:item.getPercent,
                    voiceUrl:''
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
                that.lat = 0;
                that.lon = 0;
                
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
                    endDate:'',
                    allShowState:1,
                    voiceUrl:''
                }
                this.addIndexImg = require('../../assets/img/img.jpg');
                this.addDetailImg = require('../../assets/img/img.jpg');
                
                var that = this;
                this.$nextTick(function() {
                    that.$refs.addEditor.quill.enable(true);
                    that.$refs.addEditor.quill.blur();
                });
                 that.lat = 0;
                that.lon = 0;

            },
            // 保存编辑
            saveEdit(e) {
                // this.$set(this.tableData, this.idx, this.form);
                 //创建form对象
                if(this.lat != 0 && this.lon != 0){
                    if(this.voiceUploadingState == true){
                        this.$message.error('请等待音频文件100%上传完成,若异常请刷新页面重试');
                        return;
                    }
                    this.editVisible = false;
                    var item = this.form;
                    if(item.getPercent >= 0 && item.getPercent <=1){
                        const tableItem = this.tableData[this.idx];
                        let param = new FormData();
                        if(this.cropImg !=null && this.cropImg != '' && !this.cropImg.startsWith("http")){
                            let tempIndexFile = this.convertBase64UrlToBlob(this.cropImg);
                            param.append('file', tempIndexFile);//通过append向form对象添加数据 
                            param.append('indexFileName', "1."+this.cropImg.split(';')[0].split('/')[1]);
                        }
                        if(this.cropDetailImg != null && this.cropDetailImg != ''&& !this.cropDetailImg.startsWith("http")){
                            let tempDetailFile = this.convertBase64UrlToBlob(this.cropDetailImg);
                            param.append('detailFile', tempDetailFile);//通过append向form对象添加数据 
                            param.append('detailFailName', "1."+this.cropDetailImg.split(';')[0].split('/')[1]);
                        }
                        param.append("title", item.title);
                        param.append("titleDetail", item.titleDetail);
                        param.append("surplusCount", item.surplusCount== null?0:item.surplusCount);
                        param.append("totalCount", item.totalCount==null?0:item.totalCount);
                        param.append("sId", tableItem.sId);
                        param.append("allShowState",item.allShowState);
                        param.append("startDate", _public.formatDate(item.startDate, 'yyyy-MM-dd hh:mm:ss'));
                        param.append("endDate", _public.formatDate(item.endDate, 'yyyy-MM-dd hh:mm:ss'));             
                        param.append("getPercent",item.getPercent)
                        if(this.roleId == 1 && item.firstEndTime != null){
                            param.append("firstEndTime", _public.formatDate(item.firstEndTime, 'yyyy-MM-dd hh:mm:ss'));
                        }
                        param.append("lat", this.lat);
                        param.append("lng", this.lon);
                        param.append("voiceUrl", item.voiceUrl);
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
                                that.lat = 0;
                                that.lng = 0;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        this.voiceList = [];
                        this.fileList[0] = null;
                        this.fileList[1] = null;
                    } else{
                        this.$message.error('请输入有效的概率值');
                    }
                }else {
                    this.$message.error('请选择定位地点');
                }
            },
            saveAdd(e) {
                if(this.lat != 0 && this.lon != 0){
                    if(this.voiceUploadingState == true){
                        this.$message.error('请等待音频文件100%上传完成,若异常请刷新页面重试');
                        return;
                    }
                    this.editVisible = false;
                    const item = this.form;
                    if(item.getPercent >= 0 && item.getPercent <=1){
                    const tableItem = this.tableData[this.idx];
                    let param = new FormData(); //创建form对象"
                    if(this.addIndexImg== '' || this.addDetailImg == '' || this.addIndexImg == 'img/img.146655c9.jpg' || this.addDetailImg == 'img/img.146655c9.jpg'){
                        this.$message.error('请选择首图及详情图');
                        return;
                    }
                    let tempIndexFile = this.convertBase64UrlToBlob(this.addIndexImg);
                    let tempDetailFile = this.convertBase64UrlToBlob(this.addDetailImg);

                    param.append('file', tempIndexFile);//通过append向form对象添加数据 
                    param.append('detailFile', tempDetailFile);//通过append向form对象添加数据 
                    param.append('indexFileName', "1."+this.addIndexImg.split(';')[0].split('/')[1]);
                    param.append('detailFailName', "1."+this.addDetailImg.split(';')[0].split('/')[1]);
                    if(item.title == ''){
                        this.$message.error('请输入标题');
                        return;
                    }
                    param.append("title", item.title);
                    param.append("titleDetail", item.addTitleDetail);
                    param.append("surplusCount", item.totalCount);
                    param.append("totalCount", item.totalCount);
                    param.append("allShowState",item.allShowState);
                    if(item.startDate == null || item.endDate == null|| item.startDate == '' ||item.endDate == ''|| item.startDate.getTime() == null || item.endDate.getTime() == null ){
                        this.$message.error('请输入开始及截至时间');
                        return;
                    }
                    param.append("startDate", _public.formatDate(item.startDate.getTime(), 'yyyy-MM-dd hh:mm:ss'));
                    param.append("endDate", _public.formatDate(item.endDate.getTime(), 'yyyy-MM-dd hh:mm:ss'));
                    param.append("getPercent",item.getPercent)
                    if(this.roleId == 1  && item.firstEndTime != null){
                        param.append("firstEndTime", _public.formatDate(item.firstEndTime.getTime(), 'yyyy-MM-dd hh:mm:ss'));
                    }
                    param.append("lat", this.lat);
                    param.append("lng", this.lon);
                    param.append("voiceUrl", item.voiceUrl);
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
                            that.lat = 0;
                            that.lng = 0;
                            // this.addVisible = true;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    this.addVisible = false;
                    this.getData();
                    this.voiceList = [];
                    } else{
                        this.$message.error('请输入有效的概率值');
                    }
                }else {
                    this.$message.error('请选择定位地点');
                }
                this.fileList[0] = null;
                this.fileList[1] = null;
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
                    this.fileList[0] = null;
                    this.fileList[1] = null;
                })
                .catch(_ => {});
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
            },
            voiceUploadSuccess(response, file, fileList){
                this.form.voiceUrl = response.data.data;
                console.log("上传成功回调:" + this.form.voiceUrl)
                this.voiceUploadingState = false;
            },
            voiceUploadFile(err, file, fileList){
                console.log("上传失败回调")
                this.$message({
                        message: '上传失败,请重新上传',
                        type: 'warning'
                    });
                this.voiceUploadingState = false;
            },
            voiceUploading(event, file, fileList){
                console.log("上传中回调")
            },
            beforeUpload(file) {
                this.voiceUploadingState = true;
                const size = file.size / 1024 / 1024
                if (size > 50) {
                    this.$notify.warning({
                    title: '警告',
                    message: '大小必须小于50M'
                    })
                    return false;
                }
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'mp3'
                if(!extension ) {
                    this.$message({
                        message: '上传文件只能是 mp3格式!',
                        type: 'warning'
                    });
                    return false;
                }
               
            },
            onExceed(files, fileList){
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            handleRemove(file, fileList){
                console.log(`删除文件`);
            },
            onprogress(event, file, fileList){
                console.log("上传中..."+JSON.stringify(event))
            },
            customUpload(file) {
                let FormDatas = new FormData();
                FormDatas.append('file', file.file);
                var that = this;
                this.$axios({
                    url: that.uploadActionUrl,
                    method: 'post',
                    data: FormDatas,
                    //上传进度
                    onUploadProgress: (progressEvent) => {
                        
                        // let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
                        // console.log("上传进度回调 进度: "+ num+" loaded:" +progressEvent.loaded + " 总量: " + progressEvent.total+ " event: " + JSON.stringify(progressEvent))
                        file.onProgress({percent: 0})     //进度条
                    }
                }).then(data => {
                    file.onSuccess(data); //上传成功(打钩的小图标)
                })
            },
            onAddChange(file, fileList){
                console.log("文件列表"+JSON.stringify(fileList))
                if(file.status === 'ready'){
                    this.processLength =0
                    const interval = setInterval(() =>{
                        if(this.processLength >= 99 ){
                            clearInterval(interval)
                            return 
                        }
                        this.processLength +=1
                        file.percentage=this.processLength
                    },40)
                }
                if(file.status === 'success'){
                    this.processLength = 100
                }
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
