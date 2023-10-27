// import React , { useRef } from "react"
import "../../App.css"
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
// // import 'bootstrap/dist/css/bootstrap.min.css'
// // // import emailjs from '@emailjs/browser'

// // class HiringMe extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
      
// //     };

// //     this.handleChange = this.handleChange.bind(this);
// //     this.handleSubmit = this.handleSubmit.bind(this);
// //   }

// //   handleChange(event) {
// //     this.setState({value: event.target.value});
// //   }

// //   handleSubmit(event) {
// //     alert('Un essai a été envoyé : ' + this.state.value);
// //     event.preventDefault();
// //   }

// //   render() {
// //     return (
// //       <div className="ContainerHome" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
// //           <Form onSubmit={this.handleSubmit} style={{margin: "100px", padding:"25px",textAlign: "-webkit-center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)", borderRadius: "15px"}}>
// //           <Form.Group style={{width:"300px", textAlign:"left", lineHeight:"30px"}}>
// //             <Form.Label>Votre adresse mail</Form.Label>
// //             <Form.Control  type="email" placeholder="Enter email" />
// //           </Form.Group>

// //           <Form.Group style={{width:"300px", textAlign:"left", lineHeight:"30px"}}>
// //             <Form.Label>Votre message</Form.Label>
// //             <Form.Control as="textarea" col={2} rows={3} placeholder="Enter votre message" value={this.state.value} onChange={this.handleChange} />
// //           </Form.Group>
          
// //           <Form.Group>
// //             <Button type="submit" >Envoyer</Button>
// //           </Form.Group>
// //         </Form>
// //       </div>
// //     );
// //   }
// // }
// // export default HiringMe

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
    <div className="ContainerHome" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Form ref={form} onSubmit={sendEmail} style={{margin: "100px", padding:"25px",textAlign: "-webkit-center", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)", borderRadius: "15px"}}>
        <Form.Group style={{width:"300px", textAlign:"left", lineHeight:"30px"}}>
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Entrer votre nom" name="from_name" />
        </Form.Group>
        <Form.Group style={{width:"300px", textAlign:"left", lineHeight:"30px"}}>
        <label>Email</label>
        {/* <input type="email" name="user_email" /> */}
        <Form.Control  type="email" placeholder="Entrer votre adresse email" name="to_name"/>
        </Form.Group>
        <Form.Group style={{width:"300px", textAlign:"left", lineHeight:"30px"}}>
        <label>Message</label>
        <Form.Control as="textarea" col={2} rows={3} placeholder="Entrer votre message" name="message" />
        {/* <textarea name="message" /> */}
        </Form.Group>
        <Button type="submit" value="Send" >Envoyer</Button>
      </Form>
    </div>
  );
};
export default HiringMe