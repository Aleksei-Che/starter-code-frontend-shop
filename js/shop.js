// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = JSON.parse(localStorage.getItem("cart")) || [];

var total = 0;

// Function to update the cart icon
function updateCartIcon() {
    let cartIcon = document.getElementById("count_product");
    cartIcon.innerHTML = cart.map((x) => x.quantity).reduce((acc, y) => (acc + y), 0);
}


// Exercise 1
function buy(id) {

    let selectedItem = products.find(item => item.id === id);
    // console.log(selectedItem.id);

    let productExist = cart.find(item => item.id === selectedItem.id);

    if (productExist === undefined) {

        selectedItem = {...selectedItem, quantity: 1};
        cart.push(selectedItem);
    } else {
        productExist.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);

    // update(selectedItem.id);
    updateCartIcon();


    // console.log(cart);
 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
}

function displayCart() {
    updateCartIcon();
}

window.onload = displayCart;

// Exercise 2
function cleanCart() {

    cart = [];
    total = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    printCart();

}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array

    total = cart.reduce((acc, item) => acc + (item.totalConDiscuento || item.price * item.quantity), 0);
    document.getElementById('total_price').innerHTML = total.toFixed(2);
    return total;
    }


// Exercise 4
function applyPromotionsCart() {
    cart.forEach(item => {
        if (item.offer && item.quantity >= item.offer.number) {
            item.totalConDescuento = item.quantity * item.price * (1 - item.offer.percent / 100);
            console.log(`Discount applied to ${item.name}: $${item.totalConDescuento.toFixed(2)}`);
        } else {
            delete item.totalConDescuento;
            console.log(`No discount for ${item.name}`);
        }
    });
    calculateTotal();
}

// Exercise 5


function printCart() {
    
    applyPromotionsCart();

    
    let cartList = document.getElementById("cart_list");
    let totalPrice = document.getElementById("total_price");
    let checkoutButton = document.querySelector(".btn-primary.m-3[href='checkout.html']");
    let cleanCartButton = document.querySelector(".btn-primary.m-3.clean-cart");

    
    cartList.innerHTML = '';

    
    if (cart.length !== 0) {
        
        let total = 0;

        
        cart.forEach(item => {
            const itemTotal = item.totalConDescuento || item.price * item.quantity;
            total += itemTotal;

            let row = `
                <tr>
                    <th scope="row">${item.name}</th>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${item.totalConDescuento ? `$${item.totalConDescuento.toFixed(2)}` : ""}</td>
                    <td><button type="button" class="btn btn-danger" onclick="removeFromCart(${item.id})">-</button></td>
                </tr>
            `;
            cartList.innerHTML += row;
        });

        
        totalPrice.innerHTML = total.toFixed(2);
        
        checkoutButton.style.display = 'inline-block';
        cleanCartButton.style.display = 'inline-block';
    } else {
        let emptyMessage = `
            <tr>
                <td colspan="4" class="text-center">
                    <h2>Cart is empty</h2>
                    <a href="index.html">
                       <button class="btn btn-primary">Back to home</button>
                    </a>
                </td>
            </tr>
        `;
        cartList.innerHTML = emptyMessage;
        totalPrice.innerHTML = '0.00';
        checkoutButton.style.display = 'none';
        cleanCartButton.style.display = 'none';
    }
}

document.getElementById("cartButton").addEventListener("click", printCart);

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    cart = cart
        .map((product) => {
            if (product.id === id) {
                product.quantity--;
            }
            if (product.quantity <= 0) {
                return null;
            }
            return product;
        })
        .filter((product) => product !== null);

    document.getElementById('count_product').innerHTML = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
    printCart();
}


function open_modal() {
    printCart();
}