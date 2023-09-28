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


// Définir une route pour obtenir un fichier JSON spécifique dans le testamenta vaovao
app.get('/Testameta_vaovao/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const cheminVersFichiers = `./Baiboly/baiboly-json-master/TestametaVaovao/${fileName}`;
  const contenuDuFichier = require(cheminVersFichiers);
  res.json(contenuDuFichier);
});

// Définir une route pour obtenir un fichier JSON spécifique dans le testamenta vaovao
app.get('/Testameta_taloha/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const cheminVersFichiers = `./Baiboly/baiboly-json-master/TestametaTaloha/${fileName}`;
  const contenuDuFichier = require(cheminVersFichiers);
  res.json(contenuDuFichier);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});