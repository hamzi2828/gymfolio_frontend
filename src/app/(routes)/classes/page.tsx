"use client";

import React, { useState, useCallback } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import ContactSection from "../main/components/ContactSection";
import GymfolioClass from "./components/GymfolioClass";
import GymfolioAllClasses from "./components/GymfolioAllClasses";
import HeroAbout from "../about-us/components/HeroAbout";
import { GymClass } from "../main/services/gymClassService";

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);

  const handleClassClick = useCallback((gymClass: GymClass) => {
    setSelectedClass(gymClass);
  }, []);

  return (
    <main className="pt-20">

        <HeroAbout />
            <GymfolioClass gymClass={selectedClass} />
            <GymfolioAllClasses onClassClick={handleClassClick} />
            <ContactSection/>


    </main>
  );
};

export default Classes;