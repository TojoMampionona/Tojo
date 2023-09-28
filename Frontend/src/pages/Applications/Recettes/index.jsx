import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import "../../../App.css"

function Recettes() {
    const [recette, setRecette] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);


    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=a65c9f662cc14764a3ff6132accd2a2c&complexSearch`)
        .then((response) => response.json())
        .then((recette) => {
            setRecette(recette);
        })
        .catch(() => {
            console.log('Erreur de requête API :');
        });
    },[]);

    const handleIngredientSelect = (ingredient) => {
        setSelectedIngredient(ingredient);
    }

return (
    <div className="ContainerHome" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> 
            <p>Choisissez votre ingrédients</p>
            <Dropdown style={{width:'300px'}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedIngredient ? 
                            (selectedIngredient.name)
                            :
                            ("Choisir")
                    }
                </Dropdown.Toggle>
                <Dropdown.Menu style={{lineHeight:"10px"}}>
                    {recette.extendedIngredients && recette.extendedIngredients.map((ingredient) => ( 
                        <Dropdown.Item href="#" key={ingredient.id} onClick={() => handleIngredientSelect(ingredient)}>
                            <p>{ingredient.name}</p>
                        </Dropdown.Item>
                    ))} 
                </Dropdown.Menu>
            </Dropdown> 

            {selectedIngredient ? 
                (
                    <Card style={{ width: '18rem', lineHeight:"20px" }} className="mt-2">
                        <Card.Body>
                            <Card.Title>{selectedIngredient.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">ID: {selectedIngredient.id}</Card.Subtitle>
                            <Card style={{textAlign:"left"}}>
                                <ul>
                                    <li>Ingrédients: {selectedIngredient.aisle}</li>
                                    <li>Unité: {selectedIngredient.originalName}</li><br />
                                    <li>{selectedIngredient.original}</li>
                                    <li>{selectedIngredient.originalName}</li>
                                </ul>
                            </Card>
                        </Card.Body>
                    </Card>
                )
                    :
                ("Loading...")
            }
    </div>
)
}
export default Recettes