import LogoImage from '../../../src/logo.png'
import Dev from '../../../src/photos/dev-web.jpg'
import Ref from '../../../src/photos/reseaux-sociaux-web.jpg'
import Graph from '../../../src/photos/graphic-design.jpg'

import { useSpring, animated } from 'react-spring'
import React, {useState, useEffect, useRef} from "react"

import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'
import { ScrollToPlugin } from 'gsap/all'
import '../../App.css'
import { Link } from 'react-router-dom'
import {Card} from 'react-bootstrap';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const LogoAnime = () => {
  const [isRotated] = useState(false);
  const springProps = useSpring({
    transform: isRotated ? 'rotate(360deg)' : 'rotate(0deg)',
    transformOrigin: 'center center',
  });

  return(
    <div className="col-lg-3 col-md-4 col-xs-12" style={{background: 'linear-gradient(rgba(125,72,178, 0.3), rgba(0, 0, 0, 0.4)), black', margin: '0 auto', borderRadius:'150px', boxShadow: '0 10px 20px rgba(128, 128, 128, 0.7)'}}>
      <animated.div className="logo" style={{...springProps, padding:'15px'}}>
        <img src={LogoImage} className="App-logo" alt="React Logo"   height={'150px'}/>
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
        delay:1,
        duration:5,
      })
      
      // .to(".title", {
      //   y: 5,
      //   delay: 0.7,
      //   duration: 0.5,
      //   margin: "5"
      // })
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

  const slideToRight = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        x: 200
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
    slideToRight("#corps");
  },[])

  return (
    
    <div className="ContainerHome Container circles " style={{borderRadius: '60px 60px 0 0'}}>
      <div className="row">
        {/* <div className="Container"> */}
          <div className="row">
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
                <div id="welcome">
                  <p>Je suis ravi de vous accueillir sur mon site personnel</p>
                  <LogoAnime/>
                </div>
          </div>
        {/* </div> */}
        <div className="row mt-5" id="corps">
            <h2>Mes offres :</h2>
            
            <div className="col-lg-4 col-md-12 col-xs-12 mb-3">
              <Card className="h-100">
                <Card.Img variant="top" src={Dev} className="card-image"/>
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{color: '#7d48b2'}}>Développement Web</Card.Title>
                    <ul style={{display:'contents'}}>
                      <li>Création de Site Vitrine</li>
                      <li>Conception de Site Dynamique</li>
                      <li>Mise en place de site e-commerce</li>
                      <li>Projets Web Personnalisés</li>
                    </ul>
                  <div className="mt-auto">
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 col-md-12 col-xs-12 mb-3">
              <Card className="h-100">
                <Card.Img variant="top" src={Ref} className="card-image"/>
                <Card.Body className="d-flex flex-column">
                <Card.Title style={{color: '#7d48b2'}}>Référencement Web/Réseaux Sociaux</Card.Title>
                    <ul style={{display:'contents'}}>
                      <li>Optimisation Technique de votre site</li>
                      <li>Intégration d'outils de suivi de performance comme Google Analytics, Google Search Console, Facebook Pixels,...</li>
                      <li style={{listStyle: 'none', borderTop: '1px solid #000', margin: '5px 0'}}></li>
                      <li>Lancement des campagnes publicitaire Facebook Ads, Google Ads,Instagram Ads, ...</li>
                      <li>Créations de visuels pour réseaux sociaux</li>
                    </ul>
                  <div className="mt-auto">
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 col-md-12 col-xs-12 mb-3">
              <Card className="h-100">
                <Card.Img variant="top" src={Graph} className="card-image"/>
                <Card.Body className="d-flex flex-column">
                <Card.Title style={{color: '#7d48b2'}}>Graphic Design</Card.Title>
                    <ul style={{display:'contents'}}>
                      <li>Design Web</li>
                      <li>Conception d'Identité visuelle</li>
                      <li>Création de Logo</li>
                      <li>Elaboration de Charte Graphique</li>
                      <li>Réalisations de Projets de Design Sur Mesure</li>
                    </ul>
                  <div className="mt-auto">
                  </div>
                </Card.Body>
              </Card>
            </div>
        </div>
        <div className="row mt-5" id="pieds" >
            <h5>Si l'un de mes services vous intéresse, n'hésitez pas à me contacter en utilisant <Link to="/HiringMe">ce lien</Link> ou sur mes réseaux sociaux.</h5>
        </div>
      </div>     
    </div>
  )
}

export default Home;
