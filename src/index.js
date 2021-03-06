// write your code here
const spiceUrl = 'http://localhost:3000/spiceblends'
const ingredientsUrl = 'http://localhost:3000/ingredients'
const detail = document.querySelector("#spice-blend-detail")
const list = document.querySelector(".ingredients-list")
const titleForm = document.querySelector("#update-form")
const ingredientForm = document.querySelector("#ingredient-form")

// DELIVERABLE #1
fetch((spiceUrl) + "/1")
    .then(response => response.json())
    .then(spice => showSpiceBlend(spice))

function showSpiceBlend(spice){
    detail.childNodes[1].src = spice.image
    detail.childNodes[1].alt = spice.title
    detail.childNodes[3].textContent = spice.title
    detail.dataset.id = spice.id
    getIngredients()
}

function getIngredients(){
    fetch(ingredientsUrl)
        .then(response => response.json())
        .then(ingredients => ingredientsFilter(ingredients))
}

function ingredientsFilter(ingredients){
    let filtered = []
    filtered = ingredients.filter(el => el.spiceblendId == detail.dataset.id)
    filtered.forEach(renderIngredients)
}

function renderIngredients(ingredient){
    let li = document.createElement("li")
    li.innerText = ingredient.name
    list.append(li)
}

// DELIVERABLE #2
titleForm.addEventListener("submit", updateTitle)

function updateTitle(e){
    e.preventDefault()
    let newTitle = e.target.title.value
    
    fetch(`${spiceUrl}/${detail.dataset.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: newTitle})
    })
    // readme only wants the change render after reload
    // but here is code for the rendering
    .then(res => res.json())
    .then(spice => {
        list.innerHTML = ""
        showSpiceBlend(spice)
    })
}

// DELIVERABLE #3
ingredientForm.addEventListener("submit", updateIngredient)

function updateIngredient(e){
    e.preventDefault()
    let newLi = document.createElement("li")
    newLi.innerText = e.target.name.value
    list.append(newLi)
}

// ADVANCED DELIVERABLE #1
const save = document.createElement("button")
save.innerText = "Save Ingredient"
ingredientForm.append(save)

ingredientForm.addEventListener("submit", updateIngredients)

function updateIngredients(e){
    // Way to get the input value
    let newIngredient = event.target.childNodes[5].value
    let newSpiceId = detail.dataset.id
    fetch(`${ingredientsUrl}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newIngredient, spiceblendId: newSpiceId })
    })
}