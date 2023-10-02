import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { serializeData } from "../../utils";

export async function GET(request: NextRequest) {
    try {
        const books = await prisma.book.findMany({
            take: 15,
            orderBy: {
                averageRating: { sort: 'desc', nulls: 'last' }
            }
        });

        return NextResponse.json(serializeData(books));
    } catch (error: any) {
        return NextResponse.json( error?.message ?? "Error occured", { status: 500 });
    }
}