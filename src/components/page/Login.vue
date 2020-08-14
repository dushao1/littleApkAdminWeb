<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips : 请输入用户名和密码。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
const UserRole = () => import('@/components/page/UserRole.vue');
const users= () => import('@/components/page/Users.vue');
const contents= () => import('@/components/page/store_list_page.vue');
const banners= () => import('@/components/page/banners.vue');
const noCheck= () => import('@/components/page/NoCheck.vue');
const corpus= () => import('@/components/page/Corpus.vue');
const packRecordList= () =>import('@/components/page/packRecordList.vue');
var map = new Map();
map.set('UserRole', UserRole);
map.set('users', users);
map.set('contents', contents);
map.set('banners', banners);
map.set('noCheck', noCheck);
map.set('corpus', corpus);
map.set("packRecordList", packRecordList);
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        _this.$axios
          .post(_this.$apiPath.basePath+_this.$apiPath.login, {
            loginName: _this.ruleForm.username,
            password: _this.ruleForm.password
          })
          .then(res => {
            if (res.data.status == 200) {
              localStorage.setItem("ms_username", _this.ruleForm.username);
              localStorage.setItem("admin_info", JSON.stringify(res.data.data));
              
              _this.$axios.get(_this.$apiPath.basePath + _this.$apiPath.getRoleList+"?adminId="+res.data.data.id,{
              }).then(result =>{
                let menus = result.data.data;
                localStorage.setItem("menus", JSON.stringify(menus));
                let routs = [];
                for(let item of menus){
                    let tempRout={
                      path: '/' + item.privlagePath,
                      component:map.get(item.privlagePath),
                      meta: { title: item.menuName },
                      icon: item.icon
                    };
                    routs.push(tempRout);
                }
                _this.$router.addRoutes(routs);
                if(menus[0].roleId == 1){
                  _this.$router.push("/");
                } else {
                  _this.$router.push("/contents");
                }
              });
              return true;
            } else {
                this.$notify.error({
                    title: '登陆失败',
                    message: '用户名或密码错误'
                });
              return false;
            }
          })
          .catch(res => {
            //do something wrong
            console.log(res)
          });
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>