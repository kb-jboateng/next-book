'use client';

import { FC, useState } from "react";

interface DescriptionProps {
    description: string
}

const BookDescription: FC<DescriptionProps> = ({
    description
}) => {
    const [showMore, setShowMore] = useState<boolean>(false);

    return (
        <>
            {
                description?.trim().length > 300 ?
                (
                    <>
                        <p className="break-words leading-7" dangerouslySetInnerHTML={{__html: showMore ? description : `${description.trim().slice(0, 300)}...`}}></p> 
                        <button className="h-3.5 min-w-fit underline text-green" onClick={() => setShowMore(!showMore)}>Show more</button>
                    </>
                ) :
                <p className="break-words leading-7" dangerouslySetInnerHTML={{__html: description}}></p>
            }
        </>
    )
}

export default BookDescription;

