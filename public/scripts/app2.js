$(document).ready(function() {
  orderId = $($('body').children()[0]).children()[1].innerText;
  console.log(orderId);

  const loadOrder = function(id) {
    $.ajax(`/api/orders/${id}`, { method: "GET" }).then(function (data) {
      for (const each of data.order) {
        console.log(each);
        $('#orders').append(`Item: ${each.description}<br>`);
        $('#orders').append(`Item Price: $ ${each.price / 100}<br>`);
        $('#orders').append(`Quantity: $ ${each.quantity}<br>`);
        $('#orders').append(`Cost: $ ${each.price / 100 * each.quantity}<br><br>`);
      }

      $('#orders').append(`Order Status: ${data.order[0].status}<br>`);

    });
  };

  loadOrder(orderId);
});
