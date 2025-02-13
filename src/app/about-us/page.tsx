"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChakraProvider, Box, Text, List, ListItem, Heading } from "@chakra-ui/react";
import { useState } from "react";

const AboutUs = () => {
  return (
    <ChakraProvider>
      <MaxWidthWrapper className="mb-12 mt-16 sm:mt-20 flex flex-col items-center text-center">
        <Heading as="h1" size="2xl" fontWeight="bold" className="max-w-4xl">
          Welcome to DeleMate!
        </Heading>
        <Text as="h3" fontSize="xl" fontWeight="semibold" className="max-w-4xl mt-4 text-gray-600">
          Learn Everything About Us
        </Text>
        <Text className="mt-8 text-lg text-zinc-700 sm:text-lg max-w-3xl mx-auto">
          DeleMate is an innovative peer-to-peer delivery platform designed to make parcel delivery easier, faster, and more affordable.
          We connect travelers with people who need to send parcels, offering a convenient solution for long-distance deliveries at a fraction of the cost of traditional courier services.
        </Text>
        <Text className="mt-5 text-lg text-zinc-700 sm:text-lg max-w-3xl mx-auto">
          Our mission is simple: to create a faster, more affordable, and more efficient delivery network by leveraging the power of technology and the shared economy.
        </Text>

        <Box className="mt-12 space-y-10 text-left max-w-3xl mx-auto">
          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold" className="text-gray-800">
              Why Choose DeleMate?
            </Heading>
            <List className="list-disc pl-6 mt-4 space-y-3 text-lg text-gray-700">
              <ListItem><strong>Affordability</strong>: Traditional courier services can be expensive, but DeleMate offers a more affordable alternative.</ListItem>
              <ListItem><strong>Speed</strong>: We ensure your parcel is delivered as quickly as possible.</ListItem>
              <ListItem><strong>Trustworthy</strong>: We verify all our users using KYC to ensure safe transactions.</ListItem>
              <ListItem><strong>Eco-Friendly</strong>: By utilizing travelers, we reduce carbon emissions and make deliveries more sustainable.</ListItem>
            </List>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold" className="text-gray-800 mt-8">
              Our Story
            </Heading>
            <Text className="mt-4 text-lg text-gray-700">
              DeleMate was founded by a group of passionate individuals who saw an opportunity to change the way deliveries are made.
              With backgrounds in technology, business, and logistics, we came together with one common goal: to build a platform that simplifies and improves the delivery experience.
            </Text>
            <Text className="mt-4 text-lg text-gray-700">
              We understand that sending a parcel can sometimes be a hassle. Our solution is designed to make the process smooth, fast, and affordable, all while connecting people across distances.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold" className="text-gray-800 mt-8">
              Our Values
            </Heading>
            <List className="list-disc pl-6 mt-4 space-y-3 text-lg text-gray-700">
              <ListItem><strong>Customer-Centric</strong>: We prioritize the needs of our users to provide exceptional service.</ListItem>
              <ListItem><strong>Innovation</strong>: We constantly work on enhancing our platform with cutting-edge technology.</ListItem>
              <ListItem><strong>Integrity</strong>: Transparency and honesty are at the core of everything we do.</ListItem>
              <ListItem><strong>Sustainability</strong>: We aim to reduce our environmental impact and contribute to a greener future.</ListItem>
            </List>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold" className="text-gray-800 mt-8">
              Our Future
            </Heading>
            <Text className="mt-4 text-lg text-gray-700">
              We are continuously improving DeleMate, expanding our network, and building new features to enhance the user experience.
              Our goal is to make DeleMate the go-to platform for peer-to-peer deliveries, offering a fast, affordable, and reliable service.
            </Text>
            <Text className="mt-4 text-lg text-gray-700">
              Thank you for choosing DeleMate. We're excited to be part of your delivery journey!
            </Text>
          </Box>
        </Box>
      </MaxWidthWrapper>
    </ChakraProvider>
  );
};

export default AboutUs;
