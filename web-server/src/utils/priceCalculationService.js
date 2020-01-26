/*
price calculation service is independent of the order item
input - an object with the ingredients,it's price and quantity 
output- totalNetValue of the Order 

A tariff list is stored seperately as a JSON file as priceList.JSON---

*this only for the sake of demonstration,
ideally this should be moved to db*

*/
const path = require('path')
const fs = require('fs')

function priceCalculationService(ingredients){

const priceList = loadPriceList();
let totalNetValue = 0 ;

for(let i of Object.keys(ingredients)){
   let item =  priceList.find((x)=>(i=== x.item))
if(item!== undefined )
totalNetValue+=item.price *ingredients[i];
}
return totalNetValue*ingredients.quantity 
}

//loads the general price tariff 

function loadPriceList(){
    try{
const pathName =  path.join(__dirname, '../json/priceList.json')       
var priceList  = fs.readFileSync(pathName)
priceList = JSON.parse(priceList.toString())
    }
    catch(e){

        return [] 
    }
return priceList ;

}


module.exports = priceCalculationService 