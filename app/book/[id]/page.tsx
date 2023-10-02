import Image from "next/image";
import { Lato } from "next/font/google";
import Link from "next/link";
import Rating from "@/app/components/Rating";
import Bookmark from "@/app/components/Bookmark";
import BookDescription from "@/app/components/Description";
import { IBook } from "@/app/models/Book";

const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

export default async function Book({ params }: {params: {id: number}}) {

    const fetchBook = async () : Promise<IBook> => {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/books/${+params.id}`);
        return await res.json();
    }

    const book = await fetchBook();

    return (
        <>
            {
                book &&
                <div className="flex flex-wrap md:flex-nowrap gap-6 select-none">
                    <div className="min-w-[200px] m-auto md:m-0">
                        <Image src={book?.volumeInfo?.imageLinks?.thumbnail ?? book.coverPage} width={200} height={100} alt="" className="rounded-r-xl shadow-md"/>
                    </div>
                    <div>
                        <div className={`pb-4 ${lato.className}`}>
                            <div className="flex justify-between">
                                <div>
                                    {
                                        book?.volumeInfo?.subtitle && 
                                        <h3 className="text-xl text-gray-lighter italic font-medium">
                                            <span className="capitalize">{book.volumeInfo.subtitle[0]}</span><span className="normal-case">{book.volumeInfo.subtitle.slice(1)}</span>
                                        </h3>
                                    }
                                    <h1 className="text-3xl font-semibold pb-2 capitalize">{book?.volumeInfo?.title ?? book.title}</h1>
                                    {book?.volumeInfo?.authors && <p className="text-lg font-light">{book.volumeInfo.authors.join(', ')}</p>}
                                </div>
                                <div>
                                    <Bookmark book={book} width="w-8" height="h-8"/>
                                </div>
                            </div>
                        </div>
                        <div className="pb-4">
                            <div className="pb-2 flex gap-4 items-center">
                                <Rating rating={book.averageRating}/>
                                <p className={`text-2xl font-medium pt-1 ${lato.className}`}>{book.averageRating}</p>
                            </div>
                            <p className="text-sm text-gray-lighter">{book.numberOfRatings} ratings</p>
                        </div>
                        <div>
                            {
                                book?.volumeInfo?.description &&
                                <div className="pb-4">
                                    <BookDescription description={book.volumeInfo.description}/>
                                </div>
                            }
                            {
                                book?.volumeInfo?.categories &&
                                <div className="pb-4">
                                    <p><span className="text-gray-lighter pr-2">Genres: </span>{book.volumeInfo.categories.map((category, index) => 
                                    <span key={index} className="font-light">{category}</span>)}</p>
                                </div>
                            }
                            <div className="text-sm text-gray-lighter pb-6">
                                <p className="pb-2">{book?.volumeInfo?.pageCount ?? book.pages} pages</p>
                                <p>Published {book?.volumeInfo?.publishedDate ?? book.yearPublished} <span className="italic font-thin">by {book?.volumeInfo?.publisher ?? book.publisher} </span> </p>
                            </div>
                            <div className="text-xs text-gray-lighter">
                                <p>Sources: {book?.volumeInfo?.infoLink && <span className="underline"><Link href={book.volumeInfo.infoLink} target="_blank">Google</Link></span>} <span className="underline"><Link href={book.url} target="_blank">Goodreads</Link></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );

}