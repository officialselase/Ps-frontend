// src/pages/Gallery.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Link } from "react-router-dom"; // NEW: Import Link
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal"; // NEW: Import NewsletterSubscriptionModal

// Simple Skeleton Loader component
const GalleryItemSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [categories, setCategories] = useState([]); // Added for category filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState("categorized");

  // State for Filtering and Sorting
  const [selectedCategory, setSelectedCategory] = useState("all"); // 'all' or specific category name
  const [sortOption, setSortOption] = useState("date_desc"); // 'date_desc', 'date_asc', 'title_asc', 'title_desc'

  // NEW: State for controlling the newsletter modal visibility
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  useEffect(() => {
    // Fetch categories first
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Don't block gallery if categories fail
      }
    };
    fetchCategories();

    // Then fetch gallery items
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/gallery-items/"
        );
        setGalleryItems(response.data.filter((item) => item.is_published)); // Filter for published items
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("Failed to load gallery items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  // Filter and sort gallery items based on state
  const filteredAndSortedItems = useMemo(() => {
    let filtered = galleryItems;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category && item.category.name === selectedCategory
      );
    }

    // Sort items
    return filtered.sort((a, b) => {
      if (sortOption === "date_desc") {
        return new Date(b.upload_date) - new Date(a.upload_date);
      } else if (sortOption === "date_asc") {
        return new Date(a.upload_date) - new Date(b.upload_date);
      } else if (sortOption === "title_asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "title_desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  }, [galleryItems, selectedCategory, sortOption]);

  // Prepare slides for the Lightbox
  const slides = useMemo(
    () =>
      filteredAndSortedItems.map((item) => ({
        src: `http://127.0.0.1:8000${item.image}`,
        alt: item.title || item.description || "Gallery image",
        title: item.title, // Pass title for caption
        description: item.description, // Pass description for caption
      })),
    [filteredAndSortedItems]
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const openLightboxWith = (index) => {
    setCurrentImageIndex(index);
    setOpenLightbox(true);
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
              Visual Stories
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Our Impact in Images & Videos
            </h1>
          </div>
        </div>
      </section>

      {/* Gallery Filters & View Mode */}
      <section className="py-8 bg-teal-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="category-filter"
              className="text-teal-800 font-medium"
            >
              Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 border border-teal-300 rounded-md bg-white text-teal-800 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Option */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-option" className="text-teal-800 font-medium">
              Sort By:
            </label>
            <select
              id="sort-option"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border border-teal-300 rounded-md bg-white text-teal-800 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="title_desc">Title (Z-A)</option>
            </select>
          </div>

          {/* View Mode (if you want to implement grid/list toggle for example) */}
          {/*
          <div className="flex items-center gap-2">
            <span className="text-teal-800 font-medium">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-[#FFD700] text-white' : 'bg-white text-teal-800 hover:bg-teal-200'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-[#FFD700] text-white' : 'bg-white text-teal-800 hover:bg-teal-200'}`}
            >
              List
            </button>
          </div>
          */}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <GalleryItemSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex items-center justify-center">
              <p className="text-red-600 text-xl">{error}</p>
            </div>
          ) : filteredAndSortedItems.length > 0 ? (
            viewMode === "categorized" ? (
              // Group items by category if categorized view
              Object.entries(
                filteredAndSortedItems.reduce((acc, item) => {
                  const categoryName = item.category
                    ? item.category.name
                    : "Uncategorized";
                  if (!acc[categoryName]) {
                    acc[categoryName] = [];
                  }
                  acc[categoryName].push(item);
                  return acc;
                }, {})
              ).map(([categoryName, items]) => (
                <div key={categoryName} className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-6 border-b-2 border-[#FFD700] pb-2">
                    {categoryName}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-103 transition-transform duration-300"
                        onClick={() =>
                          openLightboxWith(
                            slides.findIndex(
                              (slide) =>
                                slide.src ===
                                `http://127.0.0.1:8000${item.image}`
                            )
                          )
                        }
                      >
                        {item.image && (
                          <div className="w-full h-64 overflow-hidden">
                            <img
                              src={`http://127.0.0.1:8000${item.image}`}
                              alt={
                                item.title ||
                                item.description ||
                                "Gallery image"
                              } // Robust alt text
                              className="w-full h-full object-cover"
                              loading="lazy" // Enable lazy loading
                            />
                          </div>
                        )}
                        {item.title && (
                          <div className="p-4">
                            <p className="text-sm text-gray-700 font-medium">
                              {item.title}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Flat grid for all items if not categorized view (or if no categories)
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-103 transition-transform duration-300"
                    onClick={() =>
                      openLightboxWith(
                        slides.findIndex(
                          (slide) =>
                            slide.src === `http://127.0.0.1:8000${item.image}`
                        )
                      )
                    }
                  >
                    {item.image && (
                      <div className="w-full h-64 overflow-hidden">
                        <img
                          src={`http://127.0.0.1:8000${item.image}`}
                          alt={
                            item.title || item.description || "Gallery image"
                          } // Robust alt text
                          className="w-full h-full object-cover"
                          loading="lazy" // Enable lazy loading
                        />
                      </div>
                    )}
                    {item.title && (
                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium">
                          {item.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            // NEW: Empty state message for overall gallery
            <p className="text-center text-xl text-teal-700">
              No gallery items found matching your selections.
            </p>
          )}
        </div>
      </section>

      {/* NEW: Consistent Call to Action Section */}
      <section className="bg-teal-900 text-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg opacity-90 mb-10">
            Whether through volunteering your time, partnering with us, or
            staying informed, your contribution powers our journey toward global
            oral health equity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact#volunteer"
              className="bg-[#FFD700] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#CCAA00] transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/contact#partner"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ffd700] hover:text-teal-800 transition-colors shadow-lg"
            >
              Partner With Us
            </Link>
            <button
              onClick={() => setIsNewsletterModalOpen(true)}
              className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FFD700] hover:text-white transition-colors shadow-lg"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        index={currentImageIndex}
        // Accessibility considerations for Lightbox:
        // 'yet-another-react-lightbox' is generally well-designed for a11y.
        // It provides keyboard navigation (arrows, esc), focus management.
        // Ensure your image `alt` and `title` props are descriptive.
      />

      {/* NEW: Newsletter Subscription Modal Component */}
      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Gallery;
