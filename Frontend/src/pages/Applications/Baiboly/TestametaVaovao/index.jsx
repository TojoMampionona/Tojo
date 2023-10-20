import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "../../../../App.css";

function TestametaVaovao() {
  const [fileList, setFileList] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null); // État pour suivre le "key" sélectionné
  const { fileName } = useParams();
  
  //Fonction pour Convertir la première lettre d'une chaine de caractèe en majuscul
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  //Fonction pour supprimer l'extension
  function sansExtension(file) {
    const parts = file.split('.');
    if (parts.length > 1) {
      parts.pop();
    }
    return parts.join('.');
  }

  //Fonction pour convertisssez les JSON en texte
  function formatObject(obj) {
    let formattedString = '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formattedString += `${key}: ${obj[key]}\n`;
      }
    }
    return formattedString;
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

  const keys = selectedFileContent ? Object.keys(selectedFileContent) : [];

  return (
    <div className="row App">
      <div className="col-4" style={{ backgroundColor: "rgb(255,239,213)" }}>
        <h3>Testamenta vaovao : </h3>
        <ul style= {{ textAlign:'left', marginLeft:'-15px' }}>
          {fileList.map((file, index) => (
            <li key={index}>
              <Link to={`/Applications/Baiboly/TestametaVaovao/${file}`}>
                {capitalizeFirstLetter(sansExtension(file))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-8 ContainerHome" style={{ marginLeft:'-12px' }}>
        {selectedFileContent ? (
          <div>
            <h2>{capitalizedStringFileSelected} : </h2>
            <p>Toko faha : </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Form.Select onChange={(e) => setSelectedKey(e.target.value)} style={{ width:'150px' }}>
                <option value="Sélectionner">Sélectionner</option>
                {keys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Form.Select>
            </div>
            {selectedKey ? (
              <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                  {formatObject(selectedFileContent[selectedKey])}
                </div>
              ) : (
            <p style={{ textAlign: 'left' }}>
              Loading...<br />Sélectionner le Toko
            </p>
          )}
          </div>
        ) : (
          <p>Veuillez sélectionner svp<br />Loading...</p>
        )}
      </div>
    </div>
  );
}

export default TestametaVaovao;
