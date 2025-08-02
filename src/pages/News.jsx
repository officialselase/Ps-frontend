// src/pages/News.jsx
import React from "react";

const News = () => {
  return (
    <div className="min-h-screen bg-teal-50 text-teal-800 pt-20">
      {" "}
      {/* pt-20 to clear fixed header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl md:text-6xl font-light text-center mb-8">
          Latest News from Pleroma Springs
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-lg text-teal-700 mb-4">
            This is the placeholder content for the **News** page. This section
            will feature your latest articles, updates, press releases, and blog
            posts.
          </p>
          <p className="text-md text-teal-600 italic">
            "Keep your audience informed about your activities, insights, and
            achievements."
          </p>
          <div className="mt-8">
            <a
              href="/programs"
              className="bg-gold-500 text-white px-6 py-3 rounded-full hover:bg-gold-600 transition"
            >
              Discover Our Programs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
