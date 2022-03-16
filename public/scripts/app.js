$(document).ready(function () {
  // This function creates the HTML snippet for each menu item.
  const createMenuItem = function (item) {
    return `
    <div class="menu-wrapper">
    <div>
      <div class="name-price">
        <div class="name">${item.name}</div>
        <div class="price">$<span>${Number(item.price / 100).toFixed(2)}</span></div>
      </div>
      <div class="description">${item.description}</div>
      <div class="display-flex align-items-center">
        <button class="click_me mr-3">Add to Order</button>
        <button class="add_quantity mr-3">+</button>
        <div class="mt-3 mr-3" id="${item.id}">0</div>
        <button class="red_quantity">-</button>
      </div>
    </div>
  </div>
  `;};

  let quantities = []; // This array is to store the quantities of each menu item selected by the user.

  // This function calls the previous function as many times as there are menu items in the database on the back end to render the full menu.
  const renderMenu = function (input) {
    for (const menuItem of input.menu_items) {
      $("#display-menu").append(createMenuItem(menuItem)); // appends the code snippet from the function above to the conainer with id 'display-menu' as many times as there are menu items in the database
      quantities.push(0); // for each menu item rendered on to the page, this line pushes '0' into the array. this array will be updated below to enter quantities of each menu item the user orders
    }
  };

  // This function makes the AJAX request that gets the menu items from the database. It then calls the previous function to render the menu.
  const loadMenu = function () {
    $.ajax("/api/menu_items", { method: "GET" }).then(function (data) {
      renderMenu(data);
    });
  };

  loadMenu(); // The previous function is invokved here to begin the process of calling the menu items from the database and rendering them in the browser

  // What happens when the user clicks the + button
  $(document).on("click", ".add_quantity", function (event) {

    event.preventDefault(); // prevents any default action associated with the button

    // the below two lines grab the id of the menu item whose quantity needs to be added to
    let $idHolder = $(this)
                      .parent()
                      .children()[2];
    let i = Number($($idHolder).attr("id"));

    quantities[i - 1]++; // add 1 to the quantity

    // this line updates the quantity on the page using the quantity updated in the array
    $(this)
      .parent()
      .find(`#${i}`)
      .html(`${quantities[i - 1]}`);
  });

  // What happens when the user clicks the - button
  $(document).on("click", ".red_quantity", function (event) {

    event.preventDefault(); // prevents any default action associated with the button

    // the below two lines grab the id of the menu item whose quantity needs to be reduced
    let $idHolder = $(this).parent().children()[2];
    let i = Number($($idHolder).attr("id"));

    // reduces 1 from total quantity only if total quantity is greater than zero
    if (quantities[i - 1] !== 0) {
      quantities[i - 1]--;
    }

    // this line updates the quantity on the page using the quantity updated in the array
    $(this)
      .parent()
      .find(`#${i}`)
      .html(`${quantities[i - 1]}`);
  });

  let totalCost = 0; // This variable stores the total cost of the order made by the user

  // What happens when the user clicks the Add button
  $(document).on("click", ".click_me", function (event) {

    event.preventDefault(); // prevents any default action associated with the button

    // The condition here checks if the quantity is not zero. This conditional will only allow the user to add an item to their order if the quantity of that item is greater than zero
    if (Number($(this).parent().children()[2].innerText) > 0) {

      const $price = (Number($($($(this).parent().parent().children()[0]).children()[1]).children()[0].innerText)); // extracts the price of the item from the menu text

      let item = []; // creates an array to store each item in. it will store its id, it's name, it's quantity and it's price

      // the below two lines grab the id of the menu item that is being added to the order
      let $quantityObject = $(this).parent().children()[2];
      let id = $($quantityObject).attr("id");

      // the four lines below push the id, the name of the menu item, the quantity and the price into the array
      item.push(id); // menu id
      item.push($($(this).parent().parent().children()[0]).children()[0].innerText); // name of menu item
      item.push(Number($(this).parent().children()[2].innerText)); // quantity of menu item
      item.push($price); // price of menu item

      totalCost += parseFloat($price) * parseFloat($(this).parent().children()[2].innerText); // updates total cost variable based on the selection

      $("#order_total").html(`<div>Order Total: $${totalCost.toFixed(2)}</div><br><br>`); // displays total cost on the page

      // displays selected menu items on the page
      $("#order_summary").append(
        `<div>
          <div>Menu Item: #<span>${item[0]}</span></div>
          <div><span>${item[1]}</span> x<span>${item[2]}</span></div>
          <div>Item Total: $<span>${Number(item[3]).toFixed(2)}</span></div>
          <br>
          <button class='remove'>Remove Item</button>
          <br>
          <br>
        </div>`
      );

      $(`#${id}`).html('0'); // resets the quantity count in the menu section on the page to 0
      quantities[id - 1] = 0; // resets the quantity array to zero
    };
  });

  // What happens when the user clicks on the Remove button
  $(document).on("click", ".remove", function (event) {

    event.preventDefault(); // prevents any default action associated with the button

    totalCost -= Number($($(this).parent().children()[2]).children()[0].innerText); // reduces the total cost variable

    $("#order_total").html(`Order Total: $${totalCost.toFixed(2)}<br><br>`); // updates the total cost on the page

    $(this).parent().remove(); //removes the item from the ordery summary on the page

  });

  // What happens when the user clicks the Place Order button
  $("#order-form").submit(function (event) {

    event.preventDefault(); // prevents any default action associated with the button

    // creates the object to store customer details from the form on the page, plus the items they are ordering
    let orderObject = {
      customerDetails: {},
      orderDetails: [],
    };

    const billingAddressArray = $($($(this).children()[0]).children()[0]).children(); // stores the form values from the billing address section in this array

    // this for loop pushes the values of the billingAddressArray into the orderObject
    for (const child of billingAddressArray) {

      // conditional to check if the 'child' has an id or not; if the 'child' has an id, the value of the child will be pushed into the orderObject
      if ($(child).attr("id")) {
        const $idHolder = $(child).attr("id"); // extracts the menu id
        orderObject.customerDetails[$idHolder] = $(child).val();
      }
    }

    const creditCardDetailsArray = $($($(this).children()[0]).children()[1]).children(); // stores the form values from the credit card section in this array

    for (const child of creditCardDetailsArray) {

      // conditional to check if the 'child' has an id or not; if the 'child' has an id, the value of the child will be pushed into the orderObject
      if ($(child).attr("id")) {
        const $idHolder = $(child).attr("id");
        orderObject.customerDetails[$idHolder] = $(child).val();
      }
    }

    // the lines below push order details into the orderObject; starts with a for loop to cycle through all the selected menu items
    for (let i = 1; i < $("#order_summary").children().length; i++) {
      let $item = $("#order_summary").children()[i]; // stores each child in a variable
      let item = {}; // creates an object for each selected menu item
      item.order_id = 0; // in the item object the order id is set to 0; the server/database will assign it a value
      item.menu_id = $($item).children()[0].children[0].innerText; // pushes the menu id of the selected menu item into the item object
      item.quantity = Number($($($item).children()[1]).children()[1].innerText); // pushes the quantity selected menu item in to the item object
      orderObject.orderDetails.push(item); // pushes the item object into the orderObject
    }

    // POST request to push the orderObject to the server, receive an newly created order id back, then for each select menu item in the order, run another POST request to push each selected menu item to the server
    $.post("/api/orders", orderObject, (data) => {
      for (const each of orderObject.orderDetails) {
        each.order_id = data.order_details.id;
        $.post("/api/order_items", each, (data) => {
          console.log(data);
        });
      }
      // remove some parts of the page
      $("#order_summary").remove();
      $("#display-menu").remove();
      $("#ready-to-pay-button").remove();
      $("#form-area").remove();

      // display order confirmation on the page
      $("body").append(`
      <div id="order-confirmation">
        <div>${data.order_details.name}! Your order has been sent!</div>
        <div>
        </div>
        <button id="order-again">Order Again</button>
        <a href="/${data.order_details.id}">Click here to track your order!</a>
      <div>
    `);
      //$.post("/api/send_sms"); // send an SMS to the restaurant owner and the person who ordered
    });
  });

  // AJAX get request to reload the page by clicking the order again button
  $(document).on("click", "#order-again", function (event) {
    $.ajax("/", { method: "GET" }).then(function (data) {
      location.reload();
    });
  });
});
