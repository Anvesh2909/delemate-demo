"use client";

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ChakraProvider } from '@chakra-ui/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { firestore } from "../firebase/firebase";
import { collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";
import useShowToast from "../hooks/useShowToast";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const showToast = useShowToast();

  const handleSubmit = async () => {
    if (!email) {
      showToast("Error", "Please fill the field", "error");
      return;
    }
    const usersRef = collection(firestore, "waitlist");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      showToast("Success", "Email already submitted", "success");
      return;
    }
    const userDoc = { email: email }
    try {
      await setDoc(doc(firestore, "waitlist", email), userDoc);
    }
    catch (error) {
      showToast("Error", "Error", "error");
    }
    finally {
      showToast("Success", "Success", "success");
      onClose()
      setEmail("")
    }

  }

  const initialRef = useRef(null)
  const [email, setEmail] = useState("")

  return (
    <ChakraProvider>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your email</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {/* <FormLabel>Get upto 60% off on your first order</FormLabel> */}
              <Input ref={initialRef} value={email} onChange={(event) => setEmail(event.target.value)} placeholder='email' />
              <FormHelperText>We never share your email</FormHelperText>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            DeleMate is now public!
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Send your {' '}
          <span className='text-blue-600'>Parcels</span>{' '}
          seamlessly with DeleMate.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          DeleMate makes sending packages easier and cheaper than ever before. 
          Just sign up and tell us where you want your package to go.
        </p>
        <div className='flex m-10 gap-5'>
          <a
            href={'https://play.google.com/store/apps/details?id=com.delemate.delemate'} >
            <Image
              src='/playStore.png'
              alt='product preview'
              width={165}
              height={866}
              quality={100}
              className=''
            />
          </a>
          <a
            href={'https://apps.apple.com/in/app/delemate/id6547860986'} >
            <Image
              src='/appStore.png'
              alt='product preview'
              width={165}
              height={860}
              quality={100}
              className=''
            />
          </a>
        </div>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-md'>
          Get upto 60% off on your first order
        </p>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-0 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Start sending your parcel across India
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Try out DeleMate Today. We are here to make your life easier.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4'>
              <h3 className='font-bold text-zinc-900'>Step 1: Sign Up</h3>
              <p className='text-gray-600'>
              Create an account by entering your mobile number, and you're ready to send parcels.
              </p>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4'>
              <h3 className='font-bold text-zinc-900'>Step 2: Choose a Traveler</h3>
              <p className='text-gray-600'>
              Find a traveler heading to your destination, and select them to carry your package.
              </p>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4'>
              <h3 className='font-bold text-zinc-900'>Step 3: Send Your Parcel</h3>
              <p className='text-gray-600'>
              Send your parcel and enjoy real-time tracking until it reaches its destination.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <footer className="bg-white/20 text-gray-900 py-16 backdrop-blur-md">
  <div className="container mx-auto px-6">
    <div className="flex flex-wrap justify-between items-center">
      {/* Logo and Tagline */}
      <div className="text-center md:text-left">
        <h3 className="text-4xl font-bold text-black tracking-wide">DeleMate</h3>
        <p className="mt-2 text-lg text-black opacity-80">We Deliver Trust, Not Just Parcels.</p>
      </div>

      {/* Footer Links */}
      <div className="mt-6 md:mt-0">
  <ul className="flex space-x-6 justify-center md:justify-start">
    <li>
      <Link href="/about" className="text-black hover:text-gray-200 transition duration-300">
        About Us
      </Link>
    </li>
    <li>
      <Link href="/contact" className="text-black hover:text-gray-200 transition duration-300">
        Contact
      </Link>
    </li>
    <li>
      <Link href="/privacy" className="text-black hover:text-gray-200 transition duration-300">
        Privacy Policy
      </Link>
    </li>
    <li>
      <Link href="/terms" className="text-black hover:text-gray-200 transition duration-300">
        Terms of Service
      </Link>
    </li>
  </ul>
</div>
</div>

    {/* Copyright */}
    <div className="mt-8 text-center text-sm text-black opacity-70">
      <p>© {new Date().getFullYear()} DeleMate. All rights reserved.</p>
    </div>
  </div>
</footer>

    </ChakraProvider>
  );
}
