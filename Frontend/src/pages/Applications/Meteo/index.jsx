// import { styled } from "styled-components";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "../../../App.css"

const api = { 
    key: "f707dcd651c713ed804fbc0c99d37e2a",
    base: "https://api.openweathermap.org/data/2.5/",
}

function Meteo () {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    // const [isDataLoading, setDataLoading] = useState(false)
    const [searchError, setSearchError] = useState(false);

    

    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}&units=metric`)
        .then((res) => { 
            if (!res.ok) {
                setSearchError(true);
                return {}; // Retourner un objet vide pour éviter les erreurs
            } else {
                setSearchError(false);
                    return res.json();
            }
            
        })
        .then((result) => {
            setWeather(result);
        })
        .catch((error) => {
            console.error(error); // Gestion de l'erreur
            setSearchError(true);
        });
    };

    return (
        <div className="ContainerHome">
            <Form>
                {/* Titre */}
                <h2>Météo </h2>
            
                {/* Search Box */}
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <Form.Control
                        type='text' placeholder='Tapez votre ville...'
                        style={{width:'250px'}}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={searchPressed}>Rechercher</Button>
                </div>

                {/* Gestion de l'erreur */}
                {searchError && (
                    <p style={{ color: 'red' }}>Ville introuvable. Veuillez entrer une ville valide.</p>
                )}

                {/* Location */}
                {weather.name ? 
                    (<p>Le résultat de votre requête sur : {weather.name} </p>) 
                        : 
                    (<p></p>)
                
                }
                    
                {/* Pays */}
                {weather.sys ? 
                    (<p>Pays : {weather.sys.country}</p>)
                        : 
                    (<p></p>)}

                {/* Température */}
                {weather.main ? 
                    (
                    <div><p>Température : {weather.main.temp} °C</p>
                    <p>Date du jour : {weather.main.temp} °C</p></div>)
                        :
                    (<p></p>)}

                {/* Condition */}
                {weather.weather ? 
                    (<p>Le temps est : {weather.weather[0].main}</p>) 
                        : 
                    (<p></p>)}
                
            </Form>
        </div>
        );
};

export default Meteo