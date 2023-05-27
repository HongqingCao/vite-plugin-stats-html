(function(f){typeof define=="function"&&define.amd?define(f):f()})(function(){"use strict";const F=((i,e)=>()=>{let t="";for(let n=0;n<e;n++)t+=i[Math.random()*i.length|0];return t})("codercao1234",4)();let J=0;const g=()=>`${F}-${J++}`,W=class{constructor(e){this.projectRoot=e,this.nodeParts={},this.nodeMetas={}}trimProjectRootId(e){return typeof this.projectRoot=="string"&&e.startsWith(this.projectRoot)?e.slice(this.projectRoot.length):e.replace(this.projectRoot,"")}getModuleUid(e){return e in this.nodeMetas||(this.nodeMetas[e]={uid:g(),meta:{id:this.trimProjectRootId(e),moduleParts:{},imported:new Set,importedBy:new Set}}),this.nodeMetas[e].uid}getBundleModuleUid(e,t){return t in this.nodeMetas||(this.nodeMetas[t]={uid:g(),meta:{id:this.trimProjectRootId(t),moduleParts:{},imported:new Set,importedBy:new Set}}),e in this.nodeMetas[t].meta.moduleParts||(this.nodeMetas[t].meta.moduleParts[e]=g()),this.nodeMetas[t].meta.moduleParts[e]}setNodePart(e,t,n){const s=this.getBundleModuleUid(e,t);if(s in this.nodeParts)throw new Error(`Override module: bundle id ${e}, module id ${t}, value ${JSON.stringify(n)}, existing value: ${JSON.stringify(this.nodeParts[s])}`);return this.nodeParts[s]={...n,metaUid:this.getModuleUid(t)},s}setNodeMeta(e,t){this.getModuleUid(e),this.nodeMetas[e].meta.isEntry=t.isEntry,this.nodeMetas[e].meta.isExternal=t.isExternal}hasNodePart(e,t){return!(!(t in this.nodeMetas)||!(e in this.nodeMetas[t].meta.moduleParts)||!(this.nodeMetas[t].meta.moduleParts[e]in this.nodeParts))}getNodeParts(){return this.nodeParts}getNodeMetas(){const e={};for(const{uid:t,meta:n}of Object.values(this.nodeMetas))e[t]={...n,imported:[...n.imported].map(s=>{const[l,r]=s.split(","),o={uid:l};return r==="true"&&(o.dynamic=!0),o}),importedBy:[...n.importedBy].map(s=>{const[l,r]=s.split(","),o={uid:l};return r==="true"&&(o.dynamic=!0),o})};return e}addImportedByLink(e,t){const n=this.getModuleUid(t);this.getModuleUid(e),this.nodeMetas[e].meta.importedBy.add(n)}addImportedLink(e,t,n=!1){const s=this.getModuleUid(t);this.getModuleUid(e),this.nodeMetas[e].meta.imported.add(String([s,n]))}},h=i=>"children"in i,k=(i,e,t,n)=>{if(t.length===0)throw new Error(`Error adding node to path ${i}`);const[s,...l]=t;if(l.length===0){e.children.push({...n,name:s});return}else{let r=e.children.find(o=>o.name===s&&h(o));r||(r={name:s,children:[]},e.children.push(r)),k(i,r,l,n);return}},v=i=>{if(i.children.length===1){const e=i.children[0],t=`${i.name}/${e.name}`;return h(e)?(i.name=t,i.children=e.children,v(i)):{name:t,uid:e.uid,value:e.value}}else return i.children=i.children.map(e=>h(e)?v(e):e),i},D=(i,e,t)=>{const n={name:i,children:[]};for(const{id:s,renderedLength:l}of e){const r=t.setNodePart(i,s,{renderedLength:l}),o=t.trimProjectRootId(s),p=o.split(/\\|\//).filter(m=>m!=="");k(o,n,p,{uid:r,value:l})}return n.children=n.children.map(s=>h(s)?v(s):s),n},H=i=>`
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
<script src="https://unpkg.com/vue@2"><\/script>
<script src="https://unpkg.com/element-ui/lib/index.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"><\/script>
</head>
<body>
<div class="app" id="app">
<div class="container">
  <div class="header-wrap">${i.title}</div>
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
    bundleObj:${JSON.stringify(i.bundleObj)},
    tableData:${JSON.stringify(i.tableData)},
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
                { value: ${i.bundleObj.jsSize}, name: 'JS' },
                { value: ${i.bundleObj.cssSize}, name: 'CSS' },
                { value: ${i.bundleObj.imageSize}, name: 'Image' },
                { value: ${i.bundleObj.htmlSize}, name: 'Font' },
                { value: ${i.bundleObj.fontSize}, name: 'Html' },
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
              data: ${JSON.stringify(i.treeData)},
          }]
      })
    }
  },
  mounted(){
    this.setPieChart()
    this.setTreeChart()
  }
})
<\/script>
</html>
  `,q=require("fs"),j=require("path"),z=(i={})=>{let e;return{name:"visualizer",buildStart(){e=Date.now()},async generateBundle(t,n){var R,E;const s=i.output||"stats.html",l=i.title??"Vite Plugin Status Html",r=i.projectRoot??process.cwd(),o=[],p=new W(r),m=async({id:c,renderedLength:a,code:u})=>{const d=u==null||u=="";return{id:c,renderedLength:d?a:Buffer.byteLength(u,"utf-8")}};let M=0,P=0,C=0,O=0,N=0,U=0,$=0,B=0,T=0,L=[];for(const[c,a]of Object.entries(n)){let u=j.extname(a.fileName).slice(1),d=((R=a==null?void 0:a.code)==null?void 0:R.length)||((E=a==null?void 0:a.source)==null?void 0:E.length);switch(u){case"js":N+=d;break;case"css":U+=d;break;case"jpg":case"jpeg":case"png":case"gif":case"svg":$+=d;break;case"html":B+=d;break;case"woff":case"woff2":case"ttf":case"otf":T+=d;break}const y=Object.keys(a.modules??[]).length;if(O+=d,M++,L.push({file:a.fileName,type:u,size:Number(d/1e3).toFixed(2),dependencyCount:y}),a.type!=="chunk")continue;C+=y;let x;const A=await Promise.all(Object.entries(a.modules).map(([w,{renderedLength:b,code:S}])=>m({id:w,renderedLength:b,code:S})));if(x=D(c,A,p),x.children.length===0){const w=await m({id:c,renderedLength:a.code.length,code:a.code}),b=a.facadeModuleId??`${c}-unknown`,S=p.setNodePart(c,b,w);p.setNodeMeta(b,{isEntry:!0});const X={name:c,uid:S};o.push(X)}else o.push(x)}P=Object.keys(n).length;let V={bundleObj:{title:l,projectRoot:r,time:(Date.now()-e)/1e3+"s",startTime:new Date().toLocaleString(),totalSize:Number(O/1e3).toFixed(2),assetCount:M,chunkCount:P,packageCount:C,jsSize:Number(N/1e3).toFixed(2),cssSize:Number(U/1e3).toFixed(2),imageSize:Number($/1e3).toFixed(2),htmlSize:Number(B/1e3).toFixed(2),fontSize:Number(T/1e3).toFixed(2)},tableData:L,treeData:o};const _=H(V);await q.writeFileSync(j.join("./",s),_)}}};module.exports=z,exports.visualizer=z,exports.default=exports.visualizer});
