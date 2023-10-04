"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { useBookContext } from "../context/BookContext";
import Account from "./Account";
import Search from "./Search";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {

    const { isLoggedIn } = useBookContext();

    const pathname = usePathname();
    const isLoginPage = pathname.startsWith('/login');
    const isBooksPage = pathname.startsWith('/book') || pathname.startsWith('/books');

    return (
        <>
            <div className="h-[100px]">
                {
                    !isLoginPage &&
                    <div className="flex justify-between px-4 items-center border-b-2 border-gray-light h-full">
                        <Link href={`${isLoggedIn ? '/home' : '/'}`}>
                            <h2 className="text-3xl text-green"><span className="italic">next</span><span className="font-medium">Book</span></h2>
                        </Link>
                        {
                            isLoggedIn &&
                            <div className="hidden sm:contents">
                                <NavSearch isBooksPage={isBooksPage}/>
                            </div>
                        }
                        {
                            isLoggedIn ?
                            <Account/> :
                            <div className="flex gap-[20px] items-center">
                                <p className="hidden md:block">Lost for your next read?</p>
                                <button className="bg-orange hover:bg-orange-dark" onClick={() => signIn('goggle', {callbackUrl: '/home'})}>
                                    Sign In
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className="flex sm:hidden justify-center mt-4 px-6">
                <NavSearch isBooksPage={isBooksPage}/>
            </div>
        </>
    )
}

function NavSearch({ isBooksPage }: { isBooksPage: boolean }) {

    const router = useRouter();
    const containerRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { books, search, busy } = useBookContext();

    useEffect(() => {
        const handleClick = (event: Event) => {
            if (containerRef.current && !containerRef.current.contains(event.target))
                setIsOpen(false);
        };
      
        document.addEventListener('click', handleClick);
    
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [containerRef]);

    const handleSearchClick = (event: MouseEvent) => {
        setIsOpen(true);
        event.stopPropagation();
    };

    const viewBook = (id: number, event: MouseEvent) => {
        setIsOpen(false);
        router.push(`/books/${id}`);
        event.stopPropagation();
    };

    const handleViewAll = (event: MouseEvent) => {
        setIsOpen(false);
        router.push(`/books?q=${search}`);
        event.stopPropagation();
    };

    return (
        <>
            {
                !isBooksPage &&
                <div className="w-full min-w-[200px] max-w-[400px] sm:min-w-[300px]" ref={containerRef} onClick={handleSearchClick}>
                    <div className="relative">
                        <Search/>
                        {
                            (isOpen && search && !busy) &&
                            <div className="absolute mt-2 z-10 w-full border-[1px] border-gray-light rounded-lg bg-[#333333] px-4 py-2 transition ease-in-out">
                                <div className="divide-y-[1px] divide-gray-light">
                                    {
                                        books.slice(0, 4).map((book) => 
                                            <div key={book.id} className="flex py-2 gap-2 cursor-pointer" onClick={(e) => viewBook(book.id, e)}>
                                                <Image src={book.coverPage} width={35} height={45} alt=""/>
                                                <div className="truncate">
                                                    <p className="truncate text-sm">{book.title}</p>
                                                    <p className="truncate text-light text-xs">by {book.publisher}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    books.length > 0 ?
                                    <div className="text-center">
                                        <button className="text-green decoration-green hover:underline h-fit" onClick={handleViewAll}>
                                            View all results
                                        </button>
                                    </div> :
                                    <p className="text-center text-gray-lighter italic">No results found</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}