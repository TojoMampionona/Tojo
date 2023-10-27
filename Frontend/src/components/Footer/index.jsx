import { styled } from "styled-components";
import { SocialIcon } from 'react-social-icons'

const FooterContainer = styled.footer`
background-color: #212529;
display: flex;
align-items: center;
color: white;
/*justify-content: center;*/
`

function Footer() {
    return (
        
            <FooterContainer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-6" style={{display:'flex', justifyContent:'center', padding:'15px'}}>
                            <ul style={{listStyle: 'none'}}>
                                <li style={{fontFamily: 'Segoe UI'}}>tojoharena@mail.com</li>
                                <li style={{fontFamily: 'Segoe UI'}}>+261.34.86.317.81</li>
                            </ul>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-6" style={{display:'flex', justifyContent:'center', padding:'15px', fontFamily: 'Segoe UI'}}>
                            <SocialIcon network="facebook" url="https://www.facebook.com/tojoharena.mampionona/"/>
                            <SocialIcon network="linkedin" url="https://www.linkedin.com/in/tojo-mampionona-randrianarivony-6325921a3/"/>
                            <SocialIcon network="github" url="https://github.com/TojoMampionona"/>
                        </div>
                    </div>
                    <div className="row" style={{padding: '15px', justifyContent:'center', borderTop: '1px solid white'}}>
                        Copyright ⓒ Tojo Mampionona 2023
                    </div>
                </div>
            </FooterContainer>
        
    )
}

export default Footer