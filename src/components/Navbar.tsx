"use client"; // Mark this file as a Client Component

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MaxWidthWrapper from './MaxWidthWrapper';

// Dynamically import the Kinde Auth module (if it's a client-side module)
const KindeAuth = dynamic(
  () => import('@kinde-oss/kinde-auth-nextjs'),
  { ssr: false } // Disable SSR for this import to avoid issues with fs module
);

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);  // To manage mobile menu visibility

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const Kinde = await KindeAuth;
        
        if (Kinde && typeof Kinde.getUser === 'function') {
          const userData = await Kinde.getUser(); // Fetch the user data
          setUser(userData); // Set the user data to state
        } else {
          console.error('getUser function is not available in KindeAuth');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/20 backdrop-blur-lg transition-all shadow-lg">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between py-6">
          {/* Logo and Brand Name (Wrapped in Link to navigate to home) */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <img src="/delemate.png" alt="DeleMate Logo" className="h-10 w-auto cursor-pointer" />
            </Link>
            <Link href="/" className="font-semibold text-gray-800 text-3xl hover:text-gray-600 transition duration-300 cursor-pointer">
              DeleMate
            </Link>
          </div>

          {/* Navbar Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/about-us"
              className="text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
            >
              Blogs
            </Link>

            {/* Dropdown for "Others" */}
            <div className="relative" ref={buttonRef}>
              <button
                onClick={toggleDropdown}
                className="text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
              >
                Others
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
                >
                  <Link
                    href="/privacy-policy"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/refund-policy"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                  >
                    Refund Policy
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              className="text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg p-4">
          <Link
            href="/about-us"
            className="block py-2 text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            className="block py-2 text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
          >
            Blogs
          </Link>
          {/* Dropdown in Mobile */}
          <div>
            <button
              className="block py-2 text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
            >
              Others
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white shadow-lg rounded-md z-10">
                <Link
                  href="/privacy-policy"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/refund-policy"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Refund Policy
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/contact-us"
            className="block py-2 text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
