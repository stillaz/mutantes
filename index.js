import { isMutant } from './adnService.js';
import express from "express";
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

let _mutante = (dna) => {
    const mutante = isMutant(dna);
    let mensaje = mutante ? 'Es un mutante\nLo podrás reclutar' : 'No es un mutante';
    console.log(mensaje);
    return { resultado: mutante, mensaje };
}

router.post("/mutant", function (req, res) {
    let dna = req.body;
    let esMutante = _mutante(dna);
    if (esMutante.resultado) {
        res.send(esMutante.mensaje);
    } else {
        res.status(403).send(esMutante.mensaje);
    }
});

app.use(bodyParser.json());
app.use(router);

app.listen(port, function () {
    console.log(`Node server running on port ${port}`);
});
