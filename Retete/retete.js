const recipeListContainer = document.getElementById('recipe-list');
let recipes = []
let favouriteButtonsElements = []

async function loadRecipes() {
    fetch('../Data/retete.json')
        .then(response => response.json())
        .then(data => {
            const recipesData = data['recipes'];

            //Completam optiunile de filtrare
            let tags = [];
            for(let i = 0; i < recipesData.length; i++){
                for(let tag of recipesData[i]['tags']) {
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                    }
                }
            }
            for(let recipeTag of tags){
                const option = document.createElement('option');
                option.value = recipeTag;
                option.innerText = recipeTag[0].toUpperCase() + recipeTag.slice(1);
                document.getElementById('filter').appendChild(option);
            }

            for(let i = 0; i < recipesData.length; i ++) {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.dataset.id = i;
                recipeDiv.dataset.tags = recipesData[i]['tags'].map(tag => tag.toLowerCase()).join(',');
                recipeDiv.innerHTML = `
                    <img src="${recipesData[i]['image']}" alt="${recipesData[i]['title']}" class="recipe-image">
                    <div class="recipe-info">
                        <h2>${recipesData[i]['title']}</h2>
                        <a href="pagina-reteta.html?id=${i}" class="link-reteta">Vezi reteta</a>
                    </div>
                    <button id="bf${i}" class="favourite-button">Adauga la favorite!</button>
                `;
                recipeListContainer.appendChild(recipeDiv);
            }
        })
        .then(() => {
            recipes = document.querySelectorAll('.recipe');
            favouriteButtonsElements = document.querySelectorAll('.favourite-button');
            loadFavouriteButtons();
            for (let favouriteButtonElement of favouriteButtonsElements) {
                favouriteButtonElement.addEventListener('click', favouriteRecipeClickEvent);
            }
        })
        .catch(error => console.error(error));
}

window.onload = function () {
    loadRecipes().then(() => {
        const searchInput = document.querySelector('.search-filter input');
        searchInput.addEventListener('input', searchRecipesEvent);

        const searchButton = document.getElementById("search-button");
        searchButton.addEventListener('click', filterRecipesEvent);
    });
}

function searchRecipesEvent(){
    const searchInput = document.querySelector('.search-filter input');
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue === '') {
        for (let recipe of recipes) {
            recipe.style.display = 'grid';
        }
        return;
    }
    for (let recipe of recipes) {
        const recipeTitle = recipe.querySelector('.recipe-info h2').innerText.toLowerCase();
        if (!recipeTitle.includes(searchValue)) {
            recipe.style.display = 'none';
        } else {
            recipe.style.display = 'grid';
        }
    }
}

function filterRecipesEvent() {
    const filterSelector = document.getElementById("filter");
    const filterValue = filterSelector.value.toLowerCase();
    if(filterValue === 'toate'){
        for(let recipe of recipes){
            recipe.style.display = 'grid';
        }
        return;
    }
    else if (filterValue === 'favorite') {
        const favouriteRecipes = JSON.parse(localStorage.getItem('favouritedRecipes')) || [];
        for(let recipe of recipes){
            let target = recipe.dataset.id;
            if(favouriteRecipes.includes(target)){
                recipe.style.display = 'grid';
            } else {
                recipe.style.display = 'none';
            }
        }
        return;
    }
    for(let recipe of recipes){
        const recipeTags = recipe.dataset.tags.split(',');
        if(recipeTags.includes(filterValue)){
            recipe.style.display = 'grid';
        } else {
            recipe.style.display = 'none';
        }
    }
}

function favouriteRecipeClickEvent() {
    console.log('favouriteRecipeClickEvent');

    let favouriteRecipe = this.parentElement;
    let recipeId = favouriteRecipe.dataset.id;

    let favouriteButtons = JSON.parse(localStorage.getItem('favouriteButtons')) || {};
    let favouritedRecipes = JSON.parse(localStorage.getItem('favouritedRecipes')) || [];

    if (this.classList.contains('favourite')) {
        this.classList.remove('favourite');
        this.style.backgroundColor = '#1A1A19';
        this.innerHTML = 'Adauga la favorite!';
        delete favouriteButtons[recipeId];
        let index = favouritedRecipes.indexOf(recipeId);
        if (index > -1) {
            favouritedRecipes.splice(index, 1);
        }
    } else {
        this.classList.add('favourite');
        this.style.backgroundColor = '#478005';
        this.innerHTML = 'Scoate de la favorite!';
        favouriteButtons[recipeId] = true;
        favouritedRecipes.push(recipeId);
    }

    localStorage.setItem('favouriteButtons', JSON.stringify(favouriteButtons));

    favouritedRecipes.sort();
    localStorage.setItem('favouritedRecipes', JSON.stringify(favouritedRecipes));
}

function loadFavouriteButtons(){
    let favouriteButtons = JSON.parse(localStorage.getItem('favouriteButtons')) || {};
    for(let recipe of recipes){
        let recipeId = recipe.dataset.id;
        if(favouriteButtons[recipeId]){
            let favouriteButton = recipe.querySelector('.favourite-button');
            favouriteButton.classList.add('favourite');
            favouriteButton.style.backgroundColor = '#478005';
            favouriteButton.innerHTML = 'Scoate de la favorite!';
        }
    }
}