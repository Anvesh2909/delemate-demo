"use client";

import React, { useState } from 'react';
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
import { FaPlus, FaTrash, FaArrowLeft, FaImage, FaClock, FaCalendarAlt } from "react-icons/fa";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BlogForm>({
        title: '',
        subtitle: '',
        link: '',
        date: new Date().toISOString().split('T')[0],
        min: 5,
        text: [{ paragraph: '' }]
    });

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
            // Convert min to number if it's a string
            const dataToSubmit = {
                ...formData,
                min: Number(formData.min)
            };

            const response = await axios.post('/api/blog', dataToSubmit);

            toast({
                title: "Blog created successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Clear form or redirect
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
                    <VStack spacing={8} align="stretch">
                        <HStack justifyContent="space-between" alignItems="center">
                            <VStack align="start" spacing={1}>
                                <Badge colorScheme="blue">ADMIN</Badge>
                                <Heading size="xl">Create New Blog</Heading>
                                <Text color="gray.600">Add a new article to DeleMate's blog</Text>
                            </VStack>

                            <Button
                                colorScheme="blue"
                                onClick={() => router.push('/blog')}
                            >
                                <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Blogs
                            </Button>
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
                                                <FormLabel fontWeight="medium">Image URL</FormLabel>
                                                <InputGroup>
                                                    <InputLeftElement pointerEvents="none">
                                                        <FaImage color="#4299E1" />
                                                    </InputLeftElement>
                                                    <Input
                                                        name="link"
                                                        value={formData.link}
                                                        onChange={handleChange}
                                                        pl="2.5rem"
                                                        placeholder="Enter image URL (optional)"
                                                        focusBorderColor="blue.400"
                                                    />
                                                </InputGroup>
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
                </MaxWidthWrapper>
            </Box>
        </ChakraProvider>
    );
};

export default Page;