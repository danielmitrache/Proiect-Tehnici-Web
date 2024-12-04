const recipes = [
    {
        title: "Mamaliga la gratar cu spanac si ciuperci",
        link: "../Retete/R-mamaligalagratar.html",
        image: "../Imagini/MamaligaLaGratar.jpg"
    },
    {
        title: "Pilaf de orez cu legume",
        link: "../Retete/R-pilaf.html",
        image: "../Imagini/Pilaf.jpg"
    },
    {
        title: "Chiftelute de legume in sos de rosii",
        link: "../Retete/R-chiftelute.html",
        image: "../Imagini/Chiftelute.jpg"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().getDay();
    const recipeOfTheDay = recipes[today % recipes.length];

    document.querySelector('.recipe img').src = recipeOfTheDay.image;
    document.querySelector('.recipe h3').textContent = recipeOfTheDay.title;
    document.querySelector('.content a').href = recipeOfTheDay.link;
});