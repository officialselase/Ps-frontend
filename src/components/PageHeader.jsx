// src/components/PageHeader.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const PageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [blogsDropdownOpen, setBlogsDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
  const [mobileBlogsDropdownOpen, setMobileBlogsDropdownOpen] = useState(false);

  const location = useLocation();

  // Refs to manage dropdown closing timeouts for desktop hover
  const aboutTimeoutRef = useRef(null);
  const blogsTimeoutRef = useRef(null);

  // Effect for scroll-based header styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileAboutDropdownOpen(false);
    setMobileBlogsDropdownOpen(false);
    // Also close desktop dropdowns when navigating via mobile or external link
    setAboutDropdownOpen(false);
    setBlogsDropdownOpen(false);
  }, [location]);

  // Function to determine if a link is active (for direct links and dropdown children)
  const isActive = (path) => {
    // Check if the current pathname matches the direct path
    if (location.pathname === path) return true;

    // Special handling for parent links that cover multiple child routes
    // For About Us and its sub-pages (like /impact which is technically under About Us section)
    if (path === "/about-us" && (location.pathname.startsWith("/about-us") || location.pathname === "/impact")) return true;

    // For Blogs & Media and its sub-pages (Blogs, Events, Gallery, Resources)
    if (path === "/news" &&
        (location.pathname.startsWith("/news") ||
         location.pathname.startsWith("/events") ||
         location.pathname.startsWith("/gallery") ||
         location.pathname.startsWith("/resources"))) { // Added /resources
        return true;
    }

    // Handle hash links for active state (e.g., /about-us#mission-vision)
    const pathWithoutHash = path.split('#')[0];
    if (location.pathname === pathWithoutHash) {
      // Find the item in navItems or its children to see if it matches the current path
      const checkNavItems = (items) => {
        for (const item of items) {
          if (item.path === path) return true; // Direct match
          if (item.isDropdown && item.children) {
            // Check children recursively
            if (item.children.some(child => child.path === path)) return true;
          }
        }
        return false;
      };
      return checkNavItems(navItems);
    }
    return false;
  };

  // Helper functions for desktop dropdown hover with delay
  const handleMouseEnter = (item) => {
    clearTimeout(item.timeoutRef.current); // Clear any pending close timeout
    item.setOpen(true); // Open the dropdown immediately
  };

  const handleMouseLeave = (item) => {
    // Start a timeout to close the dropdown after 200ms
    item.timeoutRef.current = setTimeout(() => {
      item.setOpen(false);
    }, 200); // Adjust delay (in milliseconds) if needed
  };

  // --- DEFINITION OF ALL NAVIGATION ITEMS ---
  const navItems = [
    { path: "/", label: "Home" },
    {
      label: "About Us",
      path: "/about-us", // Main link for 'About Us' page
      isDropdown: true,
      children: [
        { path: "/about-us#mission-vision", label: "Mission & Vision" },
        { path: "/about-us#our-team", label: "Our Team" },
        { path: "/impact", label: "Our Impact" }, // NEWLY ADDED: Impact page link
      ],
      setOpen: setAboutDropdownOpen,
      isOpen: aboutDropdownOpen,
      setMobileOpen: setMobileAboutDropdownOpen,
      isMobileOpen: mobileAboutDropdownOpen,
      timeoutRef: aboutTimeoutRef,
    },
    { path: "/programs", label: "Programs" },
    {
      label: "Blogs & Media",
      path: "/news", // Main link for 'Blogs & Media' (goes to the blogs listing)
      isDropdown: true,
      children: [
        { path: "/news", label: "Blogs" }, // Points to Blogs.jsx
        { path: "/events", label: "Events" }, // This will now point to EventsListing.jsx
        { path: "/gallery", label: "Gallery" }, // Placeholder for future page
        { path: "/resources", label: "Resources" }, // NEWLY ADDED: Resources page link
      ],
      setOpen: setBlogsDropdownOpen,
      isOpen: blogsDropdownOpen,
      setMobileOpen: setMobileBlogsDropdownOpen,
      isMobileOpen: mobileBlogsDropdownOpen,
      timeoutRef: blogsTimeoutRef,
    },
    { path: "/contact", label: "Contact" },
  ];

  const textColorClass = isScrolled ? "text-teal-800" : "text-white";
  const hoverTextColorClass = "hover:text-gold-500";
  const activeTextColorClass = "text-gold-500"; // Changed to gold for active state

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-teal-50/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png" // Ensure you have your logo.png in the public folder
            alt="Pleroma Springs Foundation Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="text-xl font-bold text-teal-800">PLEROMA</div>
            <div className="text-xs font-medium text-gold-600">
              SPRINGS FOUNDATION
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item, index) => (
            item.isDropdown ? (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
              >
                <Link
                  to={item.path}
                  className={`font-medium flex items-center ${textColorClass} ${hoverTextColorClass} ${
                    isActive(item.path) ? activeTextColorClass : ""
                  }`}
                  onClick={() => {
                    item.setOpen(false); // Close dropdown on click of parent link
                    clearTimeout(item.timeoutRef.current);
                  }}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform ${item.isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </Link>
                {item.isOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 py-2 w-48 bg-white rounded-md shadow-lg z-20 border border-teal-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-4 py-2 text-teal-800 hover:bg-teal-50 hover:text-gold-500 ${
                          location.pathname === child.path.split('#')[0] ? "bg-teal-50 text-gold-500 font-semibold" : "" // Active state for dropdown children
                        }`}
                        onClick={() => {
                            item.setOpen(false); // Close dropdown on child click
                            clearTimeout(item.timeoutRef.current);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium ${textColorClass} ${hoverTextColorClass} ${
                  isActive(item.path) ? activeTextColorClass : ""
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <button className="bg-gold-500 text-white px-4 py-2 rounded-full border-2 border-gold-500 hover:bg-gold-600 hover:border-gold-600 transition">
            Support
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X size={24} className={isScrolled ? "text-teal-800" : "text-white"} />
          ) : (
            <Menu size={24} className={isScrolled ? "text-teal-800" : "text-white"} />
          )}
        </button>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="lg:hidden bg-teal-50/95 backdrop-blur-md p-4 absolute top-20 left-0 w-full shadow-lg">
            {navItems.map((item, index) => (
              item.isDropdown ? (
                <div key={index}>
                  <button
                    className={`flex items-center justify-between w-full py-2 text-teal-800 hover:text-gold-500 ${
                      isActive(item.path) ? activeTextColorClass : ""
                    }`}
                    onClick={() => item.setMobileOpen(!item.isMobileOpen)}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${item.isMobileOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                  {item.isMobileOpen && (
                    <div className="ml-4 border-l border-teal-200 pl-4 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block py-2 text-teal-700 hover:text-gold-500 ${
                            location.pathname === child.path.split('#')[0] ? "text-gold-500 font-semibold" : ""
                          }`}
                          onClick={() => setIsMenuOpen(false)} // Close main menu on child click
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 text-teal-800 hover:text-gold-500 ${
                    isActive(item.path) ? activeTextColorClass : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            <button className="w-full mt-2 bg-gold-500 text-white px-4 py-2 rounded-full border-2 border-gold-500 hover:bg-gold-600 hover:border-gold-600 transition">
              Support
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageHeader;