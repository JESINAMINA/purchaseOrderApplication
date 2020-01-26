console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const salesPerson = document.querySelector('input')
const cheese = document.getElementsByName("cheese")
const cutlet = document.getElementsByName("cutlet")
const priceBox = document.getElementsByName("priceBox")
const quantity = document.getElementById("quantity")

    weatherForm.addEventListener('change', (e) =>  {

        const salad = document.querySelector('input[name = "choice"]:checked').value
        const cheeseQty = cheese[0].value 
        const cutletQty = cutlet[0].value 
        const quantity = quantity.value
        fetch('http://localhost:3000/change?'+'salad=' + salad+'&cheese='+cheeseQty+'&cutlet='+cutletQty+'&quantity='+quantity).then((response) => {
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
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const name = salesPerson.value
    const salad = document.querySelector('input[name = "choice"]:checked').value
    let cheeseQty = cheese[0].value 
    let cutletQty = cutlet[0].value 
    let quantity  = quantity.value
    cheese[0].value =cutlet[0].value = priceBox[0].value= 0

    fetch('http://localhost:3000/order?name=' + name + '&salad=' + salad+'&cheese='+cheeseQty+'&cutlet='+cutletQty+'&quantity='+quantity).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})