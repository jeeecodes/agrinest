let allProducts = [];

fetch("http://127.0.0.1:5000/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(data);
  });

function displayProducts(products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="category-card">
        <h3>${p.name}</h3>
        <p>₹${p.price} / kg</p>
        <p><b>Farmer:</b> ${p.farmer}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function filterCategory(cat) {
  if (cat === "all") {
    displayProducts(allProducts);
  } else {
    displayProducts(allProducts.filter(p => p.category === cat));
  }
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
