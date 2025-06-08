import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
}

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const body = await req.json();
        const blog = await Blog.create(body);
        return NextResponse.json(blog, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: 'Failed to create blog', detail: e.message }, { status: 500 });
    }
}

export function OPTIONS(req: NextRequest) {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}