let productArr = [
  { id: 1, name: "Phoenix", price: 12000, img: "Images/img-1.jpg" },
  { id: 2, name: "Twinmos", price: 14000, img: "Images/img-2.jpg" },
  { id: 3, name: "Veloce", price: 15000, img: "Images/img-3.jpg" },
  { id: 4, name: "Duronto", price: 16000, img: "Images/img-4.jpg" },
  { id: 5, name: "Avon", price: 18000, img: "Images/img-5.jpg" },
  { id: 6, name: "Hero", price: 17000, img: "Images/img-6.jpg" },
];
if (!JSON.parse(localStorage.getItem("PROD"))) {
  localStorage.setItem("PROD", JSON.stringify(productArr));
}
let shop = document.getElementById("shop");
let generateProduct = () => {
  let prod1 = JSON.parse(localStorage.getItem("PROD"));
  return (shop.innerHTML = prod1
    .map((x) => {
      return `<div id=${x.id} class="item">
        <img width="300" height="250" src="${x.img}">
        <h3>${x.name}</h3>
        <p>${x.price} BDT</p>
        <button class="btnCart" onclick="addCart(${x.id})">Cart</button>
    </div>`;
    })
    .join(""));
};
generateProduct();
let cartArr = [];
if (JSON.parse(localStorage.getItem("CART")))
  cartArr = JSON.parse(localStorage.getItem("CART"));
let onLoad = () => {
  if (!JSON.parse(localStorage.getItem("CART")))
    document.getElementById("itemCount").innerHTML = "Cart 0";
  else {
    let arr2 = JSON.parse(localStorage.getItem("CART"));
    document.getElementById("itemCount").innerHTML = "Cart" + " " + arr2.length;
  }
};
onLoad();
let addCart = (id) => {
  cartArr.push(id);
  localStorage.setItem("CART", JSON.stringify(cartArr));
  onLoad();
};

function search() {
  let filter = document.getElementById("search").value.toUpperCase();
  let item = document.querySelectorAll(".item");
  let l = document.getElementsByTagName("h3");
  for (var i = 0; i <= l.length; i++) {
    let a = item[i].getElementsByTagName("h3")[0];
    let value = a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1) {
      item[i].style.display = "";
    } else {
      item[i].style.display = "none";
    }
  }
}
let submitProduct = async () => {
  let podName = document.getElementById("podName").value;
  let podPrice = document.getElementById("podPrice").value;
  let podImage = document.getElementById("podImage");
  if (!podName || !podPrice || !podImage.files[0]) {
    alert("Data Mismatch");
  }
  let prod = JSON.parse(localStorage.getItem("PROD"));

  var file = podImage.files[0];
  if (file) {
    var reader = new FileReader();
  }
  let item = {};
  var base64String;
  item["id"] = prod.length + 1;
  item["name"] = podName;
  item["price"] = podPrice;

  reader.onload = function (readerEvent) {
    try {
      base64String = readerEvent.target.result;
      item["img"] = base64String;
    } catch (e) {
      console.log(e);
    }
    prod.unshift(item);
    localStorage.setItem("PROD", JSON.stringify(prod));
    onLoad();
    generateProduct();
  };
  reader.readAsDataURL(file);
  document.getElementById("podName").value = "";
  document.getElementById("podPrice").value = "";
  document.getElementById("podImage").value = "";
};