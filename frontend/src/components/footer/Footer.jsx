import React from "react";
import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, dignissimos quam corrupti reprehenderit voluptate corporis nulla asperiores excepturi, modi necessitatibus harum nam inventore! Omnis, fuga perferendis consequuntur deleniti harum tempore ad hic velit quas ullam sint voluptates numquam quo, unde aliquam excepturi voluptate quidem nulla? Sequi aspernatur molestias perferendis obcaecati?</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 7984242752</li>
            <li>tomato@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright © 2024 Tomato.com - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
