"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const TrainerDetail = () => {
  const badgeText = "Meet Our Trainers";
  const heading = "The Best Fitness Gym in Town";

  const cardImage = "/images/trainer-1.svg";
  const userName = "Alex Johnson";
  const role = "Head Trainer & Fitness Coach";

  const biography =
    "Alex has over 10 years of experience in fitness coaching and personal training. He specializes in strength training, functional fitness, and overall wellness programs that help clients achieve their goals safely and effectively.";

  const achievements = [
    "Certified Personal Trainer (CPT)",
    "Nutrition Specialist",
    "Trained over 500+ clients worldwide",
    "Featured in Fitness Pro Magazine",
  ];

  const contactInfo = {
    email: "alex.johnson@gym.com",
    phone: "+1 (123) 456-7890",
    location: "New York, USA",
  };

  const social = {
    twitter: "https://twitter.com/alexjohnson",
    instagram: "https://instagram.com/alexjohnson",
    facebook: "https://facebook.com/alexjohnson",
    youtube: "https://youtube.com/@alexjohnson",
  };

  return (
    <div className="trainer-detail-about-us p-6 sm:p-10 lg:p-20 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-start">
      <div className="trainer-detail-frame-left flex flex-col gap-8 lg:gap-16 items-start justify-center flex-1 w-full">
        {/* Header Section */}
        <div className="trainer-detail-header flex flex-col gap-4 items-center justify-center w-full">
          {/* Badge */}
          <div className="trainer-detail-badge rounded-full border border-transparent px-2 py-1 flex flex-row gap-2 items-center justify-center">
            <div className="trainer-detail-icon w-2 h-2 bg-lime-600 rounded-full flex-shrink-0"></div>
            <div className="trainer-detail-badge-text text-gray-400 text-center font-semibold text-sm leading-5">
              {badgeText}
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="trainer-detail-heading text-black text-center font-bold text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight uppercase opacity-92 w-full flex items-center justify-center">
            {heading}
          </h1>
        </div>

        {/* Main Content Row */}
        <div className="trainer-detail-frame-content flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-start w-full">
          {/* Team Card */}
          <div className="trainer-detail-team-card bg-gray-50 rounded-lg border border-gray-200 flex flex-col w-full sm:w-[400px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden flex-shrink-0">
            <div className="trainer-detail-card-bg flex-1 relative">
              <Image
                src={cardImage}
                alt="Trainer"
                fill
                className="object-cover"
              />
            </div>

            <div className="trainer-detail-context p-4 flex flex-col gap-4 items-center justify-center">
              <div className="trainer-detail-names flex flex-col items-center justify-center">
                <div className="trainer-detail-user-name text-lime-700 text-center font-bold text-base leading-6">
                  {userName}
                </div>
                <div className="trainer-detail-role text-gray-700 text-center font-normal text-sm leading-6">
                  {role}
                </div>
              </div>

              {/* Social Media */}
              <div className="trainer-detail-social-media flex justify-center gap-3">
                <Link
                  href={social.twitter}
                  className="gymfolio7-social-icon hover:scale-110 focus:scale-110 focus:outline-none"
                  aria-label={`Follow ${userName} on Twitter`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-x-twitter text-lg"></i>
                </Link>
                <Link
                  href={social.instagram}
                  className="gymfolio7-social-icon hover:scale-110 focus:scale-110 focus:outline-none"
                  aria-label={`Follow ${userName} on Instagram`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </Link>
                <Link
                  href={social.facebook}
                  className="gymfolio7-social-icon hover:scale-110 focus:scale-110 focus:outline-none"
                  aria-label={`Follow ${userName} on Facebook`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook text-lg"></i>
                </Link>
                <Link
                  href={social.youtube}
                  className="gymfolio7-social-icon hover:scale-110 focus:scale-110 focus:outline-none"
                  aria-label={`Follow ${userName} on YouTube`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube text-lg"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="trainer-detail-context2 flex flex-col gap-6 lg:gap-8 items-start justify-start flex-1 w-full">
            {/* Biography */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Biography</h2>
              <p className="text-gray-600">{biography}</p>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Achievements</h2>
              <ul className="list-disc pl-5 text-gray-600">
                {achievements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
              <p className="text-gray-600">📧 {contactInfo.email}</p>
              <p className="text-gray-600">📞 {contactInfo.phone}</p>
              <p className="text-gray-600">📍 {contactInfo.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
