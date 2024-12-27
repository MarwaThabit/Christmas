var favoriteProductsContainer=document.querySelector('section.favoriteProducts'),
    favoriteProductsArea=document.querySelector('section.favoriteProducts .favoriteProductsArea'),
    favoriteProducts=JSON.parse(localStorage.getItem('favoriteProducts')),
    bulletsContainer=document.querySelector('.bullets'),
    len=favoriteProducts.length,
    threshold;

    if(favoriteProducts){
    favoriteProductsContainer.style.display='block'
    favoriteProducts.forEach(item=>{
        favoriteProductsArea.innerHTML += `
        <section class="col-lg-4 col-md-6 p-xl-5 p-lg-4 p-md-5 me-0 me-lg-1 mb-lg-0 mb-5 item">
            <section class="card shadow bg-transparent p-3" style="height:395px">
                <img src="${item.image}" alt="${item.category}" class="card-img-top rounded-2" style="height:250px">
                <section class="card-body py-4 text-start px-0">
                    <h2>${item.category}</h2>
                    <section class="details d-flex justify-content-between align-items-center">
                        <p class="mb-0 me-2">${item.title}</p>
                        <i class="fa fa-heart fs-4" onclick="removeFromFavorite(${item.id})" style="color:#af0c0c;cursor:pointer"></i>
                    </section>
                </section>
            </section>
        </section>    `;
    })
}

function removeFromFavorite(id){
    var favProducts=favoriteProductsArea.querySelectorAll('.item')
    var index=favoriteProducts.findIndex(item=>item.id==id)
    favProducts[index].remove()
    favoriteProducts=favoriteProducts.filter(item=>item.id !=id)
    localStorage.setItem('favoriteProducts',JSON.stringify(favoriteProducts))
    len = favoriteProducts.length;
    handleBullets()
    favoriteProductsArea.style.transform='translateX(0vw)'
}
function move(event){
    var bullets = bulletsContainer.querySelectorAll('.bullet');
    bullets.forEach(bullet => bullet.style.background =(bullet==event.target)?'#af0c0c':'black');
    favoriteProductsArea.style.cssText = `transform:translateX(-${threshold * [].indexOf.call(bullets,event.target)}vw);transition:1.5s`;
}
function drawBullets(productsPerSet){
    bulletsContainer.innerHTML = "";
    var setsCount = Math.ceil(len / productsPerSet);
    for (var i = 0; i < setsCount; i++) {
        bulletsContainer.innerHTML += `<section class="bullet rounded-circle p-2" style="cursor:pointer;background:black" onclick="move(event)"></section>`;
    }
    var firstBullet = bulletsContainer.querySelector(".bullet");
    if (firstBullet) {
        firstBullet.style.background = "#af0c0c";
    }
}
function handleBullets() {
    if(window.innerWidth>1024){
        threshold=93.5
        drawBullets(3);
    }
    else if (window.innerWidth > 992 && window.innerWidth <=1024) {
        threshold=95.3
        drawBullets(3);
    } else if (window.innerWidth >= 768 && window.innerWidth<992) {
        threshold=96.5
        drawBullets(2);
    } else {
        bulletsContainer.innerHTML = "";
    }
}
handleBullets()
window.addEventListener("resize",handleBullets);