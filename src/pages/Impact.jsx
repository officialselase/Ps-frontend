// src/pages/Impact.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // For triggering animations when in view
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";

// A simple Counter component (optional, for animated numbers)
const Counter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(0); // For requestAnimationFrame

  const controls = useAnimation(); // Not strictly used in this Counter component's useEffect, but kept if you plan to extend
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true, // Only animate once
    threshold: 0.5, // Trigger when 50% of the component is visible
  });

  useEffect(() => {
    if (inView) {
      let start = null;
      const animateCount = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          ref.current = requestAnimationFrame(animateCount);
        }
      };
      ref.current = requestAnimationFrame(animateCount);
    }
    return () => cancelAnimationFrame(ref.current);
  }, [inView, from, to, duration]);

  return <span ref={inViewRef}>{count.toLocaleString()}</span>; // Format with commas
};

const Impact = () => {
  const location = useLocation();
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  // Effect to handle scrolling to sections based on URL hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const headerOffset = 100; // Approximate height of your fixed header
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

  // Placeholder data for Impact Statistics
  // In a real application, this would be fetched from your Django backend API
  const impactStats = [
    {
      id: 1,
      number: 15000,
      label: "Patients Reached",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-[#ffd700] mb-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      ),
    },
    {
      id: 2,
      number: 500,
      label: "Community Workshops",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-[#ffd700] mb-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      ),
    },
    {
      id: 3,
      number: 15,
      label: "Healthcare Partnerships",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-[#ffd700] mb-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      ),
    },
    {
      id: 4,
      number: 10,
      label: "Regions Served",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-[#ffd700] mb-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      ),
    },
  ];

  // Placeholder data for Success Stories
  // In a real application, this would be fetched from your Django backend API
  const successStories = [
    {
      id: 1,
      title: "Bright Smiles in Rural Communities",
      description:
        "Through our mobile clinic, families in remote villages received their first dental check-ups and oral hygiene training. Children are now brushing regularly, leading to a significant decrease in tooth decay.",
      image: "/story1.jpg", // Placeholder: Add relevant image
      author: "Aisha, Village Head",
    },
    {
      id: 2,
      title: "Empowering Local Health Workers",
      description:
        "Our training programs equipped local nurses with essential oral health skills, enabling them to conduct basic screenings and provide preventive care, making quality care more accessible and sustainable.",
      image: "/story2.jpg", // Placeholder: Add relevant image
      author: "Kwame, Trained Nurse",
    },
    {
      id: 3,
      title: "Policy Changes for Better Health",
      description:
        "Our advocacy efforts contributed to a national policy change, allocating more resources to oral health initiatives in schools, impacting thousands of students across the country.",
      image: "/story3.jpg", // Placeholder: Add relevant image
      author: "⁠Mr. Duke Oti Acheampong, Founder & CEO",
    },
  ];

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Impact Page Hero/Banner Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }} // Using bg1.jpg as hero background
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">Our Impact</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#ffd700]">
              Measuring Change, Inspiring Hope, Building Healthier Futures.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction to Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-6">
            Making a Tangible Difference
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed">
            At Pleroma Springs Foundation, our commitment extends beyond
            programs – it's about creating lasting change in oral health
            outcomes. We meticulously track our progress and evaluate the reach
            and effectiveness of every initiative, ensuring transparency and
            accountability in our mission to serve underserved communities.
            Discover the real-world impact of your support.
          </p>
        </div>
      </section>

      {/* --- */}
      {/* Key Statistics/Metrics Section (with blurred background) */}
      <section className="relative py-20 overflow-hidden">
        {" "}
        {/* Added overflow-hidden for blur */}
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/secbg2.webp')", // REPLACE WITH YOUR IMAGE
            filter: "blur(4px)", // Adjust blur intensity as needed
            transform: "scale(1.02)", // Helps hide blur edges
          }}
        ></div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-teal-800/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">
            {" "}
            {/* Text color changed for contrast */}
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <motion.div
                key={stat.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-[#ffd700]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
                <div className="text-5xl font-bold text-teal-800 mb-2">
                  <Counter from={0} to={stat.number} duration={2.5} />+
                </div>
                <p className="text-xl font-semibold text-teal-700">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- */}
      {/* Success Stories/Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-12">
            Stories of Transformation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <motion.div
                key={story.id}
                className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-b-4 border-[#ffd700]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                />
                <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                  {story.title}
                </h3>
                <p className="text-teal-700 leading-relaxed mb-4">
                  "{story.description}"
                </p>
                <p className="text-[#ffd700] font-medium text-sm">
                  — {story.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- */}
      {/* How We Measure Impact Section (now "Our Commitment to Lasting Change" with blurred background) */}
      <section className="relative py-20 overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/secbg1.jpg')", // REPLACE WITH YOUR IMAGE
            filter: "blur(4px)", // Apply the blur here
            transform: "scale(1.02)",
          }}
        ></div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-teal-800/80"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Our Commitment to Lasting Change
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Our impact is not just measured in numbers but in the sustainable
            systems we help build and the lives we transform. We employ rigorous
            monitoring and evaluation frameworks to ensure our programs are
            effective, efficient, and equitable. We are committed to
            transparency and continuous learning, allowing us to adapt and grow
            to meet the evolving needs of the communities we serve.
          </p>
          <Link
            to="/contact" // Or a specific report/resources page later
            className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
          >
            Learn More About Our Methodology
          </Link>
        </div>
      </section>

      {/* --- */}
      {/* Call to Action Section - Consistent with other pages */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/teal')",
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
              to="/contact#volunteer" // Links to the volunteer section on Contact page
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/contact#partner" // Links to the partner section on Contact page
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffd700] hover:text-white hover:border-[#ccaa00] transition-colors shadow-lg"
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

      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Impact;
