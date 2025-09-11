"use client";

import React from "react";
import Link from "next/link"; // <-- add this
import "@fortawesome/fontawesome-free/css/all.css";

import ContactSection from "../main/components/ContactSection";
import GymTrainersSection from "./components/GymTrainersSection";
import HeroAbout from "../about-us/components/HeroAbout";
import TrainerDetail from "./components/TrainerDetail";
import Clientreviews from "./components/Clientreviews";
const Trainers = () => {
  return (
    <main className="pt-20">
      
        <HeroAbout />
<TrainerDetail />
           <GymTrainersSection />
            <ContactSection/>
           
         <Clientreviews/>
    </main>
  );
};

export default Trainers;