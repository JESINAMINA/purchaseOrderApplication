console.log('Client side javascript file is loaded!')

const purchaseOrder = document.querySelector('form')
const salesPerson = document.querySelector('input')
const cheese = document.getElementById("cheese")
const cutlet = document.getElementById("cutlet")
const priceBox = document.getElementById("price")
const quantity = document.getElementById("quantity")
const event = new Event('change')

//responsive price calculation 

purchaseOrder.addEventListener('change', (e) => {

    const salad = document.querySelector('input[name = "choice"]:checked').value
    const cheeseQty = cheese.value
    const cutletQty = cutlet.value
    let qty = quantity.value
    fetch('http://localhost:3000/change?' + 'salad=' + salad + '&cheese=' + cheeseQty + '&cutlet=' + cutletQty + '&quantity=' + qty + '&item=burger' + '&burger=1').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert('Error,please contact the admin')
            } else {
                priceBox.value = data.totalNetValue
            }
        })
    })
})


//Initiating the purchase order request to server

purchaseOrder.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = salesPerson.value
    const salad = document.querySelector('input[name = "choice"]:checked').value
    let cheeseQty = cheese.value
    let cutletQty = cutlet.value
    let qty = quantity.value

    fetch('http://localhost:3000/order?name=' + name + '&salad=' + salad + '&cheese=' + cheeseQty + '&cutlet=' + cutletQty + '&quantity=' + qty + '&item=burger' + '&burger=1').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert('Order failed ,please check with admin')
            } else {
                //reset the form values on successful completion 
                alert('Order successfull')
                cheese.value = cutlet.value = priceBox.value = 0
                quantity.value = 1
                purchaseOrder.dispatchEvent(event) //to restore the base value of the product
            }
        })
    })

})


purchaseOrder.dispatchEvent(event)