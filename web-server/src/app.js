const path = require('path')
const express = require('express')
const hbs = require('hbs')
const purchaseOrderDBService = require('./utils/purchaseOrderDBService')
const app = express()
const purchaseOrderFactory = require('./utils/purchaseOrderFactory')
const priceCalculationService = require('./utils/priceCalculationService')
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Burger Joint',
        name: 'Jesin'
    })  
})

app.get('/change', (req, res) => {
    console.log('change got hit ')
     let customisation = req.query
     let totalNetValue = priceCalculationService(customisation)
     res.send({totalNetValue:totalNetValue}) 
 })

app.get('/order', async (req, res) => {

     let customisation = req.query
     let purchaseOrder = await purchaseOrderFactory(customisation)
     purchaseOrderDBService.createPurchaseOrder(purchaseOrder) 
     res.send({totalNetValue : purchaseOrder.totalNetValue}) 
      
 })
app.get('/list', async (req, res) => {

     let data  = await  purchaseOrderDBService.retrievePurchaseOrders(req.query)
    res.render('list', {
        title: 'Purchase Orders',
        name: 'Jesin',
        list:data.purchaseOrders,
        total:data.totalNetValue
    })
   
})

app.post('/list', async (req, res,next) => {
    
    let filter
    if(req.body.salesPerson!=="")
    filter = {SalesPerson:req.body.salesPerson}
    else 
    filter = {}

   let data  = await  purchaseOrderDBService.retrievePurchaseOrders(filter)

   res.render('list', {
       title: 'Purchase Orders',
       name: 'Jesin',
       list:data.purchaseOrders,
       total:data.totalNetValue
   })

})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jesin'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jesin',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})