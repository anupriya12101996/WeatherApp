const http=require('http');
const fs=require('fs');
var requests= require('requests');

const replaceVal=(tempVal , orgVal)=>{
let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
 temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
 temperature=temperature.replace("{%location%}",orgVal.name);
 temperature=temperature.replace("{%country%}",orgVal.sys.country);
 temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
 return temperature;

};
const homeFile=fs.readFileSync("home1.html","utf-8");

const server=http.createServer((req,res)=>{
   if(req.url==="/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=d090bdc1d2317cb0373a4f86e01e50c9', 
    )
.on('data',  (chunk)=> {
  const objData=JSON.parse(chunk);
  const arrData=[objData];
  // console.log(arrData[0].main.temp);
  const realTimeData=arrData
  .map(val=> replaceVal(homeFile,val))
    .join("");
  console.log("test");
  res.write(realTimeData);
//   console.log(realTimeData);

})
.on('end', (err)=> {
  if (err) {
    console.log('connection closed due to errors', err);
  }
  else {
    res.end();
   }
  
 });
   }});

server.listen(8000,"127.0.0.1");