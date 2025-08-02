// src/components/NewsletterSubscriptionModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const NewsletterSubscriptionModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

  // Configure Axios to include CSRF token for Django
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsSubmitting(true);

    if (!email) {
      setMessage('Please enter your email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Assuming your backend expects a JSON object with an 'email' field
      const response = await axios.post('http://127.0.0.1:8000/api/subscribe/', { email });
      console.log('Subscription successful:', response.data);
      setMessage('Thank you for subscribing!');
      setEmail(''); // Clear the email input
      setTimeout(() => {
        onClose(); // Close modal after a short delay
        setMessage(''); // Clear message after modal closes
      }, 2000);
    } catch (error) {
      console.error('Subscription error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.email) {
        setMessage(`Error: ${error.response.data.email[0]}`); // Display specific email error
      } else {
        setMessage('Failed to subscribe. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-teal-800 hover:text-teal-600 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-light text-teal-800 text-center mb-6">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-teal-700 text-center mb-6">
          Stay updated with our latest news, events, and impact stories.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email-subscribe" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="email-subscribe"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-teal-800"
              placeholder="Enter your email address"
              required
            />
          </div>
          {message && (
            <p className={`text-center text-sm ${message.includes('Error') || message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            className="bg-gold-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionModal;