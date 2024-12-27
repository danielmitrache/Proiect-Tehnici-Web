const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');
const mainContainer = document.querySelector('.main');

fetch('../Data/retete.json')
    .then(response => response.json())
    .then(data =>{
        //Facem imaginea
        const recipeData = data['recipes'][recipeId];
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        imageContainer.innerHTML = `
            <img src="${recipeData['image']}" alt="${recipeData['title']}">
        `;
        mainContainer.appendChild(imageContainer);

        // Facem tabelul cu ingredientele
        const tabelIngrediente = document.createElement('table');
        tabelIngrediente.id = 'tabel-ingrediente';
        tabelIngrediente.innerHTML = `
            <thead>
            <tr>
                <th>Cantitate</th>
                <th>Ingrediente</th>
            </tr>
            </thead>
        `;
        const tableBody = document.createElement('tbody');
        for(let ingredient of Object.keys(recipeData['ingredients'])){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${recipeData['ingredients'][ingredient]}</td>
                <td>${ingredient}</td>
            `;
            tableBody.appendChild(row);
        }
        tabelIngrediente.appendChild(tableBody);

        //Facem titlul
        const recipeTitle = document.createElement('h1');
        recipeTitle.textContent = recipeData['title'];
        recipeTitle.id = 'titlu'

        //Facem selectorul de portii
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'portion-selector';
        selectorContainer.innerHTML = `
              <label for="portions">Număr de porții:</label>
              <select id="portions" name="portions">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>`;

        //Facem zona de instructiuni
        const stepsContainer = document.createElement('div');
        stepsContainer.className = 'steps';
        let instructions = recipeData['instructions'].replace(/\n+/g, '\n').split('\n');
        for(let i = 0; i < instructions.length; i++){
            const step = document.createElement('p');
            step.textContent = instructions[i];
            stepsContainer.appendChild(step);
        }

        //Facem zona de tags
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags';
        const ulElement = document.createElement('ul');
        ulElement.id='tag-list';
        for(let tag of recipeData['tags']){
            const liElement = document.createElement('li');
            liElement.textContent = tag;
            ulElement.appendChild(liElement);
        }
        tagsContainer.appendChild(ulElement);

        //Asamblam totul
        const contentContainer = document.createElement('div');
        contentContainer.className = 'content';

        const ingredienteDiv = document.createElement('div');
        ingredienteDiv.className = 'ingrediente';
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        contentContainer.appendChild(recipeTitle);
        contentContainer.appendChild(ingredienteDiv);
        ingredienteDiv.appendChild(gridContainer);

        const tableDiv = document.createElement('div');
        tableDiv.appendChild(selectorContainer);
        tableDiv.appendChild(tabelIngrediente);
        gridContainer.appendChild(tableDiv);

        gridContainer.appendChild(stepsContainer);
        gridContainer.appendChild(tagsContainer);

        mainContainer.appendChild(contentContainer);
    })
    .then(() => {
        let tabelIngrediente = document.getElementById("tabel-ingrediente");
        let selectorPortii = document.getElementById("portions");
        let previousValue = 1;

        selectorPortii.addEventListener("change", updateIngredientQuantitiesEvent);
        function updateIngredientQuantitiesEvent() {
            console.log(previousValue);
            let nrPortii = selectorPortii.value;
            let randuri = tabelIngrediente.rows;
            for(let i = 0; i < randuri.length; i ++){
                let celulaCantitate = randuri[i].cells[0];
                let cantitate = celulaCantitate.innerHTML;
                if(cantitate === null || cantitate === undefined || cantitate === ""){
                    continue;
                }

                const regexPattern = /\d+\.\d+|\d+/;
                let cantitateNumar = cantitate.match(regexPattern);
                console.log(cantitateNumar);
                let cantitateNumarNou = parseFloat((cantitateNumar / previousValue * nrPortii).toFixed(2));
                celulaCantitate.innerHTML = cantitate.replace(regexPattern, cantitateNumarNou);
            }
            previousValue = nrPortii;
        }
    })
    .catch(error => console.error(error));