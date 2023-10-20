import React, {useState, useEffect, useRef} from "react"
import  {boxstyle} from "./styles"
import  Button  from "react-bootstrap/Button";
import gsap from "gsap"
import tany2 from './tany2.svg';

function JeuxAnimation() {
  let animationFrameId = null;
  let boom; 
  const [nbrvie, setNbrvie] = useState(3);
  const [score, setScore] = useState(0);
  const [positionMeteorites, setPositionMeteorites] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseLabel, setPauseLabel] = useState('Pause')
  const tl = useRef(null);
  var pr = gsap.timeline();
  
                    ////////////////////////////////////////////////////
                    /////////   COMMANDES BOUTTON ET CLAVIER  //////////
                    ////////////////////////////////////////////////////

  //Commande boutton Left et Right
    const handleButtonDown = (direction) => {
        animationFrameId = requestAnimationFrame(() => animate(direction));
    };

    const handleButtonUp = () => {
        cancelAnimationFrame(animationFrameId);
    };

    const animate = (direction) => {
        const currentX = gsap.getProperty('.terre', 'x');
        if (direction === 'right' && currentX < 160) {
        const newX = currentX + 10;
        animateTerre(newX);
        } else if (direction === 'left' && currentX > -160) {
        const newX = currentX - 10;
        animateTerre(newX);
        }
        animationFrameId = requestAnimationFrame(() => animate(direction));
    };

    //Commande clavier touche directionnel gauche et droite
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
        animateRight();
        } else if (e.key === 'ArrowLeft') {
        animateLeft();
        }
    };
    const handleKeyUp = () => {
        cancelAnimationFrame(animationFrameId);
    };
    //animation à Droite
    const animateRight = () => {
        const currentX = gsap.getProperty('.terre', 'x');
        if (currentX < 160) {
        const newX = currentX + 10;
        animateTerre(newX);
        animationFrameId = requestAnimationFrame(animateRight);
        }
    };
    //animation à Gauche
    const animateLeft = () => {
        const currentX = gsap.getProperty('.terre', 'x');
        if (currentX > -160) {
        const newX = currentX - 10;
        animateTerre(newX);
        animationFrameId = requestAnimationFrame(animateLeft);
        }
    };
    // Commande bouton Demarrage Jeux
    const demarrer = () => { 
        document.getElementById('ahah').style.opacity = '1';
        document.querySelector('.yoh').style.opacity = '1';
        setIsPlaying(true);
    }
    // Commande bouton Stop Jeux
    const stop = () => {
        if (tl.current && setIsPlaying) {
        resetDashboard();
        setScore(0);
        resetMeteorite();
        setNbrvie(3);
        tl.current.kill();
        }
    }
    //Controle Bouton Play ou Pause
    const pause = () => {
        if (pauseLabel === 'Pause') {
        if (tl.current && setIsPlaying) {
            setPauseLabel('Play');
            tl.current.pause()
        } 
        } else {
        setPauseLabel('Pause');
        tl.current.play();
        }
    }
    // Effet Ecoute du maintien des touches de clavier ou boutton Gauche Droite
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        cancelAnimationFrame(animationFrameId);
        };
    }, []);

                    //////////////////////////////////
                    /////////   ANIMATIONS  //////////
                    //////////////////////////////////

    //Animation du bloqueur de meteorites
        const animateTerre = (position) => {
            pr.to(".terre", {
                duration: 0,
                x: position,
            });
            };
    //Animation Metéorites
    useEffect(() => {
      if (isPlaying) {
        if (!tl.current) {
          tl.current = gsap.timeline({ repeat: -1 });
         
          tl.current.to(".yoh", {
            opacity: 1,
            // x: newX,
            y: 215,
            rotate: '+=360',
            delay: 0,
            height: '35px',
            width: '35px',
            duration: 1,
            onComplete: () => {
              const valeurMeteo = gsap.getProperty('.yoh', 'x');
              const valeurX = gsap.getProperty('.terre', 'x');
              let resultat;
              if (valeurX > valeurMeteo) {
                resultat = valeurX - valeurMeteo
              } else {
                resultat = valeurMeteo - valeurX
              }
              if (resultat > 20) {
                setIsPlaying(false);
                  explosion();
                  vie();
                  document.getElementById('nbrVie').style.color = 'red';
                  resetMeteorite()
                } 
                else  {
                  scoreJeux()
                  document.getElementById('nbrScore').style.color = 'yellow'; 
                }
            }
          });
  
          tl.current.to(".yoh", {
            opacity: 0,
            duration: 1,
            y: 0,
            rotate: '-=360',
            delay: 0,
            height: '35px',
            width: '35px',
            onComplete: () => {
              const randomNumber = Math.random() * 300 - 150; // Nombre aléatoire entre -150 et 150
              const newPosition = Math.round(randomNumber / 10) * 10;
              setPositionMeteorites(newPosition); // Arrondir à la valeur divisible par 10
              gsap.set(".yoh", { x: newPosition });
            }
          });
        }
      } else {
        if (tl.current) {
          tl.current.kill();
          tl.current = null;
        }
      }
    }, [isPlaying]);

  //Animation Explosion du boom // 
  const explosion = () => {
    boom = gsap.timeline({ repeat: 1 }); // Répétition 3 fois
    boom.to("#boom", {
      
      opacity: 1,
      duration: 0.3,
    });
    boom.to("#boom", {
      opacity: 0,
      duration: 0.3, // Temps pour disparaître
    });
  }
  
                    //////////////////////////////////////////////////////////
                    ///////////////LOGIQUE DU JEUX (Vie, gameOVer, Score,..)//////////////////
                    //////////////////////////////////////////////////////////

