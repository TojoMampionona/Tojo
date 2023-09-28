import styled from 'styled-components'
import { Link } from 'react-router-dom'
import "../../App.css"

const Title = styled.h1`
padding:30px;
`
const Blabla = styled.p`

`
const Section = styled.div`
  padding: 30px;
  text-align:left
`

function AboutMe() {
    return (
        <div className="ContainerHome">
            <Title>Salama daholo ô</Title>
            <h4>Je suis Randrianarivony Tojo Mampionona</h4>
            <Section>
                <Blabla>Je suis malagasy et je vis à Antananarivo, Madagascar.
                Je suis un jeune développeur passionné par le monde numérique.<br />
                En tant que Malagasy, je suis déterminé à contribuer au domaine de la technologie et du développement. Donc si vous partagez la même passion ou que vous suivez un chemin similaire, n'hésitez pas à entrer en contact avec moi.<br />
                Vous avez également la possibilité de me suivre sur mes réseaux sociaux :<br />
                <ul>
                    <li><Link to="https://www.facebook.com/tojoharena.mampionona/">Facebook</Link></li>
                    <li><Link to="https://www.linkedin.com/in/tojo-mampionona-randrianarivony-6325921a3/">Linkedin</Link></li>
                    <li><Link to="https://github.com/TojoMampionona">Github</Link></li>
                </ul>
                N'hésitez pas à me contacter en utilisant ce <Link to="/HiringMe">formulaire de contact</Link>, ou bien directement sur WhatsApp au numéro suivant : <Link to="tel:+261348631781">+261 34 86 317 81</Link>. Vous pouvez également m'envoyer un e-mail à l'adresse <Link to="mailto:tojoharena@gmail.com">tojoharena@gmail.com</Link>. Je suis ouvert à la communication via ces différentes méthodes, alors choisissez celle qui vous convient le mieux pour entrer en contact avec moi.</Blabla>
            </Section>
            <Section>
                <h3>Mon expérience dans le monde de l'informatique</h3>
                <Blabla>
                    Je suis un jeune développeur web passionné, spécialisé dans la création de sites internet et l'amélioration de l'expérience utilisateur. Mon objectif est de concevoir des sites web uniques et fonctionnels qui répondent à vos besoins commerciaux.<br />
                    😇En plus de mes compétences en développement, je suis également un expert en branding digital. Je peux créer un logo distinctif pour votre entreprise, développer une charte graphique cohérente et renforcer votre identité visuelle. De plus, je suis capable de gérer des campagnes de publicité sponsorisée pour augmenter votre visibilité en ligne.<br />
                    😇Le branding digital est essentiel dans le monde en ligne d'aujourd'hui, et je suis déterminé à vous aider à atteindre vos objectifs en matière de marketing et de présence en ligne. Ensemble, nous pouvons créer une stratégie de branding efficace pour propulser votre entreprise vers le succès.<br />
                    🤑De plus, je suis constamment en apprentissage de nouvelles technologies et de nouveaux domaines en rapport avec mes compétences existantes. Je suis passionné par la recherche et le développement, ce qui me permet de rester à la pointe de l'innovation pour mieux vous servir.<br />
                </Blabla>
            </Section>
        </div>
    )
}

export default AboutMe