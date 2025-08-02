// src/pages/Contact.jsx
import React, { useState, useEffect } from "react"; // NEW: Import useEffect
import { Link, useLocation } from "react-router-dom"; // NEW: Import useLocation
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal"; // NEW: Import Newsletter Modal

const Contact = () => {
  const location = useLocation(); // NEW: Hook to get current URL information
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false); // NEW: State for newsletter modal

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // NEW: State for Volunteer form
  const [volunteerFormData, setVolunteerFormData] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
    message: "",
  });

  // NEW: State for Partner form
  const [partnerFormData, setPartnerFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    partnershipType: "",
    message: "",
  });

  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";

  // NEW: Effect to handle scrolling to sections based on URL hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove '#'
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
      // If no hash, scroll to top of the page when navigating directly to /contact
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]); // Re-run effect when location changes

  // Handler for main contact form
  const handleMainFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for volunteer form
  const handleVolunteerFormChange = (e) => {
    const { name, value } = e.target;
    setVolunteerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for partner form
  const handlePartnerFormChange = (e) => {
    const { name, value } = e.target;
    setPartnerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Main contact form submission
  const handleMainSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all fields for the main contact form.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/contact/", // Your Django backend API endpoint for general contact
        formData
      );

      console.log("Main form submission successful:", response.data);
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(
        "Main form submission error:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.data) {
        alert(
          `There was an error sending your message: ${JSON.stringify(
            error.response.data
          )}`
        );
      } else {
        alert(
          "There was an error sending your message. Please try again later."
        );
      }
    }
  };

  // NEW: Volunteer form submission handler
  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (
      !volunteerFormData.name ||
      !volunteerFormData.email ||
      !volunteerFormData.areaOfInterest
    ) {
      alert("Please fill in required fields for the volunteer form.");
      return;
    }
    try {
      // You might need a separate endpoint for volunteer applications
      const response = await axios.post(
        "http://127.0.0.1:8000/api/volunteer/", // Placeholder: Create this endpoint in Django
        volunteerFormData
      );
      console.log("Volunteer application successful:", response.data);
      alert("Thank you for your volunteer application! We'll be in touch.");
      setVolunteerFormData({
        name: "",
        email: "",
        phone: "",
        areaOfInterest: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Volunteer form submission error:",
        error.response ? error.response.data : error.message
      );
      alert("Error submitting volunteer application. Please try again.");
    }
  };

  // NEW: Partner form submission handler
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    if (
      !partnerFormData.organizationName ||
      !partnerFormData.contactPerson ||
      !partnerFormData.email ||
      !partnerFormData.partnershipType
    ) {
      alert("Please fill in required fields for the partnership form.");
      return;
    }
    try {
      // You might need a separate endpoint for partner applications
      const response = await axios.post(
        "http://127.0.0.1:8000/api/partner/", // Placeholder: Create this endpoint in Django
        partnerFormData
      );
      console.log("Partnership inquiry successful:", response.data);
      alert("Thank you for your partnership inquiry! We'll review it soon.");
      setPartnerFormData({
        organizationName: "",
        contactPerson: "",
        email: "",
        partnershipType: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Partnership form submission error:",
        error.response ? error.response.data : error.message
      );
      alert("Error submitting partnership inquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Contact Page Hero/Banner Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">Get In Touch</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#ffd700]">
              We'd love to hear from you. Reach out with your inquiries,
              partnership proposals, or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction and Contact Details Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-8">
            Contact Information
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Our team is here to assist you. Feel free to contact us through any
            of the channels below or use the form to send us a direct message.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="flex flex-col items-center bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-[#ffd700]">
              <MapPin size={48} className="text-[#ffd700] mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                Our Location
              </h3>
              <p className="text-teal-700 text-center">
                Pleroma Springs Foundation
                <br />
                14 Nii Noi Kwame St. Dzorwulu
                <br />
                GA-158-0987
                <br />
                Accra, Greater Accra Region
                <br />
                Ghana
              </p>
            </div>
            {/* Phone */}
            <div className="flex flex-col items-center bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-gold-500">
              <Phone size={48} className="text-[#ffd700] mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                Phone
              </h3>
              <p className="text-teal-700">+233 (0)53 015 4632</p>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-gold-500">
              <Mail size={48} className="text-[#ffd700] mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                Email
              </h3>
              <p className="text-teal-700 break-words">
                pleromaspringsfoundation@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
            Send Us a Message
          </h2>
          <form
            onSubmit={handleMainSubmit} // Use handleMainSubmit
            className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-[#ffd700]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleMainFormChange} // Use handleMainFormChange
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleMainFormChange} // Use handleMainFormChange
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-teal-800 text-lg font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleMainFormChange} // Use handleMainFormChange
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                placeholder="Topic of your message"
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-teal-800 text-lg font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleMainFormChange} // Use handleMainFormChange
                rows="6"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#ffd700] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
              >
                Send Message{" "}
                <span className="ml-1 text-xl leading-none">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* NEW: Volunteer Section */}
      <section id="volunteer" className="py-20 bg-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-8">
            Volunteer With Us
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Your time and skills can make a significant difference! Join our
            dedicated team of volunteers and contribute to transforming oral
            health in communities that need it most. Please fill out the form
            below, and we'll connect you with opportunities that match your
            passion.
          </p>
          <form
            onSubmit={handleVolunteerSubmit} // Use handleVolunteerSubmit
            className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-[#ffd700]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="volunteerName"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="volunteerName"
                  name="name"
                  value={volunteerFormData.name}
                  onChange={handleVolunteerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="volunteerEmail"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="volunteerEmail"
                  name="email"
                  value={volunteerFormData.email}
                  onChange={handleVolunteerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="volunteerPhone"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="volunteerPhone"
                  name="phone"
                  value={volunteerFormData.phone}
                  onChange={handleVolunteerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="e.g., +233 24 123 4567"
                />
              </div>
              <div>
                <label
                  htmlFor="areaOfInterest"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={volunteerFormData.areaOfInterest}
                  onChange={handleVolunteerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  required
                >
                  <option value="">Select an area</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Education & Training">
                    Education & Training
                  </option>
                  <option value="Administrative Support">
                    Administrative Support
                  </option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-8">
              <label
                htmlFor="volunteerMessage"
                className="block text-teal-800 text-lg font-medium mb-2"
              >
                Tell us about yourself / What motivates you?
              </label>
              <textarea
                id="volunteerMessage"
                name="message"
                value={volunteerFormData.message}
                onChange={handleVolunteerFormChange}
                rows="4"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                placeholder="Optional: Any specific skills or areas you'd like to contribute?"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#ffd700] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
              >
                Submit Volunteer Form{" "}
                <span className="ml-1 text-xl leading-none">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* NEW: Partner Section */}
      <section id="partner" className="py-20 bg-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-8">
            Partner With Us
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Collaboration is key to expanding our impact. We invite
            organizations, institutions, and individuals who share our vision to
            explore partnership opportunities. Fill out the form below to
            initiate a discussion on how we can work together.
          </p>
          <form
            onSubmit={handlePartnerSubmit} // Use handlePartnerSubmit
            className="bg-teal-50 p-8 rounded-lg shadow-xl border-t-4 border-[#ffd700]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="organizationName"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={partnerFormData.organizationName}
                  onChange={handlePartnerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="Your Organization's Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactPerson"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Contact Person
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={partnerFormData.contactPerson}
                  onChange={handlePartnerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="Name of Primary Contact"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="partnerEmail"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="partnerEmail"
                  name="email"
                  value={partnerFormData.email}
                  onChange={handlePartnerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  placeholder="contact@organization.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="partnershipType"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Type of Partnership
                </label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  value={partnerFormData.partnershipType}
                  onChange={handlePartnerFormChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Program Collaboration">
                    Program Collaboration
                  </option>
                  <option value="Funding/Sponsorship">
                    Funding/Sponsorship
                  </option>
                  <option value="Research">Research</option>
                  <option value="Advocacy">Advocacy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-8">
              <label
                htmlFor="partnerMessage"
                className="block text-teal-800 text-lg font-medium mb-2"
              >
                Briefly describe your proposal or interest
              </label>
              <textarea
                id="partnerMessage"
                name="message"
                value={partnerFormData.message}
                onChange={handlePartnerFormChange}
                rows="4"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-teal-800"
                placeholder="Share your ideas for collaboration..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#ffd700] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#ccaa00] transition-colors shadow-lg"
              >
                Submit Partnership Inquiry{" "}
                <span className="ml-1 text-xl leading-none">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* MODIFIED: Interactive Map Section with Background Image */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/secbg2.webp')", // Ensure this path is correct
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-teal-900 bg-opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-light mb-8">
            Find Us On The Map
          </h2>
          <p className="text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Our office is located in the vibrant city of Accra. Visit us or use
            the map to get directions.
          </p>
          <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-xl border-2 border-teal-200">
            {/* Placeholder for Google Maps Embed. Replace 'YOUR_EMBED_MAP_URL_HERE' with your actual embed code from Google Maps */}
            <iframe
              src="https://maps.app.goo.gl/i37PhSefz3SSTaDM8" // Example map embed URL, replace with your actual location
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pleroma Springs Foundation Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
