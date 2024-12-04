window.onload = function() {
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
            let cantitateNumarNou = (cantitateNumar / previousValue * nrPortii).toFixed(2);
            celulaCantitate.innerHTML = cantitate.replace(regexPattern, cantitateNumarNou);
        }
        previousValue = nrPortii;
    }
}