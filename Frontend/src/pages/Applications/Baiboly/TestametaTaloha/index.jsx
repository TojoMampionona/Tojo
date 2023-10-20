import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Importez useParams
import Form from 'react-bootstrap/Form'
import  "../../../../App.css"

function TestametaTaloha() {
  const [fileList, setFileList] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const { fileName } = useParams();

  //Fonction pour Convertir la première lettre d'une chaine de caractèe en majuscule
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

   //Fonction pour supprimer l'extension
  function sansExtension(file) {
  const parts = file.split('.');

  // Vérifiez s'il y a au moins une partie (nom de fichier) avant le point
  if (parts.length > 1) {
    // Supprimez la dernière partie (l'extension) en la remplaçant par une chaîne vide
    parts.pop();
  }

  // Rejoignez les parties restantes pour former le nom du fichier sans extension
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
    fetch("http://localhost:8000/Testameta_taloha")
      .then((res) => res.json())
      .then((data) => setFileList(data));

      //Si fileName est défini (un fichier est cliqué), chargement du fichier selectionné
      if (fileName) {
        setSelectedFileName(fileName);
        fetch(`http://localhost:8000/Testameta_taloha/${fileName}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedFileContent(data);
        });
      }

  }, [fileName]);

  //Si le fichier defini (fichier cliqué) a changé
  useEffect(() => {
    if (selectedFileName) {
      fetch(`http://localhost:8000/Testameta_taloha/${selectedFileName}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedFileContent(data);
      })
    }
  }, [fileList, selectedFileName])

  //Convertir la première lettre du fichier selectionné en Majuscule et supprimé l'extension
  const capitalizedStringFileSelected = capitalizeFirstLetter(sansExtension(selectedFileName));

  const keys = selectedFileContent ? Object.keys(selectedFileContent) : [];

  return (
    <div className="row App">
      <div className="col-4" style={{backgroundColor:"rgb(255,239,213)"}}>
        <h3>Testamenta taloha : </h3>
        <ul style= {{ textAlign:'left', marginLeft: '-15px' }}>
          {fileList.map((file, index) =>(
            <li key={index}>
                <Link to={`/Applications/Baiboly/TestametaTaloha/${file}`}>{capitalizeFirstLetter(sansExtension(file))}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Affichez le contenu du fichier JSON sélectionné ici */}
      <div className="col-8 ContainerHome" style={{ marginLeft:'-12px' }}>
        {selectedFileContent ? (
          <div>
            <h2>{capitalizedStringFileSelected} :</h2>
            <p>Toko faha : </p>
            {/* <pre>{JSON.stringify(selectedFileContent, null, 2)}</pre> */}
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
            ) :
            (
              <p style={{ textAlign: 'left' }}>
              Loading...<br />Sélectionner le Toko
            </p>
            )}
          </div>
        )
          :
          (
            <p>Veuillez selectionnez svp<br />Loading...</p>
          )
        }
      </div>
    </div>
  );
}
export default TestametaTaloha;