//Reset le meteorites
const resetMeteorite = () => {
    pr.to('.yoh', {
    duration: 1,
    opacity: 0, // Réinitialiser l'opacité si nécessaire
    y: 0, // Réinitialiser la position Y
    height: '35px', // Réinitialiser la hauteur si nécessaire
    onComplete: () => {
        // setIsPlaying(false);
        
    }
    });
}
//Reset le Dashboard
const resetDashboard = () => {
    pr.fromTo('.eoh', {
    fontSize:"25px",
    opacity:0,
    // Réinitialiser la hauteur si nécessaire
    }, 
    {
    fontSize:"16px",
    opacity:1, 
    color: 'white'
    }
    );
};

//Calcul Point de vie
  const vie = () => {
        setNbrvie((prevNbrvie) => prevNbrvie - 1)
  }
//Calcul Score du Jeux
  const scoreJeux = () => {
    setScore((prevScore) => prevScore + 1)
}

//Game Over
  useEffect(() => {
    const gameOver = () => {
    document.getElementById('ahah').style.opacity = '0';
    resetDashboard();
    setScore(0);
    resetMeteorite();
    setNbrvie(3);
    }
    if (nbrvie === 0) {
      gameOver();
    }
  }, [nbrvie]);

                    //////////////////////////////////////////////////////////
                    ///////////////       //   JSX   //    ///////////////////
                    //////////////////////////////////////////////////////////

