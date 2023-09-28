import React from "react";
import { Link } from "react-router-dom"; 
import Baiboly from "../Applications/Baiboly";
import Meteo from "../Applications/Meteo";
import Recettes from "../Applications/Recettes";
import TauxDeChange from "../Applications/TauxDeChange";


const listApplications = [
    {"name": "Baiboly", "components": Baiboly},
    {"name": "Meteo", "components": Meteo},
    {"name": "Recettes", "components": Recettes},
    {"name": "TauxDeChange", "components": TauxDeChange},
];

function Application () {
    return (
        <div className="ContainerHome">
            <h3>Liste des Applications disponibles : </h3>
            <ul>
                {listApplications.map((app, index) => (
                        <li key={index}>
                            <Link to={`/Applications/${app.name}`}>{app.name}</Link>              
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Application