<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 红包列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-button type="primary" icon="export" class="handle-del mr10" @click="exportSelect">导出</el-button>
      <el-input v-model="selectWord" placeholder="筛选关键词" class="handle-input mr10"></el-input> 
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>
    <div class="container">
      <el-table
        :data="data"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="nickName" label="微信用户昵称" ></el-table-column>
        <el-table-column prop="createTime" label="创建时间" ></el-table-column>
        <el-table-column prop="packCode" label="兑换码"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="20"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { _public } from "../common/utils.js";

import { quillEditor } from "vue-quill-editor";
export default {
  name: "baseTable",
  data() {
    return {
      cur_page: 1,
      tableData: [],
      totalCount: 0,
      pageCount: 1,
      selectWord:'',
      multipleSelection: []
    };
  },
  created() {
    var that = this;
    //判定是否需要登录
    var flag = true;
    var adminInfoStr = localStorage.getItem("admin_info") ;
    console.log('loginInfo', adminInfoStr);
    if(adminInfoStr != null && adminInfoStr != ''){
        var adminInfo = JSON.parse(adminInfoStr);
        if(adminInfo.roleId != null && adminInfo.loginTime != null){
            console.log('loginInfo', Date.parse(new Date()) );
            console.log('loginInfo', adminInfo.loginTime);

            if((Date.parse(new Date()) - adminInfo.loginTime) < 24*1*3600000){
                flag = false;
            }
        }
    }
    if(flag){
        that.$router.push("/login");
    }
    console.log('loginInfo', flag);
    this.getData();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  components: {},
  methods: {
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
                this.$apiPath.getStorePackageRecordExportUrl , data
            )
            .then(function(res) {
                console.log(JSON.stringify(res.data));
                window.open(res.data.data);
            })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 分页导航;
    handleCurrentChange(val) {
      this.cur_page = val;
      this.pageCount = this.getData();
    },
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      var _this = this;
      this.$axios.post(
          this.$apiPath.basePath + this.$apiPath.getStorePackageRecord + "?page=" + this.cur_page+'&content=' + this.selectWord
        ).then(function(res) {
          _this.tableData = res.data.data.list;
          _this.totalCount = res.data.data.totalCount;
        }).catch(function(error) {
          console.log(error);
        });
    },
    search(){
    var _this = this;
    this.cur_page =1;
      this.$axios.post(
          this.$apiPath.basePath + this.$apiPath.getStorePackageRecord + "?page=1" +'&content=' + this.selectWord
        ).then(function(res) {
          _this.tableData = res.data.data.list;
          _this.totalCount = res.data.data.totalCount;
        }).catch(function(error) {
          console.log(error);
        });
    }

    
  }
};
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}

.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
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
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
