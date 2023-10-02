'use client';

import { FC } from "react";
import {IDbBook } from "../models/Book";
import Link from "next/link";
import Bookmark from "./Bookmark";


interface BookProps {
    book: IDbBook,
    height?: string;
    width?: string;
};

const BookCard: FC<BookProps> = ({
    book,
    width = 'w-[122px]',
    height = 'h-[200px]'
}) => {
    return (
        <div className="relative">
            <div className="absolute top-2 right-2">
                <Bookmark book={book}/>
            </div>
            <Link  href={`/books/${book.id}`}>
                <img src={book.coverPage} alt="Book image" className={`${height} ${width}`}/>
            </Link>
        </div>
    )
}

export default BookCard;