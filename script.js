

class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class Cart {
  constructor() {
    this.cartItems = [];
  }

  addToCart(product) {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.saveCart();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.saveCart();
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotalQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      this.cartItems = cartItems;
    }
  }
}

// Функція для створення HTML елемента товару у кошику
function createCartItemElement(item) {
  return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} грн x ${item.quantity}</div>
            </div>
            <button class="remove-from-cart" data-id="${item.id}">Видалити</button>
        </div>
    `;
}

function updateCartView(cart) {
  const cartTotalElement = document.getElementById("cart-total");
  const cartListElement = document.getElementById("cart-list");

  const totalQuantity = cart.getTotalQuantity();
  const totalPrice = cart.getTotalPrice();

  cartTotalElement.textContent = `Кошик (${totalQuantity} товар${getEnding(
    totalQuantity
  )}, ${totalPrice} грн)`;

  let cartListHTML = "";
  cart.cartItems.forEach((item) => {
    cartListHTML += createCartItemElement(item);
  });

  cartListElement.innerHTML = cartListHTML;

  // Додаємо обробник події для кожної кнопки "Видалити"
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.dataset.id);
      cart.removeFromCart(productId);
      updateCartView(cart);
    });
  });
}

// Функція для визначення правильного закінчення слова "товар" в залежності від числа
function getEnding(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "";
  } else if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20)
  ) {
    return "а";
  } else {
    return "ів";
  }
}

// Зразок даних про товари
const products = [
  new Product(1, "Яблука", 37, "img/product1.jpg"),
  new Product(2, "Ананас", 120, "img/product2.jpg"),
  new Product(3, "Ківі", 110, "img/product3.jpg"),
  new Product(4, "Апельсин", 55, "img/product4.jpg"),
  new Product(5, "Банан", 40, "img/product5.jpg"),
  new Product(6, "Груші", 80, "img/product6.jpg"),
  new Product(7, "Манго", 200, "img/product7.jpg"),
  new Product(8, "Кавун", 18, "img/product8.jpg"),
  new Product(9, "Слива", 20, "img/product9.jpg"),
  new Product(10, "Лимон", 65, "img/product10.jpg"),
  new Product(11, "Виноград", 70, "img/product11.jpg"),
  new Product(12, "Полуниця", 70, "img/product12.jpg"),
];

document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();
  cart.loadCart();
  updateCartView(cart);

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
  const clearCartButton = document.getElementById("clear-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.dataset.id);
      const product = products.find((item) => item.id === productId);
      cart.addToCart(product);
      updateCartView(cart);
    });
  });

  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.dataset.id);
      cart.removeFromCart(productId);
      updateCartView(cart);
    });
  });

  clearCartButton.addEventListener("click", () => {
    cart.clearCart();
    updateCartView(cart);
  });
});


function updateCartView(cart) {
  const cartTotalElement = document.getElementById("cart-total");
  const cartListElement = document.getElementById("cart-list");
  const clearCartButton = document.getElementById("clear-cart");

  const totalQuantity = cart.getTotalQuantity();
  const totalPrice = cart.getTotalPrice();

  cartTotalElement.textContent = `Кошик (${totalQuantity} товар${getEnding(
    totalQuantity
  )}, ${totalPrice} грн)`;

  let cartListHTML = "";
  cart.cartItems.forEach((item) => {
    cartListHTML += createCartItemElement(item);
  });

  cartListElement.innerHTML = cartListHTML;

  // Додаємо обробник події для кожної кнопки "Видалити"
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.dataset.id);
      cart.removeFromCart(productId);
      updateCartView(cart);
    });
  });

  // Перевірка, чи корзина порожня, і зміна стилю кнопки "Очистити"
  if (cart.cartItems.length === 0) {
    clearCartButton.style.display = "none";
  } else {
    clearCartButton.style.display = "block";
  }
}