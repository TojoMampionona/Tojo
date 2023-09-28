import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../../../App.css";

function TestametaVaovao() {
  const [fileList, setFileList] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const { fileName } = useParams();

  //Fonction pour Convertir la première lettre d'une chaine de caractèe en majuscul
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  //Fonction pour Convertir la première lettre d'une chaine de caractèe en majuscule
  function sansExtension(file) {
    const parts = file.split('.');
    if (parts.length > 1) {
      parts.pop();
    }
    return parts.join('.');
  }
  //connection au backend pour recuperer la liste des testameta vaovao
  useEffect(() => {
    // Charger la liste des fichiers depuis le backend
    fetch("http://localhost:8000/Testameta_vaovao")
      .then((res) => res.json())
      .then((data) => setFileList(data));

    // Charger le contenu du fichier sélectionné si fileName est défini
    if (fileName) {
      setSelectedFileName(fileName);
      fetch(`http://localhost:8000/Testameta_vaovao/${fileName}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedFileContent(data);
        });
    }
  }, [fileName]); // Cette dépendance va recharger le useEffect lorsque fileName change

  useEffect(() => {
    // Charger le fichier sélectionné à nouveau lorsque fileList change
    if (selectedFileName) {
      fetch(`http://localhost:8000/Testameta_vaovao/${selectedFileName}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedFileContent(data);
        });
    }
  }, [fileList, selectedFileName]);

  const capitalizedStringFileSelected = capitalizeFirstLetter(sansExtension(selectedFileName));

  return (
    <div className="row App">
      <div className="col-2" style={{ backgroundColor: "rgb(255,239,213)" }}>
        <h3>Testamenta vaovao : </h3>
        <ul>
          {fileList.map((file, index) => (
            <li key={index}>
              <Link to={`/Applications/Baiboly/TestametaVaovao/${file}`}>
                {capitalizeFirstLetter(sansExtension(file))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-10">
        {selectedFileContent ? (
          <div>
            <h2>{capitalizedStringFileSelected} : </h2>
            <pre>{JSON.stringify(selectedFileContent, null, 2)}</pre>
          </div>
        ) : (
          <p>Veuillez sélectionner svp<br />Loading...</p>
        )}
      </div>
    </div>
  );
}

export default TestametaVaovao;
