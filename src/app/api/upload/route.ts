import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, GIF, WebP allowed." }, { status: 400 });
        }

        // Create unique filename
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const filename = `gallery-${timestamp}.${ext}`;

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Return the public URL
        const url = `/uploads/${filename}`;
        return NextResponse.json({ success: true, url });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
