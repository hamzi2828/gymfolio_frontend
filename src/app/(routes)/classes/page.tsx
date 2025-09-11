"use client";

import React from "react";
import Link from "next/link"; // <-- add this
import "@fortawesome/fontawesome-free/css/all.css";
import ContactSection from "../main/components/ContactSection";
import GymfolioClass from "./components/GymfolioClass";
import GymfolioAllClasses from "./components/GymfolioAllClasses";
import HeroAbout from "../about-us/components/HeroAbout";
const Classes = () => {
  return (
    <main className="pt-20">
      
        <HeroAbout />
            <GymfolioClass />
            <GymfolioAllClasses />
            <ContactSection/>
           
         
    </main>
  );
};

export default Classes;