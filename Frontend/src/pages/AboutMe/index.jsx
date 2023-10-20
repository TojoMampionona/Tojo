
import { Link } from 'react-router-dom'
import "../../App.css"

function AboutMe() {
    return (
        <div className="ContainerHome">
            <div style={{textAlign: 'left'}}>
                <p>Je suis un jeune développeur web passionné, spécialisé dans la création de sites internet et l'amélioration de l'expérience utilisateur. Mon objectif est de concevoir des sites web uniques et fonctionnels qui répondent à vos besoins commerciaux.</p>
                <p>😇En plus de mes compétences en développement web, je possède une expertise en branding digital. Je peux créer un logo distinctif pour votre entreprise, développer une charte graphique cohérente et renforcer votre identité visuelle. De plus, je suis capable de gérer des campagnes de publicité sponsorisée pour augmenter votre visibilité en ligne.</p>
                <p>😇Le branding digital est essentiel dans le monde en ligne d'aujourd'hui, et je suis déterminé à vous aider à atteindre vos objectifs en matière de marketing et de présence en ligne. Ensemble, nous pouvons créer une stratégie de branding efficace pour propulser votre entreprise vers le succès.</p>
                <p>🤑De plus, je suis constamment en apprentissage de nouvelles technologies et de nouveaux domaines en rapport avec mes compétences existantes. Je suis passionné par la recherche et le développement, ce qui me permet de rester à la pointe de l'innovation pour mieux vous servir.<br /></p>
            </div>
            <div style={{textAlign: 'left'}}>
                <p>Si vous partagez la même passion ou que vous suivez un chemin similaire, n'hésitez pas à entrer en contact avec moi.<br />
                Vous avez également la possibilité de me suivre sur mes réseaux sociaux :<br /></p>
                <ul>
                    <li><Link to="https://www.facebook.com/tojoharena.mampionona/">Facebook</Link></li>
                    <li><Link to="https://www.linkedin.com/in/tojo-mampionona-randrianarivony-6325921a3/">Linkedin</Link></li>
                    <li><Link to="https://github.com/TojoMampionona">Github</Link></li>
                </ul>
                <p>N'hésitez pas à me contacter en utilisant ce <Link to="/HiringMe">formulaire de contact</Link></p>
            </div>
        </div>
    )
}

export default AboutMe