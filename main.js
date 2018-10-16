
let createOrderEmailInput = document.getElementById('email-input');


let coffeeSelection = document.getElementById('coffee-list').options;


const COFFEE_ORDERS_URL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/";



let orderEmail = document.getElementById('order-email');

let orderInfoButton = document.getElementById('order-info-button')

// displays all orders
fetch(COFFEE_ORDERS_URL)
.then((resp) => resp.json())
.then(function(orders) {
    let allOrders = document.getElementById('all-orders')

    Object.keys(orders).map(e => {

        
        let eachOrder = `
        <div>${orders[e].emailAddress}</div>
        <div>${orders[e].coffee}</div>
        `
        allOrders.insertAdjacentHTML('beforeend',eachOrder)
    })
})




// Display the requested email's order

orderInfoButton.addEventListener('click', function() {
    let customerEmail = orderEmail.value

    const COFFEE_ORDERS_BY_EMAIL_URL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${customerEmail}`

    fetch(COFFEE_ORDERS_BY_EMAIL_URL)
    .then(function(order) {
        console.log(order)
        return order.json();
    })
    .then(function(email) {
        let orderInformationContainer = document.getElementById('order-information-container');

        let orderInformation = 
            `<div>${email.emailAddress}</div>
            <div>${email.coffee}</div>
            <label>Delete Order: <label>
            <input id="delete-order"  type="submit" value="Delete" />
            `
            
        orderInformationContainer.innerHTML = orderInformation  

        // deletes the called order
        let deleteOrder = document.getElementById('delete-order')
            
        deleteOrder.addEventListener('click', function() {
            fetch(COFFEE_ORDERS_BY_EMAIL_URL, {
                method: 'DELETE'
            });
            orderInformationContainer.innerHTML = "";
            console.log(COFFEE_ORDERS_URL)
        });

    })  

});





let submitButton = document.getElementById('submit-button');

// Submits the new order to the json
submitButton.addEventListener('click', function() {
    let correctCoffee = coffeeSelection[coffeeSelection.selectedIndex].text;
    let orderEmail = createOrderEmailInput.value;
    console.log(correctCoffee)
    console.log(orderEmail);
    fetch(COFFEE_ORDERS_URL, {  
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailAddress: orderEmail,
            coffee: correctCoffee
        })
    })
});