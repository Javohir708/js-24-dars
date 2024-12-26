const productWrapperEl = document.querySelector(".product__wrapper")
const loadingEl = document.querySelector(".loading")
const collectionEl = document.querySelector(".collection")
const btnseeMoreEl = document.querySelector(".btn_seemore")


const BASE_URL = "https://dummyjson.com"

const perPageCount = 8
let productEndpoint = "/products"
let data = []

async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
    .json()
    .then((res) => { createCard(res)
        data = [...data, ...res.products]
        if (res.total <= perPageCount + (offset * perPageCount)){
            btnseeMoreEl.style.display = 'none'
        } else {
            btnseeMoreEl.style.display = 'block'
        }
    })
    .catch((err) => console.log(err))
    .finally(() => {
        loadingEl.style.display = 'none'
    })
}

window.addEventListener("load", () => {
    collectionEl.style.display = 'none'
    createLoading(8)
    fetchData(`${productEndpoint}?limit=${perPageCount}`)    
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
    // console.log(data);
      
    let fragment = document.createDocumentFragment()
    data.products.forEach(product => {
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
            <button name="like-btn" class="wishlist">Add</button>

        `
        fragment.appendChild(divEl)
    });
    productWrapperEl.appendChild(fragment)
}

async function fetchCategory(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response 
        .json()
        .then(res => {
            createCategory(res)
        })
        .catch()
        .finally(() => {
            collectionEl.style.display = 'flex'
        })
}

function createCategory (data) {
    ["all", ...data].forEach((category) => {
        const listEl = document.createElement("li")
        listEl.className = category === "all" ? "item active__category" : "item"
        listEl.dataset.category = category === "all" ? "/products" : `/products/category/${category}`
        listEl.textContent = category
        collectionEl.appendChild(listEl)
        listEl.addEventListener("click", (e) => {
            let endpoint = e.target.dataset.category
            productEndpoint = endpoint

            offset = 0
            productWrapperEl.innerHTML = null
            fetchData(`${endpoint}?limit=${perPageCount}`)    
            document.querySelectorAll(".collection .item").forEach((i) => {
                i.classList.remove("active__category")
            })
            e.target.classList.add("active__category")
        })
    })
}

let offset = 0
btnseeMoreEl.addEventListener("click", () => {
    offset++
    window.scrollTo(0, document.documentElement.scrollHeight)   
    fetchData(`${productEndpoint}?limit=8&skip=${(offset) * 8}`)
})

productWrapperEl.addEventListener("click", e => {
    let element = e.target
    let id = element.closest(".product__card").dataset.id
    if (element.name === "like-btn") {
        const wish = data.find(item => item.id === +id)
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
        let index = wishlist.findIndex(item => item.id === +id)
        if (index < 0) {
            localStorage.setItem("wishlist", JSON.stringify([...wishlist, wish]))
        }
        
    }
});
