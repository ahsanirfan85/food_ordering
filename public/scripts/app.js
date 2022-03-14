// Client facing scripts here
$(document).ready(function () {
  const createMenuItem = function (item) {
    return `
    <div class="menu-wrapper">
      <div>
        
        <div class="name">${item.name}</div>
        <div class="description">${item.description}</div>
        <div class="price">$<span>${item.price / 100}</span></div>
      
      <div class="display-flex align-items-center">
        <button class="click_me mr-3">Add</button>
        <button class="add_quantity mr-3">+</button>
        <div class="mt-3 mr-3" id="${item.id}">0</div>
        <button class="red_quantity">-</button>
      </div>
      
      </div>  
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
    const $price = Number(
      $(this).parent().parent().children()[2].children[0].innerText
    );
    let item = [];
    let $quantityObject = $(this).parent().children()[2];
    let id = $($quantityObject).attr("id");
    item.push(id);
    item.push($(this).parent().parent().children()[0].innerText);
    item.push($(this).parent().parent().children()[1].innerText);
    item.push($(this).parent().children()[2].innerText);
    item.push($price);
    totalCost +=
      parseFloat($price) * parseFloat($(this).parent().children()[2].innerText);
    $("#order_total").html(`Order Total: ${totalCost}<br><br>`);
    $("#order_summary").append(
      `<div>
      <div>${item[0]}</div>
      <div>${item[1]}</div>
      <div>${item[2]}</div>
      <div>${item[3]}</div>
      <div>${item[4]}</div>
      <button class='remove'>Remove Item</button>
      </div>`
    );
    $(`#${id}`).html("0");
  });
  // What happens when the user clicks on the Remove button
  $(document).on("click", ".remove", function (event) {
    event.preventDefault();
    totalCost -=
      Number($(this).parent().children()[3].innerText) *
      Number($(this).parent().children()[4].innerText);
    $("#order_total").html(`Order Total: ${totalCost}<br><br>`);
    $(this).parent().remove();
  });
  // What happens when the user clicks the + button
  $(document).on("click", ".add_quantity", function (event) {
    event.preventDefault();
    console.log("TEST");
    let $idHolder = $(this).parent().children()[2];
    console.log($idHolder);
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
    console.log($idHolder);
    let i = Number($($idHolder).attr("id"));
    quantities[i - 1]--;
    $(this)
      .parent()
      .find(`#${i}`)
      .html(`${quantities[i - 1]}`);
  });
  $("#order-form").submit(function (event) {
    event.preventDefault();
    let orderObject = {
      customerDetails: {},
      orderDetails: [],
    };
    for (const child of $(this).children()) {
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
    `);
    });
  });
  $(document).on("click", "#order-again", function (event) {
    $.ajax("/", { method: "GET" }).then(function (data) {
      location.reload();
    });
  });
});
