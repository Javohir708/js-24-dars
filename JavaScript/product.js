const productWrapperEl = document.querySelector(".product__wrapper")
const loadingEl = document.querySelector(".loading")
const collectionEl = document.querySelector(".collection")


const BASE_URL = "https://dummyjson.com"

async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
        loadingEl.style.display = 'none'
    })
}

window.addEventListener("load", () => {
    createLoading(8)
    fetchData("/products")    
    fetchCategory("/products/category-list")
})

function createLoading (n) {
    Array(n).fill().forEach(() => {
        const div = document.createElement('div')
        
        div.className = 'loading__item'
        div.innerHTML = `
            <div class="loading__image to-left"></div>
            <div class="loading__fullname to-left"></div>
            <div class="loading__age to-left"></div>
        `
        loadingEl.appendChild(div)
    })
}

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

async function fetchCategory(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response 
        .json()
        .then(res => {
            createCategory(res);
     })
}

function createCategory (data) {
    data.forEach((category) => {
        const listEl = document.createElement("li")
        listEl.className = "item"
        listEl.textContent = category
        collectionEl.appendChild(listEl)
    })
}