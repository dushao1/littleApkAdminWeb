<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
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
      <el-table
        :data="data"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable width="150" :formatter="formatter"></el-table-column>
        <el-table-column prop="openId" label="openId" width="600"></el-table-column>
        <el-table-column prop="mobile" label="手机号" ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="text-align:left">
        <el-button type="primary" icon="add" class="handle-del mr10" @click="handleAdd()">添加</el-button>
      </div>
      <div class="pagination" style="text-align:right">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加-->

    <el-dialog title="添加" :visible.sync="addVisible" width="30%">
      <el-form ref="addform" :model="addform" label-width="60px">
        <el-form-item label="手机号">
          <el-input v-model="addform.userMobile" style="width: 100%;">></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOne">确 定</el-button>
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
import {formatDate} from '../common/date.js';
export default {
  name: "basetable",
  data() {
    return {
      url: "./vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      addVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      addform: {
        userMobile: ""
      },
      idx: -1
    };
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
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .get(this.$apiPath.basePath + this.$apiPath.getNoCheckList, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.data;
        });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
       var date = new Date( row.createTime);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    //添加
    addOne() {

      this.$axios
        .post(this.$apiPath.basePath + this.$apiPath.addNoChekc, {
          mobile: this.addform.userMobile,
          sysAdminUserId: JSON.parse(localStorage.getItem("admin_info")).id
        })
        .then(res => {
            let mobile = this.addform.userMobile;
            if(res.data.status == 200){
                let dataLength = this.tableData.length;
                this.tableData[dataLength+1] = res.data.data;
                this.$message.success('添加'+ mobile+'用户成功');
                this.addVisible = false;
                this.addform.userMobile = '';
            } else {
                this.$message.error('对不起'+mobile+'用户添加失败，原因：信息重复，或该用户尚未绑定该手机号');
            }
        })
        .catch(res => {
          //do something wrong
          console.log(res);
        });
    },
    // 确定删除
    deleteRow() {
        console.log("确定删除")
      this.$axios
        .post(this.$apiPath.basePath + this.$apiPath.deleteNoCheck+"?openId=" + this.tableData[this.idx].openId, {
            openId: this.tableData[this.idx].openId
        })
        .then(res => {
            if(res.data.status == 200){
                this.$message.success("删除成功");
                this.delVisible = false;
                delete tableData[this.idx];
            } else {
                this.$message.error('对不起操作失败，请联系管理员');
            }
            console.log(this.tableData[this.idx].openId)
            console.log(JSON.stringify(res.data))

        })
        .catch(res => {
          //do something wrong
          console.log(res);
        });
      
    }
  }
};
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
</style>
