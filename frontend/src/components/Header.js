// Header.js
import React, { useState, useEffect } from "react";

import Logo from "../assets/img/logo.png";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [header, setHeader] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);

    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="px-6 container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        <a href="/">
          <img className="w-[200px]" src={Logo} alt="Logo" />
        </a>
        <nav
          className={`${
            header ? "text-primary" : "text-white"
          } flex gap-x-4 lg:gap-x-8 tracking-[3px] text-[15px] font-tertiary items-center uppercase`}
        >
          <a href="/home" className="hover:text-accent transition">
            Home
          </a>
          <a href="/activities" className="hover:text-accent transition">
            Activities
          </a>

          <a
            href="/cart"
            className="hover:text-accent transition flex items-center"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-1" />
            Cart
          </a>

          {userName ? (
            <span className="hover:text-accent transition">{userName}</span>
          ) : (
            <a
              href="/login"
              className="hover:text-accent transition flex items-center"
            >
              <UserCircleIcon className="h-5 w-5 mr-1" />
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
