// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// --- Components (Keep these essential layout components) ---
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import NewsletterSubscriptionModal from "./components/NewsletterSubscriptionModal";

// --- Pages (Import all your page components) ---
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import Programs from "./pages/Programs";
import Impact from "./pages/Impact";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";

// --- New Imports for Future Pages ---
import EventsListing from "./pages/EventsListing"; // For the /events route (will be created next)
import Gallery from "./pages/Gallery"; // For the /gallery route (will be created later)
import BlogDetailPage from "./pages/BlogDetailPage"; // For individual blog posts
import Resources from "./pages/Resources"; // For the /resources route (will be created next)

const App = () => {
  return (
    <Router>
      {/* Container for consistent background and text color across the app */}
      <div className="min-h-screen bg-teal-50 text-teal-800">
        <PageHeader /> {/* Header is global, so outside Routes */}
        <main>
          {" "}
          {/* Use <main> for semantic content area */}
          <Routes>
            {/* --- Core Pages --- */}
            <Route path="/" element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/news" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            {/* --- Newly Active Routes --- */}
            <Route path="/news/:slug" element={<BlogDetailPage />} />{" "}
            {/* Individual blog post */}
            <Route path="/events" element={<EventsListing />} />{" "}
            {/* Events Listing page */}
            <Route path="/resources" element={<Resources />} />{" "}
            {/* Resources page */}
            <Route path="/gallery" element={<Gallery />} /> {/* Gallery page */}
            {/* --- Fallback Route: Redirects any unknown paths back to the homepage --- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer /> {/* Footer is global, so outside Routes */}
        {/* Newsletter Modal is now triggered from Homepage and placed within Homepage */}
        {/* <NewsletterSubscriptionModal /> */}
      </div>
    </Router>
  );
};

export default App;
