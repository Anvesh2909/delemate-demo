import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog", detail: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to update blog", detail: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to delete blog", detail: error.message },
            { status: 500 }
        );
    }
}