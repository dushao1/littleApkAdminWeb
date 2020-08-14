<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：<span>2020-08-13</span></div>
                    <div class="user-info-list">上次登录地点：<span>北京</span></div>
                </el-card>
                <!-- <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="3.7"></el-progress>
                    HTML
                    <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
                </el-card> -->
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num" >{{monthTotal}}</div>
                                    <div>近30天月活跃总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getPackages}}</div>
                                    <div>近30天领取应急包总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{totalPackages}}</div>
                                    <div>近30天派发应急包总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card> -->
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col  :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>全国区域画像 - 新用户</span>
                    </div>
                    <div id="provinceNew" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                    <div id="cityNew" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>       
            <el-col  :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>年龄及性别画像 - 新用户</span>
                    </div>
                    <div id="agesNew" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                    <div id="gendersNew" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>使用设备画像 - 新用户</span>
                    </div>
                    <div id="devicesNew" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>平台画像 - 新用户</span>
                    </div>
                    <div id="platformsNew" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col  :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>全国区域画像 - 活跃用户</span>
                    </div>
                    <div id="province" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                    <div id="city" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>       
            <el-col  :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>年龄及性别画像 - 活跃用户</span>
                    </div>
                    <div id="ages" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                    <div id="genders" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>使用设备画像 - 活跃用户</span>
                    </div>
                    <div id="devices" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>平台画像 - 活跃用户</span>
                    </div>
                    <div id="platforms" style="width: 100%;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="data" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
