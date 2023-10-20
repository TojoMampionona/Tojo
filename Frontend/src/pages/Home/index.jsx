import LogoImage from '../../../src/logo.svg'
import { useSpring, animated } from 'react-spring'
import React, {useState, useEffect, useRef} from "react"

import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'
import { ScrollToPlugin } from 'gsap/all'
import '../../App.css'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const LogoAnime = () => {
  const [isRotated, setIsRotated] = useState(false);
  const springProps = useSpring({
    transform: isRotated ? 'rotate(360deg)' : 'rotate(0deg)',
    transformOrigin: 'center center',
  });

  return(
    <div>
      <animated.div className="logo" style={springProps}>
        <img src={LogoImage} className="App-logo" alt="React Logo"   width={'400px'}/>
      </animated.div>
    </div>
  )
}

function Home() {

  const titleRef = useRef()

  const onLoad = () => {
    gsap.timeline().fromTo(".letter",
      {
        x: -100,
        opacity:0,
      },
      {
        x:0,
        opacity:1,
        stagger:0.1,
        delay:0.7,
      })
      
      .to(".title", {
        y: 5,
        delay: 0.7,
        duration: 0.5,
        margin: "5"
      })
  }

  const slideToLeft = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        x: -200
      },
      {
        opacity: 1,
        x:0,
        delay: 2,
        scrollTrigger: {
          trigger: elem,
          start: "top center",
          end: "bottom center"
        }
      }
    )
  }

  useEffect(() =>{
    onLoad(".letter")
  }, [])
  useEffect(() =>{
    slideToLeft("#welcome");
  },[])

  useEffect(() =>{
    slideToLeft("#corps");
  },[])

  return (
    
    <div className="ContainerHome">
      <h1 className ="title" ref={titleRef}>
        <span className='letter' style={{color: 'rgb(255, 30, 71)'}}>T</span>
        <span className='letter' style={{color: 'rgb(255, 40, 71)'}}>o</span>
        <span className='letter' style={{color: 'rgb(255, 50, 71)'}}>n</span>
        <span className='letter' style={{color: 'rgb(255, 55, 71)'}}>g</span>
        <span className='letter' style={{color: 'rgb(255, 60, 71)'}}>a</span>
        <span className='letter' style={{color: 'rgb(255, 65, 71)'}}>s</span>
        <span className='letter' style={{color: 'rgb(255, 70, 71)'}}>o</span>
        <span className='letter' style={{color: 'rgb(255, 75, 71)'}}>a</span>
      </h1>
      <div id="welcome">
        <p>Je suis ravi de vous accueillir sur mon site personnel</p>
        <LogoAnime/>
      </div>
      <div id="corps">
        <p>Sur ce site, vous découvrirez :</p>
        <ul>
          <li><Link to="/AboutMe">Des détails passionnants sur ma vie personnelle.</Link></li>
          <li><Link to="/MySkills">Une vue d'ensemble complète des technologies que j'exploite.</Link></li>
          <li><Link to="/Jeux">Un mini jeu que j'ai conçu.</Link></li>
          <li><Link to="/Applications">De petites applications que j'ai développées.</Link></li>
          <li>Des projets futurs passionnants auxquels je travaille.</li>
          <li>...</li>
        </ul>
      </div>
      <div id="pieds">
        <h5>Je vous invite à parcourir le site et à explorer les différentes sections pour en apprendre davantage.</h5>
        <p>Si vous avez des commentaires ou des questions, n'hésitez pas à me les faire parvenir. Je suis toujours ouvert à la discussion et à l'amélioration.</p>
        <em>N'oubliez pas que vous pouvez me contacter à tout moment en cliquant <Link to="/HiringMe">ici</Link>.</em>
      </div>
      
    </div>
  )
}

export default Home;
