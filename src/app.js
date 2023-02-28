const express=require("express");
const app=express();
const http = require('http');
const fs = require('fs');

const path=require("path")
require("./db/conn");
// const static_path=path.join(__dirname, "../public");
// app.use(express.static())
const static_path=path.join(__dirname, "../public");
app.use(express.static)

app.get("/",(req,res)=>{
    res.send("hello world ")
});
app.listen(3000);

const server = http.createServer((req, res) => {
  if (req.url === 'index.html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  }
});