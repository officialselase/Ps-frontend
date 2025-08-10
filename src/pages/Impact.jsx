// src/pages/Impact.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";
import axios from "axios";
import { BASE_API_URL } from "./../constants";

// Counter animation component
const Counter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(0);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
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

  return <span ref={inViewRef}>{count.toLocaleString()}</span>;
};

const Impact = () => {
  const location = useLocation();
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const [impactStats, setImpactStats] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  // Scroll to hash on page load
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

  // Fetch live data from backend
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/impact-stats/`)
      .then((res) => setImpactStats(res.data))
      .catch((err) => console.error("Error fetching impact stats:", err));

    axios
      .get(`${BASE_API_URL}/api/transformation-stories/`)
      .then((res) => setSuccessStories(res.data))
      .catch((err) =>
        console.error("Error fetching transformation stories:", err)
      );
  }, []);

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">Our Impact</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#ffd700]">
              Measuring Change, Inspiring Hope, Building Healthier Futures.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-6">
            Making a Tangible Difference
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed">
            At Pleroma Springs Foundation, our commitment extends beyond
            programs – it's about creating lasting change in oral health
            outcomes...
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/secbg2.webp')",
            filter: "blur(4px)",
            transform: "scale(1.02)",
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">
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
                {stat.icon && (
                  <img
                    src={`${stat.icon}`}
                    alt={stat.title}
                    className="w-12 h-12 mb-3 object-contain"
                  />
                )}
                <div className="text-5xl font-bold text-teal-800 mb-2">
                  {/\d/.test(stat.value) ? (
                    <>
                      <Counter
                        from={0}
                        to={parseInt(stat.value.replace(/\D/g, ""), 10)}
                        duration={2.5}
                      />
                      +
                    </>
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-xl font-semibold text-teal-700">
                  {stat.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
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
                {story.image_url && (
                  <img
                    src={story.image_url}
                    alt={story.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                  />
                )}
                <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                  {story.name}
                  {story.location && ` — ${story.location}`}
                </h3>
                <p className="text-teal-700 leading-relaxed mb-4">
                  "{story.story}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/secbg2.webp')",
        }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Join Our Mission: How You Can Help
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether through volunteering your time, partnering with us...
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact#volunteer"
              className="bg-[#ffd700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/contact#partner"
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
