
let createOrderEmailInput = document.getElementById('email-input');

let coffeeSelection = document.getElementById('coffee-list').options;

const COFFEE_ORDERS_URL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/";

let orderEmail = document.getElementById('order-email');

let orderInfoButton = document.getElementById('order-info-button');


// displays all orders

const updateOrders = () => {
    fetch(COFFEE_ORDERS_URL)
    .then((resp) => resp.json())
    .then(function(orders) {
        let pendingOrders = document.getElementById('pending-orders');

        pendingOrders.innerHTML = "";

        Object.keys(orders).map(e => {
                
        let eachOrder = `
            <div class="pending-order">
                <div class="pending-orders-email"><span>Email:</span><br />${orders[e].emailAddress}</div>
                <div class="pending-orders-coffee"><span>Coffee:</span><br />${orders[e].coffee}</div>
            </div>
            `;

            pendingOrders.insertAdjacentHTML('beforeend', eachOrder);
        });
            
    });

}


// Display the requested email's order

orderInfoButton.addEventListener('click', function() {
    let customerEmail = orderEmail.value;

    const COFFEE_ORDERS_BY_EMAIL_URL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${customerEmail}`;

    fetch(COFFEE_ORDERS_BY_EMAIL_URL)
    .then(function(order) {
        return order.json();
    })
    .then(function(email) {
        let orderInformationContainer = document.getElementById('order-information-container');

        let orderInformation = 
            `<div class="order-email">${email.emailAddress}</div>
            <div class="order-coffee">${email.coffee}</div>
            <label class="order-label">Delete Order: <label>
            <input id="delete-order" class="delete-order-button" type="submit" value="Delete" />
            `;
            
        orderInformationContainer.innerHTML = orderInformation;


        // deletes the called order

        let deleteOrder = document.getElementById('delete-order');
            
        deleteOrder.addEventListener('click', function() {
            fetch(COFFEE_ORDERS_BY_EMAIL_URL, {
                method: 'DELETE'
            });
            orderInformationContainer.innerHTML = "";
        });

    })  

});


let submitButton = document.getElementById('submit-button');


// Submits the new order to the json

submitButton.addEventListener('click', function() {
    let correctCoffee = coffeeSelection[coffeeSelection.selectedIndex].text;

    let orderEmail = createOrderEmailInput.value;

    fetch(COFFEE_ORDERS_URL, {  
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailAddress: orderEmail,
            coffee: correctCoffee
        })

    });

});

updateOrders();

setInterval(function() {

    updateOrders();
}, 5000);