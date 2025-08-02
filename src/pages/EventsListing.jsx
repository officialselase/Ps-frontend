// src/pages/EventsListing.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventDetailModal from "../components/EventDetailModal";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal"; // NEW: Import NewsletterSubscriptionModal
import { Link } from "react-router-dom"; // NEW: Import Link for CTA buttons

const EventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // NEW: State for controlling the newsletter modal visibility
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events/");
        // Ensure events are sorted by date if not already done by backend
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching all events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllEvents();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Hero Section */}
      <section className="relative h-48 md:h-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-2">
            <p className="text-lg md:text-xl font-light text-[#FFD700] uppercase tracking-wide">
              Our Community in Action
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Upcoming Events
            </h1>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center">
              <p className="text-teal-800 text-xl">Loading events...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center">
              <p className="text-red-600 text-xl">{error}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-103 transition-transform duration-300 group"
                  onClick={() => openEventModal(event)}
                >
                  {event.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={`http://127.0.0.1:8000${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-semibold text-teal-800 mb-3 group-hover:text-[#FFD700] transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-gray-700 text-base mb-4 flex-grow">
                      {event.description.substring(0, 150) + "..."}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-teal-100">
                      <span>
                        {new Date(event.event_date).toLocaleDateString()}
                      </span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">
              No events to display yet.
            </p>
          )}
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

      {/* Event Detail Modal */}
      {isModalOpen && selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={closeEventModal} />
      )}

      {/* NEW: Newsletter Subscription Modal Component */}
      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default EventsListing;
