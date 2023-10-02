"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { IDbBook } from "../models/Book";

const BookContext = createContext<{
    user: any,
    search: string,
    setSearch: any,
    books: IDbBook[],
    setBooks: any,
    busy: boolean,
    setBusy: any,
    isLoggedIn: boolean
}>({
    user: undefined,
    search: '',
    setSearch: null,
    books: [],
    setBooks: null,
    busy: false,
    setBusy: null,
    isLoggedIn: false
});

export const BookProvider = ({ children }: { children: React.ReactNode }) => {

    const { data: session, status } = useSession();

    const [books, setBooks] = useState([]);
    const [busy, setBusy] = useState(false);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(session?.user)
    }, [session]);

    const isLoggedIn = status == 'authenticated';


    const values = {
        user,
        search,
        setSearch,
        books,
        setBooks,
        busy,
        setBusy,
        isLoggedIn,
    };

    return (
        <BookContext.Provider value={values}>
            {children}
        </BookContext.Provider>
    )

}

export const useBookContext=()=> useContext(BookContext);