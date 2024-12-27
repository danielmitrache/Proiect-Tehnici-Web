fetch('../Data/retete.json')
    .then(response => response.json())
    .then(data => {
        const recipes = data.recipes;

        const today = new Date().getDay();
        const recipeOfTheDay = today % recipes.length;

        document.querySelector('.recipe img').src = recipes[recipeOfTheDay].image;
        document.querySelector('.recipe h3').textContent = recipes[recipeOfTheDay].title;
        document.querySelector('.content a').href = `../Retete/pagina-reteta.html?id=${recipeOfTheDay}`;
    });