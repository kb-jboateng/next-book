import { getUser, serializeData } from "@/app/api/utils";
import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: number }}) {
    try {
        const user = await getUser(request);
        const bookId = +params.id;

        if (user?.sub) {
            const existingBookmark = await prisma.bookmark.findFirst({
                where: {
                    bookId,
                    userId: user.sub
                }
            });
    
            if (existingBookmark) {
                return NextResponse.json("User bookmark already exists", { status: 400 });
            }
    
            const bookmark = await prisma.bookmark.create({
                data: {
                    bookId,
                    userId: user.sub
                }
            });
            return NextResponse.json(serializeData(bookmark));
        }

        throw new Error("Unauthorized");
    } catch (error: any) {
        if (error?.message == "Unauthorized") {
            return NextResponse.json("Unauthorized", { status: 401 });
        } else {
            return NextResponse.json({message: error?.message ?? "Error occured"}, { status: 500 });
        }
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number }}) {
    try {
        const user = await getUser(request);
        const bookmarkId = +params.id;

        await prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                deletedAt: new Date()
            }
        });

        return new Response(null, { status: 204 });
    } catch (error: any) {
        if (error?.message == "Unauthorized") {
            return NextResponse.json("Unauthorized", { status: 401 });
        } else {
            return NextResponse.json({message: error?.message ?? "Error occured"}, { status: 500 });
        }
    }
}