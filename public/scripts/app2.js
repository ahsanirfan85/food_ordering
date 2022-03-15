$(document).ready(function() {
  orderId = $($('body').children()[0]).children()[1].innerText;
  console.log(orderId);

  const loadOrder = function(id) {
    $.ajax(`/api/orders/${id}`, { method: "GET" }).then(function (data) {
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

  loadOrder(orderId);
});
