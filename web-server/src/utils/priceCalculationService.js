
const fs = require('fs')

function priceCalculationService(ingredients){

const priceList = loadPriceList();
let totalNetValue = load ;

for(let i of Object.keys(ingredients)){
   let item =  priceList.find((x)=>(i=== x.item))
if(item!== undefined )
totalNetValue+=item.price *ingredients[i];
}
return totalNetValue*ingredients.quantity 
}

function loadPriceList(){
    try{
var priceList  = fs.readFileSync(__dirname+'/priceList.json')
priceList = JSON.parse(priceList.toString())
    }
    catch(e){

        return [] 
    }
return priceList ;

}

function retrieveBasePrice(item){
    return 10 
}


module.exports = {priceCalculationService 