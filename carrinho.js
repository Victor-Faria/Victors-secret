function initCart() {
  const total = parseFloat(localStorage.getItem("cartTotal")) || 0;
  $("#total-amount").text("R$ " + total.toFixed(2));

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.forEach((item) => {
      const size = item.size.split("-")[0];
      const cartItem = $("<li>")
          .addClass("cart-item")
          .append($("<img>").attr("src", item.imageUrl).addClass("item-image")) 
          .append($("<div>").html(`${item.name}<br>Tamanho: ${size}<br>R$ ${item.price.toFixed(2)}`).addClass("item-details"));
      $("#cart-items").append(cartItem);
  });

  updateCartCounter(cartItems.length);
}

$(document).ready(function () {
  initCart();
  updateCartCounter(JSON.parse(localStorage.getItem("cartItems")).length || 0);
});

$(".add-cart").click(function () {
  const card = $(this).closest(".card");
  const itemName = card.find(".name").text();
  const itemPrice = parseFloat(card.find(".price").text().replace("R$", "").trim());
  const itemSize = card.find(".select-size input:checked").attr("id").split("-")[0];
  const itemImage = card.find("img").attr("src");
  const newItem = { name: itemName, price: itemPrice, size: itemSize, imageUrl: itemImage };

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(newItem);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  const cartItem = $("<li>")
      .addClass("cart-item")
      .append($("<img>").attr("src", itemImage).addClass("item-image"))
      .append($("<div>").html(`${itemName}<br>Tamanho: ${itemSize}<br>R$ ${itemPrice.toFixed(2)}`).addClass("item-details"));
  $("#cart-items").append(cartItem);

  $("#cart-aside").addClass("show");
  updateTotal();
  updateCartCounter(cartItems.length);
});

function updateTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  $("#total-amount").text("R$ " + total.toFixed(2));
  localStorage.setItem("cartTotal", total);
}

function updateCartCounter(count) {
  $(".badge").text(count);
  if (count === 0) {
      $(".badge").hide();
  } else {
      $(".badge").show();
  }
}

$(".cart-btn").click(function () {
  if ($("#cart-aside").hasClass("visible")) {
      $("#cart-aside").animate({ right: "-400px" }).removeClass("visible");
  } else {
      $("#cart-aside").animate({ right: "20px" }).addClass("visible");
  }
});

$(".clear-cart-btn").click(function () {
  $("#cart-items").empty();
  $("#total-amount").text("R$ 0.00");
  localStorage.removeItem("cartTotal");
  localStorage.removeItem("cartItems");
  updateCartCounter(0);
});

$("#cart-items").on("click", ".cart-item", function () {
  const index = $(this).index();
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const removedItemPrice = cartItems[index].price;
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateTotal();
  updateCartCounter(cartItems.length);
  $(this).remove();
});

$(".select-size").hide();

$(".card").hover(
  function () {
      $(this).find(".select-size").show();
  },
  function () {
      $(this).find(".select-size").hide();
  }
);

$(".select-size").hover(
  function () {
      $(this).show();
  },
  function () {
      // Nothing needed here
  }
);

$(".select-size input").hover(
  function () {
      $(this).parent().show();
  }
);
