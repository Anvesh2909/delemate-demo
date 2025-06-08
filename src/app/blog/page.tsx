"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChakraProvider, Button, Text, Spinner, Skeleton, Stack, Divider, Badge, Box } from "@chakra-ui/react";
import { MdOutlineDateRange } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Paragraph {
  heading?: string;
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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    setIsVisible(true);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate the index range for the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Function to handle the "Load More" button
  const loadMoreBlogs = () => {
    setCurrentPage(currentPage + 1);
  };

  // Featured blog is the first blog in the list
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  // Remaining blogs excluding the featured one
  const regularBlogs = currentBlogs.slice(currentPage === 1 ? 1 : 0);

  return (
      <ChakraProvider>
        <div>
          <MaxWidthWrapper className="py-16 sm:py-20">
            <div
                className="flex flex-col items-center text-center"
                style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease'}}
            >
              <Badge colorScheme="blue" fontSize="sm" mb={4}>OUR BLOG</Badge>
              <h1 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-black">
                Welcome to DeleMate
              </h1>
              <div className="w-20 h-1 bg-blue-500 my-6"></div>
              <h3 className="max-w-4xl text-xl font-semibold md:text-2xl mb-4">
                Learn Everything about us
              </h3>
              <p className="mt-2 max-w-prose text-zinc-600 sm:text-lg">
                Discover Who We Are and What We Do: Your Ultimate Guide to Everything
                DeleMate, From Our Mission to Our Services and Beyond.
              </p>
            </div>
          </MaxWidthWrapper>

          <MaxWidthWrapper className="pb-20">
            {isLoading ? (
                <Stack spacing={8}>
                  {[...Array(3)].map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl overflow-hidden p-1">
                        <Skeleton height="200px" />
                        <div className="p-5">
                          <Skeleton height="24px" width="40%" mb={4} />
                          <Skeleton height="16px" mb={2} />
                          <Skeleton height="16px" mb={2} />
                          <Skeleton height="16px" width="70%" />
                        </div>
                      </div>
                  ))}
                </Stack>
            ) : (
                <>
                  {/* Featured Blog */}
                  {featuredBlog && currentPage === 1 && (
                      <div
                          className="mb-12"
                          style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease'}}
                      >
                        <Link href={`blog/${featuredBlog._id}`} className="block">
                          <div className="bg-white border-0 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="h-[300px] w-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center relative">
                              {featuredBlog.link ? (
                                  <Box
                                      className="absolute inset-0 bg-center bg-cover"
                                      style={{
                                        backgroundImage: `url('${featuredBlog.link}')`,
                                        opacity: 0.8
                                      }}
                                  />
                              ) : (
                                  <div className="text-5xl font-bold text-blue-200">DeleMate</div>
                              )}
                              <div className="absolute top-4 left-4">
                                <Badge colorScheme="blue" fontSize="md">Featured</Badge>
                              </div>
                            </div>
                            <div className="p-8">
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                  <MdOutlineDateRange />
                                  <span>{featuredBlog.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CiClock1 />
                                  <span>{featuredBlog.min} min read</span>
                                </div>
                              </div>
                              <h3 className="text-2xl font-bold mb-3 text-gray-800">{featuredBlog.title}</h3>
                              <p className="text-gray-600 mb-5 line-clamp-3">
                                {featuredBlog.text?.[0]?.paragraph || ""}
                              </p>
                              <span className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          Read more <FaArrowRight className="ml-2" size={14} />
                        </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                  )}

                  <Divider my={8} />

                  {/* Regular Blogs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularBlogs.length > 0 ? (
                        regularBlogs.map((blog, index) => (
                            <div
                                key={blog._id}
                                style={{
                                  opacity: isVisible ? 1 : 0,
                                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                  transition: `all 0.3s ease ${index * 0.1}s`
                                }}
                            >
                              <Link href={`blog/${blog._id}`} className="block h-full">
                                <div className="bg-white h-full rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 overflow-hidden flex flex-col">
                                  <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
                                    {blog.link ? (
                                        <div
                                            className="h-full w-full bg-center bg-cover"
                                            style={{
                                              backgroundImage: `url('${blog.link}')`
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                          <span className="text-3xl font-bold text-blue-100">DM</span>
                                        </div>
                                    )}
                                  </div>
                                  <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                      <div className="flex items-center gap-1">
                                        <MdOutlineDateRange size={12} />
                                        <span>{blog.date}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <CiClock1 size={12} />
                                        <span>{blog.min} min read</span>
                                      </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                                      {blog.text?.[0]?.paragraph || ""}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-auto cursor-pointer">
                              Read article
                            </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-16">
                          <div className="bg-blue-50 rounded-lg p-8 max-w-md mx-auto">
                            <Text fontSize="xl" fontWeight="medium" mb={2}>No blogs found</Text>
                            <Text fontSize="md" color="gray.600">Check back later for new content!</Text>
                          </div>
                        </div>
                    )}
                  </div>

                  {blogs.length > indexOfLastBlog && (
                      <div className="flex justify-center mt-12">
                        <Button
                            onClick={loadMoreBlogs}
                            colorScheme="blue"
                            size="lg"
                            px={8}
                            borderRadius="full"
                            _hover={{ transform: 'translateY(-2px)' }}
                            transition="all 0.2s"
                            boxShadow="md"
                        >
                          Load More Articles
                        </Button>
                      </div>
                  )}
                </>
            )}
          </MaxWidthWrapper>
        </div>
      </ChakraProvider>
  );
};

export default Page;