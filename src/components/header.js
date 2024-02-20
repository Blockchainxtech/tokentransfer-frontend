import React from "react";
import Logo from "../images/logo.png";


export class Header extends React.Component {

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg" id="navbar_top">
          <div className="container"> 
             <div className="header">
            <div className="green-vector"></div>         
                <div className="logo-rotate">
                    <img
                    className="normal"
                    src={Logo}
                    width="200"
                    alt="Blockchainx"
                    />                
                </div>             
             
                <button className="connect-wallet">Connect Wallet</button>
            </div>  
          </div>
        </nav>
      </header>
    );
  }
}
