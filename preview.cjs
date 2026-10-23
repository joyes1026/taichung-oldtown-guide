const fs=require('fs'),http=require('http');
http.createServer((q,r)=>{
 const url=new URL(q.url,'http://127.0.0.1:4174');
 r.setHeader('Content-Type','text/html; charset=utf-8');
 if(url.pathname==='/mobile'){
  const requested=Number(url.searchParams.get('width'))||390;
  const width=[320,360,390,430,768,1024].includes(requested)?requested:390;
  r.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+width+'px 排版檢查</title></head><body style="margin:0;background:#e6dccf;display:flex;justify-content:center;overflow:hidden"><iframe title="'+width+'px 響應式預覽" src="/" style="border:0;width:'+width+'px;flex-shrink:0;height:100vh;background:#fbf4e8"></iframe></body></html>');
 }else r.end(fs.readFileSync('index.html'));
}).listen(4174,'127.0.0.1',()=>console.log('http://127.0.0.1:4174'));
