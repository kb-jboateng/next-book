import { IBookmark, IDbBook } from "../models/Book";

const BOOKS_URL = '/api/books';

type RequestOptions = {
    headers?: {
        accept: string,
        Authorization?: string;
    };
    method: 'GET' | 'POST' | 'DELETE';
    cache?: 'force-cache' | 'no-cache' | 'no-store';
};

const DefaultOptions: RequestOptions = {
    method: "GET",
    headers: {
        accept: "application/json"
    }
};

/**
 * Calls broswer `fetch` with the `url` and `options` provided
 * @param url api endpoint to call
 * @param options `RequestOptions` to attach to the api call. Defaults to `DefaultOptions` (GET)
 * @returns JSON response if there's no error. `null` when method is `DELETE` and throws an error if an error occured during api call
 */
const fetchData = async (url: string, options: RequestOptions = DefaultOptions) : Promise<any> => {
    console.log('fetching', url)
    const response = await fetch(url, options);

    if(!response.ok)
        throw new Error("Network response was not ok");

    if (response.ok && options?.method == 'DELETE')
        return null;

    return await response.json();
};

/**
 * Handles api call to search database for books that match the `query`
 * @param query search text
 * @returns list of books based on `query`.
 */
export const searchBooks = async (query: string) : Promise<IDbBook[]> => {
    try {
        return await fetchData(`${BOOKS_URL}?query=${query}`, { 
            method: 'GET', 
            cache: 'force-cache' 
        });
    } catch (error) {
        return [];
    }
};

/**
 * Handles api call to add a book to users bookmarks
 * @param bookId id of book to add
 * @returns a `IBookmark` object
 */
export const bookmark = async (bookId: number) : Promise<IBookmark> => {
    return await fetchData(`${BOOKS_URL}/bookmark/${bookId}`, {
        method: 'POST',
    });
};

/**
 * Handles api call to remove a book from users bookmarks
 * @param bookmarkId id of bookmark to delete
 * @returns `null`
 */
export const unbookmark = async (bookmarkId: number) => {
    return await fetchData(`${BOOKS_URL}/bookmark/${bookmarkId}`, {
        method: 'DELETE',
    });
};

/**
 * @returns the current signed in users' bookmarks
 */
export const fetchBookmarks = async (): Promise<IDbBook[]> => {
    return await fetchData(`${BOOKS_URL}/bookmark`);
};

/**
 * @returns top rated books in descending order of `averageRating` and `numberOfRatings`
 */
export const fetchTopRated = async () : Promise<IDbBook[]> => {
    return await fetchData(`${BOOKS_URL}/top-rated`);
};