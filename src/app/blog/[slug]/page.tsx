"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ChakraProvider, Spinner, Box, Divider, Badge } from "@chakra-ui/react";
import { MdOutlineDateRange } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

interface Paragraph {
  heading?: string;
  subheading?: string;
  paragraph: string;
}

interface Blog {
  _id: string;
  title: string;
  subtitle?: string;
  link?: string;
  date: string;
  min: number;
  text: Paragraph[];
}

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const fetchBlog = async () => {
      try {
        if (slug) {
          const response = await axios.get(`/api/blog/${slug}`);
          setBlog(response.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
        <ChakraProvider>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
            <Spinner size="xl" />
          </Box>
        </ChakraProvider>
    );
  }

  if (isError || !blog) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="text-5xl text-red-500 mb-4">😕</div>
            <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-xl mb-6">Failed to load the blog post.</p>
            <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="bg-white flex justify-center items-top min-h-screen">
        <article
            className="p-4 sm:p-6 max-w-3xl w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease'
            }}
        >
          <div className="mb-8">
            <button
                onClick={() => router.back()}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-6"
            >
              <IoArrowBack className="mr-2" /> Back to blogs
            </button>

            {blog.link && (
                <div
                    className="w-full h-[250px] sm:h-[350px] rounded-xl mb-8 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${blog.link}')`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                />
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <MdOutlineDateRange />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <CiClock1 />
                <span>{blog.min} min read</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-left text-gray-800 mb-4 font-serif leading-tight">
              {blog.title}
            </h1>

            {blog.subtitle && (
                <h2 className="text-xl sm:text-2xl text-left text-gray-500 mb-4 font-serif">
                  {blog.subtitle}
                </h2>
            )}

            <Divider my={6} borderColor="gray.200" />
          </div>

          <div className="prose prose-lg max-w-none">
            {blog.text && blog.text.length > 0 ? (
                blog.text.map((item, index) => (
                    <div
                        key={index}
                        className="mb-8"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                          transition: `all 0.5s ease ${index * 0.1}s`
                        }}
                    >
                      {item.heading && (
                          <h2 className="text-2xl text-gray-700 font-serif font-bold leading-relaxed mb-4">
                            {item.heading}
                          </h2>
                      )}
                      {item.subheading && (
                          <h3 className="text-lg text-gray-700 font-bold font-serif leading-relaxed mb-3">
                            {item.subheading}
                          </h3>
                      )}
                      <p className="text-lg text-gray-700 font-sans leading-relaxed">
                        {item.paragraph}
                      </p>
                    </div>
                ))
            ) : (
                <p className="text-lg text-gray-500 italic">No content available for this blog.</p>
            )}
          </div>
        </article>
      </div>
  );
};

export default Page;