import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { getUser } from "../utils";

BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

export async function GET(request: NextRequest) {
    const user = await getUser(request);
    const searchParams = request.nextUrl.searchParams;

    const query: string | null = searchParams.get('query');
    const cursor: string | null = searchParams.get('cursor');

    try {
        if (query) {
            const searchTerm = query.split(' ').join(' & ');
        
            const prismaQuery: any = {
                take: 54,
                where: {
                    title: {
                        search: searchTerm
                    }
                }
            };
        
            if (cursor) {
                prismaQuery['cursor'] = {
                    id: +cursor
                };
            }

            if (user?.sub) {
                prismaQuery['include'] = {
                    bookmarks: {
                        where: {
                            userId: user.sub,
                            deletedAt: null
                        }
                    }
                };
            }
        
            const books = await prisma.book.findMany(prismaQuery);
            return NextResponse.json(books);
        }
        return NextResponse.json([]);
    } catch (error: any) {
        return NextResponse.json( error?.message ?? "Error occured", { status: 500 });
    }

}