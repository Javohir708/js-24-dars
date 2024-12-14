const wrapperEl = document.querySelector(".hero__wrapper")
const loadingEl = document.querySelector(".loading")

const BASE_URL = "https://dummyjson.com"

async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
    .json()
    .then((res) => createCard(res))
    .finally(() => {
        loadingEl.style.display = 'none'
    })

}

window.addEventListener("load", () => {
    createLoading(8)
    fetchData("/users")    
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
      

    data.users.forEach(user => {
        const divEl = document.createElement("div")
        divEl.className = "hero__card"
        divEl.innerHTML = `
            <div class="hero__image">
                <img src="${user.image}" alt="users image">
            </div>
            <h2>${user.firstName} ${user.lastName}</h2>
            <p>age: ${user.age}</p>
            <strong>Phone: ${user.phone}</strong>
            <button class="hero__btn">Contact</button>
        `
        wrapperEl.appendChild(divEl)
    });
}