var nav = document.querySelector("ul.navbar-nav"),
    userData = document.querySelector("section.userData"),
    username = document.querySelector("header>p"),
    productsArea = document.querySelector("section.products"),
    time,
    searchInput=document.querySelector('#search'),
    addedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [],
    cartArea = document.querySelector("section.cartArea"),
    cart = document.querySelector("section.cart"),
    showAllProducts = document.querySelector("section.cart button"),
    span = userData.querySelector("i span"),
    cartIcon = document.querySelector("section.cartTools i"),
    addedToFavorite = JSON.parse(localStorage.getItem("favoriteProducts")) || []

function searchProducts(){
    clearTimeout(time)
    time=setTimeout(()=>{
        var retrievedItems = [],inputValue=searchInput.value.toLowerCase().trim();
        productsArea.innerHTML=''
        var searchBy = document.querySelector('select option:checked').value;
        retrievedItems=(searchBy === "search by name")?products.filter(item => item.name.toLowerCase().includes(inputValue)):products.filter(item => item.category.toLowerCase().includes(inputValue))
        retrievedItems.forEach(displayProducts); 
    })
}
if (localStorage.getItem("fname") && localStorage.getItem('logged')) {
    nav.style.display = "none";
    userData.style.display = "flex";
    username.innerHTML = "Welcome " + localStorage.getItem("fname");
}
var products = [
    {id: 1,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments.webp",title: "Decoration bauble, glass red, 3.5cm",price: "EGP 199",Quantity: 1,},
    {id: 2,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments6.jpg",title: "Decoration bauble, glass red, 6cm",price: "EGP 399",Quantity: 1,},
    {id: 3,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments5.jpg",title: "Decoration bauble, set of 32",price: "EGP 299",Quantity: 1,},
    {id: 4,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments6.webp",title: "Decoration bauble, 3.5cm",price: "EGP 199",Quantity: 1,},
    {id: 5,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments7.webp",title: "Decoration bauble, 6cm",price: "EGP 399",Quantity: 1,},
    {id: 6,category: "VINTERFINT",name: "ornament",image: "Images/ornaments4.webp",title: "Tree ornament, set of 3 animals",price: "EGP 749",Quantity: 1,},
    {id: 7,category: "STRALA",name: "Lamp shade",image: "Images/strala4.webp",title: "Lamp shade, linen/beige, 70cm",price: "EGP 479",Quantity: 1,},
    {id: 8,category: "STRALA",name: "Lamp shade",image: "Images/strala8.avif",title: "Lamp shade, star red, 70cm",price: "EGP 99",Quantity: 1,},
    {id: 9,category: "STRALA",name: "Lamp shade",image: "Images/strala1.avif",title: "Lamp shade, leaf red, 48cm",price: "EGP 98",Quantity: 1,},
    {id: 10,category: "STRALA",name: "LED table decoration",image: "Images/strala5.avif",title: "LED table decoration, 16cm",price: "EGP 749",Quantity: 1,},
    {id: 11,category: "STRALA",name: "LED table lamp",image: "Images/strala3.avif",title: "LED table lamp, 28cm",price: "EGP 1,099",Quantity: 1,},
    {id: 12,category: "FROJDA",name: "LED table decoration",image: "Images/froejda.avif",title: "LED table decoration, 9x18cm",price: "EGP 799",Quantity: 1,},
    {id: 13,category: "VINTERFINT",name: "ornament",image: "Images/ornaments3.webp",title: "Tree ornament, bell-shaped",price: "EGP 329",Quantity: 1,},
    {id: 14,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments1.avif",title: "Garland bauble red, 2.2cm",price: "EGP 329",Quantity: 1,},
    {id: 15,category: "VINTERFINT",name: "Decoration bauble",image: "Images/ornaments2.avif",title: "Bauble glass, mixed colors, 3.5cm",price: "EGP 349",Quantity: 1,},
    {id: 16,category: "VINTERFINT",name: "Santa Claus",image: "Images/decoration.avif",title: "Decoration Santa Claus hat, 23cm",price: "EGP 179",Quantity: 1,},
    {id: 17,category: "VINTERFINT",name: "Santa Claus",image: "Images/decoration1.avif",title: "Decoration Santa Claus, 71cm",price: "EGP 399",Quantity: 1,},
    {id: 18,category: "VINTERFINT",name: "Santa Claus",image: "Images/decoration2.avif",title: "Decoration Santa Claus, 31cm",price: "EGP 329",Quantity: 1,},
];
function addProducts() {
    products.forEach(displayProducts);
}
function displayProducts(item){
    var product= addedProducts.filter(product=>product.id==item.id)
    var str=(product.length!=0)?"Remove from cart":"Add to cart"
    productsArea.innerHTML += `
    <section class="col-xl-4 col-lg-5 px-lg-4 item px-md-0 px-3 mb-5 col-md-5">
        <section class="card px-3 shadow-sm bg-transparent" style="height:500px;">
            <p class="d-none id">${item.id}</p>
            <img src="${item.image}" alt="${item.category}" class="card-img-top rounded-0 h-50">
            <section class="card-body py-4 px-2 px-md-0">
                <h2 class="text-black">${item.category}</h2>
                <p class="text-black">${item.title}</p>
                <p class="text-black fs-5 fw-semibold">${item.price}</p>
                <section class="itemActions d-flex justify-content-between align-items-center">
                    <button class="btn btn-lg text-white" onclick='updateCart(event,${item.id})'>${str}</button>
                    <i class="fa fa-heart fs-4" style="cursor:pointer" onclick="likeItOrNot(event,${item.id})"></i>
                </section>
            </section>
        </section>
    </section>`; 
}
addProducts();

function updateCart(event,id){
    cartArea.innerHTML != ""? addedProducts.find((item) => item.id == id)? deleteFromCart(id, event): addToCart(id, event): addToCart(id, event);
}
function goTo(url,duration){
    setTimeout(()=>{
        location.href=url
    },duration)
}
function showItemsInCart(item){
    cartArea.innerHTML += `
    <section class="item rounded d-flex align-items-center mb-3 bg-light gap-2 p-2">
        <p class="d-none id">${item.id}</p>
        <p class="w-50 mb-0">${item.title.split(",")[0]}</p>
        <section class="itemActions d-flex align-items-center gap-2 w-25 ms-auto">
            <span class="fs-5 fw-medium">${item.Quantity}</span>
            <i class="fa-solid fa-plus  text-success fs-6" style="cursor:pointer;" onclick="modifyQuantity(${item.id},event)"></i>
            <i class="fa-solid fa-minus text-danger  fs-6" style="cursor:pointer" onclick="modifyQuantity(${item.id},event)"></i>
        </section>
    </section>`;
} 
if (addedProducts) {
    addedProducts.forEach(showItemsInCart);
    span.innerHTML = addedProducts.length;
    cartStyle();
}
function deleteFromCart(id, event) {
    cartArea.querySelectorAll(".item").forEach(item => {
        if (item.querySelector('.id').textContent==id) {
            event.target.innerHTML = "Add to cart";
            removeItem(item,id)
        }
    });
}
function removeItem(item, id) {
    item.remove();
    deleteFromLocalStorage(id);
    span.innerHTML = cartArea.querySelectorAll(".item").length;
    if (cartArea.querySelectorAll(".item").length === 0) {
        cart.style.display = "none";
        cartIcon.style.transform = "rotateX(0deg)";
    }
}
function addToCart(id, event) {
    event.preventDefault();
    if (!localStorage.getItem("fname"))
        goTo('login.html',300)
    else {
        event.target.innerHTML=event.target.innerHTML == "Remove from cart"? "Add to cart": "Remove from cart";
        var selectedItem = products.find((item) => item.id == id);
        addedProducts = [...addedProducts, selectedItem];
        localStorage.setItem("selectedProducts", JSON.stringify(addedProducts));
        showItemsInCart(selectedItem)
        span.innerHTML = cartArea.querySelectorAll(".item").length;
        cartStyle();
    }
}
function modifyQuantity(id,event){
    var item=[].find.call( cartArea.querySelectorAll(".item"),product=>product.querySelector('.id').textContent==id)
    var quantitySpan = item.querySelector(".itemActions span");
    event.target.getAttribute('class').includes('fa-plus')?increaseQuantity(id,quantitySpan):decreaseQuantity(id,quantitySpan,item)
}
function increaseQuantity(id,quantitySpan){
    quantitySpan.innerHTML = +quantitySpan.textContent + 1;
    updateLocalStorage(+quantitySpan.textContent, id);
}
function decreaseQuantity(id,quantitySpan,item){
    if (+quantitySpan.textContent > 1) {
        quantitySpan.innerHTML = +quantitySpan.textContent - 1;
        updateLocalStorage(+quantitySpan.textContent,id);
    } else {
        var prod= [].find.call(productsArea.querySelectorAll(".item"),product=>product.querySelector('.id').textContent==id)
        prod.querySelector(".card .card-body .itemActions button").innerHTML = "Add to cart";
        removeItem(item,id)
    }
}
function cartStyle() {
    userData.style.position = "relative";
    cart.style.cssText = "width: 285px; backdrop-filter: blur(31px); background-color: #c5c5c52e; top: 55px;";
    cart.style.display=(cartArea.innerHTML!=''&&cartIcon.style.transform =="rotateX(180deg)")?'block':'none'
}
function updateLocalStorage(quantity, id) {
    var item = addedProducts.find((item) => item.id == id);
    if (item) {
        item.Quantity = quantity;
        localStorage.setItem("selectedProducts", JSON.stringify(addedProducts));
    }
}
function deleteFromLocalStorage(id) {
    updateLocalStorage(1,id)
    addedProducts = addedProducts.filter((item) => item.id != id);
    localStorage.setItem("selectedProducts", JSON.stringify(addedProducts));
}
cartIcon.addEventListener("click", function (event) {
    if (event.target === cartIcon && cartArea.innerHTML != "") {
            cart.style.display = cart.style.display=="block"? "none": "block"
            cartIcon.style.transform = cart.style.display=="block"? "rotateX(180deg)": "rotateX(0deg)"
    }
});
showAllProducts.addEventListener("click", () => {
    if (cartArea.innerHTML != "")
        goTo('selectedProducts.html',300)
});
if (addedToFavorite) {
    addedToFavorite.forEach((item) =>productsArea.querySelectorAll(".item")[item.id - 1].querySelector(".card .card-body .itemActions i").style.color = "#af0c0c");
}
function likeItOrNot(event,id){
    addedToFavorite.findIndex((item) => item.id == id) != -1? deleteFromFavorite(id, event): addToFavorite(id, event);
}
function addToFavorite(id, event) {
    event.preventDefault();
    if (!localStorage.getItem("fname"))
        goTo('login.html',300)
    else {
        event.target.style.color = "#af0c0c";
        addedToFavorite = [...addedToFavorite,products.find((item) => item.id == id)];
        localStorage.setItem("favoriteProducts", JSON.stringify(addedToFavorite));
    }
}
function deleteFromFavorite(id, event) {
    event.target.style.color = "#212529";
    addedToFavorite = addedToFavorite.filter((item) => item.id != id);
    localStorage.setItem("favoriteProducts", JSON.stringify(addedToFavorite));
}