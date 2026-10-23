const fs=require('fs'),http=require('http');
http.createServer((q,r)=>{r.setHeader('Content-Type','text/html; charset=utf-8');
if(q.url==='/mobile')r.end('<!doctype html><html><head><title>手機版排版檢查</title></head><body style="margin:0;background:#e6dccf;display:flex;justify-content:center"><iframe title="390px 手機版" src="/" style="border:0;width:390px;height:900px;background:#fbf4e8"></iframe></body></html>');
else r.end(fs.readFileSync('index.html'));
}).listen(4174,'127.0.0.1',()=>console.log('http://127.0.0.1:4174'));
