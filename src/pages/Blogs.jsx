// src/pages/Blogs.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // NEW: useLocation
import axios from "axios";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]); // NEW: for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // NEW: for search input
  const [selectedCategory, setSelectedCategory] = useState(""); // NEW: for category filter
  const location = useLocation(); // NEW: to read URL params

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Don't block page if categories fail
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(location.search);
        const currentSearch = params.get("search") || "";
        const currentCategory = params.get("category") || "";

        setSearchTerm(currentSearch);
        setSelectedCategory(currentCategory);

        let apiUrl = "http://127.0.0.1:8000/api/blogposts/";
        const queryParams = [];

        if (currentSearch) {
          queryParams.push(`search=${currentSearch}`);
        }
        if (currentCategory) {
          queryParams.push(`category__slug=${currentCategory}`); // Django-filter expects category__slug
        }

        if (queryParams.length > 0) {
          apiUrl += `?${queryParams.join("&")}`;
        }

        const response = await axios.get(apiUrl);
        setBlogPosts(response.data);
      } catch (err) {
        console.error("Error fetching all blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, [location.search]); // Re-fetch when URL search params change

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    window.history.pushState({}, "", `/news?${params.toString()}`); // Update URL without full reload
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (newCategory) params.set("category", newCategory);
    window.history.pushState({}, "", `/news?${params.toString()}`);
  };

  // ... (loading and error states remain the same) ...

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Blog Page Hero/Banner Section */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">
              Our Latest Insights
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#ffd700]">
              Stay updated with news, stories, and educational content from
              Pleroma Springs Foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Blog Posts Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light text-center text-teal-800 mb-12">
            Explore All Articles
          </h2>

          {/* Search and Filter Section */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <form
              onSubmit={handleSearchSubmit}
              className="flex-grow w-full md:w-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-teal-200 focus:outline-none focus:border-[#ffd700] transition-colors text-teal-800 bg-teal-50"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </form>

            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 rounded-full border-2 border-teal-200 focus:outline-none focus:border-[#ffd700] transition-colors text-teal-800 bg-teal-50"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <Link
                  to={`/news/${post.slug}`}
                  key={post.id}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {post.image && (
                      <div className="h-56 w-full overflow-hidden">
                        <img
                          src={`http://127.0.0.1:8000${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      {post.category && ( // Display category if available
                        <p className="text-[#ffd700] text-sm font-semibold mb-2 uppercase">
                          {post.category.name}
                        </p>
                      )}
                      <h3 className="text-2xl font-semibold text-teal-800 mb-3 group-hover:text-[#ffd700] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 text-base mb-4 flex-grow">
                        {post.excerpt ||
                          (post.content
                            ? post.content.substring(0, 150) + "..."
                            : "No description available.")}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-teal-100">
                        <span>By {post.author}</span>
                        <span>
                          {new Date(post.published_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">
              No blog posts to display yet.
            </p>
          )}
        </div>
      </section>

      {/* Consistent Call to Action Section */}
      {/* ... (Your existing CTA section remains unchanged here) ... */}
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

export default Blogs;

