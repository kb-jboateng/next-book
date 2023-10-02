'use client';

import { FC, useEffect } from "react";
import SearchInput from "./SearchInput";
import { useBookContext } from "../context/BookContext";
import { searchBooks } from "../services/book.service";

interface SearchProps {
    showBusy?: boolean
};

/**
 * Component displays the `SearchInput` and handles setting the `books` and `busy` state of the `BookContext`
 * @param showBusy condition for which the busy state of the `SearchInput` is set, if `true` set `busy` on `SearchInput` to the value of `busy` in the `BookContext`, if `false` sets `busy` on `SearchInput` to `false` 
 */
const Search: FC<SearchProps> = ({
    showBusy = true
}) => {

    const { setBooks, busy, setBusy, search, setSearch } = useBookContext();

    useEffect(() => {
        if (search) {
          setBusy(true);
          const fetchData = async () => {
            const books = await searchBooks(search);
            setBooks(books);
            setBusy(false);
          }
      
          fetchData().catch(console.error);
        }
    },[search, setBooks, setBusy]);


    return(
        <>
            <SearchInput value={search} placeholder="Search for book" setValue={setSearch} delay={1000} disabled={busy} busy={showBusy ? busy : false}/>
        </>
    )
}

export default Search;