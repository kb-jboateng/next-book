import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser, serializeData } from "@/app/api/utils";

export async function GET(request: NextRequest) {
    try {
        const user = await getUser(request);

        const results = await prisma.user.findUnique({
            where: {
                id: user.sub
            },
            select: {
                bookmarks: {
                    where: {
                        deletedAt: null
                    },
                    select: {
                        book: {
                            include: {
                                bookmarks: true
                            }
                        },
                
                    }
                }
            }
        });

        const bookmarks = results?.bookmarks.map((bookmark) => {
            return bookmark.book;
        });

        return NextResponse.json(serializeData(bookmarks));
    } catch (error: any) {
        if (error?.message == "Unauthorized") {
            return NextResponse.json("Unauthorized", { status: 401 });
        } else {
            return NextResponse.json({message: error?.message ?? "Error occured"}, { status: 500 });
        }
    }
}