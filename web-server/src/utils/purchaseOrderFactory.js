/*
purchaseOrderFactory 
input - Order item,customisations&quantity 
output - purchase order object exclusive to the order item .
*this also includes the base ingredients of the item and it's quantity*
 has the below properties --
*sales person name,item name,total price,quantity,all ingredients and their quantity*
*/



priceCalculationService = require('./priceCalculationService')


function purchaseOrderFactory(specifications) {

    var purchaseOrder = {}

    if (specifications.item === 'burger') {
        purchaseOrder = new BurgerOrder(specifications.salad, specifications.cheese, specifications.cutlet)
        const totalNetValue = priceCalculationService(specifications)
        purchaseOrder.item = specifications.item
        purchaseOrder.name = specifications.name
        purchaseOrder.totalNetValue = totalNetValue
        purchaseOrder.quantity = specifications.quantity
    }
    return purchaseOrder;

}
/*In an industrial scenario 
 this function should be generic to any item 
 and retrieve the rates of basic ingredients 
 from the DB */

function BurgerOrder(salad, cheese, cutlet) {

    this.ingredients = {
        salad: salad,
        cheese: cheese,
        cutlet: cutlet,
        burger: 1
    }

}

module.exports = purchaseOrderFactory