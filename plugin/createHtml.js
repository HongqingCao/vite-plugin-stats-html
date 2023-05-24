const createHtml = (allData) => {
  const chartScript = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<style>
body {
  background-color: rgb(246, 247, 251);
}
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  width: 1280px;
  margin: 0px auto;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(225, 223, 221);
  border-radius: 2px;
  padding: 0 20px 20px 20px;
}
.header-wrap {
  min-height: 56px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 12px 20px 0px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: rgb(27, 26, 25);
}
.bundle-info {
  display: flex;
  border-radius: 4px;
  border: 1px solid rgb(225, 223, 221);
  padding: 12px 16px;
  justify-content: space-between;
  margin-bottom: 20px;
}
.bundle-info-title {
  font-size: 14px;
  font-weight: 600;
}
.bundle-overview {
  flex-wrap: wrap;
  width: auto;
  overflow: visible;
  height: auto;
  display: flex;
  justify-content: space-between;
}
.bundle-left {
  width: 60%;
  height: 300px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
}
.bundle-left-item {
  width: calc(30% - 20px);
  height: calc(45% - 20px);
  border-radius: 4px;
  border: 1px solid rgb(225, 223, 221);
  padding: 12px 16px;
  text-align: left;
}
.kb {
  font-size: 14px;
  font-weight: 400;
}
.bundle-left-item-title {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}
.bundle-left-item-value {
  font-size: 28px;
  font-weight: 600;
  line-height: 100px;
}
.bundle-right {
  width: calc(40% - 20px);
  border-radius: 4px;
  height: 300px;
  border: 1px solid rgb(225, 223, 221);
}
.pie {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.tablist {
  margin-top: 20px;
}
.visualization {
    width: 1248px;
    height: 500px;
    background: #eebe77;
  }
</style>
<script src="https://unpkg.com/vue@2"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
</head>
<body>
<div class="app" id="app">
<div class="container">
  <div class="header-wrap">${allData.title}</div>
  <div class="bundle-info">
    <div>
      <span class="bundle-info-title">project URL：</span
      >{{ bundleObj.projectRoot }}
    </div>
    <div>
      <span class="bundle-info-title">built in：</span> {{ bundleObj.time }}
    </div>
    <div>
      <span class="bundle-info-title">built Date:</span>
      {{ bundleObj.startTime }}
    </div>
  </div>
  <div class="bundle-overview">
    <div class="bundle-left">
      <div
        class="bundle-left-item"
        v-for="item in bundleList"
        :key="item.key"
      >
        <div class="bundle-left-item-title" v-if="item.content">
          <el-popover
            :ref="item.key"
            :title="item.content.title"
            width="200"
            trigger="hover"
            :content="item.content.content"
          >
          </el-popover>
          <span v-popover="item.key">{{ item.title }}</span>
        </div>
        <div v-else class="bundle-left-item-title">{{ item.title }}</div>
        <div class="bundle-left-item-value">
          {{ bundleObj[item.key] }}
          <span v-if="!item.content" class="kb">kb</span>
        </div>
      </div>
    </div>
    <div class="bundle-right">
      <div class="pie" id="pie"></div>
    </div>
  </div>
  <el-tabs type="border-card" class="tablist">
    <el-tab-pane label="Visualization">
      <div id="visualization" class="visualization"></div>
    </el-tab-pane>
    <el-tab-pane label="Assets Statistics">
      <el-table :data="tableData" height="400" stripe style="width: 100%">
        <el-table-column prop="file" sortable label="file" width="500px">
        </el-table-column>
        <el-table-column prop="type" sortable label="type"> </el-table-column>
        <el-table-column prop="size" sortable label="size(kb)"> </el-table-column>
        <el-table-column prop="dependencyCount" sortable label="dependencyCount">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</div>
</div>
</body>


<script>
var app = new Vue({
  el: '#app',
  data: {
    bundleObj:${JSON.stringify(allData.bundleObj)},
    tableData:${JSON.stringify(allData.tableData)},
    bundleList:[
        {
          key: 'totalSize',
          title: 'Bundle Size',
          content: '',
        },
        {
          key: 'jsSize',
          title: 'Initial JS Size',
          content: '',
        },
        {
          key: 'cssSize',
          title: 'Initial CSS Size',
          content: '',
        },
        {
          key: 'assetCount',
          title: 'Assets Count',
          content: {
            title: 'Webpack ouput assets',
            content:
              'Files emitted by webpack.<br/> Including any JavaScript CSS font Image files which processed by webpack.',
          },
        },
        {
          key: 'chunkCount',
          title: 'Chunks Count',
          content: {
            title: 'Chunks',
            content:
              '(1)initial is the main chunk for the entry point. This chunk contains all the modules and its dependencies that you specify for an entry point.initial is the main chunk for the entry point. This chunk contains all the modules and its dependencies that you specify for an entry point.non-initial is a chunk that may be lazy-loaded. It may appear when dynamic import or SplitChunksPlugin is being used.',
          },
        },
        {
          key: 'packageCount',
          title: 'Packages Count',
          content: {
            title: 'node_modules',
            content: 'Third part packages count in node_modules.',
          },
        },
      ]
  },
  methods: {
    setPieChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: 'Bundle Overview',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top: '30%',
          },
          series: [
            {
              name: 'Bundle Overview',
              type: 'pie',
              radius: '50%',
              data: [
                { value: ${allData.bundleObj.jsSize}, name: 'JS' },
                { value: ${allData.bundleObj.cssSize}, name: 'CSS' },
                { value: ${allData.bundleObj.imageSize}, name: 'Image' },
                { value: ${allData.bundleObj.htmlSize}, name: 'Font' },
                { value: ${allData.bundleObj.fontSize}, name: 'Html' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        })
    },
    getLevelOption() {
        return [
          {
            itemStyle: {
              borderColor: '#777',
              borderWidth: 0,
              gapWidth: 1
            },
            upperLabel: {
              show: false
            }
          },
          {
            itemStyle: {
              borderColor: '#555',
              borderWidth: 5,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#ddd'
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              borderWidth: 5,
              gapWidth: 1,
              borderColorSaturation: 0.6
            }
          }
        ];
      },
    setTreeChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('visualization'))
        // 绘制图表
        myChart.setOption({
          title: {
              text: 'visualization',
              left: 'center'
          },
          tooltip: {
              formatter: function(info) {
                  var value = info.value;
                  var treePathInfo = info.treePathInfo;
                  var treePath = [];
                  for (var i = 1; i < treePathInfo.length; i++) {
                      treePath.push(treePathInfo[i].name);
                  }
                  return [
                      '<div class="tooltip-title">' +
                      echarts.format.encodeHTML(treePath.join('/')) +
                      '</div>',
                      'size: ' + echarts.format.addCommas(value) + ' KB'
                  ].join('');
              }
          },
          series: [{
              name: 'root',
              type: 'treemap',
              visibleMin: 300,
              label: {
                  show: true,
                  formatter: '{b}'
              },
              upperLabel: {
                  show: true,
                  height: 30
              },
              itemStyle: {
                  borderColor: '#fff'
              },
              levels: this.getLevelOption(),
              data: ${JSON.stringify(allData.treeData)},
          }]
      })
    }
  },
  mounted(){
    this.setPieChart()
    this.setTreeChart()
  }
})
</script>
</html>
  `;

  return chartScript;
};

module.exports = {
  createHtml,
};
