const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('dist/index.html','utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const els={};function el(){return {innerHTML:'',value:'',addEventListener(){},classList:{toggle(){}},querySelector(){return {focus(){}}},focus(){}};}
const document={querySelectorAll(){return []},getElementById(id){return els[id]??=el()}};
vm.runInNewContext(code+`
assert.equal(data.length,40);assert.equal(new Set(data.map(d=>d[0])).size,40);
active='food';render();assert(document.getElementById('entries').innerHTML.includes('台灣陳'));
search.value='zznotfound';render();assert(document.getElementById('entries').innerHTML.includes('清除搜尋'));
active='all';search.value='樂田';render();assert(document.getElementById('entries').innerHTML.includes('樂田活版'));
console.log('PASS: 40 unique entries; category filter, name search, empty state, script execution.');
`,{document,assert,console});
