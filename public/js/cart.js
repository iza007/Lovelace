
var shoppingCart = (function() {
    cart = [];
    
    // Constructor
    function Item(name, price, count, type) {
      this.name = name;
      this.price = price;
      this.count = count;
      this.type = type;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count, type) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count, type);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  

    return obj;
  })();
  
  // Add item
  $(".add-to-cart").click(function(event) {
    console.log("here");
    event.preventDefault();
    var type = $(this).data('type')
    var id = $(this).data('id');
    if(type === "room" )var uri = "/rooms/" + id
    else var uri = "/treatments/" + id
    fetch(uri).then(response => response.json())
    .then(data => {
      var name = data.name;
      var price = data.price;
      shoppingCart.addItemToCart(name, price, 1, type);
      displayCart();
    })
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
    // Delete item button
  
    $('.show-cart').on("click", ".delete-item", function(event) {
      var name = $(this).data('name')
      shoppingCart.removeItemFromCartAll(name);
      displayCart();
    })
   
    // Item count input
    $('.show-cart').on("change", ".item-count", function(event) {
       var name = $(this).data('name');
       var count = Number($(this).val());
      shoppingCart.setCountForItem(name, count);
      displayCart();
    });

    
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      if(cartArray[i].type === "room"){
        output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td><label for='from'>Select start date</label>"
        + "<input autocomplete='off' type='text' id='from' name='from'></td>"
        + "<td><label for='to'>Select end date</label>"
        + "<input autocomplete='off' type='text' id='to' name='to'></td>"
        + "<td><div class='input-group'>"
        + "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "PLN</td>" 
        +  "</tr>";
      }
      else{
        output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td><label for='from'>Select date</label>"
        + "<input autocomplete='off' type='date' id='date' name='date'></td>"
        + "<td><div class='input-group'>"
        + "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "PLN</td>" 
        +  "</tr>";
      }
      
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  
  displayCart();
  
  /*
  <label for="from">From</label>
<input type="text" id="from" name="from">
<label for="to">to</label>
<input type="text" id="to" name="to">
*/