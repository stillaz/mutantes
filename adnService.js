let extractRows = (array, data) => {
    for (let part of array) {
        data.push(part);
    }
}

let extractColumns = (array, data) => {
    for (let i = 0; i < array[0].length; i++) {
        data.push(array.map(x => x[i]).reduce((a, b) => a + b));
    }
}

let extractDiagonals = (array, data) => {
    let n = array.length;
    let principal = "", secondary = "";
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i == j) {
                principal += array[i][j];
            }

            if ((i + j) == (n - 1)) {
                secondary += array[i][j];
            }
        }
    }

    data.push(principal);
    data.push(secondary);
}

let validateMutante = (adn_data) => {
    for (let data of adn_data) {
        let encontrado = data.search(/(A|T|G|C)\1{3}/);
        if (encontrado === 0) {
            return true;
        }
    }

    return false;
}

export function isMutant(dna) {
    let datos_adn = [];

    extractRows(dna, datos_adn);
    extractColumns(dna, datos_adn);
    extractDiagonals(dna, datos_adn);
    console.log(datos_adn);
    return validateMutante(datos_adn)
}