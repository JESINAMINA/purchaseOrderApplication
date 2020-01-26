
init()
 
 async function dbQueryName() { 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 fav = [];
     
var db = await MongoClient.connect(url) ;
  
  var dbo = db.db("WeatherDB");
  var mysort = { count : -1 };
  
  result = await  dbo.collection("Favorites").find().sort(mysort).toArray()
 
  console.log('sorted',result)

    for (var j = 0,i=0; j <result.length; j++){
        console.log('result',result[j])
      if (result[j].count>1)
      {    
          fav[i] = result[j] ;
          i++;
      } 
  
 }

    db.close();
    console.log(fav);
    return(fav);
    
 }

 async function init () {
favz = await dbQueryName()
    console.log('testing',favz);
    return favz ;
 }

 module.exports.init = init ;