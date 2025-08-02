// src/pages/BlogDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogDetailPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/blogposts/${slug}/`
        );
        setBlogPost(response.data);
      } catch (err) {
        console.error(`Error fetching blog post with slug ${slug}:`, err);
        if (err.response && err.response.status === 404) {
          setError("Blog post not found.");
        } else {
          setError("Failed to load blog post. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [slug]); // Re-fetch if slug changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50 pt-20 px-4 text-center">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <Link
          to="/news"
          className="bg-gold-500 text-white px-6 py-2 rounded-full hover:bg-gold-600 transition"
        >
          Back to all Blogs
        </Link>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">No blog post data available.</p>
      </div>
    );
  }

  // Helper for consistent date formatting
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {" "}
      {/* Removed pt-20 here, hero will handle spacing */}
      {/* Blog Detail Page Hero/Banner Section */}
      <section className="relative h-48 md:h-60 overflow-hidden">
        {" "}
        {/* A slightly shorter hero */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }} // Consistent hero background
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-2">
            <p className="text-lg md:text-xl font-light text-gold-200 uppercase tracking-wide">
              Pleroma Springs Blog
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {blogPost.title}{" "}
              {/* Optionally display the post title here, or a generic 'Blog Post' */}
            </h1>
          </div>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white shadow-lg rounded-lg my-8">
        {" "}
        {/* Added bg-white, shadow, rounded corners for article */}
        {blogPost.image && (
          <div className="mb-8 overflow-hidden rounded-lg shadow-xl">
            <img
              src={`http://127.0.0.1:8000${blogPost.image}`}
              alt={blogPost.title}
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
        {/* Removed redundant h1 here if title is in hero, or adjust as h2/h3 */}
        {/* If you put the title in the hero, you might remove this or make it an h2 for SEO structure */}
        {/* <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4 leading-tight">
          {blogPost.title}
        </h1> */}
        <div className="text-sm text-gray-600 mb-8 flex flex-wrap gap-x-4">
          <span>By {blogPost.author}</span>
          <span>•</span>
          <span>Published on {formatDate(blogPost.published_date)}</span>
          {blogPost.updated_date &&
            blogPost.published_date !== blogPost.updated_date && (
              <>
                <span>•</span>
                <span>Last updated on {formatDate(blogPost.updated_date)}</span>
              </>
            )}
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          {/* Using dangerouslySetInnerHTML for HTML content from backend */}
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/news"
            className="bg-gold-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gold-600 transition"
          >
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
