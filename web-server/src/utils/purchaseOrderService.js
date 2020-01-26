const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

function createPurchaseOrder(purchaseOrder) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("purchaseOrder");

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
        console.log(e);
      }
      res(sequenceDocument);
    });

    P.then(function(data) {
      purchaseOrderId = data.value.sequence_value;
      console.log(data);
      var purchaseOrderObj = {
        _id: purchaseOrderId,
        SalesPerson: purchaseOrder.name,
        item: purchaseOrder.item,
        quantity: purchaseOrder.quantity,
        date: new Date(),
        totalNetValue: purchaseOrder.totalNetValue,
        customisations: [purchaseOrder.ingredients]
      };
      dbo
        .collection("purchaseOrders")
        .insertOne(purchaseOrderObj, function(err, res) {
          if (err) throw err;
          console.log(res);
        });

      db.close();
    }).catch(data => {
      console.log(data);
    });
  });
}

async function retrieveAllPurchaseOrders(filter){

  if (filter.SalesPerson!==undefined){
  var string = filter.SalesPerson
  filter.SalesPerson = new RegExp(["^", string, "$"].join(""), "i")
  }
  else filter = {}
var retrievePurchaseOrders = new Promise ((res,rej)=> {

  let purchaseOrders,totalNetValue
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("purchaseOrder");
    dbo
      .collection("purchaseOrders")
      .find(filter).toArray((err, result)=> {
        console.log(result);
        purchaseOrders = result

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
        totalNetValue = result
        if(totalNetValue.length===0)
          totalNetValue.push({total:0})
      
        res({purchaseOrders:purchaseOrders,totalNetValue:totalNetValue[0].total})


      });

})

  });
})


 var p =  await retrievePurchaseOrders 

 return p 

}

module.exports = {
  createPurchaseOrder: createPurchaseOrder,
  retrievePurchaseOrders: retrieveAllPurchaseOrders
};