return (
<div className="ContainerHome" style= {{ display:"flex", justifyContent: "center", alignItems:'left' }}>
    <div style= {{ ...boxstyle, background: 'linear-gradient(to bottom, purple, #8a2be2)', height:'600px', width:'370px' }}>
        
        <div style={{position: 'relative', justifyContent: "space-between", display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '30px'}}>
                <p className="eoh" id="nbrVie" style={{position: 'relative', top:'-10px', left:'15px'}}>Vie: {nbrvie}</p>
                <p className="eoh" id="nbrScore" style={{position: 'relative', top:'-10px', right:'15px'}}>Score : {score}</p>
        </div>
        <div id="conteneur" style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', height: '315px', borderRadius: '5px'}}>
            {/* Mtétéorites */}
              <svg version="1.1" className="yoh" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 512 512" style={{height: '35px', opacity:'1'}}>
                <path fill="#FF5023" d="M447.586,436.165l60.235-104.331l-24.748-21.748c4.135-17.367,6.338-35.474,6.338-54.087
                    c0-18.614-2.203-36.721-6.34-54.087l24.746-21.748L447.583,75.833l-31.35,10.604c-26.198-24.77-58.115-43.544-93.536-54.124
                    L316.235,0H195.765l-6.463,32.313c-35.421,10.58-67.339,29.354-93.536,54.124L64.414,75.832L4.179,180.162l24.748,21.748
                    c-4.135,17.369-6.338,35.476-6.338,54.09c0,18.613,2.203,36.719,6.338,54.084L4.179,331.833l60.235,104.331l31.349-10.604
                    c26.199,24.772,58.117,43.546,93.538,54.126L195.765,512h120.471l6.463-32.313c35.421-10.58,67.339-29.356,93.538-54.126
                    L447.586,436.165z"/>
                <g>
                    <path fill="#BF3C1A" d="M483.073,310.085c4.135-17.366,6.338-35.473,6.338-54.085c0-18.614-2.203-36.721-6.34-54.087
                    l24.746-21.748L447.583,75.833l-31.35,10.604c-26.198-24.77-58.115-43.544-93.536-54.124L316.235,0H256v512h60.235l6.463-32.313
                    c35.421-10.58,67.339-29.356,93.538-54.126l31.349,10.604l60.235-104.331L483.073,310.085z"/>
                    <circle fill="#BF3C1A" cx="128" cy="308.706" r="22.588"/>
                </g>
                <g>
                    <circle fill="#802812" cx="384" cy="308.706" r="22.588"/>
                    <circle fill="#802812" cx="323.765" cy="143.059" r="37.647"/>
                    <circle fill="#802812" cx="338.824" cy="384" r="37.647"/>
                    <circle fill="#802812" cx="165.647" cy="203.294" r="45.176"/>
                </g>
                <path fill="#FFC170" d="M158.118,271.059c-37.365,0-67.765-30.398-67.765-67.765s30.399-67.765,67.765-67.765
                    s67.765,30.399,67.765,67.765S195.485,271.059,158.118,271.059z M158.118,180.706c-12.455,0-22.588,10.133-22.588,22.588
                    c0,12.455,10.133,22.588,22.588,22.588s22.588-10.133,22.588-22.588C180.706,190.839,170.573,180.706,158.118,180.706z"/>
              </svg>   
            {/*Protecteur contre les météorites*/}
            <div id="ahah" style={{height:'75px', transform: 'translateY(198px)'}}>
              <svg fill="#0a2966" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="terre" style={{height:'75px', width:'75px'}} stroke="#0a2966">
                <g id="SVGRepo_bgCarrier" strokeWidth="0">
                </g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                  <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z">
                </path> 
                </g>
              </svg>
            </div>
            {/*Boom*/}
            <div id="boom" style={{ position: 'relative', opacity:0, left:`${positionMeteorites}px`, top: '115px'}}>
              <img src={tany2} alt="Earth"/>
            </div> 
        </div>
        
        {/*La terre*/}
        
        {/*Bouttons*/}
        <div style={{ position: 'relative'}}>
              <div style={{position: 'relative'}}>
                <div style={{margin: '5px', display: 'flex', justifyContent: 'space-between'}}>
                  <Button className="btn-success" onTouchStart={() => handleButtonDown('left')} onTouchEnd={handleButtonUp}>Left</Button>
                  <Button className="btn-success" onTouchStart={() => handleButtonDown('right')} onTouchEnd={handleButtonUp}>Right</Button>
                </div>
                <div>
                  <Button className="btn-success" onClick={demarrer}>Demarrer</Button>
                  <Button className="btn-success" onClick={pause}>{pauseLabel}</Button>
                  <Button className="btn-success" onClick={stop}>Stop</Button>
                </div>
              </div>
              
        </div>
        
    </div>
</div>
  );
}

export default JeuxAnimation
