import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { IGoogleBook } from "@/app/models/Book";

const BOOKS_URL = process.env.GOOGLE_BOOKS_URL;
const BOOKS_KEY = process.env.GOOGLE_BOOKS_KEY;

export async function GET(request: Request, { params }: { params: { id: number }}) {
    try {

        const id: number = +params.id;

        if (!id || Number.isNaN(id))
            return NextResponse.json('Id required', { status: 400 });

        const dbBook = await prisma.book.findUnique({
            where: {
                id: id
            }
        });

        if (!dbBook)
            return NextResponse.json('Book not found', { status: 404 });

        let gBook: any | IGoogleBook = {};
        const searchData = await fetchFromGooge(`${BOOKS_URL}/volumes?q= +isbn:${dbBook.isbn ?? dbBook.isbn13}&`);
        if (searchData && searchData?.totalItems > 0) {
            const item = searchData['items'][0];
            const specificBook = await fetchFromGooge(`${BOOKS_URL}/volumes/${item.id}?`);
            gBook = {...specificBook};
            gBook['gid'] = gBook['id'];
            delete gBook.id;
        }
                    
        return NextResponse.json({...dbBook, ...gBook});
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

async function fetchFromGooge(url: string) : Promise<any> {
    try {
        const res = await fetch(`${url}key=${BOOKS_KEY}`, {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        });
        const data = await res.json();

        if (data?.error) {
            throw new Error(data?.error?.message ?? "Error occured fetching book");
        } else  {
            return data;
        }
    } catch (error: any) {
        throw new Error(error);
    }
}