var assert = require('assert');
const path = require('path')
const priceCalculationService = require(path.join(__dirname, '../web-server/src/utils/priceCalculationService'))
const purchaseOrderFactory = require(path.join(__dirname, '../web-server/src/utils/purchaseOrderFactory'))

describe('utilities', function() {

    describe('priceCalculationService', function() {

        it('should retrun zero when ingredients are not present', function() {
            assert.equal(0, priceCalculationService({ quantity: 1 }))
        });

    });

    describe('purchaseOrderFactory', function() {

        it('should retrun an empty object order if the item is invalid', function() {
            let purchaseOrder = purchaseOrderFactory({ item: "invalid" })
            assert.equal(0, Object.entries(purchaseOrder).length)
        });

    });

});