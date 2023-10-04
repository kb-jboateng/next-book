'use client';

import Image from "next/image";
import BookCard from "../components/BookCard"
import Search from "../components/Search";
import { useBookContext } from "../context/BookContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Books() {

    const params = useSearchParams();
    const q = params.get('q');
    const { books, busy, search, setSearch } = useBookContext();

    useEffect(() => {
        if (q)
            setSearch(q);
    }, [q, setSearch]);

    return (
        <>
            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <Search showBusy={books.length > 0}/>
                </div>
            </div>
            <div className="pt-8">
                {
                    books.length > 0 ?
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {books.map((book) => 
                            <BookCard key={book.id} book={book}/>
                        )}
                    </div>  :
                    <div className="flex items-center justify-center min-h-[50vh]">
                        {
                        busy ?
                        <div>
                            <Image src="/loading.gif" alt="" width={200} height={200}/>
                            <p className="pt-2 text-center">Looking...</p>
                        </div> :
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-20 h-20 m-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                            <p className="pt-2">{search ? 'No results match your search' : 'Make a search'}</p>
                        </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}
