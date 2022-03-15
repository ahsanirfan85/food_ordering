// Client facing scripts here
$(document).ready(function () {
  const createMenuItem = function (item) {
    return `
      <div>
        <div id="menu-item-name" class="name">${item.name}</div>
        <div class="description">${item.description}</div>
        <div class="price">${item.price / 100}</div>
        <button class="click_me">Add</button>
        <br>
        <button class="add_quantity">+</button>
        <div id="${item.id}">0</div>
        <button class="red_quantity">-</button>
        <br>
        <br>
      </div>
      `;
  };

  let quantities = [];

  const renderMenu = function (input) {
    for (const menuItem of input.menu_items) {
      $("#display-menu").append(createMenuItem(menuItem));
      quantities.push(0);
    }
  };

  const loadMenu = function () {
    $.ajax("/api/menu_items", { method: "GET" }).then(function (data) {
      renderMenu(data);
    });
  };

  loadMenu();

  let totalCost = 0;
  // What happens when the user clicks the Add button
  $(document).on("click", ".click_me", function (event) {
    event.preventDefault();
    const $price = Number($(this).parent().children()[2].innerText);
    let item = [];
    let $quantityObject = $(this).parent().children()[6];
    let id = $($quantityObject).attr("id");
    item.push(id);
    item.push($(this).parent().children()[0].innerText);
    item.push($(this).parent().children()[6].innerText);
    item.push($(this).parent().children()[2].innerText);
    totalCost += $price * Number($(this).parent().children()[6].innerText);
    $("#order_total").html(`Order Total: ${totalCost}<br><br>`);
    $("#order_summary").append(
      `<div><div>${item[0]}</div><div>${item[1]}</div><div>${item[2]}</div><div>${item[3]}</div><button class='remove'>Remove Item</button><br></div>`
    );
    $(`#${id}`).html("0");
  });
  // What happens when the user clicks on the Remove button
  $(document).on("click", ".remove", function (event) {
    event.preventDefault();
    totalCost -=
      Number($(this).parent().children()[1].innerText) *
      Number($(this).parent().children()[2].innerText);
    $("#order_total").html(`Order Total: ${totalCost}<br><br>`);
    $(this).parent().remove();
  });
  // What happens when the user clicks the + button
  $(document).on("click", ".add_quantity", function (event) {
    event.preventDefault();
    let $idHolder = $(this).parent().children()[6];
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
    let $idHolder = $(this).parent().children()[6];
    let i = Number($($idHolder).attr("id"));
    quantities[i - 1]--;
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
    console.log(billingAddressArray);
    for (const child of billingAddressArray) {
      if ($(child).attr("id")) {
        const $idHolder = $(child).attr("id");
        orderObject.customerDetails[$idHolder] = $(child).val();
      }
    }
    const creditCardDetailsArray = $($($(this).children()[0]).children()[1]).children();
    console.log(creditCardDetailsArray);
    for (const child of creditCardDetailsArray) {
      if ($(child).attr("id")) {
        const $idHolder = $(child).attr("id");
        orderObject.customerDetails[$idHolder] = $(child).val();
      }
    }
    console.log(orderObject.customerDetails);
    console.log($("#order_summary").children()[1]);
    for (let i = 1; i < $("#order_summary").children().length; i++) {
      let $item = $("#order_summary").children()[i];
      let item = {};
      item.order_id = 0;
      item.menu_id = $($item).children()[0].innerText;
      item.quantity = $($item).children()[2].innerText;
      orderObject.orderDetails.push(item);
    }
    $.post("/api/orders", orderObject, (data) => {
      console.log(data);
      console.log(data.order_details.id);
      console.log(orderObject.orderDetails);
      for (const each of orderObject.orderDetails) {
        each.order_id = data.order_details.id;
        $.post("/api/order_items", each, (data) => {
          console.log(data);
        });
      }
      $("body").empty();
      $("body").append(`
    <div>${data.order_details.name}! Your order has been sent!</div>
    <br>
    <button id="order-again">Order Again</button>
    <a href="/${data.order_details.id}">Click here to track your order!</a>
    `);
      $.post("/api/send_sms");
    });
  });
  $(document).on("click", "#order-again", function (event) {
    $.ajax("/", { method: "GET" }).then(function (data) {
      location.reload();
    });
  });
});
