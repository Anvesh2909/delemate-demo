"use client";
import React, { useState,useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    ChakraProvider,
    Box,
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Text,
    VStack,
    HStack,
    IconButton,
    useToast,
    NumberInput,
    NumberInputField,
    Divider,
    Card,
    CardBody,
    Badge,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import { FaPlus, FaTrash, FaArrowLeft, FaImage, FaClock, FaCalendarAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import supabase from '@/lib/supabase';
import { FaUpload } from 'react-icons/fa';
interface Paragraph {
    heading?: string;
    subheading?: string;
    paragraph: string;
}

interface BlogForm {
    title: string;
    subtitle: string;
    link: string;
    date: string;
    min: number | string;
    text: Paragraph[];
}

const Page = () => {
    const router = useRouter();
    const toast = useToast();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [authCredentials, setAuthCredentials] = useState({
        email: '',
        password: ''
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<BlogForm>({
        title: '',
        subtitle: '',
        link: '',
        date: new Date().toISOString().split('T')[0],
        min: 5,
        text: [{ paragraph: '' }]
    });

    const handleAuthentication = (e: React.FormEvent) => {
        e.preventDefault();

        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        if (authCredentials.email === adminEmail && authCredentials.password === adminPassword) {
            setIsAuthenticated(true);
            toast({
                title: "Authentication successful!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Invalid credentials",
                description: "Please check your email and password.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthCredentials({ ...authCredentials, [name]: value });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNumberChange = (value: string) => {
        setFormData({ ...formData, min: value });
    };

    const handleParagraphChange = (index: number, field: keyof Paragraph, value: string) => {
        const updatedText = [...formData.text];
        updatedText[index] = { ...updatedText[index], [field]: value };
        setFormData({ ...formData, text: updatedText });
    };

    const addParagraph = () => {
        setFormData({ ...formData, text: [...formData.text, { paragraph: '' }] });
    };

    const removeParagraph = (index: number) => {
        if (formData.text.length > 1) {
            const updatedText = [...formData.text];
            updatedText.splice(index, 1);
            setFormData({ ...formData, text: updatedText });
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) return null;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const fileName = `${Date.now()}_${selectedImage.name.replace(/\s+/g, '_')}`;
            const fileArrayBuffer = await selectedImage.arrayBuffer();
            const fileBlob = new Blob([fileArrayBuffer]);

            const { data, error } = await supabase.storage
                .from('blogs-images')
                .upload(fileName, fileBlob, {
                    contentType: selectedImage.type
                });

            if (error) {
                throw new Error(error.message);
            }

            const imageUrl = supabase.storage
                .from('blogs-images')
                .getPublicUrl(fileName).data.publicUrl;

            // Debug: Log the URL
            console.log('Generated image URL:', imageUrl);

            // Test if URL is accessible
            const testImage = new Image();
            testImage.onload = () => console.log('Image loaded successfully');
            testImage.onerror = () => console.log('Image failed to load');
            testImage.src = imageUrl;

            setUploadProgress(100);
            setFormData({ ...formData, link: imageUrl });
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            toast({
                title: "Upload failed",
                description: "Could not upload image. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title.trim()) {
            toast({
                title: "Title is required",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!formData.text[0].paragraph.trim()) {
            toast({
                title: "At least one paragraph is required",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Create a copy of form data to submit
            let dataToSubmit = {
                ...formData,
                min: Number(formData.min)
            };

            // Upload image if one is selected
            if (selectedImage) {
                console.log("Uploading image...");
                const imageUrl = await uploadImage();
                console.log("Image upload result:", imageUrl);

                if (imageUrl) {
                    console.log("Setting image URL in submission data:", imageUrl);
                    dataToSubmit.link = imageUrl;
                } else {
                    console.warn("Image upload failed or returned null");
                    toast({
                        title: "Image upload issue",
                        description: "Could not upload the image. Submitting without image.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }

            // Log the final data being submitted
            console.log("Submitting blog data:", dataToSubmit);

            // Submit with the updated data that includes the image link
            const response = await axios.post('/api/blog', dataToSubmit);
            console.log("Server response:", response.data);

            toast({
                title: "Blog created successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            router.push('/blog');
        } catch (error) {
            console.error("Error creating blog:", error);
            toast({
                title: "Error creating blog",
                description: "Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ChakraProvider>
            <Box bg="white" minH="100vh" py={10}>
                <MaxWidthWrapper>
                    {!isAuthenticated ? (
                        // Authentication Form
                        <VStack spacing={8} align="stretch" maxW="400px" mx="auto" mt={20}>
                            <VStack align="center" spacing={4}>
                                <FaLock size={50} color="#4299E1" />
                                <Heading size="xl">Admin Login</Heading>
                                <Text color="gray.600" textAlign="center">
                                    Please enter your credentials to access the blog creation page
                                </Text>
                            </VStack>

                            <Card variant="outline" borderColor="blue.200">
                                <CardBody>
                                    <form onSubmit={handleAuthentication}>
                                        <VStack spacing={4}>
                                            <FormControl isRequired>
                                                <FormLabel>Email</FormLabel>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    value={authCredentials.email}
                                                    onChange={handleAuthChange}
                                                    placeholder="Enter admin email"
                                                    focusBorderColor="blue.400"
                                                />
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel>Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        value={authCredentials.password}
                                                        onChange={handleAuthChange}
                                                        placeholder="Enter admin password"
                                                        focusBorderColor="blue.400"
                                                    />
                                                    <InputLeftElement width="4.5rem">
                                                        <IconButton
                                                            h="1.75rem"
                                                            size="sm"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                                            variant="ghost"
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                        />
                                                    </InputLeftElement>
                                                </InputGroup>
                                            </FormControl>

                                            <VStack spacing={3} width="100%">
                                                <Button
                                                    type="submit"
                                                    colorScheme="blue"
                                                    width="100%"
                                                    size="lg"
                                                >
                                                    Login
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    onClick={() => router.push('/blog')}
                                                    width="100%"
                                                >
                                                    Back to Blog
                                                </Button>
                                            </VStack>
                                        </VStack>
                                    </form>
                                </CardBody>
                            </Card>
                        </VStack>
                    ) : (
                        // Blog Creation Form
                        <VStack spacing={8} align="stretch">
                            <HStack justifyContent="space-between" alignItems="center">
                                <VStack align="start" spacing={1}>
                                    <Badge colorScheme="green">AUTHENTICATED</Badge>
                                    <Heading size="xl">Create New Blog</Heading>
                                    <Text color="gray.600">Add a new article to DeleMate's blog</Text>
                                </VStack>

                                <HStack spacing={3}>
                                    <Button
                                        variant="outline"
                                        colorScheme="red"
                                        onClick={() => {
                                            setIsAuthenticated(false);
                                            setAuthCredentials({ email: '', password: '' });
                                        }}
                                    >
                                        Logout
                                    </Button>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => router.push('/blog')}
                                    >
                                        <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Blogs
                                    </Button>
                                </HStack>
                            </HStack>

                            <Divider />

                            <form onSubmit={handleSubmit}>
                                <Card variant="outline" mb={6} borderColor="blue.100">
                                    <CardBody>
                                        <VStack spacing={6} align="stretch">
                                            <FormControl isRequired>
                                                <FormLabel fontWeight="medium">Title</FormLabel>
                                                <Input
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="Enter blog title"
                                                    focusBorderColor="blue.400"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontWeight="medium">Subtitle</FormLabel>
                                                <Input
                                                    name="subtitle"
                                                    value={formData.subtitle}
                                                    onChange={handleChange}
                                                    placeholder="Enter blog subtitle (optional)"
                                                    focusBorderColor="blue.400"
                                                />
                                            </FormControl>

                                            <HStack spacing={6} flexWrap={{ base: "wrap", md: "nowrap" }} gap={4}>
                                                <FormControl flex="1">
                                                    <FormLabel fontWeight="medium">Blog Image</FormLabel>
                                                    <VStack align="stretch" spacing={2}>
                                                        <HStack>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                style={{ display: 'none' }}
                                                                ref={fileInputRef}
                                                            />
                                                            <Button
                                                                leftIcon={<FaUpload />}
                                                                onClick={() => fileInputRef.current?.click()}
                                                                colorScheme="blue"
                                                                isLoading={isUploading}
                                                                loadingText={`Uploading ${uploadProgress}%`}
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                {selectedImage ? 'Change Image' : 'Upload Image'}
                                                            </Button>
                                                            {selectedImage && (
                                                                <Text fontSize="sm" color="gray.600">
                                                                    {selectedImage.name.length > 20
                                                                        ? selectedImage.name.substring(0, 20) + "..."
                                                                        : selectedImage.name}
                                                                </Text>
                                                            )}
                                                        </HStack>

                                                        {formData.link && (
                                                            <Box mt={2} position="relative">
                                                                <img
                                                                    src={formData.link}
                                                                    alt="Preview"
                                                                    style={{
                                                                        maxHeight: '100px',
                                                                        maxWidth: '100%',
                                                                        borderRadius: '4px'
                                                                    }}
                                                                />
                                                            </Box>
                                                        )}

                                                        <InputGroup>
                                                            <InputLeftElement pointerEvents="none">
                                                                <FaImage color="#4299E1" />
                                                            </InputLeftElement>
                                                            <Input
                                                                name="link"
                                                                value={formData.link}
                                                                onChange={handleChange}
                                                                pl="2.5rem"
                                                                placeholder="Or enter image URL directly"
                                                                focusBorderColor="blue.400"
                                                            />
                                                        </InputGroup>
                                                    </VStack>
                                                </FormControl>

                                                <FormControl flex="1">
                                                    <FormLabel fontWeight="medium">Date</FormLabel>
                                                    <InputGroup>
                                                        <InputLeftElement pointerEvents="none">
                                                            <FaCalendarAlt color="#4299E1" />
                                                        </InputLeftElement>
                                                        <Input
                                                            name="date"
                                                            type="date"
                                                            value={formData.date}
                                                            onChange={handleChange}
                                                            pl="2.5rem"
                                                            focusBorderColor="blue.400"
                                                        />
                                                    </InputGroup>
                                                </FormControl>

                                                <FormControl flex="1" maxW={{ base: "100%", md: "200px" }}>
                                                    <FormLabel fontWeight="medium">Reading Time (minutes)</FormLabel>
                                                    <InputGroup>
                                                        <InputLeftElement pointerEvents="none">
                                                            <FaClock color="#4299E1" />
                                                        </InputLeftElement>
                                                        <NumberInput
                                                            min={1}
                                                            max={60}
                                                            value={formData.min}
                                                            onChange={handleNumberChange}
                                                            focusBorderColor="blue.400"
                                                            width="100%"
                                                        >
                                                            <NumberInputField pl="2.5rem" />
                                                        </NumberInput>
                                                    </InputGroup>
                                                </FormControl>
                                            </HStack>
                                        </VStack>
                                    </CardBody>
                                </Card>

                                <Heading size="md" mb={4}>Content Sections</Heading>

                                {formData.text.map((item, index) => (
                                    <Card key={index} variant="outline" mb={4} borderColor="blue.100">
                                        <CardBody>
                                            <VStack spacing={4} align="stretch">
                                                <HStack justifyContent="space-between">
                                                    <Badge colorScheme="blue" fontSize="md">Section {index + 1}</Badge>
                                                    <IconButton
                                                        aria-label="Remove section"
                                                        icon={<FaTrash />}
                                                        colorScheme="red"
                                                        variant="ghost"
                                                        onClick={() => removeParagraph(index)}
                                                        isDisabled={formData.text.length === 1}
                                                        size="sm"
                                                    />
                                                </HStack>

                                                <FormControl>
                                                    <FormLabel fontWeight="medium">Heading (optional)</FormLabel>
                                                    <Input
                                                        value={item.heading || ''}
                                                        onChange={(e) => handleParagraphChange(index, 'heading', e.target.value)}
                                                        placeholder="Enter section heading"
                                                        focusBorderColor="blue.400"
                                                    />
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel fontWeight="medium">Subheading (optional)</FormLabel>
                                                    <Input
                                                        value={item.subheading || ''}
                                                        onChange={(e) => handleParagraphChange(index, 'subheading', e.target.value)}
                                                        placeholder="Enter section subheading"
                                                        focusBorderColor="blue.400"
                                                    />
                                                </FormControl>

                                                <FormControl isRequired>
                                                    <FormLabel fontWeight="medium">Paragraph</FormLabel>
                                                    <Textarea
                                                        value={item.paragraph}
                                                        onChange={(e) => handleParagraphChange(index, 'paragraph', e.target.value)}
                                                        placeholder="Enter paragraph content"
                                                        rows={6}
                                                        focusBorderColor="blue.400"
                                                    />
                                                </FormControl>
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                ))}

                                <Button
                                    variant="outline"
                                    onClick={addParagraph}
                                    mb={8}
                                    colorScheme="blue"
                                >
                                    <FaPlus style={{ marginRight: '8px' }} /> Add New Section
                                </Button>

                                <Box textAlign="center" mt={8} mb={10}>
                                    <Button
                                        type="submit"
                                        colorScheme="blue"
                                        size="lg"
                                        px={10}
                                        isLoading={isSubmitting}
                                        loadingText="Creating Blog"
                                        borderRadius="full"
                                        boxShadow="md"
                                    >
                                        Publish Blog
                                    </Button>
                                </Box>
                            </form>
                        </VStack>
                    )}
                </MaxWidthWrapper>
            </Box>
        </ChakraProvider>
    );
};

export default Page;