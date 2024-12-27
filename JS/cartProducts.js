var cartProducts=document.querySelector('section.cartProducts'),
    products=JSON.parse(localStorage.getItem('selectedProducts')),
    totalPrice=0

products.forEach(item => {
    cartProducts.innerHTML += `
        <section class="col-lg-6  col-md-5 p-xl-5 p-lg-4 p-md-0 p-1 mb-5 mb-lg-0 item">
            <section class="card shadow bg-transparent flex-lg-row gap-xl-4 gap-lg-1 py-3 px-1 p-lg-0">
                <img src="${item.image}" alt="${item.category}" class="card-img-top rounded-0 rounded-start w-50">
                <section class="card-body py-lg-5 ">
                    <h2 class="text-black">${item.category}</h2>
                    <p class="text-black mb-2 mb-lg-3">${item.title}</p>
                    <p class="fs-5 fw-semibold text-black mb-2 mb-lg-3">${item.price}</p>
                    <section class="itemActions d-flex align-items-center justify-content-between gap-2">
                        <span class="fs-5 fw-medium text-black">${item.Quantity}</span>
                        <i class="fa-solid fa-plus text-success fs-6" onclick="modifyQuantity(${item.id},event)" style="cursor:pointer"></i>
                        <i class="fa-solid fa-minus text-danger fs-6" onclick="modifyQuantity(${item.id},event)" style="cursor:pointer" ></i>
                        <button class="btn btn-lg text-white" onclick="deleteItem(${item.id})">Remove</button>
                    </section>
                </section>
            </section>
        </section>    
    `
});
cartProducts.innerHTML+=`<p class="total-price text-center fw-bold fs-3 text-black my-5"></p>`
var priceText=cartProducts.querySelector('p.total-price')
cartProducts.querySelectorAll('.item').forEach(item=>{
    var price= +item.querySelector(".card-body p:nth-child(3)").textContent.split("EGP ")[1].split(",").join("")
    var quantity=item.querySelector(".card-body .itemActions span")
    totalPrice+=price * +quantity.textContent
})
priceText.innerHTML=`Total price : ${totalPrice} EGP`
function getProductInfo(id){
    var Products=document.querySelectorAll('section.cartProducts>section')
    var productIndex=products.findIndex(item=>item.id==id)
    var quantitySpan = Products[productIndex].querySelector(".itemActions span");
    return [Products,productIndex,quantitySpan]
}
function deleteItem(id){ 
    var [Products,productIndex,quantitySpan]=getProductInfo(id)
    Products[productIndex].remove()
    totalPrice-= +Products[productIndex].querySelector(".card-body p:nth-child(3)").textContent.split("EGP ")[1].split(",").join("") * +quantitySpan.textContent
    priceText.innerHTML=`Total price : ${totalPrice} EGP`
    products=products.filter(item=>item.id!=id)
    localStorage.setItem('selectedProducts',JSON.stringify(products))
}
function modifyQuantity (id,event){
    var [Products,productIndex,quantitySpan]=getProductInfo(id)
    if(event.target.getAttribute('class').includes('fa-plus'))
        addQuantity(Products,productIndex,quantitySpan,id)
    else
        removeQuantity(Products,productIndex,quantitySpan,id)
}
function addQuantity(Products,productId,quantitySpan,id){
    quantitySpan.innerHTML = +quantitySpan.textContent + 1;
    totalPrice+= +Products[productId].querySelector(".card-body p:nth-child(3)").textContent.split("EGP ")[1].split(",").join("")
    priceText.innerHTML=`Total price : ${totalPrice} EGP`
    updateLocalStorage(+quantitySpan.textContent,id)
}
function removeQuantity(Products,productId,quantitySpan,id){
    totalPrice-=+Products[productId].querySelector(".card-body p:nth-child(3)").textContent.split("EGP ")[1].split(",").join("")
    priceText.innerHTML=`Total price : ${totalPrice} EGP`
    if (+quantitySpan.textContent > 1) {
        quantitySpan.innerHTML = +quantitySpan.textContent - 1;
        updateLocalStorage(+quantitySpan.textContent,id)
    } else {
        Products[productId].remove();
        deleteFromLocalStorage(id)
    }
}
function updateLocalStorage(quantity, id) {
    var item = products.find(item => item.id == id);
    if (item) {
        item.Quantity = quantity;
        localStorage.setItem('selectedProducts', JSON.stringify(products));
    }
}
function deleteFromLocalStorage(id) {
    products = products.filter(item => item.id != id);
    localStorage.setItem('selectedProducts', JSON.stringify(products));
}