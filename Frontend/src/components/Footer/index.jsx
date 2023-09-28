import { styled } from "styled-components";

const FooterContainer = styled.footer`
background-color: #212529;
display: flex;
align-items: center;
color: white;
justify-content: center;
height:50px;
`

function Footer() {
    return (
        
            <FooterContainer>
                Copyright Tojo Mampionona 2023
            </FooterContainer>
        
    )
}

export default Footer