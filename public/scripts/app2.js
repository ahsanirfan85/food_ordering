// JS script for the order status page

$(document).ready(function() {

  orderId = $($('body').children()[0]).children()[1].innerText; // grabs order id that is displayed on the page

  // function that makes a GET request from the server to pull the order details of the order displayed on the page
  const loadOrder = function(id) {
    $.ajax(`/api/orders/${id}`, { method: "GET" }).then(function (data) {

      // for loop that cycles through the multipl selected order items that come back
      for (const each of data.order) {
        console.log(each);
        $('body').append(`Item: ${each.description}<br>`);
        $('body').append(`Item Price: $ ${each.price / 100}<br>`);
        $('body').append(`Quantity: $ ${each.quantity}<br>`);
        $('body').append(`Cost: $ ${each.price / 100 * each.quantity}<br><br>`);
      }

      $('body').append(`Order Status: ${data.order[0].status}<br>`);

    });
  };

  loadOrder(orderId); // the previous function invoked
});
