"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChakraProvider, Button, Text, Link } from "@chakra-ui/react";
import { MdOutlineDateRange } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import data from "../../../public/data/data.json";
import { useState } from "react";

const page = () => {
  // State for managing the current page of blogs
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Calculate the index range for the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);

  // Function to handle the "Load More" button
  const loadMoreBlogs = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <ChakraProvider>
      <MaxWidthWrapper className="mb-12 mt-16 sm:mt-20 flex flex-col items-center text-center">
        <h1 className="max-w-4xl text-3xl font-bold md:text-5xl lg:text-6xl">
          Welcome to DeleMate
        </h1>
        <h3 className="max-w-4xl text-1xl font-semibold md:text-5xl lg:text-6xl">
          Learn Everything about us
        </h3>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Discover Who We Are and What We Do: Your Ultimate Guide to Everything
          DeleMate, From Our Mission to Our Services and Beyond.
        </p>
      </MaxWidthWrapper>
      <div className="flex flex-col gap-y-8 mb-12 mt-16 sm:mt-20 max-w-4xl mx-auto">
        {currentBlogs.map((item, index) => (
          <Link
            key={index}
            href={`blog/${item.title}?title=${encodeURIComponent(item.title)}&text=${encodeURIComponent(
              JSON.stringify(item.text)
            )}&subtitle=${encodeURIComponent(item.subtitle)}`}
            className="block p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MdOutlineDateRange />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CiClock1 />
                  <span>{item.min} min read</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-md text-gray-600 line-clamp-2">
                {item.text[0].paragraph}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button - only show if there are more blogs */}
      {currentBlogs.length === blogsPerPage && currentBlogs.length < data.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMoreBlogs}
            colorScheme="blue"
            size="lg"
            variant="outline"
            className="w-full max-w-xs"
          >
            Load More Blogs
          </Button>
        </div>
      )}
    </ChakraProvider>
  );
};

export default page;
