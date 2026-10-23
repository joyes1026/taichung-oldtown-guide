const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const els={};function el(){return {innerHTML:'',value:'',addEventListener(){},classList:{toggle(){}},querySelector(){return {focus(){}}},focus(){}};}
const document={querySelectorAll(){return []},getElementById(id){return els[id]??=el()}};
vm.runInNewContext(code+`
assert.equal(data.length,39);assert.equal(new Set(data.map(d=>d[0])).size,39);
assert(!data.some(d=>d[0].includes('檜意森活村')));assert.equal(paletteFor(data[0]).type,'未確認');assert(paletteFor(data[1]).groups.includes('red'));assert.equal(data.filter(d=>d[1]==='place').length,1);active='food';render();assert(document.getElementById('entries').innerHTML.includes('台灣陳'));
search.value='zznotfound';render();assert(document.getElementById('entries').innerHTML.includes('清除搜尋'));
active='all';search.value='樂田';render();assert(document.getElementById('entries').innerHTML.includes('樂田活版'));
assert.equal(paletteEvidence.length,39);assert.equal(paletteEvidence.filter(p=>p[0].length).length,25);
for(const p of paletteEvidence){assert(p[2]);assert.equal(p[0].length,p[3].length);for(const id of p[0])assert(colorGroups.some(c=>c[0]===id));}
active='food';activeColor='green';search.value='';render();assert.equal(data.filter(d=>baseMatches(d)&&matchesColor(d)).length,1);assert(document.getElementById('entries').innerHTML.includes('台灣陳沙茶火鍋'));assert(!document.getElementById('entries').innerHTML.includes('東海排骨'));
active='all';activeColor='unknown';render();assert.equal(data.filter(d=>baseMatches(d)&&matchesColor(d)).length,14);assert(document.getElementById('entries').innerHTML.includes('主要照片中的招牌可讀為另一店名'));
activeColor='blue';search.value='春水堂';render();assert.equal(data.filter(d=>baseMatches(d)&&matchesColor(d)).length,1);
search.value='沒有這家店';render();assert(document.getElementById('entries').innerHTML.includes('id="reset"'));
clearAll();assert.equal(active,'all');assert.equal(activeColor,'all');assert.equal(search.value,'');assert(document.getElementById('result-count').innerHTML.includes('39 個地點'));
console.log('PASS: 39 Taichung entries; 25 observed palettes + 14 unknowns; combined category/color/search; multi-color membership; empty state; reset.');
`,{document,assert,console});
