function initCheckout() {
  const total = parseFloat(localStorage.getItem("cartTotal")) || 0;
  $("#total-amount-footer").text("R$ " + total.toFixed(2));
  $("#total-amount-span").text("Total R$ " + total.toFixed(2));

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.forEach((item, index) => {
      const size = item.size.split("-")[0];
      const row = $("<tr>")
          .append($("<td>").append($("<img>").attr("src", item.imageUrl).addClass("item-image"))) // Adicionar a coluna da foto do produto
          .append($("<td>").text(item.name))
          .append($("<td>").text(size))
          .append($("<td>").text("R$ " + item.price.toFixed(2)))
          .append($("<td>").append($("<span>").text("X").addClass("remove-btn").data("index", index)));
      $("#checkout-table tbody").append(row);
  });

  updateCartCounter(cartItems.length);
}

function updateTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  $("#total-amount-footer").text("R$ " + total.toFixed(2));
  $("#total-amount-span").text("Total R$ " + total.toFixed(2));
  localStorage.setItem("cartTotal", total);
}

$("#checkout-table").on("click", ".remove-btn", function() {
  const index = $(this).data("index");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  $(this).closest("tr").remove();
  updateTotal();
  updateCartCounter(cartItems.length);
});

function updateCartCounter(count) {
  $(".badge").text(count);
  if (count === 0) {
      $(".badge").hide();
  } else {
      $(".badge").show();
  }
}

$(".finalize-purchase").click(function() {
  $('.progress-bar').show();
  if (!progressInterval) {
      progressInterval = setInterval(advanceProgress, 1200);
  }
});


  initCheckout();



$("#credito").change(function() {
  if (this.checked) {
      $("#debito").prop("checked", false);
  }
});

$("#debito").change(function() {
  if (this.checked) {
      $("#credito").prop("checked", false);
  }
});

$("#presenteN").change(function() {
  if (this.checked) {
      $("#presenteS").prop("checked", false);
  }
});

$("#presenteS").change(function() {
  if (this.checked) {
      $("#presenteN").prop("checked", false);
  }
});

function applyDarkMode(isDark) {
  var root = $(':root');
  if (isDark) {
      root.css('--main-color', 'black');
      root.css('--secondary-color', '#c2c2c2');
      root.css('--main-container', 'rgba(194, 194, 194)');
      root.css('--text-color', '#c2c2c2');
  } else {
      root.css('--main-color', '#c2c2c2');
      root.css('--secondary-color', 'black');
      root.css('--main-container', 'rgba(0, 0, 0, 0.5)');
      root.css('--text-color', 'black');
  }
}

var isDarkMode = localStorage.getItem('darkMode') === 'true';
applyDarkMode(isDarkMode);

$('.light-dark').on("click", function() {
  isDarkMode = !isDarkMode;
  applyDarkMode(isDarkMode);
  localStorage.setItem('darkMode', isDarkMode);
});
