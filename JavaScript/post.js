const posttWrapperEl = document.querySelector(".post_wrapper")

const BASE_URL = "https://dummyjson.com"

async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))

}

window.addEventListener("load", () => {
    fetchData("/posts")    
})

function createCard (data) {  
    console.log(data);
      

    data.posts.forEach(post => {
        const divEl = document.createElement("div")
        divEl.className = "post__card"
        divEl.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <strong><i class="fa-solid fa-thumbs-up" style="color: #000000;"></i> ${post.reactions.likes},</strong>
            <strong><i class="fa-solid fa-thumbs-down" style="color: #000000;"></i> ${post.reactions.dislikes},</strong>
            <strong><i class="fa-solid fa-eye" style="color: #000000;"></i> ${post.views}</strong>
        `
        posttWrapperEl.appendChild(divEl)
    });
}