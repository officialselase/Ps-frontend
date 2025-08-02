// src/components/EventDetailModal.jsx
import React from "react";
import { X } from "lucide-react";
import DOMPurify from "dompurify"; // ADDED: Import DOMPurify

const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

  // Helper function to sanitize HTML content (ADDED)
  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative transform transition-all duration-300 scale-100 opacity-100 m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-teal-800 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-full p-1"
          aria-label="Close event details"
        >
          <X size={24} />
        </button>

        {event.image && (
          <div className="w-full h-64 overflow-hidden rounded-t-lg">
            <img
              src={`http://127.0.0.1:8000${event.image}`}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-light text-teal-800 mb-3 leading-tight">
            {event.title}
          </h2>
          <div className="text-sm text-gray-600 mb-6 flex flex-wrap gap-x-4">
            <span>Date: {new Date(event.event_date).toLocaleDateString()}</span>
            {event.location && (
              <>
                <span>•</span>
                <span>Location: {event.location}</span>
              </>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-6">
            {/* UPDATED: Use dangerouslySetInnerHTML with DOMPurify for HTML content */}
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(event.description),
              }}
            />
          </div>

          {/* Add more event details if available, e.g., registration links, organizers */}
          {/* Example:
          {event.registration_link && (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors mt-4"
            >
              Register Now
            </a>
          )}
          */}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
