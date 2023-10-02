'use client';

import { FC } from "react";

interface RatingProps {
    rating: number
}

const Rating: FC<RatingProps> = ({
    rating,
}) => {

    const fullStars = Math.floor(rating ?? 0);

    const stars: number[] = Array(fullStars).fill(1).map(i => i);

    if (rating < 5) {
        // Calculates the partial star. For example 4.3 - 4 = 0.3. 0.3 will get 
        // added to the array in the next line to represent the partial star
        const partialStar = rating - fullStars;

        stars.push(partialStar);

        // Calculates the number of empty stars
        const emptyStars = 5 - stars.length;

        //adds 0s to the array to represent empty stars
        for (let i = 1; i <= emptyStars; i++) {
            stars.push(0);
        }
    }

    return (
        <div className="flex gap-2"> 
            {
                stars.map((value, index) => 
                    <svg key={index} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" strokeWidth="0.5" stroke="#707070" className="w-8 h-8">
                        <defs>
                            <linearGradient id={`${index}-star`}>
                                <stop offset={`${value * 100}%`} stopColor="#FF6600"/>
                                <stop offset={`${value * 100}%`} stopColor="#222222"/>
                            </linearGradient>
                        </defs>
                        <path fill={`url(#${index}-star)`} strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                )
            }
        </div>
    )
}

export default Rating;

