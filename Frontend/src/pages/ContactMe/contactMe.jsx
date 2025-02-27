// import React , { useRef } from "react"
import "../../App.css"
import "../ContactMe/contactMe.css"
import Terre from '../../assets/icons/terre.svg'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


function HiringMe  ()  {

  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dwpr0cg', 'template_ipx6f98', form.current, 'PTpJhdZw6a49hRkKC')
      .then((result) => {
          console.log(result.text);
          alert('Votre message a été envoyé avec succès!');
          form.current.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="ContainerForm">
      <img src={Terre} className="App-logo"  alt="AstroBlast"   height={'150px'}/>
      <form ref={form} onSubmit={sendEmail}>
        <div>
          <label htmlFor="from_name">Nom</label>
          <input type="text" id="from_name" name="from_name" placeholder="Entrer votre nom" />
        </div>
        <div>
          <label htmlFor="to_name">Email</label>
            <input type="email" id="to_name" name="to_name" placeholder="Entrer votre adresse email" />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Entrer votre message" rows="3"></textarea>
        </div>
        <button type="submit" value="Send" >Envoyer</button>
      </form>
    </div>
  );
};
export default HiringMe