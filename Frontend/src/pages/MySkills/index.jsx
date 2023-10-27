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
      <h1>Mes skills</h1>
      <Button onClick={handleStartButtonClick}>En savoir plus</Button><br />
      <div>
        {isActive ?
          (
            Object.keys(niveaux).map((filiere) => (
              <div key={filiere}>
                <ProgressBar now={progress[filiere]} label={`${filiere} : ${progress[filiere]}%`} style={{height:"20px", margin:"20px", 
              background: 
              (filiere === 'Illustrator' || filiere === 'Photoshop' || filiere === 'Indesign') ? 'linear-gradient(to right, rgba(0, 0, 4, 1), rgba(0, 0, 9, 1))' :
              (filiere === 'RéférencementSEO' || filiere === 'FacebookAds') ? 'linear-gradient(to right, rgba(255, 255, 0, 1), rgba(255, 255, 0, 1))' :
              'linear-gradient(to right, rgba(255, 0, 0, 1), rgba(255, 0, 0, 1))'
              }}/>
              </div>
            ))
          ) 
          :
          ("Loading...")
        }
      </div>
    </div>
  );
}
export default MySkills