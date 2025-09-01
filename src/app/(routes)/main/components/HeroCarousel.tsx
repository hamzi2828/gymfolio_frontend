"use client";
import React, { useState } from "react";
import Link from "next/link";

const slides = [
  {
    heading: "Transform Your Body",
    description:
      "Join our state-of-the-art fitness center and experience personalized training programs designed to help you achieve your fitness goals. Our expert trainers and modern equipment will guide you on your journey to a healthier, stronger you.",
    bgImage: "/images/hero.svg",
    ariaLabel: "Fitness training background",
  },
  {
    heading: "Expert Personal Training",
    description:
      "Work with certified personal trainers who will create customized workout plans tailored to your fitness level and goals. From strength training to cardio workouts, we'll help you maximize your potential and see real results.",
    bgImage: "/images/hero.svg",
    ariaLabel: "Personal training background",
  },
  {
    heading: "Premium Fitness Experience",
    description:
      "Experience our world-class facilities with cutting-edge equipment, spacious workout areas, and a motivating atmosphere. Whether you're a beginner or advanced athlete, we have everything you need to succeed on your fitness journey.",
    bgImage: "/images/hero.svg",
    ariaLabel: "Premium gym facility background",
  },
];

const AUTO_INTERVAL = 4000;
const HeroCarousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [autoPlay, active]);

  const pauseAndMove = (moveFn: () => void) => {
    setAutoPlay(false);
    moveFn();
    setTimeout(() => setAutoPlay(true), AUTO_INTERVAL);
  };

  const handlePrev = () =>
    pauseAndMove(() =>
      setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    );
  const handleNext = () =>
    pauseAndMove(() =>
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    );
  const goTo = (idx: number) => pauseAndMove(() => setActive(idx));

  return (
    <section
      id="hero"
      className="hero-section relative overflow-hidden"
      role="banner"
      aria-label="Fitness showcase carousel"
    >
      <div className="hero-carousel relative" id="hero-carousel">
        {slides.map((slide, idx) => (
          <article
            key={idx}
            className={`hero-slide${active === idx ? " active" : ""}`}
            role="tabpanel"
            aria-label={`Slide ${idx + 1} of ${slides.length}`}
            id={`slide-${idx + 1}`}
            style={{ display: active === idx ? "block" : "none" }}
          >
            <div
              className="hero-background-image"
              style={{ backgroundImage: `url('${slide.bgImage}')` }}
              role="img"
              aria-label={slide.ariaLabel}
            >
              <div className="hero-overlay" aria-hidden="true"></div>
              <div className="hero-content">
                <div className="hero-text-content">
                  <header className="hero-header-lines">
                    <h1 className="hero-heading">{slide.heading}</h1>
                    <p className="hero-description">{slide.description}</p>
                  </header>
                  <nav className="hero-buttons" aria-label="Get started">
                    <Link
                      href="/contact-us"
                      className="hero-cta-button"
                      role="button"
                      aria-label="Contact us to get started"
                    >
                      <span className="hero-cta-text">Contact Us</span>
                      <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <nav
        className="hero-navigation"
        role="tablist"
        aria-label="Carousel navigation"
      >
        <button
          className="hero-nav-btn hero-prev-btn"
          aria-label="Previous slide"
          aria-controls="hero-carousel"
          type="button"
          onClick={handlePrev}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.08002"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="hero-indicators" role="tablist" aria-label="Slide indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-indicator${active === idx ? " active" : ""}`}
              data-slide={idx}
              role="tab"
              aria-selected={active === idx}
              aria-controls={`slide-${idx + 1}`}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
              onClick={() => goTo(idx)}
            ></button>
          ))}
        </div>
        <button
          className="hero-nav-btn hero-next-btn"
          aria-label="Next slide"
          aria-controls="hero-carousel"
          type="button"
          onClick={handleNext}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8.91156 20.67C8.72156 20.67 8.53156 20.6 8.38156 20.45C8.09156 20.16 8.09156 19.68 8.38156 19.39L14.9016 12.87C15.3816 12.39 15.3816 11.61 14.9016 11.13L8.38156 4.61002C8.09156 4.32002 8.09156 3.84002 8.38156 3.55002C8.67156 3.26002 9.15156 3.26002 9.44156 3.55002L15.9616 10.07C16.4716 10.58 16.7616 11.27 16.7616 12C16.7616 12.73 16.4816 13.42 15.9616 13.93L9.44156 20.45C9.29156 20.59 9.10156 20.67 8.91156 20.67Z"
              fill="white"
            />
          </svg>
        </button>
      </nav>
    </section>
  );
};

export default HeroCarousel;