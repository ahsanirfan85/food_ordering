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
      $("#display-menu").append(createMenuItem(menuItem));
      quantities.push(0);
    }
  };

  // This function makes the AJAX request that gets the menu items from the database. It then calls the previous function to render the menu.
  const loadMenu = function () {
    $.ajax("/api/menu_items", { method: "GET" }).then(function (data) {
      renderMenu(data);
    });
  };

  loadMenu(); // The previous function is invokved here to begin the process of calling the menu items from the database and rendering them in the browser

  let totalCost = 0; // This variable stores the total cost of the order made by the user

  // What happens when the user clicks the Add button
  $(document).on("click", ".click_me", function (event) {

    event.preventDefault(); // prevents any default action associated with the button

    // The condition here checks if the quantity is not zero. This conditional will only allow the user to add an item to their order if the quantity of that item is greater than zero
    if (Number($(this).parent().children()[2].innerText) > 0) {
      const $price = (Number($($($(this).parent().parent().children()[0]).children()[1]).children()[0].innerText)); // extracts the price of the item from the menu text

      let item = []; // creates an array to store each item in. it will store its id, it's name, it's quantity and it's price
      let $quantityObject = $(this).parent().children()[2]; // extracts the DOM object that stores the quantity and the menu id from the menu
      let id = $($quantityObject).attr("id"); // extracts the menu id from the DOM object extracted above

      item.push(id); // pushes the menu id into the item array
      item.push($($(this).parent().parent().children()[0]).children()[0].innerText); // extracts the name of the item from the menu and pushes
      item.push(Number($(this).parent().children()[2].innerText));
      item.push($price);
      totalCost +=
        parseFloat($price) * parseFloat($(this).parent().children()[2].innerText);
      $("#order_total").html(`<div>Order Total: $${totalCost.toFixed(2)}</div><br><br>`);
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
      $(`#${id}`).html('0');
      quantities[id - 1] = 0;
    };
  });
  // What happens when the user clicks on the Remove button
  $(document).on("click", ".remove", function (event) {
    event.preventDefault();
    console.log(Number($($(this).parent().children()[2]).children()[0].innerText));
    totalCost -= Number($($(this).parent().children()[2]).children()[0].innerText);
    $("#order_total").html(`Order Total: $${totalCost.toFixed(2)}<br><br>`);
    $(this).parent().remove();
  });
  // What happens when the user clicks the + button
  $(document).on("click", ".add_quantity", function (event) {
    event.preventDefault();
    let $idHolder = $(this).parent().children()[2];
    let i = Number($($idHolder).attr("id"));
    quantities[i - 1]++;
    $(this)
      .parent()
      .find(`#${i}`)
      .html(`${quantities[i - 1]}`);
  });
  // What happens when the user clicks the - button
  $(document).on("click", ".red_quantity", function (event) {
    event.preventDefault();
    let $idHolder = $(this).parent().children()[2];
    let i = Number($($idHolder).attr("id"));
    if (quantities[i - 1] !== 0) {
      quantities[i - 1]--;
    }
    $(this)
      .parent()
      .find(`#${i}`)
      .html(`${quantities[i - 1]}`);
  });
  // What happens when the user clicks the Place Order button
  $("#order-form").submit(function (event) {
    event.preventDefault();
    let orderObject = {
      customerDetails: {},
      orderDetails: [],
    };
    const billingAddressArray = $($($(this).children()[0]).children()[0]).children();
    for (const child of billingAddressArray) {
      if ($(child).attr("id")) {
        const $idHolder = $(child).attr("id");
        orderObject.customerDetails[$idHolder] = $(child).val();
      }
    }
    const creditCardDetailsArray = $($($(this).children()[0]).children()[1]).children();
    for (const child of creditCardDetailsArray) {
      if ($(child).attr("id")) {
        const $idHolder = $(child).attr("id");
        orderObject.customerDetails[$idHolder] = $(child).val();
      }
    }
    for (let i = 1; i < $("#order_summary").children().length; i++) {
      let $item = $("#order_summary").children()[i];
      let item = {};
      item.order_id = 0;
      item.menu_id = $($item).children()[0].children[0].innerText;
      item.quantity = Number($($($item).children()[1]).children()[1].innerText);
      orderObject.orderDetails.push(item);
    }
    console.log(orderObject);
    $.post("/api/orders", orderObject, (data) => {
      for (const each of orderObject.orderDetails) {
        each.order_id = data.order_details.id;
        $.post("/api/order_items", each, (data) => {
          console.log(data);
        });
      }
      $("#order_summary").remove();
      $("#display-menu").remove();
      $("#ready-to-pay-button").remove();
      $("#form-area").remove();
      $("body").append(`
      <div id="order-confirmation">
        <div>${data.order_details.name}! Your order has been sent!</div>
        <div>
        </div>
        <button id="order-again">Order Again</button>
        <a href="/${data.order_details.id}">Click here to track your order!</a>
      <div>
    `);
      //$.post("/api/send_sms");
    });
  });
  $(document).on("click", "#order-again", function (event) {
    $.ajax("/", { method: "GET" }).then(function (data) {
      location.reload();
    });
  });
});
