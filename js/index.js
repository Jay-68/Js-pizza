//business logic
function Order() {
  this.total = 0;
  this.pizzas = 0;
}

function Pizza(pizzaName, pizzaSize, toppings, premiumToppings, crust) {
  this.pizzaName = pizzaName;
  this.pizzaSize = pizzaSize;
  this.toppings = toppings;
  this.toppingnum = this.toppings.length
  this.premiumToppings = premiumToppings;
  this.premiumnum = this.premiumToppings.length
  this.crust = crust;
}

Pizza.prototype.price = function () {
  let pizzaPrice = 0;
  let sizePrice = 0;
  let toppingPrice = 0;
  let crustPrice = 0;
  if (this.pizzaSize === "Small") {
    sizePrice = 1200;
  } else if (this.pizzaSize === "Medium") {
    sizePrice = 1400;
  } else if (this.pizzaSize === "Large") {
    sizePrice = 1800;
  } else { }
  if (this.pizzaSize === "Small" || this.pizzaSize === "Medium") {
    toppingPrice = this.toppingnum * 100 + this.premiumnum * 200;
  } else if (this.pizzaSize === "Large") {
    toppingPrice = this.toppingnum * 150 + this.premiumnum * 300;
  } else { }
  if (this.crust === "Classic") {

  } else {
    crustPrice = 200;
  }
  pizzaPrice = sizePrice + toppingPrice + crustPrice;
  return pizzaPrice;
}

// User Interface logic
let getToppings = function () {
  let allToppings = [];
  $(".regular:checked").each(function () {
    allToppings.push($(this).val());
  })
  return allToppings;
}

let getPremium = function () {
  let allPremium = [];
  $(".premium:checked").each(function () {
    allPremium.push($(this).val());
  })
  return allPremium;
}

let arrayToString = function (array) {
  let outputString = "";
  array.forEach(function (element) {
    outputString += element + ", "
  });
  outputString = outputString.slice(0, -2);
  return outputString;
}

let newOrder = new Order();
$("form#orderform").submit(function (event) {
  event.preventDefault();
  let name = $("input#pizza-name").val();
  let size = $('input:radio[name="sizeradio"]:checked').val();
  let toppings = getToppings();
  let premium = getPremium();
  let crust = $('input:radio[name="crustradio"]:checked').val();

  if (name === "") {
    alert("Please enter your name")
    return;
  } else {
    let newPizza = new Pizza(name, size, toppings, premium, crust);
    newOrder.total += newPizza.price();
    newOrder.pizzas += 1;

    $("ul#pizzas").append("<li class='pizza'><span>" + newPizza.pizzaName + " - Ksh." + newPizza.price().toFixed(2) + "</span></li>");
    $(".pizza").last().click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      $("#show-pizza").show();
      $(".pizza-size").text(newPizza.pizzaSize);
      $(".toppings-list").text(arrayToString(newPizza.toppings));
      $(".premium-list").text(arrayToString(newPizza.premiumToppings));
      $(".pizza-crust").text(newPizza.crust + " Crust");
      $(".pizza-price").text("Ksh." + newPizza.price().toFixed(2));
    });
    $(".order-count").text(newOrder.pizzas);
    $(".order-total").text("Ksh." + newOrder.total.toFixed(2));
    $("input#pizza-name").val("");
    $("input.regular").attr('checked', false);
    $("input.premium").attr('checked', false);
  }
});

$("#pizza-remove").click(function () {
  $(".active").remove();
  newOrder.pizzas -= 1;
  newOrder.total -= parseFloat($(".pizza-price").text().slice(1));
  $(".order-count").text(newOrder.pizzas);
  $(".order-total").text("Ksh." + newOrder.total.toFixed(2));
  $("#show-pizza").hide();
});
