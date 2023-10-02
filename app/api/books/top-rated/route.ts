import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

export async function GET(request: NextRequest) {
    try {
        const books = await prisma.book.findMany({
            take: 15,
            orderBy: {
                averageRating: { sort: 'desc', nulls: 'last' },
                numberOfRatings: { sort: 'desc', nulls: 'last'}
            }
        });

        return NextResponse.json(books);
    } catch (error: any) {
        return NextResponse.json( error?.message ?? "Error occured", { status: 500 });
    }
}