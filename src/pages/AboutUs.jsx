// src/pages/AboutUs.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";
import TeamMemberModal from "../components/TeamMemberModal";
import axios from "axios";

const AboutUs = () => {
  const location = useLocation();
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const [teamMembers, setTeamMembers] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true); // FIX: Added useState(true)
  const [errorTeam, setErrorTeam] = useState(null);

  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000/api/";

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoadingTeam(true);
        setErrorTeam(null);
        const response = await axios.get(`${API_BASE_URL}team-members/`);
        setTeamMembers(response.data);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setErrorTeam("Failed to load team members. Please try again later.");
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Effect to handle scrolling to sections based on URL hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const headerOffset = 100;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const openTeamMemberModal = (member) => {
    setSelectedTeamMember(member);
    setIsTeamMemberModalOpen(true);
  };

  const closeTeamMemberModal = () => {
    setIsTeamMemberModalOpen(false);
    setSelectedTeamMember(null);
  };

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* About Us Page Hero/Banner Section (unchanged) */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">
              About Pleroma Springs Foundation
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#ffd700]">
              Our Story, Our Mission, Our Impact.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / History Section (unchanged) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="/about.jpg"
                alt="Pleroma Springs Foundation Story"
                className="rounded-3xl shadow-xl w-full h-auto object-cover max-h-[500px]"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-[#ffd700] font-medium text-lg mb-2 uppercase tracking-wider">
                Our Roots
              </h3>
              <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-6">
                The Story Behind Our Mission
              </h2>
              <p className="text-lg text-teal-700 leading-relaxed mb-6">
                Pleroma Springs Foundation was born from a deep-seated belief
                that everyone deserves access to quality oral healthcare,
                regardless of their location or economic status. Our journey
                began with a small team driven by a singular vision: to bridge
                the gap in oral health disparities globally.
              </p>
              <p className="text-lg text-teal-700 leading-relaxed mb-8">
                From humble beginnings, providing basic dental education and
                supplies in local communities, we have grown into an
                international organization. Our growth is fueled by unwavering
                dedication, the support of our incredible partners, and the
                tangible positive impact we see in the lives of those we serve.
              </p>
              <Link
                to="/impact"
                className="inline-flex items-center text-[#ffd700] hover:text-[#ccaa00] hover:underline transition font-semibold"
              >
                See Our Impact{" "}
                <span className="ml-1 text-xl leading-none">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission, Vision, and Values Section (unchanged) */}
      <section
        id="mission-vision"
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg4.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">
            Our Guiding Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-[#ffd700]"
              whileHover={{ y: -5 }}
            >
              <div className="text-[#ffd700] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                Our Mission
              </h3>
              <p className="text-teal-700 leading-relaxed">
                To transform global oral health by fostering innovative
                education, establishing strategic partnerships, and ensuring
                sustainable access to care for all, with a special focus on
                underserved regions.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-[#ffd700]"
              whileHover={{ y: -5 }}
            >
              <div className="text-[#ffd700] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 3.072 1.15 5.966 3.173 8.164a13.003 13.003 0 005.803 2.073c.112-.036.223-.075.33-.112a13.004 13.004 0 005.679-2.036C20.912 17.034 22 14.14 22 12A12.001 12.001 0 0017.618 7.984z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                Our Vision
              </h3>
              <p className="text-teal-700 leading-relaxed">
                A world where every individual, especially those in underserved
                communities, enjoys optimal oral health, contributing to overall
                well-being and improved quality of life.
              </p>
            </motion.div>

            {/* Values Card */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-[#ffd700]"
              whileHover={{ y: -5 }}
            >
              <div className="text-[#ffd700] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4m0-10l-8-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                Our Values
              </h3>
              <p className="text-teal-700 leading-relaxed">
                Compassion, Innovation, Collaboration, Sustainability, and
                Equity. These values guide every initiative and interaction as
                we strive for excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team / Leadership Section - MODIFIED FOR MODAL TRIGGER */}
      <section id="our-team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-12">
            Meet Our Dedicated Team
          </h2>
          {loadingTeam ? (
            <p className="text-teal-700 text-lg">Loading team members...</p>
          ) : errorTeam ? (
            <p className="text-red-600 text-lg">{errorTeam}</p>
          ) : teamMembers.length === 0 ? (
            <p className="text-teal-700 text-lg">
              No team members to display yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                // MODIFIED: Added onClick to open modal
                <motion.div
                  key={member.id}
                  className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-b-4 border-[#ffd700] cursor-pointer" // Added cursor-pointer
                  whileHover={{ y: -5 }}
                  onClick={() => openTeamMemberModal(member)} // NEW: Click handler
                >
                  <img
                    src={member.profile_picture || "/placeholder-avatar.jpg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-teal-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#ffd700] font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-teal-700 text-sm leading-relaxed">
                    {member.bio}{" "}
                    {/* Display full bio, but consider truncating for card view if too long */}
                  </p>
                  {/* Removed the "Read Bio" Link, as it's now handled by the modal */}
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-12"></div>
        </div>
      </section>

      {/* Call to Action Section - MODIFIED LINKS */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/secbg1.jpg')",
        }}
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
            {/* Modified Link to Volunteer Section */}
            <Link
              to="/contact#volunteer" // Changed to /contact#volunteer
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            {/* Modified Link to Partner Section */}
            <Link
              to="/contact#partner" // Changed to /contact#partner
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffd700] hover:text-white hover:border-gold-500 transition-colors shadow-lg"
            >
              Partner With Us
            </Link>
            <button
              onClick={() => setIsNewsletterModalOpen(true)}
              className="bg-transparent border-2 border-gold-500 text-[#ffd700] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] hover:text-white transition-colors shadow-lg"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Modal Component */}
      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />

      {/* Team Member Modal Component */}
      {selectedTeamMember && (
        <TeamMemberModal
          isOpen={isTeamMemberModalOpen}
          onClose={closeTeamMemberModal}
          member={selectedTeamMember}
        />
      )}
    </div>
  );
};

export default AboutUs;
