priceCalculationService = require('./priceCalculationService')


function purchaseOrderFactory(specifications){
    
    var purchaseOrder 
  
    if(specifications.item==='burger'){
    purchaseOrder = new BurgerOrder(specifications.salad,specifications.cheese,specifications.cutlet)
    const totalNetValue =  priceCalculationService(specifications)
    purchaseOrder.item=specifications.item
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
    burger : 1 
}

}    




module.exports=purchaseOrderFactory
