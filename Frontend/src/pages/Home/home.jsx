
import { useSpring, animated } from 'react-spring'
import React, {useState, useEffect, useRef} from "react"
import { Link } from 'react-router-dom'

import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'
import { ScrollToPlugin } from 'gsap/all'
import '../Home/home.css'
import Terre from '../../assets/icons/terre.svg'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const LogoAnime = () => {
  const [isRotated] = useState(false);
  const springProps = useSpring({
    transform: isRotated ? 'rotate(360deg)' : 'rotate(0deg)',
    transformOrigin: 'center center',
  });

  return(
      <animated.div className="logo" style={{...springProps}}>
        <img src={Terre} className="App-logo" alt="AstroBlast"   height={'150px'}/>
      </animated.div>
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
        delay:1,
        duration:5,
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
        delay: 1,
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
    slideToLeft(".welcome");
  },[])


  return (
    
    <div className="ContainerHome">
      <h1 className ="title" ref={titleRef}>
        <span className='letter' >T</span>
        <span className='letter' >o</span>
        <span className='letter' >n</span>
        <span className='letter' >g</span>
        <span className='letter' >a</span>
        <span className='letter' >s</span>
        <span className='letter' >o</span>
        <span className='letter' >a</span>
      </h1>
      <div className="welcome">
        <p>Eto @</p>
        <h1>AstroBlast</h1>
        <LogoAnime/>
      </div> 
      <div className="menu">
        <Link to="/jeux">Commencer à jouer</Link>
        <Link to="/#">Lire les instructions</Link>  
        <Link to="/contactme">Nous contacter</Link>   
      </div>   
    </div>
  )
}

export default Home;
