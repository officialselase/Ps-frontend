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
        "At Pleroma Springs Foundation, our work begins where the need is greatest within the heart of underserved communities. Our community outreach programs are the core of our mission to promote oral health equity. We take dental education, preventive care, and essential hygiene tools directly to schools, churches, and local gathering points where access to dental care is often limited or nonexistent. Through these outreaches, we:",
      activities: [
        "Educate children and families on the importance of oral hygiene.",
        "Demonstrate proper brushing and flossing techniques",
        "Distribute free dental care kits (toothbrushes and toothpaste).",
        "Conduct basic screenings to identify oral health issues early.",
        "Refer individuals to our facility when needed",
      ],
      conclusion:
        "Each outreach is designed not just as a one-time event, but as a spark for long-term behavior change. We work closely with local leaders, caregivers, and teachers to ensure that the message of oral health continues beyond our visits.",
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
        "At Pleroma Springs Foundation, we understand that lasting change happens when knowledge is shared and local capacity is strengthened. While our current focus is on delivering basic dental education and care through community outreach, we are working toward expanding our impact by supporting the people who can continue this work within their own communities. We aim to:",
      activities: [
        "Equip teachers, caregivers, and volunteers with basic oral health knowledge.",
        "Develop simple training tools for use in schools and churches.",
        "Encourage peer-to-peer education within communities.",
        "Lay the foundation for community-based oral health advocates.",
      ],
      conclusion:
        "Though we are in the early stages of this journey, we are committed to building a strong network of local champions who will carry forward the message of preventive dental care and healthy habits. Our dream is to see communities empowered, not just served so that oral health becomes a shared responsibility and a sustainable priority.",
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
        "We believe that real solutions start with real understanding. While our primary work currently centers on community outreach and preventive care, we recognize that ongoing research and innovation are essential to creating long-term, scalable impact in oral health. We are laying the groundwork to:",
      activities: [
        "Gather insights from our outreach programs to better understand the oral health challenges faced by underserved communities.",
        "Identify gaps in access, knowledge, and behavior that affect oral hygiene practices.",
        "Explore low-cost, culturally appropriate solutions that can improve dental education and care delivery.",
        "Use data to shape future programs and advocate for policy-level attention to oral health equity.",
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
        "We advocate for stronger recognition of oral health at all levels. Our focus includes:",
      activities: [
        "Raising awareness in schools and communities about oral health as a basic need.",
        "Promoting the link between oral health and overall well-being.",
        "Encouraging inclusion of oral health in public health programs.",
        "Engaging local leaders and stakeholders to support better access to care.",
        "Supporting efforts toward policy change for sustainable dental health solutions",
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
      <section className="py-20 bg-teal">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-8">
              A Holistic Approach to Oral Health
            </h2>
            <p className="text-lg leading-relaxed text-teal-700 mb-12">
              At Pleroma Springs Foundation, we believe that oral health is not
              a luxury—it's a vital part of overall well-being. For too many
              communities, dental care remains out of reach, while oral diseases
              silently cause pain, affect school performance, and create
              long-term health complications. That's why we've committed
              ourselves to a comprehensive, grassroots approach that brings
              education, prevention, and care directly to the people who need it
              most.
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">
                Education as the Foundation
              </h3>
              <p className="text-lg leading-relaxed text-teal-700">
                Knowledge is our starting point. Through school and community
                outreach programs, we teach children and families the importance
                of daily oral hygiene, proper nutrition, and early detection of
                dental issues. We transform complex dental information into
                simple, practical steps that empower even the youngest child to
                take charge of their oral health.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">
                Practical Prevention
              </h3>
              <p className="text-lg leading-relaxed text-teal-700">
                Thanks to generous partnerships with Pepsodent Ghana and Colgate
                Ghana, we provide essential tools like toothbrushes and
                toothpaste during our outreaches. These resources enable
                families to adopt better hygiene practices and prevent common
                dental problems such as cavities and gum disease before they
                become serious issues.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">
                Community-Focused Engagement
              </h3>
              <p className="text-lg leading-relaxed text-teal-700">
                We meet communities where they are—both physically and socially.
                Every outreach is tailored to the unique needs of the people we
                serve, involving local schools, caregivers, and volunteers. By
                working within existing community structures, we build trust,
                ensure relevance, and create lasting impact that extends beyond
                our visits.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">
                Connecting Oral and General Health
              </h3>
              <p className="text-lg leading-relaxed text-teal-700">
                We emphasize the vital connection between oral health and
                overall wellness. Our education highlights how untreated dental
                issues can contribute to heart disease, diabetes, and pregnancy
                complications, shifting the community mindset from viewing
                problems as "just a toothache" to understanding oral health as
                integral to full-body care.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">
                Laying the Groundwork for Sustainability
              </h3>
              <p className="text-lg leading-relaxed text-teal-700">
                We're building strong foundations by developing relationships
                with educators, churches, and local health promoters. We train
                and encourage these community leaders to become advocates for
                oral health, ensuring our mission continues and grows even after
                our direct involvement, creating a sustainable network of oral
                health champions.
              </p>
            </div>
          </div>
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

                {/* Add conclusion text */}
                {program.conclusion && (
                  <p
                    className={`text-lg leading-relaxed mb-8 ${
                      program.bgImage ? "text-white/90" : "text-teal-700"
                    }`}
                  >
                    {program.conclusion}
                  </p>
                )}
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
