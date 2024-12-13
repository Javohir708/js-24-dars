const productWrapperEl = document.querySelector(".product__wrapper")

const BASE_URL = "https://dummyjson.com"

async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))

}

window.addEventListener("load", () => {
    fetchData("/products")    
})

function createCard (data) {  
    console.log(data);
      

    data.products.forEach(product => {
        const divEl = document.createElement("div")
        divEl.className = "product__card"
        divEl.innerHTML = `
            <div class="product__image">
                <img src="${product.thumbnail}" alt="product image">
            </div>
            <h2>${product.title}</h2>
            <p>${product.price}</p>
            <button class="product__btn">Buy now</button>
        `
        productWrapperEl.appendChild(divEl)
    });
}