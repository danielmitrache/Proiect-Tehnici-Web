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

    const regexIngrediente = /^(\d+(\.\d+)?[^#]*#[a-zA-Z ]+(\n)?|[a-zA-Z ]+(\n)?)+$/;
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

const canvas = document.getElementById('canvas');

window.onload = function() {
    writeRecipes();

    canvas.style.display = 'none';
    drawChefHat();
}

function drawChefHat() {

    const button = document.getElementById('add-recipe-button');
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.width = '5em';
    canvas.style.height = '5em';

    const ctx = canvas.getContext('2d');

    const scale = 0.65;
    const offsetX = -18;
    const offsetY = 25;

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc((70 + offsetX) * scale, (60 + offsetY) * scale, 40 * scale, Math.PI, 1.65 * Math.PI); // Symmetrical left arc
    ctx.arc((100 + offsetX) * scale, (30 + offsetY) * scale, 40 * scale, 1.1 * Math.PI, 1.9 * Math.PI); // Middle curve
    ctx.arc((130 + offsetX) * scale, (60 + offsetY) * scale, 40 * scale, 1.6 * Math.PI, 2 * Math.PI); // Right curve

    ctx.lineTo((160 + offsetX) * scale, (90 + offsetY) * scale);
    ctx.lineTo((40 + offsetX) * scale, (90 + offsetY) * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo((50 + offsetX) * scale, (90 + offsetY) * scale);
    ctx.lineTo((150 + offsetX) * scale, (90 + offsetY) * scale);
    ctx.lineTo((140 + offsetX) * scale, (120 + offsetY) * scale);
    ctx.lineTo((60 + offsetX) * scale, (120 + offsetY) * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((60 + offsetX) * scale, (120 + offsetY) * scale);
    ctx.quadraticCurveTo(
        (100 + offsetX) * scale,
        (110 + offsetY) * scale,
        (140 + offsetX) * scale,
        (120 + offsetY) * scale
    );
    ctx.stroke();

}

const button = document.getElementById('add-recipe-button');
button.addEventListener('click', () => {
    if (canvas.style.display === 'none') {
        canvas.style.display = 'block';
    } else {
        canvas.style.display = 'none';
    }
});
