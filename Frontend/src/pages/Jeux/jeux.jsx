import React, {useState, useEffect, useRef} from "react"
import '../Jeux/jeux.css'


import gsap from "gsap"
import tany2 from './tany2.svg';


function JeuxAnimation() {
  let animationFrameId = null;
  let boom; 
  const [nbrvie, setNbrvie] = useState(3);
  const [score, setScore] = useState(0);
  const [positionMeteorites, setPositionMeteorites] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const tlMeteor = useRef(null);
  const tlDestroyer = useRef(null);
  const tlOther = gsap.timeline();
  
                    ////////////////////////////////////////////////////
                    /////////   COMMANDES BOUTTON ET CLAVIER  //////////
                    ////////////////////////////////////////////////////

  //Commande boutton Left et Right
    const handleButtonDown = (direction) => {
        animationFrameId = requestAnimationFrame(() => animateTerre(direction));
    };

    const handleButtonUp = () => {
        cancelAnimationFrame(animationFrameId);
    };

    const animateTerre = (direction) => {
      if(isPlaying) {
        const currentX = gsap.getProperty('.terre', 'x');
        if ((direction === 'right' && currentX >= 160) || (direction==='left' && currentX <= -160)) {
            return;
        }
        const newX = direction === 'right' ? currentX + 10 : currentX - 10;

        // if (!tlDestroyer.current) {
        //   tlDestroyer.current  = gsap.timeline();
        // }
        tlDestroyer.current.to(".terre", {
          duration: 0,
          x: newX,
        });
        animationFrameId = requestAnimationFrame(()=>animateTerre(direction));
      } 
    };

  

    //Commande clavier touche directionnel gauche et droite
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          animateTerre(e.key === 'ArrowRight' ? 'right' : 'left');
          e.preventDefault();
        }
    };
    const handleKeyUp = () => {
        cancelAnimationFrame(animationFrameId);
    };
    
    // Commande bouton Demarrage Jeux
    const demarrer = () => { 
        document.querySelector('.destroyer').style.opacity = '1';
        document.querySelector('.meteor').style.opacity = '1';
        setIsPlaying(true);
    }

    // Commande bouton Stop Jeux
    const stop = () => {
        // if (tlMeteor.current && setIsPlaying) {
          if (isPlaying) {
          resetDashboard();
          resetMeteorite();
          resetDestroyer();
          setScore(0);
          setNbrvie(3);
          tlMeteor.current.kill();
          tlDestroyer.current.kill();
          tlDestroyer.current = null;
          setIsPause(false);
          setIsPlaying(false);
        }
    }
    const pause = () => {
      if (isPlaying) {
        if (isPause) {
          tlMeteor.current.play(); 
          tlDestroyer.current.play();
          setIsPause(false);
        } else {
          tlMeteor.current.pause();
          tlDestroyer.current.pause();
          setIsPause(true);
        }
        
      } else {
        demarrer()
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
    }, [animationFrameId,  handleKeyDown, handleKeyUp]);

                    //////////////////////////////////
                    /////////   ANIMATIONS  //////////
                    //////////////////////////////////

    //Animation Metéorites
    useEffect(() => {
      if (isPlaying) {
        document.querySelector('.btn-dmr').style.zIndex = '-1';
        if (!tlMeteor.current) {
          tlMeteor.current = gsap.timeline({ repeat: -1 });
         
          tlMeteor.current.to(".meteor", {
            opacity: 1,
            // x: newX,
            // y: 215,
            y: 225,
            rotate: '+=360',
            delay: 0,
            height: '35px',
            width: '35px',
            duration: 1,
            onComplete: () => {
              const valeurMeteo = gsap.getProperty('.meteor', 'x');
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
  
          tlMeteor.current.to(".meteor", {
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
              gsap.set(".meteor", { x: newPosition });
            }
          });
        }
        if (!tlDestroyer.current) {
          tlDestroyer.current  = gsap.timeline();
        }
      } else {
        document.querySelector('.btn-dmr').style.zIndex = '1'
        if (tlMeteor.current) {
          tlMeteor.current.kill();
          tlMeteor.current = null;
        }
      }
    }, [isPlaying, handleKeyUp]);

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
  tlOther.to('.meteor', {
    duration: 1,
    opacity: 0, // Réinitialiser l'opacité si nécessaire
    y: 0, // Réinitialiser la position Y
    height: '35px', // Réinitialiser la hauteur si nécessaire
    onComplete: () => {
        // setIsPlaying(false);
        
    }
    });
}
const resetDestroyer = () => {
  tlOther.to('.terre', {
    opacity:0,
    duration: 0.5,
    onComplete: () => {
      gsap.set('.terre', {
        x:0,
        opacity:1,
      })
    }
  })
}
//Reset le Dashboard
const resetDashboard = () => {
  tlOther.fromTo('.paragrah-top', 
      {
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
    document.querySelector('.destroyer').style.opacity = '0';
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
<div className="ContainerHome container-game">
    <div className="content">
        <div className="container-top">
            <p className="paragrah-top" id="nbrVie">Vie: {nbrvie}</p>
            <p className="paragrah-top" id="nbrScore">Score : {score}</p>
        </div>
        <div className="container-screen">
            {/* Mtétéorites */}
            <svg version="1.1" className="meteor" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 512 512">
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
            <div className="destroyer" id="destroyer">
              <svg fill="#0a2966" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="terre" style={{height:'75px', width:'75px'}} stroke="#0a2966">
                <g id="SVGRepo_bgCarrier" strokeWidth="0">
                </g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                  <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z">
                </path> 
                </g>
              </svg>
            </div>
            <button className="btn btn-dmr" onClick={demarrer} >
              Commencer
            </button>
            {/*Boom*/}
            <div className="boom" id="boom" style={{left:`${positionMeteorites}px`}}>
              <img src={tany2} alt="Earth"/>
            </div> 
        </div>
        
        
        {/*Bouttons*/}
        <div className="container-commande">
              <div>
                <div className="container-btn">
                  {/* Bouton Gauche */}
                  <button 
                    className="btn btn-cmd" 
                    onMouseDown={() => handleButtonDown('left')} 
                    onMouseUp={handleButtonUp}
                  >
                    <svg id="arrow-left" width="40px" height="40px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                      <g id="SVGRepo_iconCarrier">
                      <path d="M85.333333 512l298.666667-249.6v499.2z"/>
                      <path d="M320 426.666667h576v170.666666H320z"/>
                      </g>
                    </svg>
                  </button>
                  {/* Bouton Droite */}
                  <button 
                    className="btn btn-cmd" 
                    onMouseDown={() => handleButtonDown('right')} 
                    onMouseUp={handleButtonUp}
                  >
                    <svg id="arrow-right" width="40px" height="40px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                      <g id="SVGRepo_iconCarrier">
                      <path d="M938.666667 512L640 761.6V262.4z"/>
                      <path d="M128 426.666667h576v170.666666H128z"/>
                      </g>
                    </svg>
                  </button>
                </div>
                <div>
                  {/* {pauseLabel} */}
                  {/* Bouton pause */}
                  <button 
                    className="btn btn-cmd" 
                    onClick={pause}>
                      {!isPause ? 
                        <svg width="40px" height="20px" viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                              <g id="Icon-Set-Filled" transform="translate(-419.000000, -571.000000)" fill="currentColor">
                                  <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play"></path>
                              </g>
                          </g>
                        </svg>
                        :
                        <svg width="40px" height="20px" viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="currentColor">
                                  <g id="icons" transform="translate(56.000000, 160.000000)">
                                      <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#1006]"></path>
                                  </g>
                              </g>
                          </g>
                        </svg>
                      }
                  </button>
                  <button className="btn btn-cmd" onClick={stop}>
                    <svg width="40px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12z" fill="currentColor"/></svg>
                  </button>
                </div>
              </div>
              <div className="container-instruction">
                <h4>Instructions :</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu feugiat nunc, tincidunt interdum purus. Mauris ultricies molestie ultrices. Integer accumsan a nisl tristique gravida.</p>
              </div>
              
        </div>
        
    </div>
</div>
  );
}

export default JeuxAnimation
