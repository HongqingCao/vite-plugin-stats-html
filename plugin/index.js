/*
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2023-05-17 22:41:30
 * @LastEditors: codercao
 * @LastEditTime: 2023-05-17 22:53:47
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function vitePluginStatsHtml() {
  return {
    name: 'vite-plugin-stats-html',
    apply: 'build',
    async generateBundle(options, bundle) {
      const outputPath = options.dir || './dist';
      const stats = [];

      for (const key in bundle) {
        const item = bundle[key];
        if (item.type === 'chunk') {
          const file = item.fileName;
          const type = path.extname(file).slice(1);
          const size = item.code.length;
          const dependencies = item.modules;
          const dependencyCount = Object.keys(dependencies).length;
          const buildTime = new Date().toLocaleString();

          stats.push({
            file,
            type,
            size,
            buildTime,
            dependencyCount,
          });
        }
      }

      const html = createHtml(stats);
      fs.writeFileSync(path.join(outputPath, 'stats.html'), html);
    },
  };
}

function createHtml(stats) {
  const $ = cheerio.load('<!DOCTYPE html><html><head></head><body></body></html>');

  $('head').append('<meta charset="UTF-8">');
  $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  $('head').append('<title>Build Statistics</title>');
  $('head').append('<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;} th {background-color: #f2f2f2;}</style>');

  $('body').append('<h1>Build Statistics</h1>');

  const table = $('<table></table>');
  const thead = $('<thead></thead>');
  thead.append('<tr><th>File</th><th>Type</th><th>Size (bytes)</th><th>Build Time</th><th>Dependency Count</th></tr>');
  table.append(thead);

  const tbody = $('<tbody></tbody>');
  stats.forEach((stat) => {
    const row = $('<tr></tr>');
    row.append(`<td>${stat.file}</td>`);
    row.append(`<td>${stat.type}</td>`);
    row.append(`<td>${stat.size}</td>`);
    row.append(`<td>${stat.buildTime}</td>`);
    row.append(`<td>${stat.dependencyCount}</td>`);
    tbody.append(row);
  });

  table.append(tbody);
  $('body').append(table);

  $('body').append('<div id="chart" style="width: 100%; height: 400px;"></div>');

  $('body').append('<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>');

  const chartData = stats.map((stat) => ({
    value: stat.size,
    name: `${stat.file} (${stat.type})`,
  }));

  const chartScript = `
    <script>
      const chart = echarts.init(document.getElementById('chart'));
      const option = {
        series: [{
          type: 'pie',
          data: ${JSON.stringify(chartData)},
          label: {
            formatter: '{b} ({d}%)'
          }
        }]
      };
      chart.setOption(option);
    </script>
  `;

  $('body').append(chartScript);

  return $.html();
}

module.exports = vitePluginStatsHtml;