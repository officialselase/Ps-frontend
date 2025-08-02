// src/pages/Programs.jsx
import React, { useState, useEffect } from "react"; // NEW: Import useState and useEffect
import { Link, useLocation } from "react-router-dom"; // NEW: Import useLocation
import { motion } from "framer-motion";
import { HeartHandshake, BookOpen, Users, Globe } from "lucide-react";
// NEW: Import the NewsletterSubscriptionModal
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";

const Programs = () => {
  const location = useLocation(); // Hook to get current URL information
  // NEW: State for controlling the newsletter modal visibility
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const detailedPrograms = [
    {
      id: "outreach",
      title: "Community Outreach Programs",
      icon: <HeartHandshake size={60} className="text-[#ffd700] mb-4" />,
      description:
        "Our Community Outreach Programs are designed to bring essential oral health education and services directly to underserved populations. We conduct mobile clinics, school programs, and community workshops to ensure everyone has access to foundational dental care and knowledge.",
      activities: [
        "Free dental screenings and basic treatments.",
        "Oral hygiene workshops for children and adults.",
        "Distribution of toothbrushes, toothpaste, and educational materials.",
        "Referrals to advanced care facilities when necessary.",
      ],
      image: "/community.jpg", // Placeholder: Add a relevant image to public folder
      bgImage: "/secbg1.jpg", // Corrected image name if it was a typo, ensure it exists in public folder
      ctaLink: "/contact#volunteer",
      ctaText: "Volunteer for Outreach",
    },
    {
      id: "training",
      title: "Professional Training & Capacity Building",
      icon: <BookOpen size={60} className="text-[#ffd700] mb-4" />,
      description:
        "We empower local healthcare ecosystems by providing advanced training and resources to dental professionals, nurses, and community health workers. Our goal is to build sustainable capacity for oral healthcare delivery within communities.",
      activities: [
        "Workshops on modern dental techniques and equipment.",
        "Training in community-based oral health interventions.",
        "Mentorship programs for emerging dental practitioners.",
        "Donation of essential dental tools and technology to local clinics.",
      ],
      image: "/teaching.webp", // Placeholder: Add a relevant image to public folder
      bgImage: "/484973030_17893927428191299_2052318637217163067_n.webp", // Corrected image name if it was a typo, ensure it exists in public folder
      ctaLink: "/contact#partner",
      ctaText: "Partner on Training",
    },
    {
      id: "research",
      title: "Research & Innovation",
      icon: <Users size={60} className="text-[#ffd700] mb-4" />,
      description:
        "Pleroma Springs Foundation invests in cutting-edge research to identify new methods, technologies, and insights that can revolutionize oral health prevention and treatment, especially for challenging global health issues.",
      activities: [
        "Epidemiological studies on oral diseases in target regions.",
        "Development of cost-effective, sustainable oral health solutions.",
        "Evaluation of program effectiveness and impact.",
        "Collaboration with academic institutions and research centers.",
      ],
      image: "/research.jpg", // Placeholder: Add a relevant image to public folder
      bgImage: "/secbg2.webp", // Placeholder: Add a relevant image to public folder
      ctaLink: "/news", // Link to news/research updates
      ctaText: "Explore Our Research",
    },
    {
      id: "advocacy",
      title: "Advocacy & Policy Influence",
      icon: <Globe size={60} className="text-[#ffd700] mb-4" />,
      description:
        "We work alongside governments, NGOs, and international bodies to champion policies that prioritize oral health within broader public health agendas. Our advocacy aims to create systemic changes that ensure long-term oral health equity for all.",
      activities: [
        "Policy briefs and recommendations to decision-makers.",
        "Participation in national and international health forums.",
        "Raising awareness about the importance of oral health at a policy level.",
        "Building coalitions for unified advocacy efforts.",
      ],
      image: "/advocate.jpg", // Placeholder: Add a relevant image to public folder
      bgImage: "/program-advocacy-bg.jpg", // Placeholder: Add a relevant image to public folder
      ctaLink: "/contact",
      ctaText: "Join Our Advocacy",
    },
  ];

  // NEW: Effect to handle scrolling to sections based on URL hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove '#' from hash
      if (element) {
        // Adjust offset for fixed header (approximate height)
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
      // If no hash, scroll to top of the page when navigating directly to /programs
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]); // Re-run effect when location (including hash) changes

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Programs Page Hero/Banner Section - Shorter Version */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">Our Programs</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#ffd700]">
              Transforming Lives Through Comprehensive Oral Health Initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview/Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-6">
            A Holistic Approach to Oral Health
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed">
            At Pleroma Springs Foundation, our programs are strategically
            designed to address the multifaceted challenges in global oral
            health. From direct community engagement to systemic policy changes,
            we implement sustainable solutions that foster healthier smiles and
            brighter futures for all. Each initiative is carefully planned and
            executed with our partners to ensure maximum impact and long-term
            benefits.
          </p>
        </div>
      </section>

      {/* Individual Program Sections - Alternating Layout with Background Images */}
      {detailedPrograms.map((program, index) => (
        <section
          key={program.id}
          id={program.id} // For anchor links
          className={`relative py-20 bg-cover bg-center ${
            index % 2 === 0 ? "bg-teal-50" : "bg-white"
          }`}
          style={{
            backgroundImage: program.bgImage
              ? `url('${program.bgImage}')`
              : "none",
          }}
        >
          {/* Overlay to ensure text readability on background image sections */}
          {program.bgImage && (
            <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div
              className={`flex flex-col items-center gap-12 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image/Icon side */}
              <div className="lg:w-1/2 flex justify-center items-center">
                {program.image ? (
                  <img
                    src={program.image}
                    alt={program.title}
                    className="rounded-3xl shadow-xl w-full h-auto object-cover max-h-[400px]"
                  />
                ) : (
                  // If no specific image, display the icon prominently
                  <motion.div
                    className="bg-white p-8 rounded-full shadow-lg border-2 border-[#ffd700]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.cloneElement(program.icon, {
                      className: "text-[#ffd700] w-24 h-24",
                    })}
                  </motion.div>
                )}
              </div>
              {/* Text Content side */}
              <div
                className={`lg:w-1/2 text-center ${
                  index % 2 === 0 ? "lg:text-left" : "lg:text-right"
                } ${program.bgImage ? "text-white" : "text-teal-800"}`}
              >
                <h3 className="text-[#ffd700] font-medium text-lg mb-2 uppercase tracking-wider">
                  Our Focus
                </h3>
                <h2 className="text-4xl md:text-5xl font-light mb-6">
                  {program.title}
                </h2>
                <p
                  className={`text-lg leading-relaxed mb-6 ${
                    program.bgImage ? "text-white/90" : "text-teal-700"
                  }`}
                >
                  {program.description}
                </p>
                <ul
                  className={`list-disc pl-5 mb-8 space-y-2 ${
                    program.bgImage ? "text-white/80" : "text-teal-700"
                  } text-left mx-auto lg:mx-0`}
                >
                  {program.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
                <Link
                  to={program.ctaLink}
                  className="inline-flex items-center bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
                >
                  {program.ctaText}{" "}
                  <span className="ml-1 text-xl leading-none">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action Section - Consistent with Homepage and About Us */}
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
            <Link
              to="/contact"
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffd700] hover:text-white hover:border-gold-500 transition-colors shadow-lg"
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

      {/* NEW: Newsletter Subscription Modal Component */}
      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Programs;
