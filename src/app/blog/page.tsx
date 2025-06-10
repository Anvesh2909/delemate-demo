"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChakraProvider, Button, Text, Skeleton, Stack, Box } from "@chakra-ui/react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
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

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const loadMoreBlogs = () => {
    setCurrentPage(currentPage + 1);
  };

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = currentBlogs.slice(currentPage === 1 ? 1 : 0);

  return (
      <ChakraProvider>
        <div style={{ fontFamily: "'Merriweather', serif" }} className="bg-white">
          <MaxWidthWrapper className="py-16 max-w-4xl">
            <div className="mb-16 text-center">
              <h1 className="text-5xl font-bold tracking-tight mb-2" style={{ fontFamily: "'GT Super', Georgia, serif" }}>
                DeleMate Blog
              </h1>
              <p className="text-gray-500 text-lg mx-auto max-w-2xl">
                Discover who we are and what we do: insights, stories, and updates from our team.
              </p>
            </div>

            {isLoading ? (
                <Stack spacing={8}>
                  {[...Array(3)].map((_, i) => (
                      <div key={i} className="mb-12">
                        <Skeleton height="24px" width="80%" mb={4} />
                        <Skeleton height="20px" width="50%" mb={6} />
                        <Skeleton height="200px" mb={2} />
                        <Skeleton height="16px" mb={2} />
                        <Skeleton height="16px" mb={2} />
                        <Skeleton height="16px" width="70%" />
                      </div>
                  ))}
                </Stack>
            ) : (
                <>
                  {/* Featured Blog */}
                  {featuredBlog && currentPage === 1 && (
                      <div className="mb-16 border-b border-gray-200 pb-12">
                        <Link href={`blog/${featuredBlog._id}`} className="block">
                          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'GT Super', Georgia, serif" }}>
                            {featuredBlog.title}
                          </h2>
                          <div className="text-gray-500 text-sm mb-4">
                            {featuredBlog.date} · {featuredBlog.min} min read
                          </div>

                          {featuredBlog.link && (
                              <div className="mb-5 aspect-video overflow-hidden">
                                <div
                                    className="w-full h-full bg-center bg-cover"
                                    style={{
                                      backgroundImage: `url('${featuredBlog.link}')`,
                                      height: "400px"
                                    }}
                                />
                              </div>
                          )}

                          <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            {featuredBlog.text?.[0]?.paragraph || ""}
                          </p>

                          <div className="text-green-600">
                            Continue reading →
                          </div>
                        </Link>
                      </div>
                  )}

                  {/* Regular Blogs */}
                  <div className="space-y-12">
                    {regularBlogs.length > 0 ? (
                        regularBlogs.map((blog) => (
                            <div key={blog._id} className="border-b border-gray-100 pb-12 last:border-0">
                              <Link href={`blog/${blog._id}`} className="block group">
                                <div className="flex flex-col md:flex-row gap-6">
                                  <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors" style={{ fontFamily: "'GT Super', Georgia, serif" }}>
                                      {blog.title}
                                    </h3>
                                    <div className="text-gray-500 text-sm mb-3">
                                      {blog.date} · {blog.min} min read
                                    </div>
                                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                                      {blog.text?.[0]?.paragraph || ""}
                                    </p>
                                  </div>

                                  {blog.link && (
                                      <div className="md:w-1/3 h-32 overflow-hidden flex-shrink-0">
                                        <div
                                            className="w-full h-full bg-center bg-cover"
                                            style={{
                                              backgroundImage: `url('${blog.link}')`
                                            }}
                                        />
                                      </div>
                                  )}
                                </div>
                              </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                          <Box p={8} maxW="md" mx="auto" bg="gray.50">
                            <Text fontSize="xl" fontWeight="medium" mb={2}>No stories found</Text>
                            <Text fontSize="md" color="gray.600">Check back later for new content.</Text>
                          </Box>
                        </div>
                    )}
                  </div>

                  {blogs.length > indexOfLastBlog && (
                      <div className="flex justify-center mt-16">
                        <Button
                            onClick={loadMoreBlogs}
                            colorScheme="green"
                            variant="outline"
                            size="lg"
                            borderRadius="full"
                            px={10}
                            fontWeight="normal"
                        >
                          See more stories
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