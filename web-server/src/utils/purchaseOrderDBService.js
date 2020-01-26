
/* Purchase order Data base services 
* supports *
- Creation 
- retrieval / filtering (case insensitive) 
*/


const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

function createPurchaseOrder(purchaseOrder) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("purchaseOrder");

    //Promise to return the next OrderId in the sequence
    var P = new Promise(async (res, rej) => {
      try {
        var sequenceDocument = await dbo
          .collection("counters")
          .findAndModify(
            { _id: "purchaseOrderId" },
            [["_id", "asc"]],
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
          );
      } catch (e) {
        rej(e)
      }
      res(sequenceDocument);
    });

 //start writing to the DB once the sequence value is generated

    P.then(function(data) {

      purchaseOrderId = data.value.sequence_value;
   
      var purchaseOrderObj = {          
        _id: purchaseOrderId,
        SalesPerson: purchaseOrder.name,
        item: purchaseOrder.item,
        quantity: purchaseOrder.quantity,
        date: new Date(), //adding timeStamp
        totalNetValue: purchaseOrder.totalNetValue,
        customisations: [purchaseOrder.ingredients]
      }

      dbo
        .collection("purchaseOrders")
        .insertOne(purchaseOrderObj, function(err, res) {
          if (err) 
          throw err;
        });

      db.close();
    }).catch(data => {
      console.log(data);
    });
  });
}

async function retrieveAllPurchaseOrders(filter){

  //Regex to make the query case insensitive
  if (filter.SalesPerson!==undefined){
  var string = filter.SalesPerson
  filter.SalesPerson = new RegExp(["^", string, "$"].join(""), "i")
  }
  else filter = {}

  //promise to retrieve purchase orders and find the price aggregation

var retrievePurchaseOrders = new Promise ((res,rej)=> {

  let purchaseOrders,totalNetValue
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("purchaseOrder");
    dbo
      .collection("purchaseOrders")
      .find(filter).toArray((err, result)=> {
        if(err)
        rej(err)
        else
        {
        purchaseOrders = result

//if the retrieval is successful,then find the price aggregation

      dbo.collection("purchaseOrders").aggregate([
      {   $match: filter },
         { $group: {
            _id: null,
            total: {
              $sum: "$totalNetValue"
            }
          }
        }
      ]).toArray((err,result)=>{

        if(err)
        rej(err)
        else{
        totalNetValue = result
        if(totalNetValue.length===0)
          totalNetValue.push({total:0})
        res({purchaseOrders:purchaseOrders,totalNetValue:totalNetValue[0].total})
        }

      })
    }
})

  })
})


 var p =  await retrievePurchaseOrders 

 return p 

}

module.exports = {
  createPurchaseOrder: createPurchaseOrder,
  retrievePurchaseOrders: retrieveAllPurchaseOrders
};
