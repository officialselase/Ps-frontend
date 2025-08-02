// src/components/TeamMemberModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TeamMemberModal = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null; // Don't render if not open or no member data

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose} // Close modal when clicking on the overlay
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-xl w-full p-8 relative flex flex-col md:flex-row items-center md:items-start text-center md:text-left text-teal-800"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-teal-500 hover:text-teal-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Member Image */}
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0 md:mr-8">
              <img
                src={member.profile_picture || "/placeholder-avatar.jpg"}
                alt={member.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-gold-500 shadow-md"
              />
            </div>

            {/* Member Details */}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-spagesemibold text-teal-900 mb-2">
                {member.name}
              </h2>
              <p className="text-gold-600 font-medium text-lg mb-4">
                {member.role}
              </p>
              <p className="text-teal-700 leading-relaxed mb-4">{member.bio}</p>

              {/* Social Links (Conditionally rendered) */}
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-gold-500 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    {/* LinkedIn Icon */}
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {member.twitter_url && (
                  <a
                    href={member.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-gold-500 transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    {/* Twitter Icon */}
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.89-.948-2.172-1.545-3.595-1.545-2.719 0-4.922 2.203-4.922 4.922 0 .386.045.76.136 1.117-4.093-.205-7.722-2.165-10.152-5.129-.424.729-.667 1.579-.667 2.484 0 1.71.87 3.213 2.188 4.098-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.693 4.372 3.946 4.827-.411.111-.849.17-1.296.17-.317 0-.626-.031-.929-.086.639 1.956 2.486 3.374 4.695 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.16-.069 2.179 1.396 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.999 0-.211-.005-.422-.01-.633.969-.699 1.83-1.574 2.504-2.571z" />
                    </svg>
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-teal-600 hover:text-gold-500 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    {/* Email Icon - CORRECTED PATH DATA */}
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 11l8-5.116C18 5.4 17.592 5 17.02 5H6.98c-.572 0-.98 0.4-1.017.884L2.003 5.884zM22 7.046v11.908c0 .59-.447 1.046-1 1.046H3c-.553 0-1-.456-1-1.046V7.046l9.39 6.26c.328.218.78.218 1.108 0L22 7.046z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamMemberModal;
