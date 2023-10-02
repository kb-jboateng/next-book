'use client';

import { FC, useState } from "react";
import { IDbBook } from "../models/Book";
import { useBookContext } from "../context/BookContext";
import { bookmark, unbookmark } from "../services/book.service";

interface Bookmark {
    book: IDbBook,
    width?: string,
    height?: string
};

const Bookmark: FC<Bookmark> = ({
    book,
    width = 'w-6',
    height = 'h-6'
}) => {

    const [bookCopy, setBookCopy] = useState<IDbBook>(book);

    const { isLoggedIn } = useBookContext();

    const isBookmarked = bookCopy?.bookmarks?.length > 0;

    const onBookmark = (event: any) => {
        event.stopPropagation();
        
        const handleBookmark = async () => {
            if (isBookmarked) {
                await unbookmark(bookCopy.bookmarks[0].id);
                setBookCopy({...bookCopy, bookmarks: []});
            } else {
                const dbBookmark = await bookmark(book.id);
                setBookCopy({...bookCopy, bookmarks: [dbBookmark]});
            }
        }

        handleBookmark().catch(console.error);
    };

    return(
        <>
            {
                isLoggedIn &&
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" 
                    className={`cursor-pointer ${width} ${height} ${isBookmarked ? 'fill-orange stroke-white' : 'fill-gray/50 stroke-orange'}`} onClick={onBookmark}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
            }
        </>
    )
}

export default Bookmark;