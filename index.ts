let express = require("express");
// let CryptoNewsAPI = require('crypto-news-api').CryptoNewsAPI
var CryptoNewsAPI = require('crypto-news-api').default
let http = require("http");



let app = express();
let server = http.createServer(app);


const Api = new CryptoNewsAPI('e1053fe0fce51e8e13db93b1583be291')

const ProxyApi = new CryptoNewsAPI('e1053fe0fce51e8e13db93b1583be291', 'http://cryptocontrol_proxy/api/v1/public')

app.set('view engine', 'pug')
app.use(express.static(__dirname + './'));

app.use(require("body-parser").json())
server.listen(process.env.PORT||2000, ()=>{
  console.log("connected to server");
})


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.get('/',(rej,res)=>{
    res.setHeader('Content-Type', 'application/json');

    news().then(ress=>{
       res.end(JSON.stringify(ress));
    })

   

})

app.get("/news",(rej,res)=>{
   
    news().then(ress=>{
        res.render('index.pug',{json :JSON.stringify(ress)});
     })
})


function news(){
    return new Promise ((res,rej)=>{
        Api.getTopNews()
        .then(articles => {res(articles)})

       .catch(error => console.error(error))
    
    })
   
}

