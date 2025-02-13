"use client";

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface TextObject {
  paragraph: string;
  heading: string;
  subheading: string;
}

const Page = () => {
  const searchParams = useSearchParams();

  // Get title and text from the query string
  const title = searchParams.get('title');
  const subtitle = searchParams.get('subtitle');
  const text = searchParams.get('text');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parse the text if it's available, otherwise set an empty array
  const parsedText: TextObject[] = text ? JSON.parse(text) : [];

  return (
    <div className="bg-white flex justify-center items-top min-h-screen">
      <div className="p-3 max-w-3xl w-full">
        <h1 className="mt-10 text-4xl font-bold text-left text-gray-800 mb-4 font-serif">
          {title || "Blog Title Not Available"}
        </h1>
        <h2 className="text-xl text-left text-gray-500 mb-4 font-serif">
          {subtitle || "Subtitle Not Available"}
        </h2>
        <div className="space-y-4">
          {parsedText.length > 0 ? (
            parsedText.map((item, index) => (
              <div key={index} className="space-y-4">
                <p className="text-2xl text-gray-700 font-serif font-bold leading-relaxed">
                  {item?.heading}
                </p>
                <p className="text-lg text-gray-700 font-bold font-serif leading-relaxed">
                  {item?.subheading}
                </p>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">
                  {item.paragraph}
                </p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500">No content available for this blog.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
