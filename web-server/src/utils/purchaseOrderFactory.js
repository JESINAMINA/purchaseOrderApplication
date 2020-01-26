priceCalculationService = require('./priceCalculationService')


function purchaseOrderFactory(item,specifications){
    
    var purchaseOrder 
  
    if(item==='Burger'){
    purchaseOrder = new BurgerOrder(specifications.salad,specifications.cheese,specifications.cutlet)
    const totalNetValue =  priceCalculationService(specifications)
    purchaseOrder.item = item 
    purchaseOrder.name=specifications.name
    purchaseOrder.totalNetValue = totalNetValue    
    purchaseOrder.quantity =specifications.quantity 
    }
    return purchaseOrder;
    
    }
   
 
function BurgerOrder(salad,cheese,cutlet){
  
    this.ingredients= {
    salad:salad,
    cheese:cheese,
    cutlet:cutlet,
    others : baseRate('burger') 
}

}    




module.exports=purchaseOrderFactory
