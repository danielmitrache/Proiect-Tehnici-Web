const recipes = document.querySelectorAll('.recipe');

window.onload = function () {
    loadFavouriteButtons();

    const searchInput = document.querySelector('.search-filter input');
    searchInput.addEventListener('input', searchRecipesEvent);

    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener('click', filterRecipesEvent);

    let favouriteButtons = document.querySelectorAll('.favourite-button');
    favouriteButtons.forEach(button => {
        button.addEventListener('click', favouriteRecipeClickEvent);
    });
}

function searchRecipesEvent(event){
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

function filterRecipesEvent(event) {
    const filterSelector = document.getElementById("filter");
    const filterValue = filterSelector.value.toLowerCase();
    if(filterValue === 'toate'){
        for(let recipe of recipes){
            recipe.style.display = 'grid';
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

function favouriteRecipeClickEvent(event) {
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
        this.style.backgroundColor = '#756c01';
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
            favouriteButton.style.backgroundColor = '#756c01';
            favouriteButton.innerHTML = 'Scoate de la favorite!';
        }
    }
}