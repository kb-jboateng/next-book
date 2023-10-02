import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/home"] };

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('next-auth.csrf-token')?.value;
    if (!token && request.nextUrl.pathname.startsWith('/home')) {
        request.nextUrl.pathname = '/login';
        return NextResponse.redirect(request.nextUrl);
    }
}