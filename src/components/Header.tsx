"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.css";
import { getCurrentUser, removeToken } from "@/helper/helper";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    try {
      removeToken();
    } finally {
      closeMobileMenu();
      router.replace("/");
    }
  };

  // Only routes that exist
  const routes = {
    home: "/",
    about: "/about-us",
    packages: "/packages",
    classes: "/classes",
    trainers: "/trainers",
    contact: "/contact-us",
    blogs: "/blogs",
    auth: "/authentication",
    userDetails: "/user-detail",
  };

  const navItems = [
    { key: "home", label: "Home", href: routes.home },
    { key: "about", label: "About Us", href: routes.about },
    { key: "packages", label: "Packages", href: routes.packages },
    { key: "classes", label: "Our Classes", href: routes.classes },
    { key: "trainers", label: "Our Trainers", href: routes.trainers },
    { key: "contact", label: "Contact Us", href: routes.contact },
    { key: "blogs", label: "Blogs", href: routes.blogs },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed w-full top-0 z-50">
      <nav className="nav-bar">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <Link
            href={routes.home}
            className="logo no-underline hover:opacity-80 transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-label="Go to homepage"
          >
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} style={{ verticalAlign: "middle" }} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="menu" role="menubar">
          {navItems.map((item) => (
            <li key={item.key} className="nav-item" role="none">
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                role="menuitem"
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="right-section">
          {getCurrentUser() ? (
            <>
              <Link
                href={routes.userDetails}
                className="cta-button for-mobile hidden md:flex"
                aria-label="View your account"
                onClick={closeMobileMenu}
              >
                <span className="cta-text">My Account</span>
                <FaArrowRight size={15} aria-hidden="true" className="text-black" />
              </Link>
              <button
                type="button"
                className="cta-button for-mobile hidden md:flex ml-2"
                aria-label="Logout"
                onClick={handleLogout}
              >
                <span className="cta-text">Logout</span>
                <i className="fas fa-sign-out-alt ml-2" aria-hidden="true" />
              </button>
            </>
          ) : (
            <Link
              href={routes.contact}
              className="cta-button for-mobile hidden md:flex"
              aria-label="Contact Us"
              onClick={closeMobileMenu}
            >
              <span className="cta-text">Contact Us</span>
              <FaArrowRight size={15} aria-hidden="true" className="text-black" />
            </Link>
          )}

          <button
            className="mobile-menu-button lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`} role="menu">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.key} className="mobile-nav-item" role="none">
                <Link
                  href={item.href}
                  className={`mobile-nav-link ${isActive(item.href) ? "active" : ""}`}
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-700">
            {getCurrentUser() ? (
              <>
                <Link
                  href={routes.userDetails}
                  className="cta-button w-full justify-center mb-3"
                  aria-label="View your account"
                  onClick={closeMobileMenu}
                >
                  <span className="cta-text">My Account</span>
                  <FaArrowRight size={15} aria-hidden="true" className="text-black" />
                </Link>
                <button
                  type="button"
                  className="cta-button w-full justify-center"
                  aria-label="Logout"
                  onClick={handleLogout}
                >
                  <span className="cta-text">Logout</span>
                  <i className="fas fa-sign-out-alt ml-2" aria-hidden="true" />
                </button>
              </>
            ) : (
              <Link
                href={routes.contact}
                className="cta-button w-full justify-center"
                aria-label="Contact Us"
                onClick={closeMobileMenu}
              >
                <span className="cta-text">Contact Us</span>
                <FaArrowRight size={15} aria-hidden="true" className="text-black" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;