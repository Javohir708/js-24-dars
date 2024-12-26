const productWrapperEl = document.querySelector(".product__wrapper")


function createCard () {  
    const data = JSON.parse(localStorage.getItem("wishlist")) || []
    
    let fragment = document.createDocumentFragment()
    data.forEach(product => {
        const divEl = document.createElement("div")
        divEl.className = "product__card"
        divEl.dataset.id = product.id
        divEl.innerHTML = `
            <div class="product__image">
                <img src="${product.thumbnail}" alt="product image">
            </div>
            <h2 title="${product.title}">${product.title}</h2>
            <p>${product.price}</p>
            <button class="product__btn">Buy now</button>
            <button name="like-btn" class="wishlist">Delete</button>

        `
        fragment.appendChild(divEl)
    });
    productWrapperEl.appendChild(fragment)
}


window.onload = () => {
    createCard()
}