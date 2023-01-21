import React from "react";

//! Css
import './Footer.css';

//! Images
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download App for mobile and IOS</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is Our First Priority</p>
        <p>CopyRights &copy; Aditya Patil</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="www.instagram.com">Instagram</a>
        <a href="www.instagram.com">Instagram</a>
        <a href="www.instagram.com">Instagram</a>
      </div>
    </footer>
  );
}

export default Footer;
