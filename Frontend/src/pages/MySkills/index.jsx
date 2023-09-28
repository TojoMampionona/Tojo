import "../../App.css"
import React, { useState, useEffect} from 'react'
import ProgressBar  from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button'

function MySkills() {
  //Mes skills et niveaux
  const niveaux = {
    HTML: 75,
    CSS: 75,
    Javascript: 60,
    PHP: 50,
    MySql: 65,
    Boostrap: 80,
    jQuery: 50,
    ReactJS: 50,
    NodeJS: 40,
    Wordpress: 55,
    Photoshop: 50,
    Illustrator: 55,
    Indesign: 60,
    RéférencementSEO: 60,
    FacebookAds: 60,
  };
  const [progress, setProgress] = useState({});
  const [isActive, setIsActive] = useState(false); 
  // Initialisez le progrès avec des valeurs de départ
  useEffect(() =>{
    const initialProgress = {}
    for (const filiere in niveaux) {
      initialProgress[filiere] = 0;
    }
    setProgress(initialProgress);
  }, []);

  // Fonction pour augmenter progressivement le pourcentage pour une filière donnée
  const increasePercentage = (filiere) => {
    if (progress[filiere] < niveaux[filiere]) {
      setProgress((prevProgress) =>({
        ...prevProgress,
        [filiere]: prevProgress[filiere] + 1,
      }));
    }
  };
  
  useEffect(() => {
    // Mettez à jour le progrès pour chaque filière à intervalles réguliers
    const timers = Object.keys(niveaux).map((filiere) =>
      setInterval(() => increasePercentage(filiere), 50)
    );
    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [progress]);


  // Fonction pour activer la ProgressBar lorsque le bouton est cliqué
  const handleStartButtonClick = () => {
    setIsActive(true);
  };

  return (
    <div className="ContainerHome">
      <h5>Désirez-vous en apprendre davantage sur les technologies que j'emploie ?</h5>
      <p>Veuillez cliquer sur le bouton ci-dessous.👇</p>
      <Button onClick={handleStartButtonClick}>En savoir plus</Button><br />
      {isActive ?
        (
          Object.keys(niveaux).map((filiere) => (
            <div key={filiere}>
              <ProgressBar now={progress[filiere]} label={`${filiere} : ${progress[filiere]}%`} style={{height:"20px", margin:"20px"}}/>
            </div>
          ))
        ) 
        :
        ("Loading...")
    }
    </div>
  );
}
export default MySkills