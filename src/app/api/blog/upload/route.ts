import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Generate unique filename
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

        // Convert File to Blob for Supabase upload
        const fileArrayBuffer = await file.arrayBuffer();
        const fileBlob = new Blob([fileArrayBuffer]);

        const { data, error } = await supabase.storage
            .from('blogs-images')
            .upload(fileName, fileBlob, {
                contentType: file.type
            });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Get the public URL
        const imageUrl = supabase.storage
            .from('blogs-images')
            .getPublicUrl(fileName).data.publicUrl;

        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: 'Failed to upload image', detail: e.message }, { status: 500 });
    }
}