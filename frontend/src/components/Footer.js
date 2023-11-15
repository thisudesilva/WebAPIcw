import React from "react";

import Logo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className=" bg-black py-12">
      <div className=" container mx-auto text-white flex justify-between">
        <a href="/">
          <img src={Logo} alt="" />
        </a>
        Copyright &copy; 2023. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
