"use client";

import { IDbBook } from "../models/Book";
import { useSession } from "next-auth/react";
import { fetchBookmarks } from "../services/book.service";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const BookContext = createContext<{
    user: any,
    search: string,
    setSearch: any,
    books: IDbBook[],
    setBooks: any,
    topRatedBooks: IDbBook[];
    setTopRatedBooks: any;
    popularBooks: IDbBook[];
    setPopularBooks: any;
    bookmarks: IDbBook[],
    busy: boolean,
    setBusy: any,
    isLoggedIn: boolean
}>({
    user: undefined,
    search: '',
    setSearch: null,
    books: [],
    setBooks: null,
    topRatedBooks: [],
    setTopRatedBooks: null,
    popularBooks: [],
    setPopularBooks: null,
    bookmarks: [],
    busy: false,
    setBusy: null,
    isLoggedIn: false
});

interface IBookmarkAction {
    type: 'set' | 'add' | 'delete';
    bookId?: number;
    book?: IDbBook;
    data?: IDbBook[];
}

const BookmarkReducerContext = createContext<{ dispatch: (_: IBookmarkAction) => void }>({
    dispatch: () => {}
});

function BookmarkReducer(bookmarks: IDbBook[], action: IBookmarkAction) {
    
    const { type, bookId, data, book } = action;

    switch (type) {
        case 'set':
            if (data)
                return [...data];
            break;
        case 'add':
            if (book)
                return [...bookmarks, book];
            break;
        case 'delete':
            if (bookId)
                return bookmarks.filter(bookmark => bookmark.id !== bookId);
            break;
    }

    return bookmarks;
}


export const BookProvider = ({ children }: { children: React.ReactNode }) => {

    const { data: session, status } = useSession();

    const [books, setBooks] = useState([]);
    const [busy, setBusy] = useState(false);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState<any>(null);
    const [popularBooks, setPopularBooks] = useState([]);
    const [topRatedBooks, setTopRatedBooks] = useState([]);
    const [bookmarks, dispatch] = useReducer(BookmarkReducer, []);

    useEffect(() => {
        setUser(session?.user);
    }, [session]);

    const isLoggedIn = status == 'authenticated';

    useEffect(() => {
        if (isLoggedIn && bookmarks?.length == 0) {
            const getUserBookmarks = async () => {
                setBusy(true);
                const bookmarks = await fetchBookmarks();
                dispatch({type: 'set', data: bookmarks});
                setBusy(false);
            };

            getUserBookmarks().catch(console.error);
        }
    }, [isLoggedIn, bookmarks, setBusy])

    const values = {
        user,
        search,
        setSearch,
        books,
        setBooks,
        bookmarks,
        topRatedBooks,
        setTopRatedBooks,
        popularBooks,
        setPopularBooks,
        busy,
        setBusy,
        isLoggedIn,
    };

    return (
        <BookContext.Provider value={values}>
            <BookmarkReducerContext.Provider value={{dispatch}}>
                {children}
            </BookmarkReducerContext.Provider>
        </BookContext.Provider>
    )

}

export const useBookContext = ()=> useContext(BookContext);
export const useBookmarkReducer = () => useContext(BookmarkReducerContext);