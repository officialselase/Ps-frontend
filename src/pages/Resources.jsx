// src/pages/Resources.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Download, FileText, FileImage, FileArchive, File } from "lucide-react";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "./../constants";

// Helper: Pick icon based on file extension
const getFileIcon = (filename) => {
  if (!filename) return <FileText size={24} className="text-teal-700" />;
  const ext = filename.split(".").pop().toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText size={24} className="text-red-600" />;
    case "doc":
    case "docx":
      return <FileText size={24} className="text-blue-600" />; // Fallback to FileText
    case "xls":
    case "xlsx":
      return <FileText size={24} className="text-green-600" />; // Fallback to FileText
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FileImage size={24} className="text-purple-600" />;
    case "zip":
    case "rar":
      return <FileArchive size={24} className="text-yellow-600" />;
    default:
      return <File size={24} className="text-teal-700" />;
  }
};

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/resources/`);
        setResources(response.data.filter((res) => res.is_public));
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

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
              Knowledge & Support
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Resources & Downloads
            </h1>
          </div>
        </div>
      </section>

      {/* Resources List Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center">
              <p className="text-teal-800 text-xl">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center">
              <p className="text-red-600 text-xl">{error}</p>
            </div>
          ) : resources.length > 0 ? (
            <div className="space-y-6">
              {resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.file ? `${resource.file}` : "#"}
                  target={resource.file ? "_blank" : undefined}
                  rel={resource.file ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!resource.file) {
                      e.preventDefault();
                      alert("Sorry, this file is not available at the moment.");
                    }
                  }}
                  className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 group"
                  aria-label={`Download ${resource.title}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-teal-100 group-hover:bg-teal-200 transition-colors">
                      {getFileIcon(resource.file)}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-teal-800 group-hover:text-[#FFD700] transition-colors">
                        {resource.title}
                      </h2>
                      {resource.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Download
                    size={24}
                    className="text-[#FFD700] group-hover:text-[#CCAA00] transition-colors flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">
              No resources available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
            Whether through volunteering your time, partnering with us, or
            staying informed, your contribution powers our journey toward global
            oral health equity.
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

      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Resources;
