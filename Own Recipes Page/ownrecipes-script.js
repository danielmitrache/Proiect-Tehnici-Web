document.getElementById('add-recipe-button').addEventListener('click', function() {
    const form = document.getElementById('add-recipe-form');
    if(form.style.display === 'none') {
        form.style.display = 'block';
    }
    else {
        form.style.display = 'none';
    }
});

document.getElementById('add-recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const regexIngrediente = /^(\d+(\.\d+)?[^#]*#[a-zA-Z ]+(\n)?|[a-zA-Z ]+)+$/;
    if (!regexIngrediente.test(ingredients)) {
        alert('Adauga ingredientele in formatul: "cantitate#ingredient" sau "ingredient" daca nu ai cantitate!');
        return;
    }


    const recipe = {title, ingredients, instructions};

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    writeRecipes();

    this.reset();
    this.style.display = 'none';
});

function writeRecipes(){
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let container = document.getElementById('recipe-list');
    container.innerHTML = '';
    for(let i = 0; i < recipes.length; i ++){
        let recipe = recipes[i];
        let recipeDiv = document.createElement('div');
        recipeDiv.classList.add('own-recipe');
        container.appendChild(recipeDiv);

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('own-recipe-content');

        // Adaugam titlul retetei
        let recipeTitle = document.createElement('h2');
        recipeTitle.classList.add('recipe-title');
        recipeTitle.innerText = recipe.title;

        //Adaugam tabelul cu ingrediente
        let recipeIngredientsTable = document.createElement('table');
        recipeIngredientsTable.classList.add('ingredients-table');
        let tableHead = document.createElement('thead');
        let tableHeadRow = document.createElement('tr');
        let tableHeadCell1 = document.createElement('th');
        tableHeadCell1.innerText = 'Cantitate';
        let tableHeadCell2 = document.createElement('th');
        tableHeadCell2.innerText = 'Ingredient';
        tableHeadRow.appendChild(tableHeadCell1);
        tableHeadRow.appendChild(tableHeadCell2);
        tableHead.appendChild(tableHeadRow);
        recipeIngredientsTable.appendChild(tableHead);
        let tableBody = document.createElement('tbody');
        let ingredients = recipe.ingredients.split('\n');
        for(let entry of ingredients){
            let cantitate = entry.split('#')[0];
            let ingredient = entry.split('#')[1];
            if (!ingredient){
                ingredient = cantitate;
                cantitate = '';
            }
            let row = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            cell1.innerText = cantitate;
            cell2.innerText = ingredient;
            row.appendChild(cell1);
            row.appendChild(cell2);
            tableBody.appendChild(row);
        }
        recipeIngredientsTable.appendChild(tableBody);

        //Adaugam instructiunile
        let recipeInstructions = document.createElement('p');
        recipeInstructions.classList.add('recipe-instructions');
        recipeInstructions.innerText = recipe.instructions;

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Sterge reteta';
        deleteButton.addEventListener('click', deleteParentRecipe);
        deleteButton.classList.add('recipe-delete-button');
        let recipeHeaderContainer = document.createElement('div');
        recipeHeaderContainer.classList.add('recipe-header-container');

        recipeHeaderContainer.appendChild(recipeTitle);
        recipeHeaderContainer.appendChild(deleteButton);
        recipeDiv.appendChild(recipeHeaderContainer);
        contentContainer.appendChild(recipeIngredientsTable);
        contentContainer.appendChild(recipeInstructions);
        recipeDiv.appendChild(contentContainer);
    }
}

function deleteParentRecipe(){
    let ownRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let deletedRecipeTitle = this.parentElement.getElementsByTagName('h2')[0].innerText;
    for (let i = 0; i < ownRecipes.length; i ++){
        if (ownRecipes[i].title === deletedRecipeTitle){
            ownRecipes.splice(i, 1);
        }
    }
    localStorage.setItem('recipes', JSON.stringify(ownRecipes));
    writeRecipes();
}

window.onload = function() {
    writeRecipes();
}