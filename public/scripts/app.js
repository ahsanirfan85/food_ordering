// Client facing scripts here
$(document).ready(function(){
  const createMenuItem = function(item) {
    return `
      <div>
        <div class="name">${item.name}</div>
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
      `
  }

  let quantities = [];

  const renderMenu = function(input) {
    for (const menuItem of input.menu_items) {
      $('body').prepend(createMenuItem(menuItem));
      console.log(menuItem);
      quantities.push(0);
    }
    console.log(quantities);
  }

  const loadMenu = function() {
    $.ajax('/api/menu_items', {  method: 'GET' })
      .then(function(data) {
      console.log('Success: ', data);
        renderMenu(data);
    });
  }

  loadMenu();

  let totalCost = 0;
  // What happens when the user clicks the Add button
  $(document).on('click','.click_me', function(event) {
    event.preventDefault();
    const $price = Number($(this).parent().children()[2].innerText);
    let item = [];
    console.log($(this).parent().children());
    let $quantityObject = $(this).parent().children()[6];
    console.log($quantityObject);
    let id = $($quantityObject).attr('id');
    console.log(id);
    item.push($(this).parent().children()[0].innerText);
    item.push($(this).parent().children()[6].innerText);
    item.push($(this).parent().children()[2].innerText);
    totalCost += $price * Number($(this).parent().children()[6].innerText); 
    $('#order_total').html(`Order Total: ${totalCost}<br><br>`);
    $('#order_summary').append(`<div><div>${item[0]}</div><div>${item[1]}</div><div>${item[2]}</div><button class='remove'>Remove Item</button><br></div>`);
    $(`#${id}`).html('0');
  });
  // What happens when the user clicks on the Remove button
  $(document).on('click', '.remove', function(event) {
    event.preventDefault();
    console.log($(this).parent().children()[0].innerText);
    console.log($(this).parent().children()[1].innerText);
    console.log($(this).parent().children()[2].innerText);
    totalCost -= Number($(this).parent().children()[1].innerText) * Number($(this).parent().children()[2].innerText);
    console.log(totalCost);
    $('#order_total').html(`Order Total: ${totalCost}<br><br>`);
    $(this).parent().remove();
  });
  // What happens when the user clicks the + button
  $(document).on('click', '.add_quantity', function(event) {
    event.preventDefault();
    let $idHolder = $(this).parent().children()[6];
    let i = Number($($idHolder).attr('id'));
    console.log(i);
    quantities[i-1]++;
    $(this).parent().find(`#${i}`).html(`${quantities[i-1]}`);
  });
  // What happens when the user clicks the - button
  $(document).on('click', '.red_quantity', function(event) {
    event.preventDefault();
    let $idHolder = $(this).parent().children()[6];
    let i = Number($($idHolder).attr('id'));
    quantities[i-1]--;
    $(this).parent().find(`#${i}`).html(`${quantities[i-1]}`);
  });
});

/* NOTES

I think I need a global array that is available to all functions should they need it. This array will contain objects. Each object will represent each item on the menu. Data from this object will be available to all functions. All functions will be able to update quantities in these objects as well. So when you first make the ajax request, you should put the returned data into a global array of object. THEN only should you manipulate it for rendering to the page.

*/