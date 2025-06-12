"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ChakraProvider, Spinner, Box, Divider } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";

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
            <Spinner size="xl" color="gray.500" />
          </Box>
        </ChakraProvider>
    );
  }

  if (isError || !blog) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-3xl font-serif mb-4">Article not found</h1>
            <p className="text-gray-600 mb-6">We couldn't find the article you're looking for.</p>
            <button
                onClick={() => router.back()}
                className="px-4 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition-colors"
            >
              Go back to articles
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="bg-white min-h-screen" style={{ fontFamily: "'Merriweather', serif" }}>
        <div className="max-w-2xl mx-auto px-5 py-12">
          <button
              onClick={() => router.back()}
              className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors text-sm"
          >
            <IoArrowBack className="mr-2" size={16} /> All articles
          </button>

          <article
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease'
              }}
          >
            <div className="mb-8">
              <div className="text-gray-500 text-sm mb-4">
                {blog.date} · {blog.min} min read
              </div>

              <h1
                  className="text-3xl md:text-4xl mb-3 font-bold tracking-tight leading-tight"
                  style={{ fontFamily: "'GT Super', Georgia, serif" }}
              >
                {blog.title}
              </h1>

              {blog.subtitle && (
                  <h2 className="text-xl text-gray-500 mt-2 mb-6">
                    {blog.subtitle}
                  </h2>
              )}

              {blog.link && (
                  <div className="my-8 relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                        src={blog.link}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                  </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              {blog.text && blog.text.length > 0 ? (
                  blog.text.map((item, index) => (
                      <div
                          key={index}
                          className="mb-8"
                      >
                        {item.heading && (
                            <h2
                                className="text-2xl font-bold mb-4 mt-8"
                                style={{ fontFamily: "'GT Super', Georgia, serif" }}
                            >
                              {item.heading}
                            </h2>
                        )}

                        {item.subheading && (
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ fontFamily: "'GT Super', Georgia, serif" }}
                            >
                              {item.subheading}
                            </h3>
                        )}

                        <p className="text-lg text-gray-800 leading-relaxed mb-5">
                          {item.paragraph}
                        </p>
                      </div>
                  ))
              ) : (
                  <p className="text-lg text-gray-500 italic">No content available for this article.</p>
              )}
            </div>

            <Divider my={10} borderColor="gray.200" />

            <div className="flex justify-between items-center py-6">
              <div>
                <button
                    onClick={() => router.back()}
                    className="text-green-600 hover:text-green-700"
                >
                  More from DeleMate
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
  );
};

export default Page;