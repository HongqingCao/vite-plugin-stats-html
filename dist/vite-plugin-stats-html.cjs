"use strict";const D=(i,e)=>()=>{let t="";for(let n=0;n<e;n++)t+=i[Math.random()*i.length|0];return t},H=D("codercao1234",4),q=H();let V=0;const x=()=>`${q}-${V++}`,_=class{constructor(e){this.projectRoot=e,this.nodeParts={},this.nodeMetas={}}trimProjectRootId(e){return typeof this.projectRoot=="string"&&e.startsWith(this.projectRoot)?e.slice(this.projectRoot.length):e.replace(this.projectRoot,"")}getModuleUid(e){return e in this.nodeMetas||(this.nodeMetas[e]={uid:x(),meta:{id:this.trimProjectRootId(e),moduleParts:{},imported:new Set,importedBy:new Set}}),this.nodeMetas[e].uid}getBundleModuleUid(e,t){return t in this.nodeMetas||(this.nodeMetas[t]={uid:x(),meta:{id:this.trimProjectRootId(t),moduleParts:{},imported:new Set,importedBy:new Set}}),e in this.nodeMetas[t].meta.moduleParts||(this.nodeMetas[t].meta.moduleParts[e]=x()),this.nodeMetas[t].meta.moduleParts[e]}setNodePart(e,t,n){const s=this.getBundleModuleUid(e,t);if(s in this.nodeParts)throw new Error(`Override module: bundle id ${e}, module id ${t}, value ${JSON.stringify(n)}, existing value: ${JSON.stringify(this.nodeParts[s])}`);return this.nodeParts[s]={...n,metaUid:this.getModuleUid(t)},s}setNodeMeta(e,t){this.getModuleUid(e),this.nodeMetas[e].meta.isEntry=t.isEntry,this.nodeMetas[e].meta.isExternal=t.isExternal}hasNodePart(e,t){return!(!(t in this.nodeMetas)||!(e in this.nodeMetas[t].meta.moduleParts)||!(this.nodeMetas[t].meta.moduleParts[e]in this.nodeParts))}getNodeParts(){return this.nodeParts}getNodeMetas(){const e={};for(const{uid:t,meta:n}of Object.values(this.nodeMetas))e[t]={...n,imported:[...n.imported].map(s=>{const[l,o]=s.split(","),r={uid:l};return o==="true"&&(r.dynamic=!0),r}),importedBy:[...n.importedBy].map(s=>{const[l,o]=s.split(","),r={uid:l};return o==="true"&&(r.dynamic=!0),r})};return e}addImportedByLink(e,t){const n=this.getModuleUid(t);this.getModuleUid(e),this.nodeMetas[e].meta.importedBy.add(n)}addImportedLink(e,t,n=!1){const s=this.getModuleUid(t);this.getModuleUid(e),this.nodeMetas[e].meta.imported.add(String([s,n]))}},b=i=>"children"in i,L=(i,e,t,n)=>{if(t.length===0)throw new Error(`Error adding node to path ${i}`);const[s,...l]=t;if(l.length===0){e.children.push({...n,name:s});return}else{let o=e.children.find(r=>r.name===s&&b(r));o||(o={name:s,children:[]},e.children.push(o)),L(i,o,l,n);return}},w=i=>{if(i.children.length===1){const e=i.children[0],t=`${i.name}/${e.name}`;return b(e)?(i.name=t,i.children=e.children,w(i)):{name:t,uid:e.uid,value:e.value}}else return i.children=i.children.map(e=>b(e)?w(e):e),i},A=(i,e,t)=>{const n={name:i,children:[]};for(const{id:s,renderedLength:l}of e){const o=t.setNodePart(i,s,{renderedLength:l}),r=t.trimProjectRootId(s),p=r.split(/\\|\//).filter(h=>h!=="");L(r,n,p,{uid:o,value:l})}return n.children=n.children.map(s=>b(s)?w(s):s),n},X=i=>`
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
  `,I=require("fs"),T=require("path"),R=(i={})=>{let e;return{name:"visualizer",buildStart(){e=Date.now()},async generateBundle(t,n){var $,B;const s=i.output||"stats.html",l=i.title??"Vite Plugin Status Html",o=i.projectRoot??process.cwd(),r=[],p=new _(o),h=async({id:c,renderedLength:a,code:u})=>{const d=u==null||u=="";return{id:c,renderedLength:d?a:Buffer.byteLength(u,"utf-8")}};let S=0,k=0,j=0,z=0,M=0,P=0,C=0,O=0,N=0,U=[];for(const[c,a]of Object.entries(n)){let u=T.extname(a.fileName).slice(1),d=(($=a==null?void 0:a.code)==null?void 0:$.length)||((B=a==null?void 0:a.source)==null?void 0:B.length);switch(u){case"js":M+=d;break;case"css":P+=d;break;case"jpg":case"jpeg":case"png":case"gif":case"svg":C+=d;break;case"html":O+=d;break;case"woff":case"woff2":case"ttf":case"otf":N+=d;break}const f=Object.keys(a.modules??[]).length;if(z+=d,S++,U.push({file:a.fileName,type:u,size:Number(d/1e3).toFixed(2),dependencyCount:f}),a.type!=="chunk")continue;j+=f;let g;const J=await Promise.all(Object.entries(a.modules).map(([v,{renderedLength:m,code:y}])=>h({id:v,renderedLength:m,code:y})));if(g=A(c,J,p),g.children.length===0){const v=await h({id:c,renderedLength:a.code.length,code:a.code}),m=a.facadeModuleId??`${c}-unknown`,y=p.setNodePart(c,m,v);p.setNodeMeta(m,{isEntry:!0});const W={name:c,uid:y};r.push(W)}else r.push(g)}k=Object.keys(n).length;let E={bundleObj:{title:l,projectRoot:o,time:(Date.now()-e)/1e3+"s",startTime:new Date().toLocaleString(),totalSize:Number(z/1e3).toFixed(2),assetCount:S,chunkCount:k,packageCount:j,jsSize:Number(M/1e3).toFixed(2),cssSize:Number(P/1e3).toFixed(2),imageSize:Number(C/1e3).toFixed(2),htmlSize:Number(O/1e3).toFixed(2),fontSize:Number(N/1e3).toFixed(2)},tableData:U,treeData:r};const F=X(E);await I.writeFileSync(T.join("./",s),F)}}};module.exports=R;exports.visualizer=R;exports.default=exports.visualizer;
