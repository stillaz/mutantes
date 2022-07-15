import { isMutant } from './adnService.js';
import express from "express";
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import fs from 'fs';

let rawdata = fs.readFileSync('disservicios-5509b-firebase-adminsdk-yoizw-c79341227a.json');
let serviceAccount = JSON.parse(rawdata);
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key
    })
});

const firestore = admin.firestore();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

let _mutant = (dna) => {
    const mutant = isMutant(dna);
    let message = mutant.isMutant ? 'Is a mutant' : 'Is not a mutant';
    console.log(message);
    return { result: mutant.isMutant, message, id: mutant.adnCode, estructure: mutant.estructure };
}

let insertDna = (dnaData) => {
    return firestore.doc(`dna/${dnaData.id}`).set(dnaData);
}

let testDna = () => {
    return firestore.collection('dna').get();
}

router.post("/mutant", function (req, res) {
    let dna = req.body;
    let dnaData = _mutant(dna);

    console.log(dnaData);
    if (!dnaData.result) {
        res.status(403)
    }

    res.send(dnaData.message);
    insertDna(dnaData).then(() => console.log('DNA inserted'));
});

router.get("/stats", async function (_, res) {
    try {
        const records = (await testDna()).docs;
        const mutantRecords = records.filter(adn => adn.get('result'));
        const ratio = mutantRecords.length / records.length;
        const statsData = { count_mutant_dna: mutantRecords.length, count_human_dna: records.length, ratio };
        console.log(statsData);
        res.send(statsData);
    } catch (err) {
        res.status(500).send(registro.mensaje);
        console.log(err);
    }
});


app.use(bodyParser.json());
app.use(router);

app.listen(port, function () {
    console.log(`Node server running on port ${port}`);
});
