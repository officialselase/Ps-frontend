// src/pages/Homepage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartHandshake, BookOpen, Users, Globe } from "lucide-react";
import axios from "axios";
// NEW: Import the NewsletterSubscriptionModal
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";
// NEW: Import EventDetailModal for event pop-ups
import EventDetailModal from "../components/EventDetailModal";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const [events, setEvents] = useState([]);
  // State for controlling the newsletter modal visibility
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  // NEW: State for controlling the event modal visibility and selected event data
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const sections = [
    {
      title: "Empowering Global Oral Health",
      subtitle: "Innovative Solutions for Communities",
      desc: "Pleroma Springs Foundation is dedicated to transforming oral health worldwide through sustainable initiatives and education.",
      mission: "Building a healthier future, one smile at a time.",
      bg: "bg-[url('/hero1.jpeg')]", // Placeholder: Update with your specific PSF hero images
    },
    {
      title: "Our Commitment to Impact",
      subtitle: "Driving Change in Oral Wellness",
      desc: "We work tirelessly with partners to deliver accessible, high-quality oral healthcare where it's needed most.",
      mission:
        "Creating lasting legacies of well-being across diverse populations.",
      bg: "bg-[url('/Hero2.jpg')]", // Placeholder: Update with your specific PSF hero images
    },
    {
      title: "Join Our Global Mission",
      subtitle: "Be a Part of the Solution",
      desc: "Your involvement helps us expand our reach and deepen our impact in underserved communities.",
      mission: "Together, we can achieve universal oral health equity.",
      bg: "bg-[url('/hero3.jpeg')]", // Placeholder: Update with your specific PSF hero images
    },
  ];

  // Effect for auto-scrolling hero section
  useEffect(() => {
    const interval = setInterval(
      () => setActiveSection((prev) => (prev + 1) % sections.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  // Effect to fetch latest blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/blogposts/?limit=3"
        );
        const posts = response.data.results || response.data;
        const sortedPosts = posts.sort(
          (a, b) => new Date(b.published_date) - new Date(a.published_date)
        );
        setBlogPosts(sortedPosts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
      }
    };
    fetchBlogPosts();
  }, []);

  // Effect to fetch upcoming events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/events/?limit=3"
        );
        const fetchedEvents = response.data.results || response.data;
        const sortedEvents = fetchedEvents.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );
        setEvents(sortedEvents.slice(0, 3));
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  // NEW: Function to open the event modal
  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  // NEW: Function to close the event modal
  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  const programs = [
    {
      icon: <HeartHandshake size={48} className="text-[#ffd700] mb-4" />,
      title: "Community Outreach Programs",
      description:
        "Providing direct oral health education and services to underserved areas.",
      link: "/programs#outreach",
    },
    {
      icon: <BookOpen size={48} className="text-[#ffd700] mb-4" />,
      title: "Professional Training & Capacity Building",
      description:
        "Equipping local healthcare providers with advanced skills and knowledge.",
      link: "/programs#training",
    },
    {
      icon: <Users size={48} className="text-[#ffd700] mb-4" />,
      title: "Research & Innovation",
      description:
        "Driving forward-thinking research to develop new oral health solutions.",
      link: "/programs#research",
    },
    {
      icon: <Globe size={48} className="text-[#ffd700] mb-4" />,
      title: "Advocacy & Policy Influence",
      description:
        "Working with governments and organizations to shape supportive oral health policies.",
      link: "/programs#advocacy",
    },
  ];

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Enhanced Hero Section (unchanged) */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          key={activeSection}
          className={`absolute inset-0 ${sections[activeSection].bg} bg-cover bg-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 via-teal-800/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-6">
            <div className="text-[#ffd700] font-medium">
              Pleroma Springs Foundation
            </div>
            <h1 className="text-5xl md:text-7xl font-light">
              {sections[activeSection].title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-extralight">
              {sections[activeSection].subtitle}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {sections[activeSection].desc}
            </p>
            <p className="text-sm text-teal-100 italic">
              {sections[activeSection].mission}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about-us"
                className="bg-[#ffd700] text-white px-6 py-3 rounded-full hover:bg-[#ccaa00] transition"
              >
                Learn More
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg[#ccaa00] hover:text-teal-800 transition"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`w-2 h-2 rounded-full ${
                i === activeSection ? "bg-[#ffd700]" : "bg-white/50"
              } hover:bg-[#ccaa00] transition`}
            />
          ))}
        </div>
      </section>

      {/* About Us / Mission Statement Snippet - REDESIGNED (unchanged) */}
      <section className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-6">
                Our Commitment to Healthier Communities
              </h2>
              <p className="text-lg text-teal-700 leading-relaxed mb-6">
                Pleroma Springs Foundation is a non-profit organization
                dedicated to transforming global oral health. We achieve this by
                fostering innovative education, establishing strategic
                partnerships, and ensuring sustainable access to care for all,
                with a special focus on underserved regions.
              </p>
              <Link
                to="/about-us"
                className="inline-flex items-center text-[#ffd700] hover:text-[#ccaa00] transition font-semibold"
              >
                Read More About Us{" "}
                <span className="ml-1 text-xl leading-none">&rarr;</span>
              </Link>
            </div>

            <div className="lg:w-1/2 relative flex justify-center items-center p-4 bg-teal-100 rounded-3xl shadow-xl overflow-hidden min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-teal-50 opacity-70 rounded-[2.5rem] transform -rotate-3 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-gold-100 to-transparent opacity-50 rounded-[2.5rem] transform rotate-2 scale-105"></div>

              <div className="relative w-full max-w-[600px] h-0 pb-[56.25%] bg-teal-300 rounded-2xl overflow-hidden shadow-2xl z-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-teal-800 text-center">
                    <p className="text-2xl font-semibold mb-2">
                      Video Placeholder
                    </p>
                    <p className="text-sm">Embed your impact video here</p>
                    <div className="mt-4 w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 ml-1"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Key Programs / Initiatives Overview - WITH BACKGROUND IMAGE (unchanged) */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-light mb-12">
            Making an Impact: Our Core Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="bg-white/10 p-8 rounded-lg shadow-lg flex flex-col items-center text-center border border-white/20 hover:bg-white/20 transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                {React.cloneElement(program.icon, {
                  className: "text-[#ffd700] mb-4",
                })}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {program.title}
                </h3>
                <p className="text-white/80 mb-4">{program.description}</p>
                <Link
                  to={program.link}
                  className="mt-auto text-[#ffd700] hover:text-[#ccaa00] font-medium flex items-center"
                >
                  Learn More{" "}
                  <span className="ml-1 text-lg leading-none">&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / Statistics / Success Stories - REVERTED TO WHITE BACKGROUND (unchanged) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-teal-800">
          <h2 className="text-4xl md:text-5xl font-light mb-12">
            Our Impact So Far
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-8 bg-teal-50 rounded-lg shadow-md hover:bg-teal-100 transition-colors duration-300 flex flex-col items-center justify-center border border-teal-200"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-6xl font-bold text-[#ffd700] mb-2">50K+</div>
              <p className="text-lg font-medium text-teal-800">
                Lives Positively Affected
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-teal-50 rounded-lg shadow-md hover:bg-teal-100 transition-colors duration-300 flex flex-col items-center justify-center border border-teal-200"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-6xl font-bold text-[#ffd700] mb-2">15+</div>
              <p className="text-lg font-medium text-teal-800">
                Regional Partnerships
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-teal-50 rounded-lg shadow-md hover:bg-teal-100 transition-colors duration-300 text-left border border-teal-200"
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-xl italic mb-4 text-teal-700">
                "Pleroma Springs Foundation brought crucial dental care to our
                village. It's truly transformative!"
              </p>
              <p className="text-sm font-semibold text-teal-600/80">
                — Ama K., Community Leader
              </p>
              <Link
                to="/impact"
                className="mt-4 inline-flex items-center text-[#ffd700] hover:text-[#ccaa00] font-medium"
              >
                Read More Stories{" "}
                <span className="ml-1 text-lg leading-none">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Blogs and Insights Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg3.webp')" }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>{" "}
        {/* Overlay for blur and tint */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-light mb-12">
            Latest Blogs and Insights{" "}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div
                key={post.slug || post.id}
                className="bg-white/10 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-white/20"
                whileHover={{ y: -5 }}
              >
                {post.image && (
                  <img
                    src={`http://127.0.0.1:8000${post.image}`} // Corrected image path for Django media
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 flex-grow">
                    {post.excerpt ||
                      post.content?.substring(0, 150) + "..." ||
                      ""}
                  </p>
                  <Link
                    to={`/news/${post.slug}`}
                    className="mt-auto text-[#ffd700] hover:text-[#ccaa00] font-medium flex items-center"
                  >
                    Read More{" "}
                    <span className="ml-1 text-lg leading-none">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            ))}
            {blogPosts.length === 0 && (
              <p className="text-white/70 col-span-3">
                No blog posts available at the moment.
              </p>
            )}
          </div>
          <div className="mt-12">
            <Link
              to="/news"
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              View All Blogs{" "}
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - MODIFIED TO OPEN MODAL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-teal-800">
          <h2 className="text-4xl md:text-5xl font-light mb-12">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event.id} // Use event.id as key for events
                className="bg-teal-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-teal-200 cursor-pointer" // Added cursor-pointer
                whileHover={{ y: -5 }}
                onClick={() => openEventModal(event)} // Changed to open modal
              >
                {event.image && (
                  <img
                    src={`http://127.0.0.1:8000${event.image}`} // Corrected image path for Django media
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-semibold text-teal-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-teal-700 text-sm mb-2">
                    {event.event_date && ( // Changed from event.date to event.event_date
                      <span>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(event.event_date).toLocaleDateString()}{" "}
                      </span>
                    )}
                    {/* If your backend provides a separate 'time' field, keep this; otherwise, remove or parse from event_date */}
                    {event.time && (
                      <span>
                        <span className="font-semibold">Time:</span>{" "}
                        {event.time}
                      </span>
                    )}
                  </p>
                  <p className="text-teal-700 text-sm mb-4 flex-grow">
                    {event.location && (
                      <span>
                        <span className="font-semibold">Location:</span>{" "}
                        {event.location}
                      </span>
                    )}
                  </p>
                  {/* Removed the Learn More link as clicking the card opens the modal */}
                </div>
              </motion.div>
            ))}
            {events.length === 0 && (
              <p className="text-teal-700 col-span-3">
                No upcoming events at the moment.
              </p>
            )}
          </div>
          <div className="mt-12">
            <Link
              to="/events"
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action (Beyond Donate) - MODIFIED FOR NEWSLETTER BUTTON */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/secbg1.jpg')" }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Join Our Mission: How You Can Help
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether through volunteering your time, partnering with us, or
            staying informed, your contribution powers our journey toward global
            oral health equity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* MODIFIED: Link to Contact page with #volunteer hash */}
            <Link
              to="/contact#volunteer"
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            {/* MODIFIED: Link to Contact page with #partner hash */}
            <Link
              to="/contact#partner"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffd700] hover:text-teal-800 transition-colors shadow-lg"
            >
              Partner With Us
            </Link>
            {/* MODIFIED: Changed Link to Button for Newsletter Modal */}
            <button
              onClick={() => setIsNewsletterModalOpen(true)}
              className="bg-transparent border-2 border-gold-500 text-[#ffd700] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] hover:text-white transition-colors shadow-lg"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Modal Component (as per your request) */}
      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />

      {/* NEW: Event Detail Modal Component (added here for global access) */}
      {isEventModalOpen && selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={closeEventModal} />
      )}
    </div>
  );
};

export default Homepage;
