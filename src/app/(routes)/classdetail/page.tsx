"use client";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import GymClassDetailSection from "./components/GymClassDetailSection";
import Link from "next/link"; // <-- add this
import ContactSection from "../main/components/ContactSection";
import HeroAbout from "../about-us/components/HeroAbout";
import GymfolioAllClasses from "./components/GymfolioAllClasses";  
import GymTrainersSection from "./components/GymTrainersSection";

const ClassDetail = () => {
  return (
    <main className="pt-20">
        <HeroAbout />
        <GymfolioAllClasses />
      <GymClassDetailSection />
<GymTrainersSection />
        <ContactSection />
    </main>
  );
};

export default ClassDetail;