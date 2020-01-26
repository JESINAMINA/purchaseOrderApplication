console.log('Client side javascript file is loaded!')

const purchaseOrder = document.querySelector('form')
const salesPerson = document.querySelector('input')
const cheese = document.getElementsByName("cheese")
const cutlet = document.getElementsByName("cutlet")
const priceBox = document.getElementsByName("priceBox")
const quantity = document.getElementById("quantity")
var event = new Event('change');

    purchaseOrder.addEventListener('change', (e) =>  {

        const salad = document.querySelector('input[name = "choice"]:checked').value
        const cheeseQty = cheese[0].value 
        const cutletQty = cutlet[0].value 
        let qty= quantity.value 
        fetch('http://localhost:3000/change?'+'salad='+salad+'&cheese='+cheeseQty+'&cutlet='+cutletQty+'&quantity='+qty+'&item=burger'+'&burger=1').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    priceBox[0].value = data.totalNetValue
                }
            })
        })
console.log("onchange is hit")
    })
purchaseOrder.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const name = salesPerson.value
    const salad = document.querySelector('input[name = "choice"]:checked').value
    let cheeseQty = cheese[0].value 
    let cutletQty = cutlet[0].value 
    let qty= quantity.value
    cheese[0].value =cutlet[0].value = priceBox[0].value= 0
    quantity.value=1

    fetch('http://localhost:3000/order?name=' + name + '&salad=' + salad+'&cheese='+cheeseQty+'&cutlet='+cutletQty+'&quantity='+qty+'&item=burger'+'&burger=1').then((response) => {
        response.json().then((data) => {
            if (data.error) {
        alert('Order failed ,please check with admin')       
            } else {
        alert('Order successfull')
        purchaseOrder.dispatchEvent(event)
            }
        })
    })

})


purchaseOrder.dispatchEvent(event)