import Schart from "vue-schart";
import bus from "../common/bus";
import echarts from "echarts";
export default {
  name: "dashboard",
  data() {
    return {
      monthTotal:0,
      getPackages:0,
      totalPackages:0,
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        }
      ],
      data: [
        
        {
          name: "2018/09/10",
          value: 1065
        }
      ],
      options: {
        title: "最近七天每天的用户访问量",
        showValue: false,
        fillColor: "rgb(45, 140, 240)",
        bottomPadding: 30,
        topPadding: 30
      },
      options2: {
        title: "最近七天用户访问趋势",
        fillColor: "#FC6FA1",
        axisColor: "#008ACD",
        contentColor: "#EEEEEE",
        bgColor: "#F5F8FD",
        bottomPadding: 30,
        topPadding: 30
      }
    };
  },
  components: {
    Schart
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  created() {
    this.handleListener();
    this.changeDate();
  },
  activated() {
    this.handleListener();
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    drawLine() {
      let option ={
        backgroundColor:'#3c55b3',
        tooltip : {
          trigger: 'item',
          //formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          x:'right',
          y:'bottom',
          orient: 'vertical',
          icon: 'circle',
          height:150,
          itemWidth:5,
          itemHeight:5,
          textStyle:{
            color:'#fff',
            fontSize:10
          },
          data:['餐饮','制造业','互联网','农业','服务业','教育','其他','1','2','3','餐饮1','制造业1','互联网1','农业1','服务业1','教育1','其他1','11','21','31']
        },
        color:['#7172ff','#3a9eff','#00dcff','#00ffff','#ffa60c','#fe8431','#fd5336'],
        series : [
          {
            type:'pie',
            radius : ['40%','90%'],
            center: ['43%', '50%'],
            roseType : 'area',
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            data:[
              {value:25, name:'餐饮'}
            ]
          }
        ]
      };
      var cityOption = {
        backgroundColor: '#021C3F',
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: [],
            axisLine: {
                show:false,
                lineStyle: {
                    color: '#aaa',
                }
            },
             axisLabel: {
            show: true,
            textStyle: {
                fontSize: 16,
                color: '#9FD7DF'
            }
        },   
            axisTick: {
    			show: false
    		},
        }],
        yAxis: [{
            type: 'value',
            name:"位用户",
           nameTextStyle: {
                color: '#9FD7DF',
                fontSize: '16',
                padding:[0,0,0,-40]
            },
            axisLine: {
                show:false,
                lineStyle: {
                    color: 'rgba(0,230,252, .8)',
                    width: 3
                }
            },
            
        splitArea: {
            show: false
        },
         splitLine: {
            show: true,
            lineStyle: {
                color:  '#042F62',
                width: 1,
                type: "dotted"
            }
        },	
        axisTick: {
          show: false
        },
         axisLabel: {
            show: true,
            textStyle: {
                fontSize: 16,
                color: '#9FD7DF'
            }
        },   
            
            
        }],
        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0,230,252, 1)',
        }, {
            offset: 0.4,
            color: 'rgba(14,160,177,.5)'
        }, {
            offset: 1,
            color: 'rgba(5,54,88,0.1)'
        }])],
        series: [{
            name: '数量',
            type: 'bar',
            barWidth: '30%',
            data: [],
            itemStyle: {
                borderColor: 'rgba(0,230,252, 1)',
                borderWidth: 1,
                shadowColor: 'rgba(0,230,252, .9)',
                shadowBlur: 30
            }
        }]
      };
      var that = this;
      this.$axios.get(this.$apiPath.basePath + this.$apiPath.indexData)
            .then(function (res) {
              let result = res.data.data;

              that.monthTotal = parseInt(result.visit_uv.genders[0].value) + parseInt(result.visit_uv.genders[1].value);

              that.getPackages = result.getPackages;
              that.totalPackages = result.totalPackages;
              // 基于准备好的dom，初始化echarts实例
              let province = echarts.init(document.getElementById("province"));
              let provinceData = JSON.parse(JSON.stringify(option));
              provinceData.legend.data = result.visit_uv.province.map(o => {return o.name});
              provinceData.series[0].data = result.visit_uv.province;
              province.setOption(provinceData);

              let city = echarts.init(document.getElementById("city"));
              let cityData = JSON.parse(JSON.stringify(cityOption));
              cityData.xAxis[0].data = result.visit_uv.city.map(o => {return o.name});
              cityData.series[0].data = result.visit_uv.city;
              city.setOption(cityData);

              let devices = echarts.init(document.getElementById("devices"));
              let devicesData = JSON.parse(JSON.stringify(cityOption));
              devicesData.xAxis[0].data = result.visit_uv.devices.map(o => {return o.name.replace(/(^\s*)|(\s*$)/g, "")});
              devicesData.series[0].data = result.visit_uv.devices.map(o =>{return o.value});
              devices.setOption(devicesData);

              let ages = echarts.init(document.getElementById("ages"));
              let agesData = JSON.parse(JSON.stringify(option));
              agesData.legend.data = result.visit_uv.ages.map(o => {return o.name});
              agesData.series[0].data = result.visit_uv.ages;
              ages.setOption(agesData);

              let genders = echarts.init(document.getElementById("genders"));
              let gendersData = JSON.parse(JSON.stringify(option));
              gendersData.legend.data = result.visit_uv.genders.map(o => {return o.name});
              gendersData.series[0].data = result.visit_uv.genders;
              genders.setOption(gendersData);

              let platforms = echarts.init(document.getElementById("platforms"));
              let platformsData = JSON.parse(JSON.stringify(option));
              platformsData.legend.data = result.visit_uv.platforms.map(o => {return o.name});
              platformsData.series[0].data = result.visit_uv.platforms;
              platforms.setOption(platformsData);
              // 新增用户
              let provinceNew = echarts.init(document.getElementById("provinceNew"));
              let provinceNewData = JSON.parse(JSON.stringify(option));
              provinceNewData.legend.data = result.visit_uv_new.province.map(o => {return o.name});
              provinceNewData.series[0].data = result.visit_uv_new.province;
              provinceNew.setOption(provinceNewData);

              let cityNew = echarts.init(document.getElementById("cityNew"));
              let cityNewData = JSON.parse(JSON.stringify(cityOption));
              cityNewData.xAxis[0].data = result.visit_uv_new.city.map(o => {return o.name});
              cityNewData.series[0].data = result.visit_uv_new.city;
              cityNew.setOption(cityNewData);

              let devicesNew = echarts.init(document.getElementById("devicesNew"));
              let devicesNewData = JSON.parse(JSON.stringify(cityOption));
              devicesNewData.xAxis[0].data = result.visit_uv_new.devices.map(o => {return o.name.replace(/(^\s*)|(\s*$)/g, "")});
              devicesNewData.series[0].data = result.visit_uv_new.devices.map(o =>{return o.value});
              console.log(JSON.stringify(devicesNewData))
              devicesNew.setOption(devicesNewData);

              let agesNew = echarts.init(document.getElementById("agesNew"));
              let agesNewData = JSON.parse(JSON.stringify(option));
              agesNewData.legend.data = result.visit_uv_new.ages.map(o => {return o.name});
              agesNewData.series[0].data = result.visit_uv_new.ages;
              agesNew.setOption(agesNewData);

              let gendersNew = echarts.init(document.getElementById("gendersNew"));
              let gendersNewData = JSON.parse(JSON.stringify(option));
              gendersNewData.legend.data = result.visit_uv_new.genders.map(o => {return o.name});
              gendersNewData.series[0].data = result.visit_uv_new.genders;
              gendersNew.setOption(gendersNewData);

              let platformsNew = echarts.init(document.getElementById("platformsNew"));
              let platformsNewData = JSON.parse(JSON.stringify(option));
              platformsNewData.legend.data = result.visit_uv_new.platforms.map(o => {return o.name});
              platformsNewData.series[0].data = result.visit_uv_new.platforms;
              platformsNew.setOption(platformsNewData);
              
            })
            .catch(function (error) {
                console.log(error);
            });
     
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    },
    handleListener() {
      bus.$on("collapse", this.handleBus);
      // 调用renderChart方法对图表进行重新渲染
      window.addEventListener("resize", this.renderChart);
    },
    handleBus(msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    renderChart() {
      this.$refs.bar.renderChart();
      this.$refs.line.renderChart();
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
