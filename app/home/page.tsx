'use client';

import { IDbBook } from "../models/Book";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { fetchBookmarks } from "../services/book.service";
import { useBookContext, useBookmarkReducer } from "../context/BookContext";

interface BookSectionProps {
    title: string;
    qKey: string;
    func: any;
    errorString: string;
    emptyTitle: string;
    emptySubTitle: string;
    books: IDbBook[] | null;
    setBooks?: any;
}

export default function Home() {

    const { bookmarks } = useBookContext();
    const { dispatch } = useBookmarkReducer();

    const setBookmarks = (bookmarks: IDbBook[]) => {
        dispatch({type: 'set', data: bookmarks});
    };

    return (
        <>
            <div>
                <div>
                    <BookSection
                        title="Bookmarks"
                        qKey="bookmarks"
                        func={fetchBookmarks}
                        books={bookmarks}
                        setBooks={setBookmarks}
                        errorString="Failed to load bookmarks"
                        emptyTitle="Found anything you like?"
                        emptySubTitle="During your search bookmark books to save them for later and they&apos;d be here!"/>
                </div>
            </div>
        </>
    )
}

/**
 * Creates a section with a title and displays a horizontal list of books
 * @param title header of the section
 * @param qKey query key for calling the function
 * @param func call to fetch list of books for the section
 * @param errorString custom error displayed if an error occurs
 * @param emptyTitle title of `empty` section displayed if `books = []`
 * @param emptySubTitle subtitle of `empty` section displayed if `books = []`
 */
function BookSection({
    title, 
    qKey, 
    func,
    books,
    setBooks,
    errorString, 
    emptyTitle, 
    emptySubTitle
} : BookSectionProps) {

    const { data, isLoading, isSuccess, error } = useQuery<IDbBook[]>([qKey], func, {  enabled: books ? books.length > 0 : false });

    // create an empty array with length of 6
    const loadingArray = Array(6).fill(null);

    if (isLoading) {
        return (
            <>
                <div className="animate-pulse pb-4">
                    <div className="h-6 w-40 rounded bg-gray-light"></div>
                </div>
                <div className="flex gap-2.5 overflow-y-auto">
                    {
                        loadingArray.map((_, index) => 
                            <div key={index} className="animate-pulse">
                                <div className="h-[200px] w-[122px] rounded-md bg-gray-light"></div>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    if (error) {
        return (
            <div className="text-center">
                <p className="text-gray-lighter">{errorString}</p>
            </div>
        );
    }
    
    if (isSuccess && books?.length == 0 && setBooks) {
        setBooks(data);
    }

    return (
        <>
            {
                books && books.length > 0 ?
                (
                    <>
                        <div className="pb-4">
                            <h2 className="text-2xl">{title}</h2>
                        </div>
                        <BookList books={books}/>
                    </>
                ) :
                <div className="flex justify-center">
                    <div className="text-center md:max-w-[300px]">
                        <h3 className="text-xl pb-4">{emptyTitle}</h3>
                        <p className="text-base text-gray-lighter">{emptySubTitle}</p>
                    </div>
                </div>
            }
        </>
    )
}

function BookList({ books } : { books: IDbBook[] }) {
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            navigation
            slidesPerView={1}
            breakpoints={{
                300: {
                    slidesPerView: 2.5
                },
                440: {
                    slidesPerView: 3.5
                },
                640: {
                    slidesPerView: 4.5
                },
                768: {
                    slidesPerView: 6.5
                },
                1024: {
                    slidesPerView: 8.5
                }
            }}
        >
            {
                books.map((book) =>
                    <SwiperSlide key={book.id}>
                        <BookCard key={book.id} book={book} width="w-full"/>
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}