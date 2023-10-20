const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

//api pour la liste des testameta
app.get("/", (req, res) => {
  const path = "./Baiboly/baiboly-json-master";

  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(files);
    }
  });
});

//**************************//
//****TESTAMENTA VAOVAO*****//
//**************************//

//api pour la liste le testameta vaovao
app.get("/Testameta_vaovao", (req, res) => {
  const path = "./Baiboly/baiboly-json-master/TestametaVaovao/";

  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(files);
    }
  });
});

// Définir une route pour obtenir la liste des écrivains du Testamenta vaovao
app.get('/Testameta_vaovao/:fileName/', (req, res) => {
  const fileName = req.params.fileName;
  const cheminVersFichiers = `./Baiboly/baiboly-json-master/TestametaVaovao/${fileName}`;
  const contenuDuFichier = require(cheminVersFichiers);
  res.json(contenuDuFichier);
});

// Définir une route pour obtenir le Toko spécifique d'un écrivain dans le testamenta vaovao
app.get('/Testameta_vaovao/:fileName/:key', (req, res) => {
  const fileName  = req.params.fileName;
  const key = req.params.key;
  // const fileName = fileNameWithExtension.replace(".json", "");
  const cheminVersFichiers = `./Baiboly/baiboly-json-master/TestametaVaovao/${fileName}`;
  const contenuDuFichier = require(cheminVersFichiers);
  if (contenuDuFichier[key]) {
    res.json({ [key]: contenuDuFichier[key] });
  } else {
    res.status(404).json({ message: 'Clé non trouvée' });
  }
});

//**************************//
//****TESTAMENTA VAOVAO*****//
//**************************//

//api pour la liste le testameta taloha
app.get("/Testameta_taloha", (req, res) => {
  const path = "./Baiboly/baiboly-json-master/TestametaTaloha";

  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(files);
    }
  });
});

// Définir une route pour obtenir la liste des écrivains du Testamenta Taloha
app.get('/Testameta_taloha/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const cheminVersFichiers = `./Baiboly/baiboly-json-master/TestametaTaloha/${fileName}`;
  const contenuDuFichier = require(cheminVersFichiers);
  res.json(contenuDuFichier);
});

// Définir une route pour obtenir le Toko spécifique d'un écrivain dans le testamenta Taloha
app.get('/Testameta_taloha/:fileName/:key', (req, res) => {
  const fileName  = req.params.fileName;
  const key = req.params.key;
  // const fileName = fileNameWithExtension.replace(".json", "");
  const cheminVersFichiers = `./Baiboly/baiboly-json-master/TestametaTaloha/${fileName}`;
  const contenuDuFichier = require(cheminVersFichiers);
  if (contenuDuFichier[key]) {
    res.json({ [key]: contenuDuFichier[key] });
  } else {
    res.status(404).json({ message: 'Clé non trouvée' });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});