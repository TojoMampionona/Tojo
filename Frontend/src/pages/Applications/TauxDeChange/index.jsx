import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "../../../App.css"

function TauxDeChange() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const [responseConversion, setResponseConversion] = useState([])
    const convertPressed = () => {
        fetch(`http://data.fixer.io/api/latest?access_key=f5ea895ce7797e0fc60a4f6f123bec3a&base=EUR&`)
        .then((res) => { 
            if (!res.ok) {   
                return {}; // Retourner un objet vide pour éviter les erreurs
            } else {
                    return res.json();
            } 
        })
        .then((result) => {
            setResponseConversion(result);
        })
        .catch((error) => {
            console.error(error); // Gestion de l'erreur
        });
    };
    return (
        <div className="ContainerHome">
            <Form>
                <h2>Taux de change Euro : {formattedDate}</h2>
                <Button onClick={convertPressed}>Regarder</Button>
                {/* Affichage du résultat */}
                {responseConversion.rates ? 
                    (
                        <div>
                            <p>{responseConversion.rates.MGA} Ariary Malagasy (MGA)</p>
                            <p>{responseConversion.rates.USD} Dollars américains (USD)</p>
                            <p>{responseConversion.rates.CHF} Francs suisses (CHF)</p>
                            <p>{responseConversion.rates.GBP} Livres sterling (GBP)</p>
                            <p>{responseConversion.rates.KWD} Dinar koweïtien (KWD)</p>
                            <p>{responseConversion.rates.BHD} Dinar bahreïni (BHD)</p>
                            <p>{responseConversion.rates.OMR} Rial omanais (OMR)</p>  
                            <p>...</p>
                        </div>
                    ) 
                        : 
                    (
                        <div>
                            <p>Loading...</p>
                            <p>Cliquez sur Regarder pour voir le taux de change d'aujourd'hui.</p>
                        </div>
                    )
                }
            </Form>
        </div>
    )
}
export default TauxDeChange