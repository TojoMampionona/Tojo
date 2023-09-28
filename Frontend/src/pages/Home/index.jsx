import LogoImage from '../../../src/logo.svg'
import { useSpring, animated } from 'react-spring'
import '../../App.css'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const LogoAnime = () => {
  const [isRotated, setIsRotated] = useState(false);
  const springProps = useSpring({
    transform: isRotated ? 'rotate(360deg)' : 'rotate(0deg)',
    transformOrigin: 'center center',
  });
  const handleLogoClock = () => {
    setIsRotated(!isRotated);
  };

  return(
    <div>
      <animated.div className="logo" style={springProps} onClick={handleLogoClock}>
        <img src={LogoImage} className="App-logo" alt="React Logo"   width={'400px'}/>
      </animated.div>
      <Button onClick={handleLogoClock}>Animer</Button>
    </div>
  )
}


    
  
function Home() {
  return (
    <div className="ContainerHome">
      <div>
        <h1>Bienvenue !</h1>
        <p>C'est avec plaisir que je vous accueille sur mon premier site réalisé avec React.js.</p>
        <LogoAnime/>
      </div>
      <div>
        <p>Sur ce site, vous découvrirez :</p>
        <ul>
          <li><Link to="/AboutMe">Des détails passionnants sur ma vie personnelle.</Link></li>
          <li><Link to="/MySkills">Une vue d'ensemble complète des technologies que j'exploite.</Link></li>
          <li><Link to="/Applications">Des mini applications que j'ai créées.</Link></li>
          <li>Des projets futurs passionnants auxquels je travaille.</li>
          <li>...</li>
        </ul>
      </div>
      <div>
        <h5>Je vous invite à parcourir le site et à explorer les différentes sections pour en apprendre davantage.</h5>
        <p>Si vous avez des commentaires ou des questions, n'hésitez pas à me les faire parvenir. Je suis toujours ouvert à la discussion et à l'amélioration.</p>
        <em>N'oubliez pas que vous pouvez me contacter à tout moment en cliquant <Link to="/HiringMe">ici</Link>.</em>
      </div>
      
    </div>
  )
}

export default Home;
