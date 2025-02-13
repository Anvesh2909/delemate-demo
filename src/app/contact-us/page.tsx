"use client"; // Mark this file as a Client Component

import MaxWidthWrapper from '@/components/MaxWidthWrapper'; // Correct path for import
import Link from 'next/link';

const ContactUs = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-6">We'd love to hear from you!</p>

        <div className="text-lg text-gray-700 mb-4">
          <p>Email: <Link href="mailto:contact@delemate.com" className="text-blue-500">contact@delemate.com</Link></p>
          <p>Address: Kondapur, Hyderabad</p>
        </div>

        <p className="text-lg text-gray-700 mt-8">
          Feel free to reach out with any questions, comments, or feedback.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default ContactUs;
